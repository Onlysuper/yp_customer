<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell title="销方名称">
          <span>{{dataList.bussinessName}}</span>
        </mt-cell>
        <mt-cell title="开票时间">
          <span>{{dataList.createTime}}</span>
        </mt-cell>
        <mt-cell title="订单编号">
          <span>{{dataList.billRecordNo}}</span>
        </mt-cell>
        <mt-cell title="交付状态">
          <span>{{dataList.status | statusFilter("payStatus")}}</span>
        </mt-cell>
        <mt-cell title="发票代码">
          <span>{{dataList.invoiceCode}}</span>
        </mt-cell>
        <mt-cell title="发票号码">
          <span>{{dataList.invoiceNo}}</span>
        </mt-cell>
        <mt-cell title="购方名称">
          <span>{{dataList.enterpriseName}}</span>
        </mt-cell>
        <mt-cell title="购方税号">
          <span>{{dataList.taxNo}}</span>
        </mt-cell>
        <mt-cell title="发票金额">
          <span>{{dataList.billAmount}}</span>
        </mt-cell>
        <mt-cell title="合计税额">
          <span>{{dataList.totalTax}}</span>
        </mt-cell>
        <mt-cell title="手机号码">
          <span>{{dataList.phoneNo}}</span>
        </mt-cell>
        <mt-cell title="购方邮箱">
          <span>{{dataList.mail}}</span>
        </mt-cell>
        <mt-cell title="公司电话">
          <span>{{dataList.companyPhone}}</span>
        </mt-cell>
        <mt-cell title="银行账号">
          <span>{{dataList.bankAccountNo}}</span>
        </mt-cell>
        <mt-cell title="开户银行">
          <span>{{dataList.bankName}}</span>
        </mt-cell>
        <mt-cell title="单位地址">
          <span>{{dataList.enterpriseAddress}}</span>
        </mt-cell>
        <mt-cell v-if="dataList.status=='BILLING_FAIL'?true:false" title="失败原因">
          <span>{{dataList.respMsg}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>
<style lang="scss">

</style>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      btnDisabled: false,
      dataList: {
        bussinessName: "", createTime: "", billRecordNo: "", status: "",
        invoiceCode: "", invoiceNo: "", enterpriseName: "", taxNo: "", billAmount: "",
        totalTax: "", phoneNo: "", mail: "", companyPhone: "", bankAccountNo: "",
        bankName: "", enterpriseAddress: "", respMsg: ""
      },
      pageType: this.$route.query["type"] || "DETAIL",
      pageTitle: {
        DETAIL: "详情"
      },
      billRecordNo: this.$route.params["billRecordNo"]
    };
  },
  created() {
    this.pageType == "DETAIL" &&
      this.getUnit(this.billRecordNo).then(data => {
        this.dataList = Object.assign(this.dataList, data);
      });
  },
  methods: {
    ...mapActions(["getUnit"]),
  }
};
</script>

<style>

</style>
