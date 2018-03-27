<template>
  <!-- layout 左侧菜单区域 -->
  <div :class="'sidebar-box'">
    <div :class="'logo-box isCollapse'+isCollapse" ref="logoBox">
      <div class="img-box">
        <img :src="require('@src/assets/images/logoSmall.png')" alt="">
      </div>
      <h1 v-if="!isCollapse" :class="'home-title'">
        <router-link to="/home">易票管理系统v1.0</router-link>
      </h1>
    </div>
    <div class="aside-box">
      <iscroll-view class="scroll-view" ref="iscroll" :options="iscrollOptions">
        <el-menu show-timeout="300" hide-timeout="300" class="el-menu-vertical" :unique-opened="true" text-color="#fff" :router="isrouter" :default-openeds="defaultOpeneds" :default-active="defaultActive" @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse">
          <el-submenu v-for="(item, index) in menuList" :index="item.menuCode" :key="index">
            <template slot="title">
              <i :class="'icon icon-'+item.menuCode"></i>
              <span slot="title">{{item.menuName}}</span>
            </template>
            <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.menuCode">
              {{item2.menuName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </iscroll-view>
    </div>
  </div>
  <!-- 左侧菜单 -->
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@keyframes widthSmall {
  from {
    width: 210px;
  }
  to {
    width: 66px;
  }
}
@keyframes widthBig {
  from {
    width: 66px;
  }
  to {
    width: 210px;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  min-height: 400px;
  width: 210px;
  position: relative;
}
.isCollapsetrue {
  animation: widthSmall 0.3s;
  -webkit-animation: widthSmall 0.3s;
  width: 66px;
}
.isCollapsefalse {
  animation: widthBig 0.3s;
  -webkit-animation: widthBig 0.3s;
  width: 210px;
}
.my-transition(@attr) {
  transition: @attr 0.8s;
  -moz-transition: @attr 0.8s;
  -webkit-transition: @attr 0.8s;
  -o-transition: @attr 0.8s;
}
.aside-box {
  z-index: 11;
  display: flex;
  position: relative;
  .scroll-view {
    // touch-action: none;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0px;
  }
  /*重置样式 start*/
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-menu {
    border-right: 0;
    background: #001529 !important;
    .el-submenu__title {
      color: #878d99 !important;
      &:hover {
        color: #fff !important;
        .my-transition(color);
        .icon {
          color: #fff !important;
          .my-transition(color);
        }
      }
    }
    .icon {
      font-size: 24px;
    }
  }

  .icon-statistical_manage {
    &::before {
      display: inline-block;
      transform: translateX(2px);
    }
  }
  .el-submenu__title:hover {
    background: transparent !important;
  }
  .el-menu--collapse .el-submenu:hover {
    background: #000c17 !important;
  }
  .el-submenu .el-menu-item {
    background: #000c17 !important;
    color: #878d99 !important;
    text-indent: 18px;
    &:hover {
      color: #fff !important;
      transition: color 0.8s;
      .my-transition(color);
    }
    &.is-active {
      background: #00c1df !important;
      color: #fff !important;
      .my-transition(color);
    }
  }
  // 重置样式end
}

@media screen and (max-width: 500px) {
  .aside-box {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  .sidebar-box {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    background: #000c17;
    .logo-box {
      display: flex;
      box-sizing: border-box;
      justify-content: start;
      align-items: stretch;
      padding: 0 10px;
      background: #002240;
      color: #fff;
      box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
      position: relative;
      z-index: 9999;
      height: 54px;
      flex-shrink: 0;
      .img-box {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 30px;
        }
      }
      .home-title {
        padding: 0px;
        line-height: 0;
        display: inline-block;
        padding-left: 20px;
        padding-left: 10px;
        font-size: 18px;
        font-weight: 400;
        white-space: nowrap;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        a {
          color: #fff;
        }
      }
    }
  }
}
// }
</style>

<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);

import "@src/assets/icons/style.css";
import { MenuGet, PasswordUpdate } from "@src/apis";

export default {
  name: "pc",
  components: {},
  data() {
    //密码修改表单内容
    return {
      defaultActive: "", //
      defaultOpeneds: [],
      isrouter: true, // 开启路由
      iscrollOptions: {
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      }
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.userInfoAndMenu.isCollapse;
    },
    menuList() {
      return this.$store.state.userInfoAndMenu.menuList;
    }
  },
  mounted() {
    this.defaultActiveOpen();
    this.resetScrollViewHeight();
  },
  methods: {
    handleOpen(key, keyPath) {
      this.resetScrollViewHeight();
    },
    handleClose(key, keyPath) {
      this.resetScrollViewHeight();
    },
    handleSelect(key, keyPath) { },
    resetScrollViewHeight() {
      setTimeout(() => {
        this.$refs.iscroll.refresh();
      }, 500);
    },
    defaultActiveOpen() {
      // 默认展开菜单
      let activePath = this.$route.path.replace("/", "");
      this.defaultActive = activePath;
    }
  },
  watch: {
    isCollapse(value) {
      if (value) {
        // 菜单横向收缩
      } else {
        // 菜单横向打开
        this.defaultActiveOpen();
        this.resetScrollViewHeight();
      }
    }
  }
};
</script>