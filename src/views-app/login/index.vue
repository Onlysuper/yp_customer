<template>
  <div class="login-page">
    <div class="login-main">
      <div class="content-box">
        <header class="header">
          <div class="logo-box">
            <img src="../../assets/images/Logopc.png" alt="">
          </div>
          <div class="slogen-box">
            <img src="../../assets/images/Slogen.png" alt="">
          </div>
        </header>
        <!-- 表单 -->
        <div class="form">
          <input type="text" v-model="ruleForm.username" placeholder="请输入易票帐号/手机号">
          <input type="password" v-model="ruleForm.password" placeholder="请输入密码">
          <!-- 按钮 -->
          <mt-button class="spacing-80 login-button" type="danger" @click="submitForm" size="large">登录</mt-button>
        </div>
      </div>
    </div>
    <p class="login-footer"> © 2016-2017 yeepiao.com 版权所有</p>
  </div>
</template>

<script>
import { Login } from "@src/apis";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    submitForm() {
      Login()({
        username: this.ruleForm.username,
        password: this.ruleForm.password
      }).then(data => {
        if (data.code === "98") {
          this.$message("登录失败");
        }
        if (data.code === "00") {
          // 登录成功
          localStorage.setItem("isLogin", "100");
          location.reload();
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "../../assets/scss/base.scss";
$default-color: #333; // 字体颜色

.login-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/LoginBack.png) no-repeat center;
  background-size: cover;
  color: $default-color;
  display: flex;
  flex: 1;
  box-sizing: border-box;
  flex-direction: column;
  .login-button {
    width: 100%;
    margin-top: 15px;
    height: 40px;
    font-size: 18px;
    border-radius: 20px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    background: #e60012;
    color: #fff;
    margin-top: 4rem;
  }
  .login-main {
    padding: 0px;
    position: relative;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    padding: 20*$rem;
  }
  .header {
    margin-top: 220*$rem;
  }
  .logo-box {
    text-align: center;
    img {
      height: 180*$rem;
      width: 180*$rem;
    }
  }
  .slogen-box {
    text-align: center;
    img {
      width: 320*$rem;
    }
  }

  .form {
    width: 90%;
    margin: 120*$rem auto;
    input {
      line-height: 100*$rem;
      border-bottom: 1px solid #000;
      width: 100%;
      color: $default-color;
      padding: 0;
      font-size: 40*$rem;
      &:focus,
      &:hover {
        background: none;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        font-size: 40*$rem;
        color: $default-color;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 40*$rem;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 40*$rem;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 40*$rem;
      }
    }
  }

  .login-footer {
    text-align: center;
    line-height: 100*$rem;
  }
}
</style>
