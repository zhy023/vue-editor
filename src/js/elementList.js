/**
 * ------------------------------------------------------------------------------------
 * element list 候选列表模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/7
 */
import { uniqueId } from 'lodash';

export default class {

  initState = false;

  constructor() {
    if (this.initState) { return; }

    this.id = uniqueId('list');

    const ul = document.createElement('ul');
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.zIndex = 1;
    div.style.display = 'none';
    div.style.minWidth = '200px';
    div.style.minHeight = '200px';
    div.style.background = '#efefef';
    div.style.border = '1px solid #ccc';
    div.id = this.id;

    this.ul = ul;
    this.wrap = div;
    this.wrap.appendChild(this.ul);

    document.body.appendChild(this.wrap);
    this.outClick();
    this.initState = true;
  }

  show({ x, y }) {
    // 渲染 list 列表

    this.wrap.style.top = `${y}px`;
    this.wrap.style.left = `${x}px`;
    this.wrap.style.display = '';
  }

  hide() {
    this.wrap.style.display = 'none';
  }

  outClick() {
    document.addEventListener('click', (e) => {
      if (e.target.id !== this.id) { this.hide(); }
    }, true);
  }
}
