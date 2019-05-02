/**
 * ------------------------------------------------------------------------------------
 * Editor 富文本编辑器
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/5
 */
import { trim, uniqueId } from 'lodash';
// import browser from 'src/js/browser';
import Event, { fireOn } from 'src/js/event'; // event 模块
import Cmd from 'src/js/cmd'; // cmd 模块
import KEYMAP from 'src/js/keyMap';
import cursorPos from 'src/js/cursorPosation';
import ElementList from 'src/js/elementList';

export default class Editor {
  element = null; // element 元素
  options = {}; // options 参数
  editorId = ''; // editor id
  editorEl = null; // editor 元素
  range = null; // range 范围对象
  section = null; // section 对象

  cmd = null; // cmd 模块对象
  event = null; // 事件模块对象

  constructor(element, options) {
    if (!element) { return; }
    this.element = element;
    this.options = options;

    // 创建事件对象
    this.initEvent();

    // 创建 cmd 对象
    this.cmd = new Cmd(this);

    // 创建 editor 编辑器
    this.initEditorWrap();

    // 创建候选列表
    this.atList = new ElementList();
  }

  // 初始化编辑器事件对象
  initEvent() {
    this.event = new Event();
    this.event.on('blur', this.options.onblur);
  }

  // 初始化创建编辑器的容器
  initEditorWrap() {
    const uuid = uniqueId('editor');
    const editorEl = document.createElement('div');

    editorEl.id = uuid;
    editorEl.tabindex = 1;
    editorEl.className = 'editor';
    editorEl.contentEditable = true;

    // 保存 id 引用
    this.editorId = uuid;
    this.editorEl = editorEl;

    // 如果有初始化内容
    const innerHTML = this.element.innerHTML;

    this.element.innerHTML = '';
    editorEl.innerHTML = innerHTML;

    this.element.appendChild(editorEl);
    this.initEditorEvent();
  }

  // 初始化编辑器事件
  initEditorEvent() {
    fireOn(this.editorEl, 'blur', () => {
      // 保存 range
      this.saveSelection();
      this.event.emit('blur', this.editorEl);
    });

    // 匹配 @
    fireOn(this.editorEl, 'keyup', (evt) => {
      if (evt.keyCode === KEYMAP.shift) { return; }
      this.at();
    });
  }

  // 保存 range
  saveSelection() {
    let sel = null;
    let range = null;

    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
      }
      // ie
    } else if (document.selection) {
      range = document.selection.createRange();
    }
    this.range = range;
    return this.range;
  }

  // 恢复选区
  restoreSelection() {
    let selection;
    if (window.getSelection || document.createRange) {
      selection = window.getSelection();
      if (this.range) {
        try {
          selection.removeAllRanges();
        } catch (err) {
          document.body.createTextRange().select();
          document.selection.empty();
        }
        selection.addRange(this.range);
      }
    } else if (document.selection && this.range) {
      this.range.select();
    }
  }

  // command
  execCommand(command, params = null) {
    this.restoreSelection();
    this.editorEl.focus();
    document.execCommand(command, false, params);
  }

  getCursorPosition() {
    if (this.range) {
      return this.range.startOffset;
    }
    this.editorEl.focus();
    this.saveSelection();
    return this.range.startOffset;
  }

  // 获取 html
  getHTML() { return this.editorEl.innerHTML; }

  // 获取纯文本
  getText() { return this.editorEl.textContent; }

  // @ 功能
  at() {
    this.saveSelection();
    const start = this.getCursorPosition() - 2;
    // 截取空格加 @
    const atStr = this.range.commonAncestorContainer.textContent.substr(start, 2);
    const splitArr = atStr.split('');

    if (trim(splitArr[0]) === '' && splitArr[1] === '@') {
      const pos = cursorPos();

      this.atList.show({ x: pos.xStart, y: pos.yStart });
    }
  }
}
