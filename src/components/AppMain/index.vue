<template>
  <!-- layout 内容展示区域 -->
  <div class="reset-main">
    <router-view></router-view>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
body {
  margin: 0;
}
.reset-main {
  position: relative;
  height: 100%;
}
</style>
<script>
export default {
  name: "AppMain",
  computed: {}
};
</script>
