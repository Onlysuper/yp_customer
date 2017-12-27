<template>
  <full-page-popup v-model="visible" position="bottom">
    <mt-header slot="header" title="转移商户">
      <mt-button slot="left" :disabled="false" type="danger" @click="close">关闭</mt-button>
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
  </full-page-popup>
</template>

<script>
import { transferCustomer } from "@src/apis";
export default {
  data() {
    return {
      visible: false,
      btnDisabled: false,
      customer: {}
    };
  },
  created() {},
  methods: {
    close() {
      this.customer = {};
      this.visible = false;
    },
    open(customer) {
      this.customer = Object.assign({}, customer);
      this.visible = true;
    },
    save() {
      if (!this.validator.isEmpty(this.customer.receiveAgentNo)) {
        this.MessageBox.alert("合伙人编号不能为空！");
        return;
      }

      this.btnDisabled = true;

      transferCustomer()(this.customer).then(data => {
        this.btnDisabled = false;
        if (data.code == "00") {
          this.Toast("转移成功");
          this.close();
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
