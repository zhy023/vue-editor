/**
 * ------------------------------------------------------------------------------------
 * Editor 事件管理器
 * ------------------------------------------------------------------------------------
 *
 * @author  yujie zhangmao
 * @change  2019/4/5
 */

import { forEach, isArray, isFunction } from 'lodash';

// ------------------------------------------------------------------------------

// event 事件管理类
export default class Event {

  handleStore = {}; // 事件存储器

  // ------------------------------------------------------------------------------

  // 注册监听器
  on(eventName = '', callback = null) {
    if (!eventName || !isFunction(callback)) { return; }

    (this.handleStore[eventName] = this.handleStore[eventName] || []).push(callback);
  }

  // ------------------------------------------------------------------------------

  // 发射事件
  emit(eventName, ...args) {
    const callbackArr = this.handleStore[eventName];

    if (!callbackArr) { return; }

    forEach(callbackArr, callback => callback(...args));
  }

  // ------------------------------------------------------------------------------

  /**
   * 删除指定事件
   * @param eventName required
   * @param callback  optional
   *
   * 删除指定事件中的指定方法，如果不传callback,则删除指定事件所有方法
   */
  removeListeners(eventName, callback) {
    if (!eventName) { return; }

    const callbackArr = this.handleStore[eventName];

    if (!isArray(callbackArr)) { return; }

    if (!callback) {
      delete this.handleStore[eventName];
      return;
    }
    const index = callbackArr.indexOf(callback);
    if (index > -1) { callbackArr.splice(index, 1); }
  }

  // ------------------------------------------------------------------------------

  // 清空所有监听器
  removeAllListeners() { this.handleStore = {}; }

  // ------------------------------------------------------------------------------

  // 返回名为 eventName 的事件的监听器数组的副本
  listeners(eventName) { return this.handleStore[eventName]; }
}

// 绑定 dom 事件
export const fireOn = (() => {
  if (document.addEventListener) {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

// 删除 dom 事件
export const fireOff = (() => {
  if (document.removeEventListener) {
    return (element, event, handler) => {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

// once
export const fireOnce = (el, event, fn) => {
  var listener = () => {
    if (fn) { fn.apply(this, el, event, fn); }
    fireOff(el, event, listener);
  };
  fireOn(el, event, listener);
};
