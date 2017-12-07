<template>
<el-container  class="home-page">
  <div class="aside-box">
    <!-- Menulist start -->
      <div class="menu-box">
        <div class="logo-box">
          <div class="img-box">
            <img src="../../assets/images/logo.png" alt="">
          </div>
          <h1 v-show="!isCollapse" class="home-title">易票运营系统v1.0</h1>
        </div>
        <el-menu text-color="#fff" :router="isrouter" default-active="1-1"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu v-for = "(item, index) in menuList" :index="index+'item1'" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.menuName}}</span>
            </template>
              <el-menu-item v-for = "(item2, index2) in item.child" :key="index2" :index="'/admin/'+item2.menuCode">
              {{item2.menuName}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!-- Menulist end -->
  </div>

  <el-container>
      <el-header>
        <div class="head-l">
          
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        </div>
        <div class="head-r">
          <el-badge :value="200" :max="99" class="item">
            <el-button size="small">信息</el-button>
          </el-badge>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="userimg"></i>{{realname}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogFormVisible = true">密码修改</el-dropdown-item>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- Content-data start -->
        <router-view></router-view>
        <!-- Content-data end -->
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="resetPwform" ref="resetPwform" :rules="passwordRules">
        <el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPwform.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPwform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPwform.repassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('resetPwform')">取 消</el-button>
        <el-button type="primary" @click="submitForm('resetPwform')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</el-container>
</template>
<script>
import {MenuGet,PasswordUpdate} from "@src/apis"
export default {
    name: 'pc',
    data () {
      var oldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        }else{
          callback();
        }
      };
      var newPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }else if(value.length<6||value.length>12){
          callback(new Error('密码长度必须6到12位!'));
        } else if (value === this.resetPwform.oldPassword) {
          callback(new Error('新密码与旧密码不允许相同!'));
        } else {
          callback();
        }
      };
      var confirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认新密码'));
        }else if (value !== this.resetPwform.password) {
          callback(new Error('输入的新密码请保持一致!'));
        } else {
          callback();
        }
      };
      //密码修改表单内容
      return {
        menuList: '',  // 菜单数据
        realname:'', // 管理员信息
        resetPasswordStatus:'',// 
        username:'',
        bussinessNo:'',
        isrouter: true,// 开启路由
        isCollapse: false, // 菜单收起

        dialogFormVisible: false,// 密码修改窗口显示
        formLabelWidth: "100px", //密码修改窗口大小
        resetPwform: {
          oldPassword: '',   // 旧密码
          password: '',   //新密码
          repassword: '' //确认密码
        },
        passwordRules: {
          oldPassword: [
            { validator: oldPass, trigger: 'blur' }
          ],
          password: [
            { validator: newPass, trigger: 'blur' }
          ],
          repassword: [
            { validator: confirmPass, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.dataInit(); // 初始化数据
    },
    methods: {
      // 初始化数据
      dataInit: function(){
        var self = this;
        MenuGet()({}).then(function(data){ 
          if(data.code==="00"){
            // 管理员信息
            self.realname = data.data.realname
            // 菜单
            self.menuList = data.data.menuList 
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(resetPwform);
            // PasswordUpdate()(resetPwform).then(function(data){
            //   // 修改密码回调
            //   console.log(data);
            // })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
*{
  margin: 0;
  padding: 0;
}

.home-page{
  height: 100vh;
  .logo-box{
    height: 58px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding:0 16px;
    background: #002240;
    color: #fff;
    box-shadow: 2px 3px 8px rgba(105,105,105,0.8);
    .img-box{
      display: inline-block;
      img{
        height: 30px;
      }
    }
    .home-title{
      display: inline-block;
      padding-left: 20px;
      padding-left: 17px;
    }
  }
  .el-header {
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(105,105,105,0.3);
    color: #333;
    line-height: 60px;
    overflow: hidden;
  }
  .aside-box {
    background: #001529;
    position: relative;
  }
  .home-title{
    font-size: 16px;
    font-weight: normal
  }
  .el-submenu__title{
    min-width: 200px;
  }
  .head-l{
    float: left;
  }
  .head-r{
    float: right;
  } 
  .userimg{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../assets/images/logo.png') center no-repeat;
    background-size: cover;
    border-radius: 100%;
    position: absolute;
    left: -40px;
    top: 15px;
  }
  /*重置样式*/
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-menu{
    border-right: 0;
    background: #001529 !important;
  }
  .el-submenu__title:hover{
    background: transparent !important;
  }
  .el-menu--collapse .el-submenu:hover{
    background: #000c17 !important;
  }
  .el-submenu .el-menu-item:hover{
    background: #000c17 !important;
  }
  .el-menu-item.is-active{
    background: #000c17 !important;
  }
  .head-r{
    .el-badge{
      line-height: 0;
      margin-right: 80px;
    }
  }
  
}
</style>
