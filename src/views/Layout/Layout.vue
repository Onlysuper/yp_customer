<template>
  <el-container class="layout-page">
    <side-bar class="layout-sldebar"></side-bar>
    <el-container class="layout-main">
      <nav-bar></nav-bar>
      <!-- <tags-view></tags-view> -->
      <app-main></app-main>
    </el-container>
  </el-container>
</template>
<script>
import NavBar from "@src/components/NavBar";
import SideBar from "@src/components/SideBar";
import AppMain from "@src/components/AppMain";
import TagsView from "@src/components/TagsView";
// import { NavBar, SideBar, AppMain } from "@src/views/layout/components";

export default {
  name: "layout",
  components: {
    NavBar,
    SideBar,
    AppMain,
    TagsView
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "../../../src/assets/scss-pc/admin-page.scss";
@import "../../../src/assets/scss-pc/reset.scss";
.layout-page {
  height: 100vh;
  // overflow: hidden;
  .layout-main {
    flex-direction: column;
  }
}
</style>
