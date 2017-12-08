<template>
  <el-container class="login-page">
    <el-main class="main-reset">
      <div class="content-box">
        <header class="header">
          <div class="logo-box">
              <img src="../../assets/images/Logopc.png" alt="">
          </div>
          <div class="slogen-box">
              <img src="../../assets/images/Slogen.png" alt="">
          </div>
        </header>
        <!-- form start -->
        <div class="login-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-position="top" label-width="100px" class="demo-ruleForm form-r">
            <el-form-item prop="username">
              <el-input class="input-reset" v-model="ruleForm.username" prefix-icon placeholder="请输入易票账号/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input class="input-reset" v-model="ruleForm.password" placeholder="请输入密码" type="password" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" size="medium" type="danger" class="login-button">登录</el-button>
            </el-form-item>
          </el-form>  
        </div>
        <!-- form end -->
      </div>
    </el-main>
    <el-footer class="login-footer">
      <p> © 2016-2017 yeepiao.com 版权所有</p>
    </el-footer>
  </el-container>
</template>

<script>
import {Login} from "@src/apis"
export default {
    name: 'Login',
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入易票账号/手机号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
     submitForm(formName) {
        var self = this;  
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = this.ruleForm;
            Login()({username: data.username,password: data.password}).then(function(data){
              if(data.code==='98'){
                    self.$message('登录失败');
              }
              if(data.code==='00'){
                  // 登录成功
                  location.href = '/#/admin/home'
              }
            })
          } else {
            self.$message.error('登录出错');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import url('../../assets/less/base.less');
@default-color:#333; // 字体颜色
@center-width:280px; // 表单宽度
.login-page{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: url(../../assets/images/LoginBack.png) no-repeat center;
  background-size: cover;
  color: @default-color;
  .header{
    margin-top: 120px;
  }
  .logo-box{
      text-align: center;
      img{
          height: 80px;
          width: 80px;
      }
    }
    .slogen-box{
      text-align: center;
      img{
        width: 220px;
      }
    }
  .form-r{
      width: @center-width;
      margin: 0 auto;
  }
  .login-footer{
      text-align: center;
      p{
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 20px;
      }
    }
  .login-button{
      width: 100%;
      margin-top: 15px;
      height: 40px;
      font-size: 18px;
      border-radius:20px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
      background: #e60012;
  }
  .main-reset{
    padding: 0;
  }
  .login-form{
     margin-top: 60px;
      form{
        .el-form-item{
          margin-top: 0px;
        }
      }
  }
  .login-intro{
      text-align: center;
      padding: 10px 0;
  }
  .input-reset{
    border-bottom:1px solid @default-color;
    input{
      background: transparent;
      outline: none;
      border: 0px;
      color: @default-color;
      padding: 0;
      font-size: 18px;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      &:focus,&:hover{
        background: none;
      }
      &::-webkit-input-placeholder { /* WebKit browsers */ 
        font-size:18px;
        color:@default-color
      } 
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
      font-size:18px;
      } 
      &::-moz-placeholder { /* Mozilla Firefox 19+ */ 
      font-size:18px;
      } 
      &:-ms-input-placeholder { /* Internet Explorer 10+ */ 
      font-size:18px;
      }
    }
  }
}
// 移动端样式
@media screen and (max-width: 1024px) {
  .login-page{
    .content-box{
      display:flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
    }
    .header{
      width: 100%;
      margin-top: 0px;
      text-align: center;
    }
    .login-form{
      align-items:center;
      margin-top: 112px;
      .form-r{
        max-width: auto;
      }
    }
    .login-footer{
      p{
        margin-bottom: 30px;
      }
    }
    .slogen-box{
      text-align: center;
      img{
        width: 190px;
      }
    }
  }
}
</style>
