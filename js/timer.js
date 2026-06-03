import { Emitter } from './state.js';

// 드리프트 없는 인터벌 엔진.
// 핵심: 틱을 누적하지 않는다. 각 구간의 "절대 종료 시각(Date.now 기반 ms)"을 저장하고
// 매 프레임 remaining = end - now 로 계산한다. 백그라운드/절전 후에도 정확하다.
//
// 이벤트: 'segment:enter' {segment,index} | 'tick' {snapshot} | 'countdown' {n,segment}
//        | 'complete' {totalSeconds,workCount} | 'stop' | 'pause' | 'resume' | 'resync'
export class TimerEngine extends Emitter {
  constructor() {
    super();
    this.session = null;
    this.index = 0;
    this.running = false;
    this.paused = false;
    this.segmentEndsAt = 0;        // Date.now() 기준 ms
    this.remainingMsAtPause = 0;
    this._lastWholeSec = null;
    this._rafId = null;
    this._timeoutId = null;
    this._completed = false;
    document.addEventListener('visibilitychange', () => this._onVisibility());
  }

  load(session) {
    this.session = session;
    this.index = 0;
    this.running = false;
    this.paused = false;
    this._completed = false;
    this._lastWholeSec = null;
  }

  start() {
    if (!this.session || !this.session.segments.length) return;
    this.running = true;
    this.paused = false;
    this._completed = false;
    this._enter(0);
    this.tick();
  }

  pause() {
    if (!this.running || this.paused) return;
    this.paused = true;
    this.remainingMsAtPause = Math.max(0, this.segmentEndsAt - Date.now());
    this._cancel();
    this.emit('pause');
    this.emit('tick', this._snapshot(this.remainingMsAtPause));
  }

  resume() {
    if (!this.running || !this.paused) return;
    this.paused = false;
    this.segmentEndsAt = Date.now() + this.remainingMsAtPause;
    this.emit('resume');
    this.tick();
  }

  toggle() { this.paused ? this.resume() : this.pause(); }

  next() {
    if (!this.running) return;
    if (this.index >= this.session.segments.length - 1) return;
    this._goTo(this.index + 1);
  }

  prev() {
    if (!this.running) return;
    const cur = this._current();
    const intoMs = cur.seconds * 1000 - this._remMs();
    // 현재 구간을 1.5초 이상 진행했으면 현재 구간을 재시작, 아니면 이전으로
    this._goTo(intoMs > 1500 || this.index === 0 ? this.index : this.index - 1);
  }

  stop() {
    this.running = false;
    this.paused = false;
    this._cancel();
    this.emit('stop');
  }

  // 포그라운드 복귀 시 호출: Date.now 기준 재계산 + 경계 넘었으면 advance + 재렌더
  syncFromForeground() {
    if (!this.running || this.paused) return;
    this._cancel();
    this.tick();
    this.emit('resync');
  }

  // ── 내부 ──
  tick() {
    if (!this.running || this.paused) return;
    const cur = this._current();
    if (!cur || cur.kind === 'done') return this._complete();

    const remMs = this.segmentEndsAt - Date.now();
    if (remMs <= 0) { this.advance(); return; }

    // 3·2·1 카운트다운(초 경계 하향 통과 시)
    const whole = Math.ceil(remMs / 1000);
    if (this._lastWholeSec == null) this._lastWholeSec = whole;
    if (whole < this._lastWholeSec) {
      if (whole >= 1 && whole <= 3) this.emit('countdown', { n: whole, segment: cur });
      this._lastWholeSec = whole;
    }

    this.emit('tick', this._snapshot(remMs));
    this._schedule();
  }

