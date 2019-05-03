/**
 * ------------------------------------------------------------------------------------
 * 浏览器检测模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/6
 */
/* eslint-disable */
let isSupport = false;

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
const version = matches ? parseInt(matches[1], 10) : 0;

// 检测 editor 在当前浏览器环境下是否可用
const checkSupport = () => {
  if (ie) {
    isSupport = version > 8;
    return;
  }

  if (webkit) {
    isSupport = version > 4;
    return;
  }

  if (opera) {
    isSupport = version > 10;
  }
};

checkSupport();

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
  isSupport,
};
/* eslint-disable */