<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-field type="text" label="采购单号" v-model="receiptCode.receiptNo" :disabled="true" placeholder=""></mt-field>
      <mt-field type="tel" label="申请数量" v-model="receiptCode.qrcodeCount" placeholder="请填写数量"></mt-field>
    </input-wrapper>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      btnDisabled: false,
      receiptCode: {},
      receiptNo: this.$route.params["receiptNo"]
    };
  },
  created() {
    this.getEmpowerCodeInfo(this.receiptNo).then(receiptCode => {
      this.receiptCode = { ...this.receiptCode, ...receiptCode };
    });
  },
  methods: {
    ...mapActions(["getEmpowerCodeInfo", "editEmpowerCodeInfo"]),

    //提交表单
    save() {
      this.receiptCode.qrcodeCount = Number(this.receiptCode.qrcodeCount);
      if (
        !(
          this.validator.isEmpty(this.receiptCode.qrcodeCount) &&
          this.receiptCode.qrcodeCount > 0
        )
      ) {
        this.MessageBox.alert("请填写数量");
        return;
      }

      this.btnDisabled = true;
      this.editEmpowerCodeInfo(this.receiptCode).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$router.back();
        }
      });
    }
  }
};
</script>

<style>

</style>
