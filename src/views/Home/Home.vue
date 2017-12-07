<template>
  <div class="welcome-page">
    <div class="welcome">
      <h2>WELCOME >></h2>
      <p>欢迎使用易票运营系统v1.0</p>
    </div>
    <div class="main">
      <p class="slogen-text">让用户更轻松</p>
      <div class="slogen-img">
        <img src="../../assets/images/Home2.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'pc',
    data () {
      return {
        menuList: '', // 菜单数据
        isrouter: true,// 开启路由
        isCollapse: false// 菜单收起
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init: function(){
        this.menufn();
      },
      menufn: function(){
        var self = this;
        this.$http.get('http://192.168.100.248:8080/mock/menu.json')
          .then(function (response) {
              self.menuList = response.data.data.menuList
              // console.log(response.data.data.menuList);
          })
          .catch(function (error) {
              // console.log(error);
          });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.el-main{
  position: relative
}
.welcome-page{
  background: #fff;
  .welcome{
    h2{
    font-size: 32px;
    font-weight: 400;
    color: #ff5959;
     background-image: -webkit-gradient(linear, 0 0, 120 120, from(rgba(255, 90, 90, 1)), to(rgba(255, 89, 80, 0.5)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }
    p{
      font-size:18px;
    }
  }
  .main{
    width: 100%;
    bottom: 0px;
    // overflow: hidden;
    left: 0;
    position: absolute;
    text-align: center;
    .slogen-text{
      font-size: 42px;
      font-weight: 900;
      margin-bottom: 20px;
      color: #ff5959;
      letter-spacing: 8px;
      text-shadow:  0px 0px 8px rgba(105,105,105,0.5);
    }
    .slogen-img{
      // margin-bottom: -10px;
      width: 100%;
      height: 380px;
      overflow: hidden;
    }
  }
}
</style>
