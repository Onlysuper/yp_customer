
<template>
  <!-- 管理员信息页面 -->
  <el-header class="my-header">
    <div class="head-l">
      <span @click="isCollapsefn" class="icon-unfurled collapse-button"></span>
    </div>
    <div class="head-r">
      <el-badge :value="200" :max="99" class="item">
        <el-button size="small">信息</el-button>
      </el-badge>
      <div class="user-img">
        <img src="../../../assets/images/logo.png" alt="">
        <span></span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="userimg"></i>{{realname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogFormVisible = true">密码修改</el-dropdown-item>
          <el-dropdown-item @click.native="dialogUserVisible = true">个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
/*重置样式*/
  .el-header {
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(105,105,105,0.3);
    color: #333;
    overflow: hidden;
    width: 100%;
    display: block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-l{
        float: left;
        .collapse-button{
          font-size: 20px;
          cursor: pointer;
        }
      }
      .head-r{
        display: flex;
        align-items: center;
        .el-badge{
          line-height: 0;
        }
        &>div{
          // margin:0 10px;
        }
        .user-img{
          margin-left: 40px;
          margin-right: 10px;
          img{
            width: 30px;
            height: 30px;
            border-radius: 100%;
          }
        }
        // float: right;
      } 
  }
@media screen and (max-width: 500px) {
  .el-header {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  /*重置样式*/
  .el-header {
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.3);
    color: #333;
    line-height: 60px;
    overflow: hidden;
    width: 100%;
    display: block;
    .head-l {
      float: left;
      .collapse-button {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .head-r {
      float: right;
    }
  }
}
</style>

<script>
export default {
  name: "usermsg",
  data() {
    return {
      realname: "",
      isCollapse: false
    };
  },
  methods : {
    isCollapsefn (){
      this.$store.commit("SidebarHandle")
    }
  }
};
</script>