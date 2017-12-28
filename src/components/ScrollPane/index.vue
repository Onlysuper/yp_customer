
<template>
  <!-- 面包屑滚动区域-->
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>

<script>
import { PasswordUpdate } from "@src/apis";
export default {
  name: "scrollpane"
};
</script>