  advance() {
    if (!this.running) return;
    let guard = 0;
    // 절전으로 여러 구간을 건너뛰었어도 누적 종료시각으로 올바른 현재 구간에 안착(드리프트 0)
    while (this.running && Date.now() >= this.segmentEndsAt) {
      const cur = this._current();
      if (!cur || cur.kind === 'done') return this._complete();
      const nextIndex = this.index + 1;
      if (nextIndex >= this.session.segments.length) return this._complete();
      const prevEnds = this.segmentEndsAt;
      this.index = nextIndex;
      const ns = this._current();
      this.segmentEndsAt = prevEnds + ns.seconds * 1000;
      if (ns.kind === 'done') return this._complete();
      if (++guard > 100000) break;
    }
    const landed = this._current();
    this._lastWholeSec = Math.max(0, Math.ceil((this.segmentEndsAt - Date.now()) / 1000));
    this.emit('segment:enter', { segment: landed, index: this.index });
    this.tick();
  }

  _enter(i) {
    this.index = i;
    const s = this._current();
    this.segmentEndsAt = Date.now() + s.seconds * 1000;
    this._lastWholeSec = s.seconds;
    if (s.kind === 'done') return this._complete();
    this.emit('segment:enter', { segment: s, index: i });
  }

  _goTo(i) {
    this.index = Math.max(0, Math.min(i, this.session.segments.length - 1));
    const s = this._current();
    this._lastWholeSec = s.seconds;
    if (s.kind === 'done') return this._complete();
    if (this.paused) {
      this.remainingMsAtPause = s.seconds * 1000;
      this.emit('segment:enter', { segment: s, index: this.index, manual: true });
      this.emit('tick', this._snapshot(this.remainingMsAtPause));
    } else {
      this.segmentEndsAt = Date.now() + s.seconds * 1000;
      this.emit('segment:enter', { segment: s, index: this.index, manual: true });
      this.tick();
    }
  }

  _complete() {
    if (this._completed) return;
    this._completed = true;
    this.running = false;
    this.paused = false;
    this._cancel();
    this.emit('complete', {
      totalSeconds: this.session?.totalSeconds || 0,
      workCount: this.session?.workCount || 0,
    });
  }

  _schedule() {
    this._cancel();
    if (!this.running || this.paused) return;
    if (document.hidden) {
      this._timeoutId = setTimeout(() => this.tick(), 250); // 백그라운드: 벽시계 읽기용 폴백
    } else {
      this._rafId = requestAnimationFrame(() => this.tick());
    }
  }

  _cancel() {
    if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    if (this._timeoutId) { clearTimeout(this._timeoutId); this._timeoutId = null; }
  }

  _onVisibility() {
    if (!this.running || this.paused) return;
    if (document.visibilityState === 'visible') this.syncFromForeground();
    else this._schedule(); // setTimeout 모드로 전환
  }

  _current() { return this.session?.segments[this.index] || null; }
  _remMs() { return this.paused ? this.remainingMsAtPause : (this.segmentEndsAt - Date.now()); }

  // 현재 상태 스냅샷(화면 최초 렌더용)
  snapshot() { return this.session && this._current() ? this._snapshot(this._remMs()) : null; }

  _nextNamed(from) {
    const segs = this.session.segments;
    for (let i = from; i < segs.length; i++) {
      if (segs[i].name && segs[i].kind !== 'done') return segs[i];
    }
    return null;
  }

  // 세션 위치 기반(벽시계 무관) → 일시정지 영향 없음
  _snapshot(remMs) {
    const cur = this._current();
    const totalMs = this.session.totalSeconds * 1000;
    const segMs = cur.seconds * 1000;
    const remClamped = Math.max(0, Math.min(remMs, segMs));
    const elapsedMs = cur.startAt * 1000 + (segMs - remClamped);
    const totalRemainingMs = Math.max(0, totalMs - elapsedMs);
    return {
      index: this.index,
      segment: cur,
      next: this._nextNamed(this.index + 1),
      remainingMs: remClamped,
      remainingSec: Math.max(0, Math.ceil(remClamped / 1000)),
      segmentSeconds: cur.seconds,
      segmentProgress01: segMs ? 1 - remClamped / segMs : 1,
      elapsedMs,
      totalRemainingMs,
      totalMs,
      totalProgress01: totalMs ? elapsedMs / totalMs : 0,
      paused: this.paused,
    };
  }
}
