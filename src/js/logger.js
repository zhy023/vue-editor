/**
 * ------------------------------------------------------------------------------------
 * logger 模块
 * ------------------------------------------------------------------------------------
 *
 * @author  xwoko
 * @change  2019/5/3/20:38
 */
const list = ['error', 'warn', 'log', 'info'];

import { includes } from 'lodash';

// logger 方法
export default function(type, message) {
  if (includes(list, type)) {
    const logFn = window.console[type];
    logFn(message);
  } else {
    throw new Error(message);
  }
}
