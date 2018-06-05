<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <div class="add-success page">
      <span class="icon-wait">
        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
      </span>
      <p class="tip">您申请的支付功能已受理，预计会在1-3个工作日以短信方式发到您<span style="color:red;font-weight: 400;">{{phoneNo}}</span>通知您是否开通成功</p>
      <mt-button class="btn" size="large" type="primary" @click="back">完成</mt-button>
    </div>
  </full-page>
</template>

<script>
export default {
  data() {
    return {
      phoneNo: this.$route.query["phoneNo"]
    };
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

.add-success {
  background: #fff;
  text-align: center;
  padding: 200 * $rem 100 * $rem;
  box-sizing: border-box;
}

.tip {
  text-align: center;
  box-sizing: border-box;
  margin: 80 * $rem 0;
  font-size: 32 * $rem;
  line-height: 50 * $rem;
}
.btn {
  width: 88%;
  margin: 0 auto;
}

.icon-wait {
  font-size: 300 * $rem;
}
</style>
