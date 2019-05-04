/**
 * ------------------------------------------------------------------------------------
 * 插入图片模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/10
 */
import { isFunction } from 'lodash';
import { fireOn } from "src/js/event";

export default class InsertImage {

  element = null; // input dom 元素
  callback = null;

  constructor(element, fn) {
    if (!element || !fn) { return; }

    this.element = element;
    this.callback = fn;

    fireOn(this.element, 'change', (e) => { this.change(e.target); });
  }

  change({ files = [] }) {
    if (files && files.length > 0) {
      const file = files[0];
      try {
        const fileReader = new FileReader();
        fileReader.onload = (evt) => {
          const url = evt.target.result;
          const img = document.createElement('img');
          img.src = url;
          img.alt = '';

          if (isFunction(this.callback)) {
            this.callback(img);
          }
        };
        fileReader.readAsDataURL(file);
      } catch (e) { console.log(e); }
    }
  }
}
