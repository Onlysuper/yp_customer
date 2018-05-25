<template>
  <div class="paystatusInfo-box">
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="120px">
      <!-- <city-picher></city-picher> -->
      <el-form-item class="full-width" label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
        <el-input :disabled="true" v-model="payStatusForm.enterpriseName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="企业税号" prop="taxNo" :label-width="formLabelWidth">
        <el-input :disabled="true" v-model="payStatusForm.taxNo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="经营名称" prop="bussinessName" :label-width="formLabelWidth">
        <el-input :disabled="true" v-model="payStatusForm.bussinessName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="legalPerson" :label-width="formLabelWidth">
        <el-input @change="setCache" v-model="payStatusForm.legalPerson" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="身份证号" prop="idCard" :label-width="formLabelWidth">
        <el-input @input="idCardInput" @change="setCache" v-model.trim="payStatusForm.idCard" auto-complete="off"></el-input>
      </el-form-item>
      <div class="timestartandend-box">
        <el-form-item class="" label="身份证有效期" prop="idNoEffectiveBegin" :label-width="formLabelWidth">
          <el-date-picker @change="setCache" value-format="yyyy-MM-dd" class="full-width" v-model="payStatusForm.idNoEffectiveBegin" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="full-width" label="至" prop="idNoEffectiveEnd" label-width="50px">
          <el-date-picker @change="setCache" value-format="yyyy-MM-dd" v-model="payStatusForm.idNoEffectiveEnd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <el-form-item label="邮箱" prop="contactEmail" :label-width="formLabelWidth">
        <el-input @change="setCache" v-model="payStatusForm.contactEmail" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="行业类型" prop="category" :label-width="formLabelWidth">
        <el-select @change="setCache" size="small" v-model="payStatusForm.category" placeholder="请选择">
          <el-option v-for="item in slotsActions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="timestartandend-box">
        <el-form-item class="" label="营业执照期限" prop="bussinessLicenseEffectiveBegin" :label-width="formLabelWidth">
          <el-date-picker @change="setCache" value-format="yyyy-MM-dd" class="full-width" v-model="payStatusForm.bussinessLicenseEffectiveBegin" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="full-width" label="至" prop="bussinessLicenseEffectiveEnd" label-width="50px">
          <el-date-picker @change="setCache" value-format="yyyy-MM-dd" v-model="payStatusForm.bussinessLicenseEffectiveEnd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <!-- 以上为新加内容 -->
      <el-form-item class="full-width" prop="Area" label="所在地区">
        <el-cascader @change="setCache" :options="optionsArea" v-model="payStatusForm.Area">
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input @change="setCache" v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item class="full-width" label="账户类型" prop="accountType" :label-width="formLabelWidth">
        <el-select @change="setCache" size="small" v-model="payStatusForm.accountType" placeholder="请选择">
          <el-option v-for="item in selectOptions.accountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="full-width" label="账户名称" :prop="accountNameDis?'':'accountName'" :label-width="formLabelWidth">
        <el-input @input="accountNameInput"  @change="setCache" :disabled="accountNameDis" v-model="payStatusForm.accountName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="settleIdCardVisible" class="full-width" :prop="'settleIdCard'" label="结算人身份证号" :label-width="formLabelWidth">
        <el-input @change="setCache" :disabled="settleIdCardDis" v-model="payStatusForm.settleIdCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="银行账号" prop="accountNo" :label-width="formLabelWidth">
        <el-input @change="setCache" @input="validateNum($event,'payStatusForm','accountNo')" v-model="payStatusForm.accountNo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="预留手机号" prop="reservedPhoneNo" :label-width="formLabelWidth">
        <el-input @change="setCache" v-model.trim="payStatusForm.reservedPhoneNo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="开户银行" prop="bankCode" :label-width="formLabelWidth">
        <el-select @change="setCache" filterable @input="banksChange" size="small" v-model="payStatusForm.bankCode" placeholder="请选择">
          <el-option v-for="item in bankOptions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="bankAreaVisible" class="full-width" prop="bankArea" label="银行区域">
        <el-cascader @change="bankhandleChangeArea" :options="optionsArea" v-model="payStatusForm.bankArea">
        </el-cascader>
      </el-form-item>
      <el-form-item class="full-width" prop="unionCode" label="选择支行">
        <el-input v-if="branchNameVisible" v-model="payStatusForm.branchName" auto-complete="off"></el-input>
        <el-select @change="setCache" filterable v-if="bankAreaVisible" prop="unionCode" v-model="payStatusForm.unionCode" clearable placeholder="请选择">
          <el-option v-for="item in branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div center slot="footer" class="dialog-footer">
      <el-button @click="goback('close')">取消</el-button>
      <el-button :loading="saveLoading" type="primary" @click="editSave('payStatusForm')">下一步</el-button>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.paystatusInfo-box {
  .dialog-footer {
    text-align: center;
  }
  .timestartandend-box {
    display: flex;
  }
  .full-width {
    .el-date-editor.el-input {
      width: 100%;
    }
  }
}
</style>
<script>
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayStr } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify, idCardVerify_r } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
import utils from "@src/common/utils"
// import CityPicher from "@src/components/CityPicher"
import {
  getBankList,
  completeSettleInfo,
  getOneChangeBill
} from "@src/apis";
import { banks } from "@src/common/bank";
export default {
  name: "changeBillPaystatusInfo",
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    },
    newData: {
      type: Object
    },
    oldData: {
      type: Object
    }
  },
  mixins: [mixinsPc],
  data() {
    return {
      cacheForm: "",
      settleIdCardVisible: true,
      settleIdCardDis: true,
      accountNameDis: true,
      currentChildView: "",
      formLabelWidth: "120px",
      bankOptions: banks,
      slotsActions: bussinessTypeJson,
      optionsArea: utils.areaPicherOptions(), //省市县数据
      bankCity: "",
      bankCode: "",
      branchBankOptions: [],
      customerTypeOptions: "",
      bankAreaVisible: false,
      branchNameVisible: true,
      selectOptions: {
        accountTypeOptions: [
          {
            value: "0",
            label: "对公"
          },
          {
            value: "1",
            label: "对私"
          }
        ]
      },
      getaccountName: "",
      // getEnterpriseName,// 带入的企业名称
      // getLegalPerson,// 带入的法人名称
      payStatusForm: {
        customerType: this.customerTypeSelected[0].value,
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        idNoEffectiveBegin: "",
        idNoEffectiveEnd: "",
        category: "",
        accountType: "",
        bankCode: "",
        unionCode: "",
        Area: [],
        bankArea: [] // 必须为数组
      },
      payStatusFormRules: {
        settleIdCard: [
          { required: true, message: "请填写结算人身份证", trigger: "blur,change" },
          { required: true, validator: idCardVerify, trigger: "blur,change" },
        ],
        idNoEffectiveBegin: [
          { required: true, message: "请选择身份证有效期开始时间", trigger: "blur,change" }
        ],
        idNoEffectiveEnd: [
          { required: true, message: "请选择身份证有效期结束时间", trigger: "blur,change" }
        ],
        bussinessLicenseEffectiveBegin: [
          { required: true, message: "请选择经营执照开始时间", trigger: "blur,change" }
        ],
        bussinessLicenseEffectiveEnd: [
          { required: true, message: "请选择经营执照结束时间", trigger: "blur,change" }
        ],
        Area: [{ required: true, type: 'array', message: "请输入经营区域", trigger: "blur,change" }],
        bussinessAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入法人名称", trigger: "blur,change" }
        ],
        contactEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: "请输入有效身份证号", trigger: "blur,change" },
          { required: true, validator: idCardVerify, trigger: "blur,change" },
          // { validator: idCardVerify_r, trigger: "blur,change" }
        ],
        category: [
          { required: true, message: "请选择行业类型", trigger: "blur,change" }
        ],
        accountName: [
          { required: true, message: "请输入账户名称", trigger: "blur,change" }
        ],
        accountType: [
          { required: true, message: "请选择结算信息", trigger: "blur,change" }
        ],
        reservedPhoneNo: [
          { required: true, message: "请输入手机号", trigger: "blur,change" },
          { required: true, validator: phoneNumVerify, trigger: "blur,change" }
        ],
        bankCode: [
          { required: true, message: "请输入开户银行", trigger: "blur,change" }
        ],
        bankArea: [
          { required: true, message: "请选择银行区域", trigger: "blur,change" }
        ],
        unionCode: [{ required: true, message: "请选择支行", trigger: "blur,change" }],
        accountNo: [{ required: true, message: "请输入账号", trigger: "blur,change" }]
      } // 编辑单个规则
    };
  },
  methods: {
    idCardInput() {
      this.isLegalPersonSettleIdCard();
    },
    accountNameInput() {
      this.isLegalPersonSettleIdCard('inputchange');
    },
    areaChange(val) {
      this.payStatusForm.Area = val;
    },
    // 将表单里面的区域转化成需要往后台传送的数据
    changeAgentArea(agentArea) {
      let obj = {};
      if (agentArea) {
        obj.province = agentArea[0] ? agentArea[0] : "";
        obj.city = agentArea[1] || agentArea[0] || "";
        obj.orgCode =
          agentArea[2] ||
          agentArea[1] ||
          agentArea[0] ||
          "";
      }
      return obj
    },
    editSave(formName) {
      // 编辑内容保存
      if (this.payStatusForm.legalPerson != this.payStatusForm.accountName && this.payStatusForm.settleIdCard == this.payStatusForm.idCard) {
        this.payStatusForm.settleIdCard = "";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let payStatusForm = this.payStatusForm;
          let bankName = "";
          if (this.bankOptions.find(
            r => r.code == payStatusForm.bankCode
          )) {
            bankName = this.bankOptions.find(
              r => r.code == payStatusForm.bankCode
            ).name
          } else {
            bankName = payStatusForm.bankName
          }
          let branchName = "";
          if (this.branchBankOptions.length == 0) {
            branchName = payStatusForm.branchName;
          } else {
            branchName =
              this.branchBankOptions.find(
                r => r.unionCode == payStatusForm.unionCode
              ).branchName || payStatusForm.unionCode;
          }
          // console.log(payStatusForm);
          let newRow = utils.pickObj(payStatusForm, [
            'accountName', 'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd',
            'idNoEffectiveBegin', 'idNoEffectiveEnd',
            'bussinessAddress', 'legalPerson', "idCard", 'category', 'accountNo', 'accountType',
            'reservedPhoneNo',
            'unionCode',
            'bankCode',
            'contactEmail',
            'settleIdCard'
          ]);
          // newRow.accountNo = newRow.accountNo.replace(/\s/g, '');
          for (var i in newRow) {
            if (newRow[i]) {
              newRow[i] = newRow[i].replace(/\s/g, '');
            }
          }
          let sendata = {
            customerNo: this.rowData.customerNo,
            orgCode:
              payStatusForm.Area[2] ||
              payStatusForm.Area[1] ||
              payStatusForm.Area[0] ||
              "",
            bankName: bankName,
            branchName: branchName,
            ...newRow
          };
          this.saveLoading = true;
          completeSettleInfo()({ ...sendata }).then(data => {
            if (data.code === "00") {
              // 下一步
              this.clearCache();
              this.$emit("nextFn", "paystatusGoods");
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },
    bankhandleChangeArea(value) {
      //选择银行区域
      this.bankCity = value[2] || value[1] || value[0];
      this.getBankListHandle();
      this.setCache();
    },
    banksChange(value) {
      // 选择所属银行
      this.bankAreaVisible = true;
      this.branchNameVisible = false;
      this.bankCode = value;
      this.getBankListHandle();
    },
    getBankListHandle(back) {
      this.payStatusForm.unionCode = "";
      this.payStatusForm.branchName = "";
      // 获取支行
      if (this.bankCode && this.bankCity) {
        // 获取支行列表数据
        getBankList()({
          bankCode: this.bankCode,
          cityId: this.bankCity
        }).then(data => {
          console.log(data);
          if (data.code == "00") {
            this.branchBankOptions = data.data;
          }
        });
      }
    },
    customerTypeChange(value) {
      this.payStatusVisible = false; // 聚合详情
      this.qrcodeStatusVisible = false; // 快速
      this.elecStatusVisible = false; // 电子
      if (value == "qrcodeStatus") {
        this.qrcodeStatusVisible = true;
      } else if (value == "elecStatus") {
        this.elecStatusVisible = true;
      } else if (value == "payStatus") {
        this.payStatusVisible = true;
      }
    },
    goback(path) {
      this.$emit("backFn", path);
    },
    // 回显
    getCustomerEcho() {
      getOneChangeBill()({
        billNo: this.rowData.billNo,
        customerNo: this.rowData.customerNo
      }).then(res => {
        this.getCache();
        if (res.code == "00") {
          let customerData = res.data.customer;
          let settleCard = res.data.settleCard;
          if (customerData.orgCode) {
            this.payStatusForm.Area = areaOrgcode(customerData.orgCode);
            console.log(this.payStatusForm.Area)
          }
          let newCustomer = utils.pickObj(customerData, [
            'enterpriseName', 'taxNo',
            'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd',
            'idNoEffectiveBegin', 'idNoEffectiveEnd',
            'bussinessAddress', 'legalPerson', 'idCard', 'category',
            'contactEmail', "bussinessName",

          ]);
          let newSettleCard = utils.pickObj(settleCard, [
            'accountType', 'accountName', 'accountNo', 'reservedPhoneNo', 'bankCode', 'unionCode', 'branchName', 'settleIdCard'
          ]);

          this.getaccountName = newSettleCard.accountName;// 带入的企业名称
          let accountName = "";// 账户名称
          if (newSettleCard.accountType == "0") {
            // 对公:带入企业名称 不可更改
            accountName = newCustomer.enterpriseName
            this.settleIdCardVisible = false;
            this.accountNameDis = true;
          } else if (newSettleCard.accountType == "1") {
            // 对私
            accountName = newSettleCard.accountName == newCustomer.enterpriseName ? newCustomer.legalPerson : newSettleCard.accountName || newCustomer.legalPerson;
            this.accountNameDis = false;
            this.settleIdCardVisible = true;
            // this.accountNameDis = true;
          }
          this.payStatusForm = { accountName: accountName, ...this.payStatusForm, ...newCustomer, ...newSettleCard };
          this.payStatusForm = Object.assign(this.payStatusForm, this.cacheForm);
          this.validateNum(this.payStatusForm.accountNo, 'payStatusForm', 'accountNo');
        } else {
          this.payStatusForm = Object.assign({}, this.cacheForm);
          this.validateNum(this.payStatusForm.accountNo, 'payStatusForm', 'accountNo');
        }
        this.isLegalPersonSettleIdCard();
      });
    },
    isLegalPersonSettleIdCard(type) {
      if (this.accountType == "0") {
        this.settleIdCardVisible = false;
      } else if (this.accountType == "1") {
        if (this.payStatusForm.legalPerson == this.payStatusForm.accountName) {
          // 法人
          this.settleIdCardVisible = true;
          this.settleIdCardDis = true
          this.payStatusForm.settleIdCard = this.payStatusForm.idCard;
        } else {
          // 非法人
          if (type == 'inputchange') {
            if (this.payStatusForm.legalPerson != this.payStatusForm.accountName && this.payStatusForm.settleIdCard == this.payStatusForm.idCard) {
              this.payStatusForm.settleIdCard = "";
            }
          }
          this.settleIdCardVisible = true;
          this.settleIdCardDis = false;
        }
      }
    },
    accountNameChange() {
      let accountType = this.accountType;
      if (accountType == "0") {
        // 对公:带入企业名称 不可更改
        this.payStatusForm.accountName = this.payStatusForm.enterpriseName;
        this.accountNameDis = true;
        this.settleIdCardVisible = false;
      } else if (accountType == "1") {
        // 对私
        let accountName = this.getaccountName;
        this.accountNameDis = false;
        // this.payStatusForm.accountName = this.payStatusForm.legalPerson;
        // this.accountNameDis = true;
        this.payStatusForm.accountName = accountName == this.payStatusForm.enterpriseName ? this.payStatusForm.legalPerson : accountName || this.payStatusForm.legalPerson;
        this.isLegalPersonSettleIdCard();
      }
    },
    getCache() {
      try {
        this.cacheForm = JSON.parse(window.localStorage.getItem('productForm_pc' + this.bussinessNo)) || {};
      } catch (e) {
        console.log('error：暂无cache');
      }
    },
    setCache() {
      console.log(this.payStatusForm);
      window.localStorage.setItem('productForm_pc' + this.bussinessNo, JSON.stringify(this.payStatusForm));
    },
    clearCache() {
      window.localStorage.removeItem('productForm_pc' + this.bussinessNo);
    }
  },
  updated: function () {
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {
    accountType() {
      return this.payStatusForm.accountType
    },
    bussinessNo() {
      return this.rowData.bussinessNo
    },

  },
  watch: {
    accountType(val) {
      this.accountNameChange();
      this.isLegalPersonSettleIdCard();
    },
    "payStatusForm.accountName"(val) {
      this.isLegalPersonSettleIdCard();
    },
    "payStatusForm.legalPerson"(val) {
      this.accountNameChange();
      this.isLegalPersonSettleIdCard();
    }
  }
};
</script>

