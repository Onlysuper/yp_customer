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
            <mt-field label="企业名称:" type="text" v-model="enterpriseName" :disabled="true"></mt-field>
            <mt-field label="企业税号:" type="text" v-model="taxNo" :disabled="true"></mt-field>
            <mt-field label="所在地区:" type="text" v-model="city.resultAddr" @click.native="cityVisible = true" placeholder="选择地区" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field label="详细地址:" type="text" v-model="form.bussinessAddress" @change="cacheFrom" placeholder="例如：古美路18号" v-required :attr="{maxlength:50}"></mt-field>
            <mt-field label="法人:" type="text" v-model="form.legalPerson" @change="cacheFrom" placeholder="输入法人姓名" v-required :attr="{maxlength:50}"></mt-field>
            <mt-field label="身份证号:" type="text" v-model="form.idCard" @change="cacheFrom" placeholder="输入身份证号" v-required :attr="{maxlength:50}"></mt-field>
            <mt-field label="行业类别:" type="text" v-model="bussinessType.name" @click.native="$refs.bussinessType.open" placeholder="选择行业类别" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field class="addpay-long-title" label="营业执照起始日期:" type="text" v-model="form.bussinessLicenseEffectiveBegin" @click.native="$refs.bussinessLicenseEffectiveBegin.open" placeholder="请选择日期" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field class="addpay-long-title" label="营业执照到期日期:" type="text" v-model="form.bussinessLicenseEffectiveEnd" @click.native="$refs.bussinessLicenseEffectiveEnd.open" placeholder="请选择日期" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <!-- <mt-field label="邮箱:" type="email" v-model="form.contactEmail" placeholder="接收开通信息（选填）" :attr="{maxlength:50}"></mt-field> -->
            <mt-radio title="结算信息" v-model="form.accountType" :options="[{ label: '对公',value: '0' },{ label: '对私',value: '1' }]" class="mint-radiolist-row border-1px"></mt-radio>
            <!-- 对公显示,带入企业名称,不可更改。对私显示,带入法人名称,可更改-->
            <mt-field label="账户名称:" type="text" v-model="form.accountName" @change="cacheFrom" placeholder="请输入账户名称" :disabled="form.accountType == '0'"></mt-field>
            <mt-field label="开户银行:" type="text" v-model="bank.value" @click.native="bankVisible = true" placeholder="选择开户银行" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field label="开户支行:" type="text" v-model="bankBranch.branchName" @click.native="openBankBranch" placeholder="选择开户支行" v-readonly-ios :readonly="true">
              <i class="icon-arrow"></i>
            </mt-field>
            <mt-field label="银行帐号:" type="tel" @input="validateNum($event,'form','accountNo')" v-model="form.accountNo" @change="cacheFrom" placeholder="请输入帐号" :attr="{maxlength:50}"></mt-field>
            <mt-field label="预留手机号:" type="tel" v-model="form.reservedPhoneNo" @change="cacheFrom" placeholder="请输入银行预留手机号" :attr="{maxlength:11}"></mt-field>
          </input-wrapper>
        </view-radius>
      </div>
      <mt-button class="btn" size="large" type="primary" @click="submit">下一步</mt-button>

    </full-page>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
    <picker v-model="bussinessType" ref="bussinessType" :slotsActions="slotsActions" @confirm="confirm"></picker>
    <bank-popup v-model="bankVisible" @bankresult="bankResult"></bank-popup>
    <bank-branch-popup v-model="bankBranchVisible" :bank="bank" @bankbranchresult="bankBranchResult"></bank-branch-popup>
    <bank-search-popup v-model="bankSearchVisible" :api="bankSearchApi" :queryKey="bankBranchQuery" @bankrsearchresult="bankRsearchResult"></bank-search-popup>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveBeginVal" type="date" :startDate="new Date('2000-01-01')" :endDate="new Date()" @confirm="setStartDate" ref="bussinessLicenseEffectiveBegin" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <mt-datetime-picker v-model="bussinessLicenseEffectiveEndVal" type="date" :endDate="new Date('2199-12-31')" @confirm="setEndDate" ref="bussinessLicenseEffectiveEnd" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
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
import { validateInput } from "@src/common/mixins";
import {
  getBankList,
  getCustomerEchoProduct,
  completeSettleInfo
} from "@src/apis";
import { mapActions, install } from "vuex";
export default {
  mixins: [validateInput],
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
      enterpriseName: "",
      taxNo: "",
      form: {
        bussinessAddress: "",
        accountType: "",
        legalPerson: "",
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        accountNo: ""
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
      customerNo: this.$route.query["customerNo"],
      bussinessLicenseEffectiveBeginVal: new Date(),
      bussinessLicenseEffectiveEndVal: new Date()
    };
  },
  watch: {
    "form.accountType"(v) {
      if (v == "0") this.form.accountName = this.enterpriseName;
      else this.form.accountName = this._accountName == this.enterpriseName ? this.form.legalPerson : this._accountName || this.form.legalPerson;

      this.cacheFrom(); //缓存数据
    }
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        //回显信息
        this.echoForm(data.data);
        //保存到localStorage中
        // localStorage.setItem("echo_form", JSON.stringify(data.data));
      } else {
        this.Toast(data.msg);
      }
    });

  },
  computed: {
  },
  methods: {
    echoForm(data) {
      let cacheForm = {};
      let { customer, settleCard } = data;
      if (customer instanceof Object) {
        /*
        * 回显表单逻辑必须是优先从缓存中取
        */
        cacheForm = JSON.parse(window.localStorage.getItem(customer.customerNo)) || {};//取出缓存表单信息
        // console.log("取出", cacheForm)

        this.enterpriseName = cacheForm.enterpriseName || customer.enterpriseName;
        this.taxNo = cacheForm.taxNo || customer.taxNo;

        let city = this.$refs.CityPicher.findCity(cacheForm.orgCode || customer.orgCode);
        this.resultCallback(city);
        this.form.legalPerson = cacheForm.legalPerson || customer.legalPerson;
        this.form.bussinessAddress = cacheForm.bussinessAddress || customer.bussinessAddress;
        this.form.idCard = cacheForm.idCard || customer.idCard;
        let bussinessLicenseEffectiveBegin = cacheForm.bussinessLicenseEffectiveBegin || customer.bussinessLicenseEffectiveBegin;
        bussinessLicenseEffectiveBegin && this.setStartDate(new Date(bussinessLicenseEffectiveBegin));
        let bussinessLicenseEffectiveEnd = cacheForm.bussinessLicenseEffectiveEnd || customer.bussinessLicenseEffectiveEnd;
        bussinessLicenseEffectiveEnd && this.setEndDate(new Date(bussinessLicenseEffectiveEnd));
        this.form.contactEmail = cacheForm.contactEmail || customer.contactEmail;
        let category = cacheForm.category || customer.category;
        let bussinessType = bussinessTypeJson.find(item => item.code == category);
        this.confirm(bussinessType || {});
      }
      settleCard = settleCard || {};
      if (settleCard instanceof Object) {
        this.bankResult({
          value: cacheForm.bankName || settleCard.bankName,
          key: cacheForm.bankCode || settleCard.bankCode
        });
        this.bankRsearchResult({
          branchName: cacheForm.branchName || settleCard.branchName,
          unionCode: cacheForm.unionCode || settleCard.unionCode
        });
        this.form.accountType = cacheForm.accountType || settleCard.accountType;
        this.form.accountName = this._accountName = cacheForm.accountName || settleCard.accountName;
        this.form.accountNo = cacheForm.accountNo || settleCard.accountNo;
        this.form.reservedPhoneNo = cacheForm.reservedPhoneNo || settleCard.reservedPhoneNo;
      } else {
        // this.form.accountType = "0"; //如果需要默认值
      }
    },
    //处理对公对私逻辑
    handleAccountType(accountType) {

    },

    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
      this.cacheFrom(); //缓存数据
    },

    //行业类别
    confirm(obj) {
      this.bussinessType = obj;
      this.cacheFrom(); //缓存数据
    },

    //选择银行
    bankResult(bank) {
      this.bank = bank;
      this.bankBranch = {};
      this.bankBranchQuery = {};
      this.cacheFrom(); //缓存数据
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
      this.cacheFrom(); //缓存数据
    },
    setStartDate(date) {
      this.form.bussinessLicenseEffectiveBegin = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveBeginVal = date;
      this.cacheFrom(); //缓存数据
    },
    setEndDate(date) {
      this.form.bussinessLicenseEffectiveEnd = utils.formatDate(date, "yyyy-MM-dd");
      this.bussinessLicenseEffectiveEndVal = date;
      this.cacheFrom(); //缓存数据
    },
    sendParams() {
      return {
        ...this.form,
        customerNo: this.customerNo,
        orgCode: this.city.resultCode,
        category: this.bussinessType.code,
        unionCode: this.bankBranch.unionCode,
        branchName: this.bankBranch.branchName,
        bankCode: this.bank.key,
        bankName: this.bank.value
      };
    },
    //save from to localStorage
    cacheFrom() {
      window.localStorage.setItem(this.customerNo, JSON.stringify(this.sendParams()));
      // console.log(JSON.stringify(form))
    },
    clearcacheFrom() {
      window.localStorage.removeItem(this.customerNo);
    },
    //提交
    submit() {

      let form = this.sendParams();
      form.accountNo = form.accountNo.replace(/\s/g, '');
      // console.log(form);
      // this.validateNum(this.payStatusForm.accountNo, 'payStatusForm', 'accountNo');
      completeSettleInfo()(form).then(data => {
        if (data.code == "00") {
          this.clearcacheFrom();
          this.$router.push({
            path: "./addGoods",
            query: { customerNo: this.customerNo }
          });
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
<style lang="scss">
@import "../../../assets/scss/base.scss";
.addpay-long-title {
  .mint-cell-title {
    span {
      white-space: nowrap;
    }
  }
  input {
    padding-left: 80*$rem;
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
