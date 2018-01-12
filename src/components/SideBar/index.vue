<template>
  <!-- layout 左侧菜单区域 -->
  <div class="aside-box">
    <div class="logo-box" ref="logoBox">
      <div class="img-box">
        <img :src="require('@src/assets/images/logo.png')" alt="">
      </div>
      <h1 v-show="!isCollapse" class="home-title">易票运营系统v1.0</h1>
    </div>
    <iscroll-view class="scroll-view" ref="iscroll" :options="iscrollOptions">
      <el-menu :unique-opened="true" text-color="#fff" :router="isrouter" default-active="1-1" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu v-for="(item, index) in menuList" :index="index+'item1'" :key="index">
          <template slot="title">
            <i :class="'icon icon-'+item.menuCode">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span slot="title">{{item.menuName}}</span>
          </template>
          <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="'/'+item2.menuCode">
            {{item2.menuName}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </iscroll-view>
  </div>
  <!-- 左侧菜单 -->
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.my-transition(@attr) {
  transition: @attr 0.8s;
  -moz-transition: @attr 0.8s;
  -webkit-transition: @attr 0.8s;
  -o-transition: @attr 0.8s;
}
.aside-box {
  background: #001529;
  box-shadow: 2px 3px 8px rgba(105, 105, 105, 0.8);
  height: 100%;
  width: 225px;
  position: relative;
  z-index: 11;
  flex-shrink: 0;
  .scroll-view {
    /* -- Attention: This line is extremely important in chrome 55+! -- */
    touch-action: none;
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 55px;
    bottom: 0;
    left: 0;
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
  .aside-box {
    .logo-box {
      height: 54px;
      overflow: hidden;
      display: flex;
      box-sizing: border-box;
      justify-content: start;
      align-items: center;
      padding: 0 16px;
      background: #002240;
      color: #fff;
      box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
      .img-box {
        display: inline-block;
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
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
      }
    }
  }
}
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
  data() {
    //密码修改表单内容
    return {
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
      return this.$store.state.moduleLayour.isCollapse;
    },
    menuList() {
      return this.$store.state.moduleLayour.menuList;
    }
  },
  mounted() {
    this.resetScrollViewHeight();
  },
  methods: {
    handleOpen(key, keyPath) {
      this.resetScrollViewHeight();
    },
    handleClose(key, keyPath) {
      this.resetScrollViewHeight();
    },
    resetScrollViewHeight() {
      setTimeout(() => {
        this.$refs.iscroll.refresh();
      }, 500);
    }
  },
  watch: {
    // $router(val) {
    //   console.log(val);
    // }
  }
};
</script>