/**
 * ------------------------------------------------------------------------------------
 * cmd 模块，execCommand 方法调用的封装 支持 ie9+
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/5
 */
export default class Cmd {

  editor = null; // editor 对象

  constructor(editor) {
    if (!editor) { return; }
    this.editor = editor;
  }

  // h1-h6
  header(val) {
    const key = 'formatBlock';
    this.editor.range.execCommand(key, `<${val}>`);
  }

  // font-family
  fontFamily(val) {
    const key = 'fontName';
    this.editor.range.execCommand(key, val);
  }

  // font-size
  // fontSize(val) {
  //   const key = 'fontSize';
  //   console.log('font-size', key, val);
  //   // this.editor.range.execCommand(key, `${val}px`);
  // }

  // 单标签操作只需要一个参数
  setTag(val) {
    this.editor.range.execCommand(val);
  }

  // 设置前景色
  color(val) {
    const key = 'foreColor';
    this.editor.range.execCommand(key, val);
  }

  // 设置背景色
  bgColor(val) {
    const key = 'backColor';
    this.editor.range.execCommand(key, val);
  }

  // 对其操作
  align(val) {
    const cmdMap = {
      'align-justify': 'justifyFull',
      'align-left': 'justifyLeft',
      'align-right': 'justifyRight',
      'align-center': 'justifyCenter',
    };
    this.editor.range.execCommand(cmdMap[val], val);
  }

  // 创建有序列表或者无序列表
  ordered(val) {
    const orderMap = {
      ordered: 'insertOrderedList',
      unordered: 'insertUnorderedList',
    };

    this.editor.range.execCommand(orderMap[val]);
  }

  // 插入图片
  insertImage(val) {
    const span = document.createElement('span');
    span.appendChild(val);
    this.editor.range.execCommand('insertHTML', span.innerHTML);
  }

  insertTable({ col, row }) {
    const table = document.createElement('table');

    table.style.minWidth = '500px';
    table.style.border = '1px solid #ccc';

    for (let r = 0; r < row; r ++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < col; c ++) {
        const td = document.createElement('td');
        td.style.border = '1px solid #ccc';
        td.style.minWidth = '125px';
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    const div = document.createElement('div');
    div.appendChild(table);

    this.editor.range.execCommand('insertHTML', div.innerHTML);
  }
}
