<template>
  <div class="reset-box">
    <el-container class="login-page">
      <el-header height='auto'>
        <div class="logo-box">
            <img src="../../assets/images/logo.png" alt="">
        </div>
        <hr>
        <div class="login-intro">
          <p>易票运营系统</p>
        </div>
      </el-header>
      <el-main class="main-reset">
        <!-- form start -->
        <div class="login-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-position="top" label-width="100px" class="demo-ruleForm form-r">
            <el-form-item label="账户" prop="username">
              <el-input v-model="ruleForm.username" prefix-icon placeholder="请输入易票账号/手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('ruleForm')" size="medium" type="danger" class="login-button">登录</el-button>
              <!-- <el-button>重置</el-button> -->
            </el-form-item>
          </el-form>  
        </div>
        <!-- form end -->
      </el-main>
      <el-footer class="login-footer">
        <hr>
        <p> © 2016-2017 yeepiao.com 版权所有</p>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
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
            var serialize_ = "username="+data.username+"&password="+data.password
            this.$http.post('http://192.168.100.202:8090/tm/login', serialize_)
            .then(function (response) {
                var code = response.data.code;
                var msg = response.data.msg;
                if(code==='98'){
                   self.$message('登录失败');
                }
                if(code==='00'){
                    // 登录成功
                    var url_= response.data.data;// 后台获取的路由
                    location.href = '/#/home'
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
          } else {
            self.$message.error('');
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
.logo-box{
    text-align: center;
    padding: 10px 0;
    img{
        height: 60px;
    }
}
.login-page{
    height: 100vh;
    .form-r{
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
    }
}
.login-footer{
    text-align: center;
    p{
        font-size: 14px;
    }
}
.login-button{
    width: 100%;
    margin-top: 20px;
}
.login-form{
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
}
.login-intro{
    text-align: center;
    padding: 10px 0;
}
hr{
    display: block;
    padding: 0;
    border: 0;
    height: 0;
    border-top: 1px solid #eee;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}
</style>
