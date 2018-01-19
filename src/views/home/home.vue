<template>
  <div class="welcome-page">
    <div class="welcome">
      <h2>欢迎使用易票运营系统</h2>
      <ul>
        <li>数据实时统计</li>
        <li>功能更加全面</li>
        <li>操作更加便捷</li>
      </ul>
    </div>
    <div class="img-box">
      <img :src="require('@src/assets/images/homeSlogen.png')" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: "pc",
  data() {
    return {
      menuList: "", // 菜单数据
      isrouter: true, // 开启路由
      isCollapse: false // 菜单收起
    };
  },
  mounted() {},
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
<style lang='scss' scoped>
.welcome-page {
  padding: 40px;
  position: relative;
  width: 100%;
  .welcome {
    h2 {
      color: #00c1df;
      font-size: 32px;
      font-weight: normal;
      padding: 20px 0;
    }
    ul {
      li {
        list-style: none;
        line-height: 30px;
        color: #333333;
        &::before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 10px;
          border-radius: 100%;
          background: #00c1df;
        }
      }
    }
  }
  .img-box {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40%;
    img {
      width: 100%;
    }
  }
}
</style>
