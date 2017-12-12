<template>
  <el-container  class="home-page">
    <Sidebar></Sidebar> 
    <el-container>
      <Usermsg></Usermsg>
      <app-main></app-main>
    </el-container>
  </el-container>
  
</template>

<script>
import {Usermsg, Sidebar, AppMain } from '@src/views/Layout/components'
export default {
    name: 'Layout',
    components:{
      Usermsg,
      Sidebar,
      AppMain
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
*{
  margin: 0;
  padding: 0;
}
.home-page{
  height: 100vh;
  .aside-box {
    background: #001529;
    position: relative;
    height: 100%;
  }
}
</style>
