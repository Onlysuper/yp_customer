<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="PasswordUpdate">保存</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-field label="旧密码:" type="password" v-model="form.oldPassword" placeholder="请输入帐号" :attr="{maxlength:50}"></mt-field>
      <mt-field label="新密码:" type="password" v-model="form.password" placeholder="请输入帐号" :attr="{maxlength:50}"></mt-field>
      <mt-field label="确认密码:" type="password" v-model="form.repassword" placeholder="请输入帐号" :attr="{maxlength:50}"></mt-field>
    </input-wrapper>
  </full-page>
</template>

<script>
import { PasswordUpdate } from "@src/apis";
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    PasswordUpdate() {
      PasswordUpdate()({ ...this.form }).then(data => {
        if (data.code == "00") {
          this.Toast("成功");
        } else {
          this.Toast(data.msg);
        }
      });
    }
  }
};
</script>

<style>

</style>
