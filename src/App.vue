<template>
  <div id="app">
    <div style="width:800px; margin: 0 auto">
      <Toolbar
        @header="doHeader"
        @family="doFamily"
        @fontSize="doFontSize"
        @tag="doTag"
        @color="doColor"
        @background="doBackColor"
        @align="doAlign"
        @ordered="doOrdered"
        @image="doInsertImg"
        @table="doInsertTable"
      />
      <div :id="testId">
        <p>测试初始化内容<b>加粗文本</b>测试</p>
        <p>The Argentinian human rights group Abuelas de la Plaza de Mayo found one more child that had been separated
          from their parents during the military dictatorship. The 42-year-old woman, who lives in Spain, is now the 129th
          child identified by the group, which has been locating and reuniting missing children with their biological
          families since the 1980s.</p>
        <p>About 30,000 people were forcibly disappeared in Argentina during the 1976-1983 military rule. Many kidnapped
          women have birthed <span>ba<strong>b</strong>ies</span> while in captivity, who were then appropriated by the state and illegally given for
          adoption to families of allies of the regime.</p>
      </div>
    </div>
  </div>
</template>

<style lang="css">
  @import 'assets/rest.css';
  @import 'assets/font-awesome/css/font-awesome.min.css';
</style>

<style lang="less">
  @import 'assets/editor.less';
</style>

<script type="text/javascript">
  import {uniqueId} from 'lodash';
  import Editor from 'src/js/editor';
  import Toolbar from 'src/components/Toolbar.vue';

  export default {
    name: 'app',

    components: {Toolbar},

    data() {
      return {
        testId: '',
      };
    },

    created() {
      this.testId = uniqueId('test');
    },

    mounted() {
      this.$nextTick(() => {
        this.editor = new Editor(document.querySelector(`#${this.testId}`), {
          onblur: () => {}
        });
      });
    },

    methods: {
      doHeader(val) {
        this.editor.cmd.header(val);
      },

      doFamily(val) {
        this.editor.cmd.fontFamily(val);
      },

      doFontSize(val) {
        this.editor.cmd.fontSize(val);
      },

      doTag(val) {
        this.editor.cmd.setTag(val);
      },

      doColor(val) {
        this.editor.cmd.color(val);
      },

      doBackColor(val) {
        this.editor.cmd.bgColor(val);
      },

      doAlign(val) {
        this.editor.cmd.align(val);
      },

      doOrdered(val) {
        this.editor.cmd.ordered(val);
      },

      doInsertImg(val) {
        this.editor.cmd.insertImage(val);
      },

      doInsertTable(val) {
        this.editor.cmd.insertTable(val);
      },
    },
  }
</script>
