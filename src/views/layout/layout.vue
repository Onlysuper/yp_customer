<template>
  <el-container class="layout-full-page">
    <!-- <el-aside width=""> -->
    <side-bar :isCollapse="isCollapse" class="layout-sldebar"></side-bar>
    <!-- </el-aside> -->
    <el-container>
      <el-header height="54px" class="myp-header">
        <nav-bar></nav-bar>
      </el-header>
      <el-main class="myp-el-main">
        <app-main></app-main>
      </el-main>
      <!-- 
      <el-container class="layout-main">
        <nav-bar></nav-bar>
        <app-main></app-main>
      </el-container> -->
    </el-container>
  </el-container>
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
  data() {
    return {
      isCollapse: false
    }
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

.myp-header {
  padding: 0px !important;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
  color: #333;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px !important;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 54px !important;
}
.el-main.myp-el-main {
  position: relative;
  padding: 0px !important;
  text-align:left;
}
.layout-full-page {
  height: 100vh;
}
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

.table-main {
  width: 100%;
  height: 100%;
}


.el-header,
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  // line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  // background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  /* margin-bottom: 40px; */
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
}

.el-container:nth-child(7) .el-aside {
}
</style>
