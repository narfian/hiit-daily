// 공유 DOM 헬퍼.
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null) continue;
    if (k === 'class' || k === 'className') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k === 'on' && typeof v === 'object') for (const [ev, fn] of Object.entries(v)) node.addEventListener(ev, fn);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'attrs') for (const [a, val] of Object.entries(v)) node.setAttribute(a, val);
    else node.setAttribute(k, v);
  }
  append(node, children);
  return node;
}

function append(node, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false || c === true) continue;
    node.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
}

export function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
export function mount(parent, ...children) { clear(parent); append(parent, children); }

// 초 → "m:ss" 또는 "h:mm:ss"
export function formatTime(totalSeconds) {
  const total = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

// 구간 kind → strings 키
export function labelKeyForKind(kind) {
  return { getready: 'getReady', warmup: 'warmup', work: 'work', rest: 'rest', cooldown: 'cooldown', done: 'complete' }[kind] || kind;
}

let toastTimer;
export function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = el('div', { id: 'toast', class: 'toast' }); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1600);
}
