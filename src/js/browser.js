/**
 * ------------------------------------------------------------------------------------
 * 浏览器检测模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/6
 */

const ua = navigator.userAgent.toLowerCase();
const ie = ua.indexOf('msie') > -1 && ua.indexOf('opera') === -1;
const gecko = ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1;
const webkit = ua.indexOf('applewebkit') > -1;
const opera = ua.indexOf('opera') > -1;
const mobile = ua.indexOf('mobile') > -1;
const ios = /ipad|iphone|ipod/.test(ua);
const quirks = document.compatMode !== 'CSS1Compat';
const ieRange = !window.getSelection;
const matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(ua);
const version = matches ? matches[1] : 0;

export default {
  ie,
  gecko,
  webkit,
  opera,
  mobile,
  ios,
  quirks,
  ieRange,
  version,
};
