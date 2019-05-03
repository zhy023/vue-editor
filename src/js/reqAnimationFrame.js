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

// requestAnimationFrame 封装
export const reqAnimationFrame = (fn) => { window.requestAnimationFrame(fn); };
