<template>
  <div class="add-playinfo-container page">
    <full-page>
      <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      </mt-header>
      <div class="add-user-info" id="scroll-wrapper">
        <!-- 个人信息 -->
        <div class="input-group">
          <view-radius>
            <input-wrapper>
              <mt-field label="所在地区:" type="text" v-model="addr.resultAddr" :readonly="true" placeholder="选择地区" v-to-click="openCity">
                <i class="mintui-arrow_down"></i>
              </mt-field>
              <mt-field label="详细地址:" type="text" v-model="store.sendData.bussinessAddress" :readonly="false" placeholder="如：古美路1468号"></mt-field>
              <mt-field label="法人:" type="text" v-model="store.sendData.legalPerson" :readonly="true" placeholder="请输入姓名"></mt-field>
              <mt-field label="身份证号:" type="tel" v-model="store.sendData.idCard" :readonly="false" placeholder="请输入身份证号"></mt-field>
              <mt-field label="行业类别:" type="text" v-model="bussinessType.name" :readonly="true" placeholder="选择行业类别" v-to-click="()=>{ businessTypeVisible = true }">
                <i class="mintui-arrow_down"></i>
              </mt-field>
              <mt-field label="邮箱:" type="email" v-model="store.sendData.email" :readonly="false" placeholder="接受开通信息"></mt-field>
              <mt-radio title="结算信息" v-model="store.sendData.cardType" :options="[{ label: '对公',value: 'COMMON' },{ label: '对私',value: 'PERSONAL' }]" class="border-1px"></mt-radio>
              <mt-field label="账户名称:" type="text" v-model="store.sendData.bankAccountName" :readonly="false" placeholder="请输入账户名称"></mt-field>
              <mt-field label="开户银行:" type="text" v-model="bank.value" state="" :readonly="true" placeholder="选择开户银行" v-to-click="openBack">
                <i class="mintui-arrow_down"></i>
              </mt-field>
              <mt-field label="开户支行:" type="text" v-model="bankBranch.branchName" state="" :readonly="true" placeholder="选择开户支行" v-to-click="openBranchBack">
                <i class="mintui-arrow_down"></i>
              </mt-field>
              <mt-field label="帐号:" type="tel" v-model="store.sendData.bankAccountNo" :readonly="false" placeholder="请输入帐号"></mt-field>
            </input-wrapper>
          </view-radius>
        </div>
        <mt-button class="btn" size="large" :disabled="btnDisabled" type="primary" @click="nextBtn">下一步</mt-button>
      </div>
    </full-page>
    <city-picher ref="CityPicher" v-model="cityPicherContainerShow" :myCityPicherChange="cityResult"></city-picher>
    <business-type-picker ref="BusinessTypePicker" v-model="businessTypeVisible" @businessresult="businessResult"></business-type-picker>
    <bank-popup ref="BankPopup" v-model="bankVisible" @bankresult="bankResult"></bank-popup>
    <bank-branch-popup v-model="bankBranchVisible" @bankbranchresult="bankBranchResult" :bankName="bank"></bank-branch-popup>
    <bank-search-popup v-model="bankSearchVisible" @bankrsearchresult="bankSearchResult" :queryKey="queryKey"></bank-search-popup>
  </div>
</template>

