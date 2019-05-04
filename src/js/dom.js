/**
 * ----------------------------------------------------------------------------------
 * dom 操作封装
 * ----------------------------------------------------------------------------------

 * @author zhangmao
 * @change 2017/7/21
 */

import { trim, camelCase } from 'lodash';

// 获取 scroll 的大小
let scrollWidth = 0;

// ------------------------------------------------------------------------------

// nodeType
export const nodeType = {
  ELEMENT: 1,
  ATTRIBUTE: 2,
  TEXT: 3,
  CDATA_SECTION: 4,
  ENTITY_REFERENCE: 5,
  ENTITY: 6,
  PROCESSING_INSTRUCTION: 7,
  COMMENT: 8,
  DOCUMENT: 9,
  DOCUMENT_TYPE: 10,
  DOCUMENT_FRAGMENT: 11,
  NOTATION: 12,
};

// ------------------------------------------------------------------------------

// 获取元素属性相关的操作

// window 对象
export const wind = window;

// document 对象
export const docu = document;

// bode 对象
export const body = docu.body || docu.documentElement;

// 获取可视区的宽度
export const getWinWidth = () => wind.innerWidth || body.clientWidth;

// 获取可视区的高度
export const getWinHeight = () => wind.innerHeight || body.clientHeight;

// 获取当前滚动条位置
export const getDocOffset = () => {
  const obj = { top: 0, left: 0 };

  if (docu.documentElement && docu.documentElement.scrollTop) {
    obj.top = docu.documentElement.scrollTop;
    obj.left = docu.documentElement.scrollLeft;
  } else if (body) {
    obj.top = body.scrollTop;
    obj.left = body.scrollLeft;
  }

  return obj;
};

// 获取元素相对于 body 的 offset
export const getAbsOffset = (element) => {
  let el = element;
  const obj = { top: 0, left: 0 };

  while (el && el.tagName !== 'BODY') {
    obj.top += el.offsetTop;
    obj.left += el.offsetLeft;
    el = el.offsetParent;
  }

  return obj;
};

// 获取 style
export function getStyle(element, name) {
  let styleName = name;
  if (!element || !styleName) { return null; }
  styleName = camelCase(styleName);
  if (styleName === 'float') { styleName = 'cssFloat'; }
  try {
    const computed = docu.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

// 获取元素真实大小位置等信息
export const getSize = (el) => {
  const size = { width: 0, height: 0 };
  const cloneObj = el.cloneNode(true);

  cloneObj.style.cssText = 'display:block;visibility:hidden;position:absolute;top:-1000px;';
  el.parentNode.insertBefore(cloneObj, el);
  size.width = cloneObj.offsetWidth;
  size.height = cloneObj.offsetHeight;
  el.parentNode.removeChild(cloneObj);

  return size;
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

// 检测 class
export function hasClass(element = null, cls = '') {
  if (!element || !cls) { return false; }
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.'); }
  if (element.classList) { return element.classList.contains(cls); }
  return ` ${element.className} `.indexOf(` ${cls} `) > -1;
}

// 添加 class
export function addClass(element = null, cls = '') {
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
}

// 删除 class
export function removeClass(element, cls) {
  const el = element;
  if (!el || !cls) { return; }
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i += 1) {
    const clsName = classes[i];
    if (!clsName) { continue; }

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

// 去掉 html 的标签
export const removeHTMLTag = (html) => {
  let str = html;
  str = str.replace(/<\/?[^>]*>/g, ''); // 去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); // 去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); // 去除多余空行
  str = str.replace(/&nbsp;/ig, ''); // 去掉&nbsp;
  return str;
};

// 禁用鼠标右键，禁止复制粘贴等操作
export const banCopyAndPaste = () => {
  docu.oncopy = (evt) => { evt.preventDefault(); };
  docu.oncontextmenu = (evt) => { evt.preventDefault(); };
  docu.onselectstart = (evt) => { evt.preventDefault(); };
  docu.onkeydown = evt => !evt.ctrlKey;
};

// 设置css主题样式文件
export const setStyleSheet = (path) => {
  const docHead = docu.head;
  const linkList = docu.getElementsByTagName('link');
  if (linkList) {
    for (let i = 0; i < linkList.length; i += 1) {
      if (linkList[i].getAttribute('ty') === 'theme') {
        docHead.removeChild(linkList[i]);
      }
    }
  }

  const linkStyle = docu.createElement('link');
  linkStyle.setAttribute('rel', 'stylesheet');
  linkStyle.setAttribute('type', 'text/css');
  linkStyle.setAttribute('href', path);
  linkStyle.setAttribute('ty', 'theme');
  docHead.appendChild(linkStyle);
};

// 获取url的参数
export const getUrlParams = () => {
  const urlSearch = wind.location.search;
  const param = {};
  if (urlSearch.indexOf('?') !== -1) {
    const str = urlSearch.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i += 1) {
      param[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return param;
};

// ------------------------------------------------------------------------------

// 节点相关的操作

// ------------------------------------------------------------------------------

// 获取单个或者多个节点，制定节点下的节点元素
export const $ = (parent = docu, selector, multiple = false) => {
  if (multiple) { return parent.querySelectorAll(selector); }
  return parent.querySelector(selector);
};

// 删除节点
export const remove = element => {
  if (element && element.parentNode) { element.parentNode.removeChild(element); }
};

// 添加节点
export const appendChild = (element, child) => {
  if (element.nodeType === nodeType.ELEMENT && child.nodeType === nodeType.ELEMENT) {
    element.appendChild(child);
  }
};

// 获取设置 attribute 属性
export const attr = (element, key, value = '') => {
  // 获取 attribute
  if (value === '') { return element.getAttribute(attr); }

  // 删除 attribute
  if (value == null) {
    element.removeAttribute(attr);
    return;
  }

  // 设置 attribute
  element.setAttribute(key, value);
};
