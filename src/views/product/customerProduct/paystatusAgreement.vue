<template>
  <div>
    <div class="agreement-content">
      协议写这里
    </div>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback()">返回</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
@media screen and (min-width: 500px) {
  @page {
    margin-left: 1.25in;
    margin-right: 1.25in;
    margin-top: 1in;
    margin-bottom: 1in;
  }
  p {
    margin-bottom: 0.1in;
    direction: ltr;
    line-height: 120%;
    text-align: justify;
    orphans: 0;
    widows: 0;
  }
  .agreement-content {
    width: 100%;
    height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
<script>
import utils from "@src/common/utils";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
export default {
  name: "",
  components: {},
  mixins: [mixinsPc],
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$emit("goback");
    }
  },
  created() {},
  computed: {},
  watch: {}
};
</script>

