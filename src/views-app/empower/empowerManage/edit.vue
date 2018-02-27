<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="序列号" placeholder="请输入序列号" v-model="empowerList.qrcode"></mt-field>
        <mt-field type="text" label="授权码" placeholder="请输入授权码" v-model="empowerList.authCode"></mt-field>
        <mt-field type="text" label="合伙人编号" placeholder="请输入合伙人编号" v-model="empowerList.agentNo"></mt-field>
        <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="empowerList.customerNo"></mt-field>
        <mt-field type="text" label="分机号" placeholder="请输入分机号" v-model="empowerList.extensionNum"></mt-field>

        <!-- <mt-field type="text" label="服务方式" placeholder="请输入服务方式" v-model="empowerList.phoneNo"></mt-field> -->
        <!-- <mt-field type="text" label="支持类型" placeholder="请输支持类型" v-model="empowerList.bussinessAddress"></mt-field> -->
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
      pageType: this.$route.query["type"] || "ADD",
      receiptNo: this.$route.params["receiptNo"],
      empowerList: {},
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      }
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getArantNumManages(this.receiptNo).then(empowerList => {
        this.empowerList = { ...empowerList };
        // this.echoForm(this.customer);
      });
  },
  methods: {
    save() {}
    // ...mapActions(["getCustomer", "updataCustomer", "addCustomer"]),
    // save() {
    //   if (!this.validator.isEmpty(this.customer.enterpriseName)) {
    //     this.MessageBox.alert("企业名称不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isTax(this.customer.taxNo)) {
    //     this.MessageBox.alert("企业税号有误！");
    //     return;
    //   }
    //   if (!this.validator.isEmpty(this.customer.legalPerson)) {
    //     this.MessageBox.alert("企业法人不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isCardNo(this.customer.idCard)) {
    //     this.MessageBox.alert("身份证号有误！");
    //     return;
    //   }
    //   if (!this.validator.isEmpty(this.customer.linkMan)) {
    //     this.MessageBox.alert("联系人不能为空！");
    //     return;
    //   }
    //   if (!this.validator.isMobile(this.customer.phoneNo)) {
    //     this.MessageBox.alert("手机号有误！");
    //     return;
    //   }
    //   this.btnDisabled = true;
    //   this.pageType == "EDIT"
    //     ? this.updataCustomer(this.customer).then(flag => {
    //         this.btnDisabled = false;
    //         if (flag) {
    //           this.$router.back();
    //         }
    //       })
    //     : this.addCustomer(this.customer).then(flag => {
    //         this.btnDisabled = false;
    //         if (flag) {
    //           this.$store.commit("CUSTOMER_MANAGE_IS_SEARCH", true);
    //           this.$router.back();
    //         }
    //       });
    // }
  }
};
</script>

<style>

</style>
