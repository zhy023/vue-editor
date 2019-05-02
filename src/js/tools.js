if (!Date.now) { Date.now = function () { return new Date().getTime(); }; }

const vendors = ['webkit', 'moz'];

if (!window.requestAnimationFrame) {
  for (let i = 0; i < vendors.length; ++i) {
    const vp = vendors[i];
    window.requestAnimationFrame = window[`${vp}RequestAnimationFrame`];
    window.cancelAnimationFrame = (window[`${vp}CancelAnimationFrame`] || window[`${vp}CancelRequestAnimationFrame`]);
  }
}

if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
  let lastTime = 0;

  window.requestAnimationFrame = callback => {
    const now = Date.now();
    const nextTime = Math.max(lastTime + 16, now);
    return setTimeout(() => { callback(lastTime = nextTime); }, nextTime - now);
  };

  window.cancelAnimationFrame = clearTimeout;
}

let scrollWidth = 0;

// requestAnimationFrame 封装
export const ref = (fn) => { window.requestAnimationFrame(fn); };

// 检测 class
export const hasClass = (el = null, cls = '') => {
  if (!el || !cls) { return false; }
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.'); }
  if (el.classList) { return el.classList.contains(cls); }
  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
};

// 添加 class
export const addClass = (element = null, cls = '') => {
  const el = element;
  if (!el) { return; }
  let curClass = el.className;
  const classes = cls.split(' ');

  for (let i = 0, j = classes.length; i < j; i += 1) {
    const clsName = classes[i];
    if (!clsName) { continue; }

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

// 获取滚动条宽度
export const getScrollWidth = () => {
  if (scrollWidth > 0) { return scrollWidth; }

  const block = docu.createElement('div');
  block.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px;overflow-y:scroll;';
  body.appendChild(block);
  const { clientWidth, offsetWidth } = block;
  body.removeChild(block);
  scrollWidth = offsetWidth - clientWidth;

  return scrollWidth;
};
