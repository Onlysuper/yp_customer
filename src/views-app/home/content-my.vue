<template>
  <div>
    <mt-cell class="border-bottom-1px _av" title="个人信息">
      <i slot="icon" class="icon mintui-info2"></i>
    </mt-cell>
    <!-- is-link to="" -->
    <mt-cell class="border-bottom-1px _av" title="密码修改">
      <i slot="icon" class="icon mintui-policy"></i>
    </mt-cell>
    <mt-cell class="_av" title="退出" @click.native="logout">
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
