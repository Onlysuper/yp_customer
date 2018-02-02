<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <div class="add-playinfo">

      <view-radius>
        <input-wrapper>
          <!-- <template v-if="store.sendMode.customerType == 'SMART_POS'">
          <mt-field label="借记卡:" v-model="store.sendData.debitTransCostRate" type="text" :readonly="false" placeholder="">%</mt-field>
          <mt-field label="借记卡封顶值:" v-model="store.sendData.debitTransCostCapped" type="text" :readonly="false" placeholder="">元</mt-field>
          <mt-field label="贷记卡费率:" v-model="store.sendData.creditTransCostRate" type="text" :readonly="false" placeholder="">%</mt-field>
        </template> -->
          <mt-field label="微信费率:" type="text" :readonly="false" placeholder="">%</mt-field>
          <mt-field label="支付宝费率:" type="text" :readonly="false" placeholder="">%</mt-field>
          <mt-cell :title="'开通即刷即到'">
            <mt-switch v-model="switchValue"></mt-switch>
          </mt-cell>
          <mt-field v-if="switchValue" label="D0手续费:" type="text" :readonly="false" placeholder="">元</mt-field>
        </input-wrapper>
      </view-radius>

    </div>
    <mt-button class="btn" size="large" type="primary" @click="submit">下一步</mt-button>
  </full-page>
</template>

<script>
export default {
  data() {
    return {
      switchValue: true
    };
  },
  methods: {
    //提交
    submit() {
      this.$router.push({ path: "./addUpload" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.add-playinfo {
  padding: 20*$rem;
  box-sizing: border-box;
}
.btn {
  margin: 30*$rem auto;
  width: 95%;
}
</style>
