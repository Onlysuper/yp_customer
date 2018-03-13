<template>
  <div class="paystatusInfo-box">
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="120px">
      <el-form-item class="full-width" label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
        <el-input :disabled="true" v-model="payStatusForm.enterpriseName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="企业税号" prop="taxNo" :label-width="formLabelWidth">
        <el-input :disabled="true" v-model="payStatusForm.taxNo" auto-complete="off"></el-input>
      </el-form-item>
      <div class="bussinessLicense-box">
        <el-form-item class="" label="营业执照期限" prop="bussinessLicenseEffectiveBegin" :label-width="formLabelWidth">
          <el-date-picker value-format="yyyy-MM-dd" class="full-width" v-model="payStatusForm.bussinessLicenseEffectiveBegin" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="full-width" label="至" prop="bussinessLicenseEffectiveEnd" label-width="50px">
          <el-date-picker value-format="yyyy-MM-dd" v-model="payStatusForm.bussinessLicenseEffectiveEnd" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </div>
      <!-- 以上为新加内容 -->
      <el-form-item class="full-width" prop="Area" label="所在地区">
        <el-cascader :options="optionsArea" v-model="payStatusForm.Area" ref="payStatusForm_area">
        </el-cascader>
      </el-form-item>
      <el-form-item class="full-width" label="详细地址" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="legalPerson" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.legalPerson" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="is-required" label="身份证号" prop="idCard" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.idCard" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="行业类型" prop="category" :label-width="formLabelWidth">
        <el-select size="small" v-model="payStatusForm.category" placeholder="请选择">
          <el-option v-for="item in slotsActions" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="full-width" label="账户类型" prop="accountType" :label-width="formLabelWidth">
        <el-select size="small" v-model="payStatusForm.accountType" placeholder="请选择">
          <el-option v-for="item in selectOptions.accountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号" prop="accountNo" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.accountNo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="预留手机号" prop="phoneNo" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.phoneNo" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="开户银行" prop="bankCode" :label-width="formLabelWidth">
        <el-select @input="banksChange" size="small" v-model="payStatusForm.bankCode" placeholder="请选择">
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
        <el-select v-if="bankAreaVisible" prop="unionCode" v-model="payStatusForm.unionCode" clearable placeholder="请选择">
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
  .bussinessLicense-box {
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
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify, idCardVerify_r } from "@src/common/regexp";
import { regionData } from "element-china-area-data";
import { areaOrgcode } from "@src/common/orgcode";
import utils from "@src/common/utils"
import {
  getBankList,
  completeSettleInfo,
  getCustomerEchoProduct
} from "@src/apis";
import { banks } from "@src/common/bank";
export default {
  name: "paystatusInfo",
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    }
  },
  components: {},
  mixins: [mixinsPc],
  data() {
    return {
      currentChildView: "",
      formLabelWidth: "120px",
      bankOptions: banks,
      slotsActions: bussinessTypeJson,
      optionsArea: regionData, //省市县插件
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
      payStatusForm: {
        customerType: this.customerTypeSelected[0].value,
        bussinessLicenseEffectiveBegin: "",
        bussinessLicenseEffectiveEnd: "",
        category: "",
        accountType: "",
        bankCode: "",
        unionCode: "",
        Area: [],
        bankArea: [] // 必须为数组
      },
      payStatusFormRules: {
        bussinessLicenseEffectiveBegin: [
          { required: true, message: "请选择经营执照开始时间", trigger: "blur,change" }
        ],
        bussinessLicenseEffectiveEnd: [
          { required: true, message: "请选择经营执照结束时间", trigger: "blur,change" }
        ],
        Area: [{ required: true, message: "请输入经营区域", trigger: "blur,change" }],
        bussinessAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur,change" }
        ],
        legalPerson: [
          { required: true, message: "请输入法人名称", trigger: "blur,change" }
        ],
        idCard: [
          { validator: idCardVerify_r, trigger: "blur,change" }
        ],
        category: [
          { required: true, message: "请选择行业类型", trigger: "blur,change" }
        ],
        accountType: [
          { required: true, message: "请选择结算信息", trigger: "blur,change" }
        ],
        phoneNo: [
          { required: true, message: "请输入预留手机号码", trigger: "blur,change" }
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          let payStatusForm = this.payStatusForm;
          let bankName = this.bankOptions.find(
            r => r.code == payStatusForm.bankCode
          ).name;
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
            'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd',
            'bussinessAddress', 'legalPerson', "idCard", 'category', 'accountNo', 'accountType', 'phoneNo',
            'unionCode',
            'bankCode',
          ]);
          let sendata = {
            customerNo: this.rowData.bussinessNo,
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
      getCustomerEchoProduct()({
        customerNo: this.rowData.bussinessNo,
        featureType: "CONVERGE_PAY"
      }).then(res => {
        if (res.code == "00") {
          let customerData = res.data.customer;
          let settleCard = res.data.settleCard;
          if (customerData.orgCode) {
            this.payStatusForm.Area = areaOrgcode(customerData.orgCode);
          }
          let newCustomer = utils.pickObj(customerData, [
            'enterpriseName', 'taxNo',
            'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd',
            'bussinessAddress', 'legalPerson', 'idCard', 'category'
          ]);
          let newSettleCard = utils.pickObj(settleCard, [
            'accountType', 'accountNo', 'phoneNo', 'bankCode', 'unionCode', 'branchName'
          ]);
          this.payStatusForm = { ...this.payStatusForm, ...newCustomer, ...newSettleCard }
        }
      });
    }
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {},
  watch: {
    payStatusForm(value) {
      // console.log('改变了')
    }
  }
};
</script>

