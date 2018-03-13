<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius class="spacing-20">
      <input-wrapper>
        <mt-field type="text" label="合伙人名称" v-model="agent.agentName" :disabled="true" placeholder="请输入合伙人名称"></mt-field>
        <mt-field type="text" label="合伙人编号" v-model="agent.agentNo" :disabled="true" placeholder="请输入合伙人编号"></mt-field>
        <mt-field type="tel" label="手机号" v-model="agent.phoneNo" placeholder="请输入手机号"></mt-field>
        <mt-field type="tel" label="联系人" v-model="agent.linkMan" placeholder="请输入联系人"></mt-field>
        <mt-field type="tel" label="固定电话" v-model="agent.fixedPhone" placeholder="请输入固定电话"></mt-field>
        <mt-field type="text" label="经营区域" v-model="city.resultAddr" @click.native="cityVisible = true" v-readonly-ios :readonly="true" placeholder="请选择地区">
          <i class="icon-arrow"></i>
        </mt-field>
      </input-wrapper>
    </view-radius>
    <view-radius v-if="userAll.userType=='branchOffice'?true:false" class="spacing-20">
      <input-wrapper>
        <mt-field type="text" label="对公账户" v-model="agent.accountNo" placeholder="请输入对公账户" :attr="{maxlength:100}"></mt-field>
        <mt-field type="text" label="收款人" v-model="agent.accountName" placeholder="请输入收款人" :attr="{maxlength:20}"></mt-field>
        <mt-field type="text" label="所属银行" v-model="bank.value" @click.native="bankVisible = true" v-readonly-ios :readonly="true" placeholder="请选择所属银行">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field type="text" label="选择支行" v-model="bankBranch.branchName" @click.native="openBankBranch" v-readonly-ios :readonly="true" placeholder="请选择所属银行">
          <i class="icon-arrow"></i>
        </mt-field>
      </input-wrapper>
    </view-radius>
    <view-radius v-if="userAll.userType=='branchOffice'?true:false" class="spacing-20">
      <input-wrapper>
        <mt-field type="text" label="回调地址" v-model="agent.redirectUrl" placeholder="请输入回调地址" :attr="{maxlength:200}"></mt-field>
        <mt-cell title="是否创建accesskey">
          <mt-switch v-model="agent.isCreateKey"></mt-switch>
        </mt-cell>
      </input-wrapper>
    </view-radius>
    <view-radius v-if="userAll.userType=='branchOffice'?true:false" class="spacing-20">
      <input-wrapper>
        <mt-field @click.native="$refs.subsidyPicker.open" type="text" label="补贴" placeholder="请选择补贴" :value="agent.subsidy" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field type="text" label="中间人" v-model="agent.intermediary" placeholder="请输入中间人" :attr="{maxlength:100}"></mt-field>
        <mt-field @click.native="$refs.rebatePicker.open" type="text" label="中间人分润" placeholder="请选择中间人分润" :value="agent.rebate" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
      </input-wrapper>
    </view-radius>
    <!-- 补贴 -->
    <picker ref="subsidyPicker" v-model="subsidy" :slotsActions="subsidyActions" @confirm="subsidyChange"></picker>
    <!-- 中间人分润 -->
    <picker ref="rebatePicker" v-model="rebate" :slotsActions="subsidyActions" @confirm="rebateChange"></picker>
    <city-picher ref="CityPicher" v-model="cityVisible" :resultCallback="resultCallback"></city-picher>
    <bank-popup v-model="bankVisible" @bankresult="bankResult"></bank-popup>
    <bank-branch-popup v-model="bankBranchVisible" :bank="bank" @bankbranchresult="bankBranchResult"></bank-branch-popup>
    <bank-search-popup v-model="bankSearchVisible" :api="bankSearchApi" :queryKey="bankBranchQuery" @bankrsearchresult="bankRsearchResult"></bank-search-popup>
  </full-page>
