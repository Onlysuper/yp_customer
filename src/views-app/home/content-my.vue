<template>
  <div>
    <div class="header">
      <div class="user-img"></div>
      <div class="user-name">{{$store.state.userInfoAndMenu.userMessage.realname}}</div>
    </div>
    <mt-cell class="border-bottom-1px _av" title="个人信息" is-link @click.native="$router.push({path:'./userInfo'})">
      <i slot="icon" class="iconfont icon-geren11"></i>
      <!-- <i slot="icon" class="icon mintui-info2"></i> -->
    </mt-cell>
    <!-- is-link to="" -->
    <mt-cell class="border-bottom-1px _av" title="密码修改" is-link @click.native="$router.push({path:'./repass'})">
      <i slot="icon" class="iconfont icon-Password"></i>
      <!-- <i slot="icon" class="icon mintui-policy"></i> -->
    </mt-cell>
    <mt-cell class="_av" title="退出" @click.native="logout">
      <i slot="icon" class="iconfont icon-tuichu"></i>
      <!-- <i slot="icon" class="icon mintui-policy"></i> -->
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
    },
    toast() {
      this.Toast("敬请期待");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.header {
  height: 400*$rem;
  background-image: url("../../assets/images/mine-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
.user-img {
  width: 150*$rem;
  height: 150*$rem;
  border-radius: 50%;
  background-image: url("../../assets/images/user-logo.gif");
  background-size: 80%;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 80*$rem auto 0;
  background-color: #fff;
  border: 3px solid #26a2ff;
}
.user-name {
  color: #fff;
  text-align: center;
  font-size: 35*$rem;
  margin-top: 20*$rem;
}
.iconfont {
  position: relative;
  width: 50*$rem;
  display: inline-block;
  &::before {
    // position: absolute;
    left: 0;
  }
  padding-right: 10*$rem;
  font-size: 36*$rem;
}
</style>
