<template>
  <div class="page">
    <full-page>
      <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      </mt-header>

      <!-- 个人信息 -->
      <div class="add-playinfo">
        <view-radius>
          <input-wrapper>
            <mt-field label="商户编号:" type="text" v-model="customerNo" :disabled="true" :attr="{maxlength:50}"></mt-field>
            <mt-field label="商户名称:"  :disabled="true" type="text" v-model="form.enterpriseName" :attr="{maxlength:50}"></mt-field>
            <mt-field label="经营名称:" type="text" v-model="form.bussinessName" placeholder="请输入经营名称" :attr="{maxlength:50}"></mt-field>
            <mt-field label="经营区域:" type="text" v-model="city.resultAddr" @click.native="cityVisible = true" placeholder="选择地区" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>

            <mt-field label="经营地址:" type="text" v-model="form.bussinessAddress" placeholder="请输入经营地址" :attr="{maxlength:50}"></mt-field>
            <mt-field label="联系电话:" type="text" v-model="form.bussinessPhone" placeholder="请输入联系电话" :attr="{maxlength:50}"></mt-field>

            <mt-field label="行业类别:" type="text" v-model="bussinessType.name" @click.native="$refs.bussinessType.open" placeholder="选择行业类别" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>

            <mt-field label="开户银行:" type="text" v-model="bank.value" @click.native="bankVisible = true" placeholder="选择开户银行" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field label="开户支行:" type="text" v-model="bankBranch.branchName" @click.native="openBankBranch" placeholder="选择开户支行" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>

            <mt-field label="银行帐号:" type="tel" v-model="form.bankAccountNo" placeholder="请输入银行帐号" :attr="{maxlength:50}"></mt-field>
            <mt-field label="注册资金:" type="number" v-model="form.registMoney" placeholder="请输入注册资金" :attr="{maxlength:50}">万</mt-field>
            <mt-field label="月开票量:" type="number" v-model="form.mounthCount" placeholder="请输入月开票量" :attr="{maxlength:50}"></mt-field>
          </input-wrapper>
        </view-radius>
      </div>
      <mt-button class="btn" size="large" type="primary" @click="submit">开通</mt-button>

    </full-page>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
    <picker v-model="bussinessType" ref="bussinessType" :slotsActions="slotsActions" @confirm="confirm"></picker>
    <bank-popup v-model="bankVisible" @bankresult="bankResult"></bank-popup>
    <bank-branch-popup v-model="bankBranchVisible" :bank="bank" @bankbranchresult="bankBranchResult"></bank-branch-popup>
    <bank-search-popup v-model="bankSearchVisible" :api="bankSearchApi" :queryKey="bankBranchQuery" @bankrsearchresult="bankRsearchResult"></bank-search-popup>
  </div>
</template>

