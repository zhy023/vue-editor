/**
 * ------------------------------------------------------------------------------------
 * colorPicker 模块，colorPicker 选择颜色封装
 * ------------------------------------------------------------------------------------
 *
 * @author  zhangmao
 * @change  2019/4/7
 */

import { isFunction } from 'lodash';
import { fireOn } from 'src/js/event';

const HSVtoRGB = (h, s, v) => {
  let r, g, b, i, f, p, q, t;

  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  const hr = Math.floor(r * 255).toString(16);
  const hg = Math.floor(g * 255).toString(16);
  const hb = Math.floor(b * 255).toString(16);
  const hrVal = hr.length < 2 ? '0' : '';
  const hgVal = hg.length < 2 ? '0' : '';
  const hbVal = hb.length < 2 ? '0' : '';

  return `#${hrVal}${hr}${hgVal}${hg}${hbVal}${hb}`;
};

const createColorBoard = () => {
  const table = document.createElement('table');
  table.cellpadding = 0;
  table.cellspacing = 0;
  table.unselectable = 'on';

  // should be '16' - but last line looks so dark
  for (let row = 1; row < 15; ++row) {
    const rows = document.createElement('tr');
    for (let col = 0; col < 25; ++col) {
      let color;
      if (col === 24) {
        const gray = Math.floor(255 / 13 * (14 - row)).toString(16);
        const hexg = `${gray.length < 2 ? '0' : ''}${gray}`;
        color = `#${hexg}${hexg}${hexg}`;
      } else {
        const hue = col / 24;
        const saturation = row <= 8 ? row / 8 : 1;
        const value = row > 8 ? (16 - row) / 8 : 1;
        color = HSVtoRGB(hue, saturation, value);
      }
      const td = document.createElement('td');
      td.width = 10;
      td.height = 10;
      td.title = color;
      td.unselectable = 'on';
      td.style.cursor = 'url(di.ico),crosshair';
      td.style.backgroundColor = color;
      rows.appendChild(td);
    }
    table.appendChild(rows);
  }

  const box = document.createElement('div');
  box.appendChild(table);
  return box;
};

export default class ColorPicker {
  callback = null;

  constructor(element, fn) {
    if (!element || !fn) { return; }

    const board = createColorBoard();
    element.appendChild(board);

    this.callback = fn;
    this.initEvent(board.firstChild);
  }

  initEvent(table) {
    fireOn(table, 'click', (e) => {
      const td = e.target;
      if (td.nodeName === 'TD') {
        if (isFunction(this.callback)) {
          const color = td.getAttribute('title');
          this.callback(color);
        }
      }
    });
  }
}