<script>
import InputWrapper from "@src/containers/InputWrapper";
import ViewRadius from "@src/containers/ViewRadius";
import { Toast } from "mint-ui";
import CityPicher from "@src/components/CityPicher";
import BusinessTypePicker from "@src/components/BusinessTypePicker";
import BankPopup from "@src/components/BankPopup";
import BankBranchPopup from "@src/components/BankBranchPopup";
import BankSearchPopup from "@src/components/BankSearchPopup";
import { submitCustomerRegisterInfo, getCustomerDetail } from "@src/apis";
import validator from "@src/common/validator";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    InputWrapper,
    ViewRadius,
    CityPicher,
    BusinessTypePicker,
    BankPopup,
    BankBranchPopup,
    BankSearchPopup
  },
  data() {
    return {
      cityPicherContainerShow: false,
      addr: { resultAddr: "", resultCode: "" },
      businessTypeVisible: false,

      bussinessType: { name: "", key: "" },
      bankVisible: false,
      bank: { value: "", key: "" },
      bankBranchVisible: false,
      queryKey: { bankCode: "", branchName: "", district: "" },
      bankSearchVisible: false,
      bankBranch: {}
    };
  },
  computed: {
    ...mapState({ store: state => state.addCustomer }),
    btnDisabled() {
      return this.store.sendData.customerNo ? false : true;
    }
  },
  created() {
    this.store.sendMode.customerFrom = this.$route.query["channelType"];
    this.store.sendMode.customerType = this.$route.query["productCategory"];
    this.store.sendData.customerNo = this.$route.query["customerNo"];
    if (this.$route.query["isEchoForm"] && this.store.sendData.customerNo) {
      this.getEchoData();
    }
  },
  methods: {
    ...mapMutations(["saveStore"]),
    openCity() {
      this.cityPicherContainerShow = true;
    },
    //城市
    cityResult(data) {
      this.addr = data;
      this.store.sendData.orgCode = this.addr.resultCode;
    },
    //行业类别
    businessResult(data) {
      this.bussinessType = data;
      this.store.sendData.bussinessType = this.bussinessType.key;
    },
    //打开银行
    openBack() {
      this.bankVisible = true;
    },
    //选择银行
    bankResult(bank) {
      this.bank = bank;
      this.store.sendData.bankName = this.bank.value;
      this.store.sendData.bankCode = this.bank.key;
    },
    //打开支行
    openBranchBack() {
      if (!this.bank.value) {
        Toast("请选择开户银行");
        return;
      }
      this.bankBranchVisible = true;
    },
    //选择支行
    bankBranchResult(queryKey) {
      this.queryKey = queryKey;
      this.bankSearchVisible = true;
    },
    //搜索支行结果
    bankSearchResult(bankBranch) {
      this.bankBranchVisible = false;
      this.bankBranch = bankBranch;
      this.store.sendData.branchName = this.bankBranch.branchName;
      this.store.sendData.unionCode = this.bankBranch.unionCode;
    },
    //获取回显信息 —— 保存store里
    getEchoData() {
      getCustomerDetail()({
        customerNo: this.store.sendData.customerNo,
        containsImg: true
      }).then(data => {
        if (data.resultCode === "0") {
          let d = data.data;
          this.saveStore(d);
          this.setEchoData();
        } else {
          Toast(data.resultMsg);
        }
      });
    },
    //在store里取回信息 —— 设置回显信息
    setEchoData() {
      //地区
      let orgCode = this.store.sendData.orgCode;
      this.cityResult(this.$refs.CityPicher.findCity(orgCode));
      //行业类别
      let bussinessType = this.store.sendData.bussinessType;
      this.businessResult(
        this.$refs.BusinessTypePicker.findBusiness(bussinessType)
      );
      //开户银行
      let bankCode = this.store.sendData.bankCode;
      this.bankResult(this.$refs.BankPopup.findBank(bankCode));
    },
    //下一步
    nextBtn() {
      if (this.store.sendData.customerNo === "") {
        Toast("缺少商编");
        return;
      }
      submitCustomerRegisterInfo()({
        ...this.store.sendMode,
        ...this.store.sendData
      }).then(data => {
        if (data.resultCode === "0") {
          this.$router.push({ path: "./addGoods", query: this.$route.query });
        } else {
          Toast(data.resultMsg);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import url(../../../assets/less/base.less);
.add-playinfo-container {
  .add-user-info {
    padding: 20/@rem;
    box-sizing: border-box;
    height: 100%;
    .btn {
      margin: 50/@rem auto;
    }
    .mint-radiolist {
      display: flex;
      padding: 1px;
      min-height: @input-height;
      .mint-cell {
        flex: 1;
        background-image: none;
      }
      .mint-radiolist-title {
        font-size: @input-font-size;
        margin-top: 0;
        margin-bottom: 0;
        margin-right: 0;
        width: 160/@rem;
        line-height: @input-height;
        color: inherit;
      }
    }
  }
}
</style>