<script>
import CityPicher from "@src/components-app/CityPicher";
import Picker from "@src/components-app/SelectPicker/Picker";
import bussinessTypeJson from "@src/data/bussinessType.json";
import BankPopup from "@src/components-app/BankPopup";
import BankBranchPopup from "@src/components-app/BankBranchPopup";
import BankSearchPopup from "@src/components-app/BankSearchPopup";
import utils from "@src/common/utils";
import {
  getBankList,
  getQueryCustomerElectronic,
  perfectCustomer
} from "@src/apis";
import { mapActions, install } from "vuex";
export default {
  components: {
    CityPicher,
    Picker,
    BankPopup,
    BankBranchPopup,
    BankSearchPopup
  },
  data() {
    return {
      cityVisible: false,
      businessTypeVisible: false,
      bankVisible: false,
      bankBranchVisible: false,
      bankSearchVisible: false,
      bankSearchApi: getBankList,
      form: {
        customerNo: "",
        enterpriseName: "",
        bussinessName: "",
        province: "",
        city: "",
        orgCode: "",
        bussinessAddress: "",
        bussinessPhone: "",
        registMoney: "",
        bankCode: "",
        bankAccountNo: "",
        mounthCount: ""
      },
      city: {},
      //银行信息
      bank: {},
      //支行查询条件
      bankBranchQuery: {},
      //支行信息
      bankBranch: {},
      slotsActions: bussinessTypeJson,
      bussinessType: { name: "", code: "" },
      customerNo: this.$route.query["customerNo"]
    };
  },
  created() {
    getQueryCustomerElectronic()({
      customerNo: this.customerNo,
      featureType: "ELECTRONIC"
    }).then(data => {
      if (data.code == "00") {
        //回显信息
        this.echoForm(data.data || {});
        //保存到localStorage中
        // localStorage.setItem("echo_form", JSON.stringify(data.data));
      } else {
        this.Toast(data.msg);
      }
    });
  },
  methods: {
    findCity(orgCode) {
      return this.$refs.CityPicher.findCity(orgCode);
    },
    echoForm(data) {
      let { customer, customerInvoiceConfig, product } = data;
      if (customer instanceof Object) {
        this.form.enterpriseName = customer.enterpriseName;
        this.form.bussinessName = customer.bussinessName;
        this.form.bussinessAddress = customer.bussinessAddress;
        this.form.bussinessPhone = customer.bussinessPhone;
        this.form.registMoney = customer.registMoney;
        this.resultCallback(this.findCity(customer.orgCode));
        this.confirm(utils.findBussinessType(customer.category));
      }
      if (customerInvoiceConfig instanceof Object) {
        this.bankResult({
          value: customerInvoiceConfig.bankName,
          key: customerInvoiceConfig.bankCode
        });
        this.bankRsearchResult({
          branchName: customerInvoiceConfig.branchName,
          unionCode: customerInvoiceConfig.unionCode
        });
        this.form.bankAccountNo = customerInvoiceConfig.bankAccountNo;
      }
      if (product instanceof Object) {
        this.form.mounthCount = product.elecBillnum;
      }
    },
    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
    },

    //行业类别
    confirm(obj) {
      this.bussinessType = obj;
    },

    //选择银行
    bankResult(bank) {
      this.bank = bank;
      this.bankBranch = {};
      this.bankBranchQuery = {};
    },

    //打开支行
    openBankBranch() {
      if (!this.bank.value) {
        this.Toast("请选择银行");
        return;
      }
      this.bankBranchVisible = true;
    },

    //支行查询信息
    bankBranchResult(bankBranch) {
      this.bankSearchVisible = true;

      this.bankBranchQuery = {
        cityId: bankBranch.orgCode,
        bankCode: bankBranch.bankCode
      };
    },

    //支行信息
    bankRsearchResult(resultObj) {
      this.bankSearchVisible = false;
      this.bankBranchVisible = false;
      this.bankBranch = resultObj;
    },

    //处理地区编码
    handleCityCode(orgCode) {
      let cityCode = {};
      cityCode["province"] = orgCode.slice(0, 2) + "0000";
      cityCode["city"] = orgCode.slice(0, 4) + "00";
      cityCode["orgCode"] = orgCode;
      return cityCode;
    },

    //提交
    submit() {
      let form = {
        ...this.form,
        customerNo: this.customerNo,
        ...this.handleCityCode(this.city.resultCode),
        unionCode: this.bankBranch.unionCode,
        branchName: this.bankBranch.branchName,
        bankCode: this.bank.key,
        bankName: this.bank.value
      };
      // console.log(form);

      perfectCustomer()(form).then(data => {
        if (data.code == "00") {
          this.Toast("提交成功");
          this.$router.back();
        } else {
          this.Toast(data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/base.scss";
.mint-radiolist-row {
  display: flex;
  padding: 1px;
  min-height: 100*$rem;
  .mint-cell {
    flex: 1;
    background-image: none;
  }
  .mint-radiolist-title {
    font-size: 32*$rem;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0;
    width: 160*$rem;
    line-height: 100*$rem;
    color: inherit;
  }
}
</style>

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
