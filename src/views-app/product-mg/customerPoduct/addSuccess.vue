<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <p class="tip">您申请的支付功能已受理，预计会在1-3个工作日以短信方式发到您18888888888通知您是否开通成功</p>
    <mt-button class="btn" size="large" type="primary" @click="back">完成</mt-button>
  </full-page>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    back() {
      this.$router.go(-4);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.tip {
  text-align: center;
  padding: 300*$rem 100*$rem;
  background: #fff;
}
.btn {
  margin: 30*$rem auto;
  width: 95%;
}
</style>
