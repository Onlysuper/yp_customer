<template>
  <div class="welcome-page1">11111
    <main-menu></main-menu>
  </div>
</template>
<script>
import MainMenu from "@src/components/MainMenu";
export default {
  name: "app",
  components: {
    MainMenu
  },
  data() {
    return {
      menuList: "", // 菜单数据
      isrouter: true, // 开启路由
      isCollapse: false // 菜单收起
    };
  },
  mounted() {
    console.log(121212);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.el-main {
  position: relative;
}
.welcome-page1 {
  background: #fff;
  .welcome {
    h2 {
      font-size: 32px;
      font-weight: 400;
      color: #ff5959;
      background-image: -webkit-gradient(
        linear,
        0 0,
        120 120,
        from(rgba(255, 90, 90, 1)),
        to(rgba(255, 89, 80, 0.5))
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    }
    p {
      font-size: 18px;
      white-space: nowrap;
    }
  }
  .main {
    width: 100%;
    bottom: 0px;
    // overflow: hidden;
    left: 0;
    position: absolute;
    text-align: center;
    .slogen-text {
      font-size: 42px;
      font-weight: 900;
      margin-bottom: 20px;
      color: #ff5959;
      letter-spacing: 8px;
      text-shadow: 0px 0px 8px rgba(105, 105, 105, 0.5);
      white-space: nowrap;
    }
    .slogen-img {
      // margin-bottom: -10px;
      width: 100%;
      height: 380px;
      overflow: hidden;
    }
  }
}
</style>
