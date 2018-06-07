<template>
  <transition name="layout-fade">
    <el-container class="layout-page">
      <side-bar class="layout-sldebar"></side-bar>
      <el-container class="layout-main">
        <nav-bar></nav-bar>
        <app-main></app-main>
      </el-container>
    </el-container>
  </transition>
</template>
<script>
import NavBar from "@src/components/NavBar";
import SideBar from "@src/components/SideBar";
import AppMain from "@src/components/AppMain";
import TagsView from "@src/components/TagsView";
import { websocket } from "@src/common/websocket";
// import { NavBar, SideBar, AppMain } from "@src/views/layout/components";

export default {
  name: "layout",
  mixins: [websocket],
  components: {
    NavBar,
    SideBar,
    AppMain,
    TagsView
  },
  mounted() {
    this.websocketFn();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "../../../src/assets/scss-pc/admin-page.scss";
// @import "../../../src/assets/scss-pc/reset.scss";
.layout-page {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  align-items: stretch;
  .layout-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: stretch;
  }
}
.layout-fade-enter-active,
.layout-fade-leave-active {
  transition: opacity 0.5s;
}
.layout-fade-enter,
.layout-fade-leave-to {
  opacity: 0;
}
</style>
