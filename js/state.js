// 초소형 pub/sub. 타이머 엔진과 i18n이 이를 상속/사용한다.
export class Emitter {
  #handlers = new Map();
  on(type, fn) {
    if (!this.#handlers.has(type)) this.#handlers.set(type, new Set());
    this.#handlers.get(type).add(fn);
    return () => this.off(type, fn);
  }
  off(type, fn) { this.#handlers.get(type)?.delete(fn); }
  emit(type, payload) {
    this.#handlers.get(type)?.forEach((fn) => {
      try { fn(payload); } catch (e) { console.error(e); }
    });
  }
}

// 앱 전역 이벤트 버스(화면 전환, 설정 변경 알림 등).
export const bus = new Emitter();
