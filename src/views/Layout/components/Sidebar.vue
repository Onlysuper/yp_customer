<template>
  <div class="aside-box">
    <div class="logo-box">
      <div class="img-box">
        <img src="../../../assets/images/logo.png" alt="">
      </div>
      <h1 v-show="!isCollapse" class="home-title">易票运营系统v1.0</h1>
    </div>
    <el-menu text-color="#fff" :router="isrouter" default-active="1-1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu v-for="(item, index) in menuList" :index="index+'item1'" :key="index">
        <template slot="title">
          <i :class="'icon icon-'+item.menuCode">
            <span class="path1"></span>
            <span class="path2"></span>
          </i>
          <span slot="title">{{item.menuName}}</span>
        </template>
        <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="'/admin/'+item2.menuCode">
          {{item2.menuName}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  <!-- 左侧菜单 -->

</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@media screen and (max-width: 500px) {
  .aside-box {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  .aside-box {
    .logo-box {
      height: 58px;
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 0 16px;
      background: #002240;
      color: #fff;
      box-shadow: 2px 3px 8px rgba(105, 105, 105, 0.8);
      .img-box {
        display: inline-block;
        img {
          height: 30px;
        }
      }
      .home-title {
        display: inline-block;
        padding-left: 20px;
        padding-left: 17px;
      }
    }
    /*重置样式*/

    .el-menu {
      border-right: 0 !important;
      background: #001529 !important;
      .icon {
        font-size: 30px;
        color: #fff;
      }
    }
    .el-submenu__title:hover {
      background: transparent !important;
    }
    .el-menu--collapse .el-submenu:hover {
      background: #000c17 !important;
    }
    .el-submenu .el-menu-item:hover {
      background: #000c17 !important;
    }
    .el-menu-item.is-active {
      background: #000c17 !important;
    }
  }
}
</style>

<script>
import "@src/assets/icons/style.css";
import { MenuGet, PasswordUpdate } from "@src/apis";
import Bus from "@src/views/Layout/components/bus";
export default {
  name: "pc",
  data() {
    //密码修改表单内容
    return {
      menuList: "", // 菜单数据
      realname: "", // 管理员信息
      isrouter: true, // 开启路由
      isCollapse: false // 菜单收起
    };
  },
  mounted() {
    this.dataInit(); // 初始化数据
    this.isCollapseHandle();
  },
  methods: {
    isCollapseHandle() {
      var self = this;
      Bus.$on("getTarget", target => {
        self.isCollapse = target;
      });
    },
    // 初始化数据
    dataInit: function() {
      var self = this;
      MenuGet()({}).then(function(data) {
        if (data.code === "00") {
          // 管理员信息
          self.realname = data.data.realname; //管理员名称
          self.username = data.data.username; // 登录账号
          console.log(data.data);
          // 菜单
          self.menuList = data.data.menuList;
        }
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>