
<template>
  <!-- layout顶部 公司名与用户信息操作区域-->
  <el-header class="my-header">
    <div @click="isCollapsefn" class="head-l">
      <span :class="[isCollapseicon?'isCollapseicon':'','icon-recycling','collapse-button']"></span>
    </div>
    <div class="tagbox">
      <tags-view></tags-view>
    </div>
    <div class="head-r">
      <div class="hover-back">
        <el-badge :value="200" :max="99" class="item">
          <span class="icon-news"></span>
        </el-badge>
      </div>
      <div class="hover-back">
        <el-dropdown trigger="click" :show-timeout="0" :hide-timeout="0">
          <span class="el-dropdown-link">
            <div class="user-img">
              <img :src="require('@src/assets/images/logo.png')" alt="">
              <span></span>
            </div>
            <div class="user-text">
              <i class="userimg"></i>{{userMsg.realname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogFormVisiblefn">密码修改</el-dropdown-item>
            <el-dropdown-item @click.native="dialogUserVisiblefn">个人信息</el-dropdown-item>
            <el-dropdown-item :show-timeout="100" divided @click.native="escloginfn">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 管理员信息弹出框 -->
    <el-dialog title="管理员信息" :visible.sync="dialogUserVisible" :modal="ifmodal" :close-on-click-modal="ifmodalclose" :modal-append-to-body="ifappendbody" :append-to-body="ifappendbody" width="200px">
      <el-row :gutter="20">
        <el-col :span="12">
          名称:
        </el-col>
        <el-col :span="12">
          {{userMsg.realname}}
        </el-col>
        <el-col :span="12">
          登录账号:
        </el-col>
        <el-col :span="12">
          {{userMsg.username}}
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改管理员密码 start -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal="ifmodal" :close-on-click-modal="ifmodalclose" :modal-append-to-body="ifappendbody" :append-to-body="ifappendbody">
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
        <el-button @click="resetFormfn('resetPwform')">取 消</el-button>
        <el-button type="primary" @click="submitFormfn('resetPwform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改管理员密码 end -->
  </el-header>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
/*重置样式*/
.my-transition(@attr) {
  transition: @attr 0.8s;
  -moz-transition: @attr 0.8s;
  -webkit-transition: @attr 0.8s;
  -o-transition: @attr 0.8s;
}
.my-header {
  z-index: 10;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(105, 105, 105, 0.2);
  color: #333;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px !important;
  box-sizing: border-box;
  flex-shrink: 0;
  height: 54px !important;
  .hover-back {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 0 5px;
    min-width: 50px;
    .el-dropdown {
      height: 100%;
      display: flex;
      .el-dropdown-link {
        outline: none;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .user-img {
          flex: 1;
          flex-shrink: 0;
        }
        .user-text {
          flex: 1;
          flex-shrink: 0;
          white-space: nowrap;
        }
      }
    }

    &:hover {
      outline: none;
      .my-transition(background);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
  }
  .hover-box {
    flex-direction: row;
  }
  .head-l {
    width: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    vertical-align: middle;
    .isCollapseicon {
      transform: rotate(180deg); /* Safari 和 Chrome */
    }
    &:hover {
      .my-transition(background);
      background: rgba(0, 193, 223, 0.2);
      cursor: pointer;
    }
    .collapse-button {
      font-size: 25px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .tagbox {
    display: flex;
    height: 100%;
    width: 100%;
  }
  .head-r {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding-right: 20px;
    .icon-news {
      font-size: 18px;
    }
    .el-badge {
      line-height: 0;
      margin-right: 30px;
    }
    .user-img {
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
      outline: none;
      &:focus,
      &:hover {
        outline: none;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        outline: none;
        &:focus,
        &:hover {
          outline: none;
        }
      }
    }
    .user-text {
      display: inline-block;
      vertical-align: middle;
    }

    // float: right;
  }
}
@media screen and (max-width: 500px) {
  .el-header {
    display: none;
  }
}
</style>

<script>
import { PasswordUpdate, Logout } from "@src/apis";
import TagsView from "@src/components/TagsView";
export default {
  name: "navbar",
  components: {
    TagsView
  },
  data() {
    var oldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var newPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度必须6到12位!"));
      } else if (value === this.resetPwform.oldPassword) {
        callback(new Error("新密码与旧密码不允许相同!"));
      } else {
        callback();
      }
    };
    var confirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (value !== this.resetPwform.password) {
        callback(new Error("输入的新密码请保持一致!"));
      } else {
        callback();
      }
    };
    return {
      realname: "",
      dialogUserVisible: false, //管理员信息弹出框
      dialogFormVisible: false, // 密码修改窗口显示
      ifmodalclose: false, // 点击modal是否关闭
      ifmodal: true, //弹出框是否需要遮罩
      ifappendbody: true,
      formLabelWidth: "100px", //密码修改窗口大小
      resetPwform: {
        oldPassword: "", // 旧密码
        password: "", //新密码
        repassword: "" //确认密码
      },
      passwordRules: {
        oldPassword: [{ validator: oldPass, trigger: "blur" }],
        password: [{ validator: newPass, trigger: "blur" }],
        repassword: [{ validator: confirmPass, trigger: "blur" }]
      }
    };
  },
  computed: {
    userMsg() {
      return this.$store.state.moduleLayour.userMessage;
    },
    isCollapseicon() {
      //菜单是否收起
      return this.$store.state.moduleLayour.isCollapse;
    }
  },
  methods: {
    escloginfn() {
      Logout()().then(data => {
        // 删除面包屑
        this.$store
          .dispatch("delOthersViews", {
            name: "home",
            path: "/home",
            title: "首页"
          })
          .then(res => {});
        // 清空用户信息
        localStorage.setItem("isLogin", "0");
        window.location.reload();
      });
    },
    isCollapsefn() {
      this.$store.commit("SidebarHandle");
    },
    dialogUserVisiblefn() {
      // 管理员信息弹出框
      this.dialogUserVisible = true;
    },
    dialogFormVisiblefn() {
      // 修改密码弹出框
      this.dialogFormVisible = true;
    },
    submitFormfn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var resetpass = this.resetPwform;
          PasswordUpdate()(resetpass).then(data => {
            // 修改密码回调
            if (data.code === "00") {
              this.$message({
                showClose: true,
                message: "密码修改成功",
                type: "success"
              });
            } else if (data.resultCode == "-404") {
              this.$message({
                showClose: true,
                message: data.resultMsg,
                type: "warning"
              });
            } else {
              console.log(data);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetFormfn(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    }
  }
};
</script>