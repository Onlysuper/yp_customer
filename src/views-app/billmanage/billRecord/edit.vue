<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 编辑表单 -->
        <template v-if="pageType == 'EDIT'">
          <!-- <div> -->
          <!-- <mt-field type="text" label="订单编号" placeholder="请选择订单编号" :value="unitData.orderNo" :disabled="true" :disableClear="true" :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field> -->
          <!-- </div> -->
          <!-- <mt-field type="text" label="交付状态" placeholder="请输入交付状态" v-model="unitData.status"></mt-field> -->
          <!-- <mt-field  type="text" label="发票代码" placeholder="请输入发票代码" v-model="unitData.invoiceCode"></mt-field> -->
          <!-- <mt-field type="text" label="发票号码" placeholder="请输入发票号码" v-model="unitData.invoiceNo"></mt-field> -->
          <!-- <mt-field type="text" label="含税金额" placeholder="请输入含税金额" v-model="unitData.totalTax"></mt-field> -->
          <!-- <mt-field type="text" label="手机号码" placeholder="请输入手机号码" v-model="unitData.phoneNo"></mt-field> -->
          <mt-field type="text" :disabled="true" label="购方名称" placeholder="请输入购方名称" v-model="unitData.enterpriseName"></mt-field>
          <mt-field type="text" label="企业税号" placeholder="请输入企业税号" v-model="unitData.taxNo"></mt-field>
          <mt-field type="text" label="单位地址" placeholder="请输入单位地址" v-model="unitData.enterpriseAddress"></mt-field>
          <mt-field type="text" label="开户银行" placeholder="请输入开户银行" v-model="unitData.bankName"></mt-field>
          <mt-field type="text" label="银行帐号" placeholder="请输入银行帐号" v-model="unitData.bankAccountNo"></mt-field>
          <mt-field type="text" label="公司电话" placeholder="请输入公司电话" v-model="unitData.companyPhone"></mt-field>
          <mt-field type="text" label="销方名称" placeholder="请输入销方名称" v-model="unitData.bussinessName"></mt-field>
          <mt-field type="text" label="发票金额" placeholder="请输入发票金额" v-model="unitData.billAmount"></mt-field>
        </template>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      btnDisabled: false,
      unitData: {
        enterpriseName: "",
        taxNo: "",
        enterpriseAddress: "",
        bankName: "",
        bankAccountNo: "",
        companyPhone: "",
        bussinessName: "",
        billAmount: ""
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      },
      billRecordNo: this.$route.params["billRecordNo"]
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getUnit(this.billRecordNo).then(data => {
        this.unitData = Object.assign(this.unitData, data);
      });
  },
  methods: {
    ...mapActions(["getUnit", "upBillRecord"]),
    save() {
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
        this.upBillRecord(this.unitData).then(flag => {
          this.btnDisabled = false;
          if (flag) this.$router.back({ query: { d: 11 } });
        });
      }
    }
  }
};
</script>

<style>

</style>
