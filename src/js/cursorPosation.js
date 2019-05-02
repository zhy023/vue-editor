// LightRange.js - A simple and lightweight selection, range and caret information library in native JavaScript, with an additional selection save & restore system. - https://github.com/n457/LightRange.js
// Version 2.2.0
// MIT License - Copyright (c) 2015 Bertrand Vignaud-Lerouge / n457 - https://github.com/n457


export default function () {
  // Info data that will be returned by the method.
  const data = {};

  // Modern browsers.
  if (window.getSelection) {
    const selection = window.getSelection();
    const bodyScrollTop = document.body.scrollTop;
    const bodyScrollLeft = document.body.scrollLeft;

    // If something is selected.
    if (selection.rangeCount > 0) {
      // With cloneRange() we create a perfect abstract copy of the range. We do not want to modify the real one.
      const range = selection.getRangeAt(0).cloneRange();

      // http://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page/6847328#6847328
      // http://stackoverflow.com/questions/12603397/calculate-width-height-of-the-selected-text-javascript/12603796#12603796
      // getBoundingClientRect() gives us correct information about a range but not about a caret (returns 0 as coordinates (here we test a height of 0) ).
      // getClientRects() gives us correct information about a caret but not about a range (returns wrong coordinates).
      let rect = range.getBoundingClientRect();
      if (rect.height === 0) {
        rect = range.getClientRects()[0];
      }

      // If the caret is on an empty line or if the range contains noting or new lines only, 'rect' will be undefined.
      if (rect) {
        data.width = rect.width;
        data.height = rect.height;

        // By default, x and y are calculated at the beginning of the range.
        // We have to add body scroll values
        data.xStart = rect.left + bodyScrollLeft;
        data.yStart = rect.top + bodyScrollTop;
      }

      data.text = selection.toString();
      data.charStart = range.startOffset;
      data.charEnd = range.endOffset;

      // Collapse the range to its end.
      range.collapse(false);
      // We have to update the rect with getClientRects() because the range became a caret.
      rect = range.getClientRects()[0];

      if (rect) {
        data.xEnd = rect.left + bodyScrollLeft;
        data.yEnd = rect.top + bodyScrollTop;
      }
    }
  }

  // IE 8 and other old browsers.
  else if (document.selection) {
    const selection = document.selection;
    const range = selection.createRange();
    const bodyScrollTop = document.documentElement.scrollTop;
    const bodyScrollLeft = document.documentElement.scrollLeft;

    data.width = range.boundingWidth;
    data.height = range.boundingHeight;
    data.xStart = range.boundingLeft + bodyScrollLeft;
    data.yStart = range.boundingTop + bodyScrollTop;

    range.collapse(false);
    data.xEnd = range.boundingLeft + bodyScrollLeft;
    data.yEnd = range.boundingTop + bodyScrollTop;
  } else {
    return null;
  }

  return data;
}
