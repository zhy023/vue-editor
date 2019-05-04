<template>
  <div class="toolbar-wrap">
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="标题"
        @click="toggleDrop('header')"
      >
        <i class="fa fa-header" />
      </button>
      <ul :class="['drop', { 'show': drop.state && drop.value === 'header' }]">
        <li @click="emitHeader('h1')"><h1>H1</h1></li>
        <li @click="emitHeader('h2')"><h2>H2</h2></li>
        <li @click="emitHeader('h3')"><h3>H3</h3></li>
        <li @click="emitHeader('h4')"><h4>H4</h4></li>
        <li @click="emitHeader('h5')"><h5>H5</h5></li>
        <li @click="emitHeader('h6')"><h6>H6</h6></li>
      </ul>
    </div>
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="字体"
        @click="toggleDrop('font')"
      >字体
      </button>
      <ul :class="['drop', { 'show': drop.state && drop.value === 'font' }]">
        <li
          style="font-family:宋体,SimSun"
          @click="emitFont('宋体,SimSun')"
        >
          宋体
        </li>
        <li
          style="font-family:Microsoft YaHei"
          @click="emitFont('Microsoft YaHei')"
        >
          微软雅黑
        </li>
        <li
          style="font-family:arial,helvetica,sans-serif"
          @click="emitFont('arial,helvetica,sans-serif')"
        >
          arial
        </li>
        <li
          style="font-family:arial black"
          @click="emitFont('arial black')"
        >
          arial black
        </li>
      </ul>
    </div>
    <!--<div class="toolbar-dorpdown">
      <button
        class="btn"
        title="字体大小"
        @click="toggleDrop('fontSize')"
      >字体大小
      </button>
      <ul :class="['drop', { 'show': drop.state && drop.value === 'fontSize' }]">
        <li
          style="font-size:12px"
          @click="emitFontSize('12')"
        >
          12px
        </li>
        <li
          style="font-size:14px"
          @click="emitFontSize('14')"
        >
          14px
        </li>
        <li
          style="font-size:16px"
          @click="emitFontSize('16')"
        >
          16px
        </li>
        <li
          style="font-size:18px"
          @click="emitFontSize('18')"
        >
          18px
        </li>
        <li
          style="font-size:20px"
          @click="emitFontSize('20')"
        >
          20px
        </li>
        <li
          style="font-size:22px"
          @click="emitFontSize('22')"
        >
          22px
        </li>
        <li
          style="font-size:24px"
          @click="emitFontSize('24')"
        >
          24px
        </li>
        <li
          style="font-size:26px"
          @click="emitFontSize('26')"
        >
          26px
        </li>
        <li
          style="font-size:28px"
          @click="emitFontSize('28')"
        >
          28px
        </li>
        <li
          style="font-size:30px"
          @click="emitFontSize('30')"
        >
          30px
        </li>
        <li
          style="font-size:32px"
          @click="emitFontSize('32')"
        >
          32px
        </li>
      </ul>
    </div>-->
    <button
      class="btn"
      title="加粗"
      @click="emitTag('bold')"
    >
      <i class="fa fa-bold" />
    </button>
    <button
      class="btn"
      title="斜体"
      @click="emitTag('italic')"
    >
      <i class="fa fa-italic" />
    </button>
    <button
      class="btn"
      title="下划线"
      @click="emitTag('underline')"
    >
      <i class="fa fa-underline" />
    </button>
    <button
      class="btn"
      title="删除线"
      @click="emitTag('strikethrough')"
    >
      <i class="fa fa-strikethrough" />
    </button>
    <button
      class="btn"
      title="下角标"
      @click="emitTag('subscript')"
    >
      <i class="fa fa-subscript" />
    </button>
    <button
      class="btn"
      title="上角标"
      @click="emitTag('superscript')"
    >
      <i class="fa fa-superscript" />
    </button>
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="字体颜色"
        @click="toggleDrop('foreColor')"
      >
        <i class="fa fa-paint-brush" />
      </button>
      <div
        ref="foreColor"
        style="min-width: 252px;"
        :class="['drop fore-color', { 'show': drop.state && drop.value === 'foreColor' }]"
      ></div>
    </div>

    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="背景色"
        @click="toggleDrop('bgColor')"
      >
        <i class="fa fa-tint" />
      </button>
      <div
        ref="bgColor"
        style="min-width: 252px;"
        :class="['drop bg-color', { 'show': drop.state && drop.value === 'bgColor' }]"
      ></div>
    </div>
    <button
      class="btn"
      title="左对齐"
      @click="emitAlign('align-left')"
    >
      <i class="fa fa-align-left" />
    </button>
    <button
      class="btn"
      title="居中对齐"
      @click="emitAlign('align-center')"
    >
      <i class="fa fa-align-center" />
    </button>
    <button
      class="btn"
      title="右对齐"
      @click="emitAlign('align-right')"
    >
      <i class="fa fa-align-right" />
    </button>
    <button
      class="btn"
      title="两端对齐"
      @click="emitAlign('align-justify')"
    >
      <i class="fa fa-align-justify" />
    </button>
    <button
      class="btn"
      title="有序列表"
      @click="emitOrdered('ordered')"
    >
      <i class="fa fa-list-ol" />
    </button>
    <button
      class="btn"
      title="无列表"
      @click="emitOrdered('unordered')"
    >
      <i class="fa fa-list-ul" />
    </button>
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="插入图片"
        @click="toggleDrop('insertImg')"
      >
        <i class="fa fa-image" />
      </button>
      <div :class="['drop insert-image', { 'show': drop.state && drop.value === 'insertImg' }]">
        <div class="image-box">
          图片上传<input ref="img" type="file" name="photo" accept="image/*" class="file-input" />
        </div>
      </div>
    </div>
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="插入表情"
        @click="toggleDrop('insertEmoji')"
      >
        <i class="fa fa-smile-o" />
      </button>
      <div :class="['drop insert-emoji', { 'show': drop.state && drop.value === 'insertEmoji' }]">

        <div ref="emoji" class="emoji-box" />
      </div>
    </div>
    <div class="toolbar-dorpdown">
      <button
        class="btn"
        title="插入表格"
        @click="toggleDrop('insertTable')"
      >
        <i class="fa fa-table" aria-hidden="true" />
      </button>
      <div :class="['drop insert-table', { 'show': drop.state && drop.value === 'insertTable' }]">
        <div class="insert-table-box">
          <div ref="tablebg" class="insert-table-bg"></div>
          <table
            class="insert-table-list"
            @click="clickInsert"
            @mousemove="moveSelect"
            @mouseleave="leaveTable"
          >
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <button
      class="btn"
      title="去除所有格式"
      @click="emitTag('removeFormat')"
    >
      <i class="fa fa-eraser" />
    </button>
    <button
      class="btn"
      title="撤销"
      @click="emitTag('undo')"
    >
      <i class="fa fa-undo" />
    </button>
    <button
      class="btn"
      title="重做"
      @click="emitTag('redo')"
    >
      <i class="fa fa-repeat" />
    </button>
    <div class="clearfix" />
  </div>
