/**
 * ------------------------------------------------------------------------------------
 * range 范围模块
 * ------------------------------------------------------------------------------------
 *
 * @author  xwoko
 * @change  2019/5/3/16:22
 */
import { getDocOffset } from 'src/js/dom';

export default class Range {
  range = null;
  commonContainer = null;

  // 获取 range
  static getRange() {
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

    return range;
  }

  // 获取相当前光标的绝对位置
  static getCursorPosition() {
    const data = { x: 0, y: 0 };
    const range = Range.getRange();
    const { top, left } = getDocOffset();
    let rect = range.getBoundingClientRect();

    if (rect.height === 0) {
      rect = range.getClientRects()[0];
    }

    range.collapse(false);

    if (rect) {
      data.x = rect.left + left;
      data.y = rect.top + top;
    }

    return data;
  }

  constructor(editor) {
    this.editor = editor;
  }

  // 保存 range
  saveSelection() {
    this.range = Range.getRange();
    this.commonContainer = this.range.commonAncestorContainer;
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
    this.editor.wysiwyg.focus();
    document.execCommand(command, false, params);
  }

  // 获取输入内容的位置
  getLastPosition() {
    if (this.range) { return this.range.startOffset; }
    this.editor.wysiwyg.focus();
    this.saveSelection();
    return this.range.startOffset;
  }
}
