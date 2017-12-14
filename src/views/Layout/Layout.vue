<template>
  <el-container class="layout-page">
    <side-bar class="layout-sldebar"></side-bar> 
    <el-container class="layout-main">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </el-container>
  </el-container>
</template>
<script>
import {NavBar, SideBar, AppMain } from '@src/views/Layout/components'
export default {
    name: 'Layout',
    components:{
      NavBar,
      SideBar,
      AppMain
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.layout-page{
  height: 100vh;
  .layout-main{
    flex-direction: column;
  }
}
</style>
