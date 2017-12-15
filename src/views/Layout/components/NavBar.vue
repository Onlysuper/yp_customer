
<template>
  <!-- 管理员信息页面 -->
  <el-header height="54px" class="my-header">
    <div @click="isCollapsefn"  class="head-l">
      <span :class="[isCollapseicon?'isCollapseicon':'','icon-recycling','collapse-button']"></span>
    </div>
    <div class="head-r">
      <div class="hover-back">
        <el-badge :value="200" :max="99" class="item">
            <span class="icon-news"></span>
        </el-badge>
      </div>
      <div class="hover-back">
        <div class="user-img">
          <img :src="require('@src/assets/images/logo.png')" alt="">
          <span></span>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="userimg"></i>{{userMsg.realname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogFormVisible = true">密码修改</el-dropdown-item>
            <el-dropdown-item @click.native="dialogUserVisible = true">个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>  
    </div>
  </el-header>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
/*重置样式*/
.my-transition(@attr){
  transition: @attr 0.8s;
  -moz-transition: @attr 0.8s;
  -webkit-transition: @attr 0.8s;
  -o-transition: @attr 0.8s;
}
  .my-header {
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(105,105,105,0.8);
    color: #333;
    overflow: hidden;
    width: 100%;
    display: block;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0px !important;
    box-sizing: border-box;
    height: 54px;
    .hover-back{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      padding: 0 5px;
      min-width: 50px;
      &:hover{
        .my-transition(background);
        background: rgba(0,193,223,0.2);
        cursor: pointer;
      }
    }
      .head-l{
          width: 70px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          vertical-align: middle;
          .isCollapseicon{
            transform:rotate(180deg); /* Safari 和 Chrome */
          }
          &:hover{
            .my-transition(background);
            background: rgba(0,193,223,0.2);
            cursor: pointer;
          }
          .collapse-button{
            font-size: 25px;
            color: rgba(0, 0, 0, 0.65);
          }
      }
      .head-r{
        display: flex;
        align-items: center;
        padding-right: 20px;
        .icon-news{
          font-size: 18px;
        }
        .el-badge{
          line-height: 0;
          margin-right: 30px;
        }
        .user-img{
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

</style>

<script>
export default {
  name: "navbar",
  data() {
    return {
      realname: "",
    };
  },
  computed:{
    userMsg () {
      return this.$store.state.moduleLayour.userMessage;
    },
    isCollapseicon () {
      //菜单是否收起
      return this.$store.state.moduleLayour.isCollapse;
    }
  },
  methods : {
    isCollapsefn (){
      this.$store.commit("SidebarHandle")
    }
  }
};
</script>