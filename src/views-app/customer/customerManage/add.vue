<template>
  <full-page-popup v-model="visible" position="bottom">
    <mt-header slot="header" :title="pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="close">关闭</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="企业名称" placeholder="请输入企业名称" v-model="customer.enterpriseName"></mt-field>
        <mt-field type="text" label="企业税号" placeholder="请输入企业税号" v-model="customer.taxNo"></mt-field>
        <mt-field type="text" label="企业法人" placeholder="请输入企业法人" v-model="customer.legalPerson"></mt-field>
        <mt-field type="text" label="身份证" placeholder="请输入身份证" v-model="customer.idCard"></mt-field>
        <mt-field type="text" label="联系人" placeholder="请输入联系人" v-model="customer.linkMan"></mt-field>
        <mt-field type="text" label="手机号" placeholder="请输入手机号" v-model="customer.phoneNo"></mt-field>
        <mt-field type="text" label="经营地址" placeholder="请输经营地址" v-model="customer.bussinessAddress"></mt-field>
        <mt-field type="text" label="公司电话" placeholder="请输入公司电话" v-model="customer.bussinessPhone"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page-popup>
</template>

<script>
import { postAddCustomer, postEditCustomer } from "@src/apis";
export default {
  data() {
    return {
      visible: false,
      btnDisabled: false,
      pageType: "ADD",
      customer: {},
      pageTitle: {
        ADD: "添加商户",
        EDIT: "修改商户"
      }
    };
  },
  created() {},
  methods: {
    close() {
      this.customer = {};
      this.visible = false;
    },
    open(customer, type) {
      this.pageType = type;
      if (this.pageType == "EDIT") this.customer = Object.assign({}, customer);
      this.visible = true;
    },
    save() {
      if (!this.validator.isEmpty(this.customer.enterpriseName)) {
        this.MessageBox.alert("企业名称不能为空！");
        return;
      }
      if (!this.validator.isTax(this.customer.taxNo)) {
        this.MessageBox.alert("企业税号有误！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.legalPerson)) {
        this.MessageBox.alert("企业法人不能为空！");
        return;
      }
      if (!this.validator.isCardNo(this.customer.idCard)) {
        this.MessageBox.alert("身份证号有误！");
        return;
      }
      if (!this.validator.isEmpty(this.customer.linkMan)) {
        this.MessageBox.alert("联系人不能为空！");
        return;
      }
      if (!this.validator.isMobile(this.customer.phoneNo)) {
        this.MessageBox.alert("手机号有误！");
        return;
      }

      this.btnDisabled = true;

      this.pageType == "EDIT"
        ? postEditCustomer()(this.customer).then(data => {
            this.btnDisabled = false;
            if (data.code == "00") {
              this.Toast("修改成功");
              this.$parent.updata(this.customer);
              this.close();
            } else {
              this.Toast(data.msg);
            }
          })
        : postAddCustomer()(this.customer).then(data => {
            this.btnDisabled = false;
            if (data.code == "00") {
              this.Toast("添加成功");
              this.$parent.$refs.MypLoadmoreApi.load();
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
