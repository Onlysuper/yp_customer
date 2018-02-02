<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="商户编号" :readonly="true" :disabled="true" :disableClear="true" placeholder="请输入" v-model="customer.customerNo"></mt-field>
        <mt-field type="text" label="商户名称" :readonly="true" :disabled="true" :disableClear="true" placeholder="请输入" v-model="customer.bussinessName"></mt-field>
        <mt-field type="text" label="现有合伙人" :readonly="true" :disabled="true" :disableClear="true" placeholder="请输入" v-model="customer.agentNo"></mt-field>
        <mt-field type="text" label="接受合伙人" :readonly="false" :disabled="false" :disableClear="false" placeholder="请输入接受合伙人" v-model="customer.receiveAgentNo"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      btnDisabled: false,
      customerNo: this.$route.query["customerNo"],
      customer: {}
    };
  },
  created() {
    this.getCustomer(this.customerNo).then(customer => {
      this.customer = { ...customer };
      console.log(this.customer.customerNo);
    });
  },
  methods: {
    ...mapActions(["getCustomer", "transferCustomer"]),
    save() {
      if (!this.validator.isEmpty(this.customer.receiveAgentNo)) {
        this.MessageBox.alert("合伙人编号不能为空！");
        return;
      }

      this.btnDisabled = true;

      this.transferCustomer(this.customer).then(flag => {
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
