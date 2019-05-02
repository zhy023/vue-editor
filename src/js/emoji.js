/**
 * ------------------------------------------------------------------------------------
 * emoji 模块，插入 emoji 表情模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/7
 */
import { isFunction } from 'lodash';
import { fireOn } from 'src/js/event';

const len = 100;

export default class Emoji {

  element = null;
  callback = null;
  initState = false;

  constructor(element, fn) {
    if (!element || !fn) { return; }

    this.element = element;
    this.callback = fn;
    this.initState = false;
    this.init();
    this.bindEvent();
  }

  init() {
    if (this.initState) { return; }

    const frag = document.createDocumentFragment();

    for (let i = 1; i <= len; i ++) {
      const img = Emoji.createImg();

      img.src = require(`../assets/emoji/${i}.gif`);
      frag.appendChild(img);
    }

    this.element.appendChild(frag);
    this.initState = true;
  }

  bindEvent() {
    fireOn(this.element, 'click', (e) => {
      if (e.target.nodeName === 'IMG') {
        if (isFunction(this.callback)) {
          const img = Emoji.createImg();
          img.src = e.target.src;
          this.callback(img);
        }
      }
    });
  }

  static createImg() {
    const img = document.createElement('img');
    img.width = 24;
    img.height = 24;
    return img;
  }
}
