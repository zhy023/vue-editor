/**
 * ------------------------------------------------------------------------------------
 * Editor 编辑器核心模块
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/5
 */
import { trim, merge, uniqueId } from 'lodash';
import browser from 'src/js/browser';
import Event, { fireOn } from 'src/js/event'; // event 模块
import Range from 'src/js/range'; // range
import Cmd from 'src/js/cmd'; // cmd 模块
import KEYMAP from 'src/js/keyMap';
import ElementList from 'src/js/elementList';
import defConfig from 'src/js/config';
import * as dom from 'src/js/dom';
import logger from 'src/js/logger';

export default class Editor {
  options = {};
  container = null;
  wysiwyg = null;
  uuid = '';
  range = null;
  cmd = null;
  event = null;

  constructor(element, options) {
    if (!element || !browser.isSupport) { return; }

    this.container = element;
    this.options = merge({}, defConfig, options);

    // 创建事件对象
    this.initEvent();

    // 创建 range
    this.range = new Range(this);

    // 创建 cmd 对象
    this.cmd = new Cmd(this);

    // 创建候选列表
    this.atList = new ElementList();

    // 创建 editor 编辑器
    this.initEditorWrap();
  }

  // 初始化编辑器事件对象
  initEvent() {
    this.event = new Event();
    this.event.on('blur', this.options.onblur);
  }

  // 初始化创建编辑器的容器
  initEditorWrap() {
    const uuid = uniqueId('editor');
    const wysiwyg = document.createElement('div');

    wysiwyg.id = uuid;
    wysiwyg.dir = 'ltr';
    wysiwyg.tabindex = 1;
    wysiwyg.className = 'editor';
    wysiwyg.contentEditable = true;

    if (this.options.placeholder) {
      dom.attr(wysiwyg, 'placeholder', this.options.placeholder);
    }

    // 保存 id 引用
    this.uuid = uuid;
    this.wysiwyg = wysiwyg;

    // 如果有初始化内容
    const innerHTML = this.container.innerHTML;

    this.container.innerHTML = '';
    wysiwyg.innerHTML = innerHTML;

    dom.appendChild(this.container, wysiwyg);
    this.initEditorEvent();
  }

  // 初始化编辑器事件
  initEditorEvent() {
    fireOn(this.wysiwyg, 'blur', () => {
      // 保存 range
      this.range.saveSelection();
      this.event.emit('blur', this.wysiwyg);
    });

    // 匹配 @
    fireOn(this.wysiwyg, 'keyup', (evt) => {
      if (evt.keyCode === KEYMAP.shift) { return; }
      this.at();
    });
  }

  // 获取 html
  getHTML() { return this.wysiwyg.innerHTML; }

  // 获取纯文本
  getText() { return this.wysiwyg.textContent; }

  // @ 功能
  at() {
    this.range.saveSelection();
    const start = this.range.getLastPosition() - 2;
    // 截取空格加 @
    const atStr = this.range.commonContainer.textContent.substr(start, 2);
    const splitArr = atStr.split('');

    if (trim(splitArr[0]) === '' && splitArr[1] === '@') {
      const pos = Range.getCursorPosition();
      logger('info', pos);
      this.atList.show({ x: pos.x, y: pos.y });
    }
  }
}
