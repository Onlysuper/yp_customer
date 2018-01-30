<template>
  <div>
    <mt-cell class="border-bottom-1px _av" title="个人信息" is-link to="">
      <i slot="icon" class="icon mintui-info2"></i>
    </mt-cell>
    <mt-cell class="border-bottom-1px _av" title="密码修改" is-link to="">
      <i slot="icon" class="icon mintui-policy"></i>
    </mt-cell>
    <mt-cell title="退出" @click.native="logout">
      <i slot="icon" class="icon mintui-policy"></i>
    </mt-cell>
  </div>
</template>

<script>
import { Logout } from "@src/apis";
export default {
  methods: {
    logout() {
      Logout()({}).then(data => {
        localStorage.setItem("isLogin", "0");
        window.location.reload();
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
