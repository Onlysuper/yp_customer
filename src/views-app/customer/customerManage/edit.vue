<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- :disabled="true" :disableClear="true" :readonly="true" -->
        <mt-field v-if="pageType=='EDIT'?true:false" :disabled="true" :disableClear="true" :readonly="true" type="text" label="商户编号" placeholder="请输入商户编号" v-model="customer.customerNo"></mt-field>
        <mt-field :disabled="disabledIs" :disableClear="disabledIs" :readonly="disabledIs" type="text" label="企业名称" placeholder="请输入企业名称" v-model="customer.enterpriseName"></mt-field>
        <mt-field :disabled="disabledIs" :disableClear="disabledIs" :readonly="disabledIs" type="text" label="企业税号" placeholder="请输入企业税号" v-model="customer.taxNo"></mt-field>
        <mt-field :disabled="disabledIs" :disableClear="disabledIs" :readonly="disabledIs" type="text" label="联系人" placeholder="请输入联系人" v-model="customer.linkMan"></mt-field>
        <mt-field type="text" label="手机号" placeholder="请输入手机号" v-model="customer.phoneNo"></mt-field>
        <mt-field type="text" label="企业法人" placeholder="请输入企业法人" v-model="customer.legalPerson"></mt-field>
        <mt-field type="text" label="身份证" placeholder="请输入身份证" v-model="customer.idCard"></mt-field>
        <mt-field type="text" label="经营地址" placeholder="请输经营地址" v-model="customer.bussinessAddress"></mt-field>
        <mt-field type="text" label="公司电话" placeholder="请输入公司电话" v-model="customer.bussinessPhone"></mt-field>
        <mt-field type="text" label="经营名称" placeholder="请输入经营名称" v-model="customer.bussinessName"></mt-field>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    var user = this.$store.state.userInfoAndMenu.userMessage.all;
    return {
      disabledIs: this.$route.query["type"] == 'EDIT' ? this.$store.state.userInfoAndMenu.isOperate ? false : true : false,
      btnDisabled: false,
      pageType: this.$route.query["type"] || "ADD",
      customerNo: this.$route.params["customerNo"],
      customer: {},
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getCustomer(this.customerNo).then(customer => {
        this.customer = { ...customer };
        // this.echoForm(this.customer);
      });
  },
  methods: {
    ...mapActions(["getCustomer", "updataCustomer", "addCustomer"]),
    save() {
      if (!this.validator.isEmpty(this.customer.enterpriseName)) {
        this.MessageBox.alert("企业名称不能为空！");
        return;
      }
      if (!this.validator.isTax(this.customer.taxNo)) {
        this.MessageBox.alert("请输入正确税号！");
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
      // if (!this.validator.isEmpty(this.customer.legalPerson)) {
      //   this.MessageBox.alert("企业法人不能为空！");
      //   return;
      // }
      if (!this.validator.isCardNoNull(this.customer.idCard)) {
        this.MessageBox.alert("身份证号有误！");
        return;
      }


      this.btnDisabled = true;
      this.pageType == "EDIT"
        ? this.updataCustomer(this.customer).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        })
        : this.addCustomer(this.customer).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$store.commit("CUSTOMER_MANAGE_IS_SEARCH", true);
            this.$router.back();
          }
        });
    }
  }
};
</script>

<style>

</style>