</template>

<script>
  import { includes } from 'lodash';
  import ColorPicker from 'src/js/colorPicker';
  import InsertImage from 'src/js/insertImage';
  import Emoji from 'src/js/emoji';

  const headerMap = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  export default {
    name: "Toolbar",

    data() {
      return {
        drop: {
          state: false,
          value: '',
        },
      };
    },

    created() {
      document.addEventListener('click', this.clickOut, true);
    },

    mounted() {
      this.$nextTick(() => {
        // 前景色
        if (this.$refs.foreColor) {
          this.foreColor = new ColorPicker(this.$refs.foreColor, (val) => {
            this.drop.state = false;
            this.$emit('color', val);
          });
        }

        // 背景色
        if (this.$refs.bgColor) {
          this.bgColor = new ColorPicker(this.$refs.bgColor, (val) => {
            this.drop.state = false;
            this.$emit('background', val);
          });
        }

        // 插入图片
        if (this.$refs.img) {
          this.insertImage = new InsertImage(this.$refs.img, (val) => {
            this.drop.state = false;
            this.$emit('image', val);
          });
        }

        // 插入表情
        if (this.$refs.emoji) {
          this.emoji = new Emoji(this.$refs.emoji, (val) => {
            this.drop.state = false;
            this.$emit('image', val);
          });
        }
      });
    },

    beforeDestroy() {
      document.removeEventListener('click', this.clickOut, true);
    },

    methods: {

      // 切换展示 dropdown
      toggleDrop(val) {
        this.drop.state = !this.drop.state;
        if (val !== this.drop.value && !this.drop.state) { this.drop.state = true; }
        this.drop.value = val;
      },

      // header 操作
      emitHeader(val) {
        this.drop.state = false;

        if (includes(headerMap, val)) {
          this.$emit('header', val);
        }
      },

      emitFont(val) {
        this.drop.state = false;
        this.$emit('family', val);
      },

      emitFontSize(val) {
        this.drop.state = false;
        this.$emit('fontSize', val);
      },

      emitTag(val) {
        this.drop.state = false;
        this.$emit('tag', val);
      },


      emitAlign(val) {
        this.$emit('align', val);
      },

      emitOrdered(val) {
        this.$emit('ordered', val);
      },

      clickInsert(e) {
        if (e.target.nodeName === 'TD') {
          let col = 0;
          let td = e.target;

          while (td)
          {
            td = td.previousElementSibling;
            col++;
          }

          let row = 0;
          let tr = e.target.parentNode;
          while (tr)
          {
            tr = tr.previousElementSibling;
            row++;
          }

          this.drop.state = false;
          this.$emit('table', { col, row });
        }
      },

      moveSelect(e) {
        if (e.target.nodeName === 'TD') {
          this.$refs.tablebg.style.width = `${e.target.offsetLeft + 16}px`;
          this.$refs.tablebg.style.height = `${e.target.offsetTop + 16}px`;
        }
      },

      leaveTable() {
        this.$refs.tablebg.style.width = 0;
        this.$refs.tablebg.style.height = 0;
      },

      clickOut(e) {
        if (!this.$el.contains(e.target)) { this.drop.state = false; }
      },
    },
  }
</script>