</template>
<script>
import { mapState, mapActions } from "vuex";
import CityPicher from "@src/components-app/CityPicher";
import BankPopup from "@src/components-app/BankPopup";
import BankBranchPopup from "@src/components-app/BankBranchPopup";
import BankSearchPopup from "@src/components-app/BankSearchPopup";
import Picker from "@src/components-app/SelectPicker/Picker";
import { getBankList, postEditChange } from "@src/apis";
export default {
  components: {
    CityPicher,
    BankPopup,
    BankBranchPopup,
    BankSearchPopup,
    Picker
  },
  data() {
    return {
      btnDisabled: false,
      cityVisible: false,
      bankVisible: false,
      bankBranchVisible: false,
      bankSearchVisible: false,
      bankSearchApi: getBankList,
      subsidy: {},
      rebate: {},
      subsidyActions: [
        {
          name: "0",
          code: "0"
        },
        {
          name: "20",
          code: "20"
        },
        {
          name: "30",
          code: "30"
        },
        {
          name: "50",
          code: "50"
        },
        {
          name: "60",
          code: "60"
        },
        {
          name: "70",
          code: "70"
        },
        {
          name: "80",
          code: "80"
        },
        {
          name: "100",
          code: "100"
        }
      ],
      agent: {
        isCreateKey: false
      },
      city: {},
      //银行信息
      bank: {},
      //支行查询条件
      bankBranchQuery: {},
      //支行信息
      bankBranch: {},
      agentNo: this.$route.params["agentNo"]
    };
  },
  created() {
    this.findAgentInfo(this.agentNo).then(agent => {
      this.agent = { ...this.agent, ...agent };
      postEditChange()({
        agentNo: agent.agentNo
      }).then(res => {
        if (res.code == "00") {
          if (agent.level == "1") {
            let data = res.data;
            this.agent = { ...this.agent, ...data };
            if (data.branchBank) {
              this.bank = {
                key: data.branchBank.bankCode,
                value: data.branchBank.bankName
              };
              this.bankBranch = data.branchBank;
            }
          }
        }
      });
      //回显地区
      this.resultCallback(this.$refs.CityPicher.findCity(this.agent.orgCode));
    });
  },
  methods: {
    ...mapActions(["findAgentInfo", "editAgent"]),

    // 补贴
    subsidyChange(obj) {
      this.agent.subsidy = obj.name;
      this.subsidy = obj;
    },
    // 中间人补贴
    rebateChange(obj) {
      this.agent.rebate = obj.name;
      this.rebate = obj;
    },
    //地区选择回调函数
    resultCallback(obj) {
      this.city = obj;
    },

    //选择银行
    bankResult(bank) {
      console.log(bank);
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
      console.log(this.bankBranch);
    },

    //处理地区编码
    handleCityCode(orgCode) {
      let cityCode = {};
      if (!orgCode) return cityCode;
      cityCode["province"] = orgCode.slice(0, 2) + "0000";
      cityCode["city"] = orgCode.slice(0, 4) + "00";
      cityCode["orgCode"] = orgCode;
      return cityCode;
    },

    //处理银行
    handleBank(bankBranch) {
      let bankCity = this.handleCityCode(this.bankBranchQuery.cityId);
      return {
        provinceId: bankCity.province,
        cityId: bankCity.city,
        bankOrgCode: bankCity.orgCode,

        bankCode: bankBranch.bankCode,
        unionCode: bankBranch.unionCode
      };
    },

    //提交表单
    save() {
      if (!this.validator.isEmpty(this.city.resultAddr)) {
        this.MessageBox.alert("请选择经营地区！");
        return;
      }

      let newAgent = {
        ...this.agent,
        ...this.handleCityCode(this.city.resultCode),
        ...this.handleBank(this.bankBranch)
      };
      // return;
      this.btnDisabled = true;
      this.editAgent(newAgent).then(flag => {
        this.btnDisabled = false;
        if (flag) {
          this.$router.back();
        }
      });
    }
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  }
};
</script>

<style>

</style>
