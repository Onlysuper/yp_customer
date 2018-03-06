<template>
  <div>
    <el-form size="small" :model="payStatusForm" ref="payStatusForm" :rules="payStatusFormRules" label-width="100px">
      <el-form-item class="full-width" label="商户全称" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="商户简称" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="营业执照开始时间" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="full-width" label="营业执照结束时间" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <!-- 以上为新加内容 -->
      <el-form-item class="full-width" prop="Area" label="所在地区">
        <el-cascader :options="optionsArea" v-model="payStatusForm.Area">
        </el-cascader>
      </el-form-item>
      <el-form-item class="full-width" label="详细地址" prop="bussinessAddress" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.bussinessAddress" auto-complete="off"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="法人" prop="legalPerson" :label-width="formLabelWidth">
              <el-input v-model="payStatusForm.legalPerson" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idCard" :label-width="formLabelWidth">
            <el-input v-model="payStatusForm.idCard" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item class="full-width" label="行业类型" prop="category" :label-width="formLabelWidth">
              <el-select size="small" v-model="payStatusForm.category" placeholder="请选择">
                <el-option v-for="item in slotsActions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="contactEmail" :label-width="formLabelWidth">
            <el-input v-model="payStatusForm.contactEmail" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item class="full-width" label="账户类型" prop="accountType" :label-width="formLabelWidth">
              <el-select size="small" v-model="payStatusForm.accountType" placeholder="请选择">
                <el-option v-for="item in selectOptions.accountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="accountNo" :label-width="formLabelWidth">
            <el-input v-model="payStatusForm.accountNo" auto-complete="off"></el-input>
          </el-form-item>

        </el-col>
      </el-row>
      <!-- <el-form-item label="账户名称" prop="accountNo" :label-width="formLabelWidth">
        <el-input v-model="payStatusForm.accountNo" auto-complete="off"></el-input>
      </el-form-item> -->
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
.dialog-footer {
  text-align: center;
}
</style>
<script>
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { regionData } from "element-china-area-data";
import { areaOrgcode } from "@src/common/orgcode";
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
      formLabelWidth: "100px",
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
      formLabelWidth: "100px",
      payStatusForm: {
        customerType: this.customerTypeSelected[0].value,
        category: "",
        accountType: "",
        bankCode: "",
        unionCode: "",
        Area: [],
        bankArea: [] // 必须为数组
      },
      payStatusFormRules: {
        Area: [{ required: true, message: "请输入经营区域", trigger: "blur" }],
        bussinessAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入法人名称", trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请输入法人身份证号", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请选择行业类型", trigger: "blur" }
        ],
        contactEmail: [
          // { required: true, message: "请输入有效邮箱", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "请选择结算信息", trigger: "blur" }
        ],
        phoneNo: [
          { required: true, message: "请输入预留手机号码", trigger: "blur" }
        ],
        bankCode: [
          { required: true, message: "请输入开户银行", trigger: "blur" }
        ],
        bankArea: [
          { required: true, message: "请选择银行区域", trigger: "blur" }
        ],
        unionCode: [{ required: true, message: "请选择支行", trigger: "blur" }],
        accountNo: [{ required: true, message: "请输入账号", trigger: "blur" }]
      } // 编辑单个规则
    };
  },
  methods: {
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
          let obj = {
            customerNo: this.rowData.bussinessNo,
            orgCode:
              payStatusForm.Area[2] ||
              payStatusForm.Area[1] ||
              payStatusForm.Area[0] ||
              "",
            bussinessAddress: payStatusForm.bussinessAddress,
            legalPerson: payStatusForm.legalPerson,
            idCard: payStatusForm.idCard,
            contactEmail: payStatusForm.contactEmail,
            category: payStatusForm.category,
            accountNo: payStatusForm.accountNo,
            accountType: payStatusForm.accountType,
            unionCode: payStatusForm.unionCode,
            branchName: branchName,
            bankCode: payStatusForm.bankCode,
            bankName: bankName,
            phoneNo: payStatusForm.phoneNo
          };
          this.saveLoading = true;
          completeSettleInfo()(obj).then(data => {
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
      console.log(value);
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
          console.log(res.data);
          let customerData = res.data.customer;
          let settleCard = res.data.settleCard;
          if (customerData.orgCode) {
            this.payStatusForm.Area = areaOrgcode(customerData.orgCode);
          }
          this.payStatusForm.bussinessAddress = customerData.bussinessAddress;
          this.payStatusForm.legalPerson = customerData.legalPerson;
          this.payStatusForm.idCard = customerData.idCard;
          this.payStatusForm.category = customerData.category;
          this.payStatusForm.contactEmail = customerData.contactEmail;
          if (settleCard != null) {
            this.payStatusForm.accountType = settleCard.accountType;
            this.payStatusForm.accountNo = settleCard.accountNo;
            this.payStatusForm.phoneNo = settleCard.phoneNo;
            this.payStatusForm.bankCode = settleCard.bankCode;
            this.payStatusForm.unionCode = settleCard.unionCode;
            this.payStatusForm.branchName = settleCard.branchName;
          }
        }
      });
    }
  },
  created() {
    this.getCustomerEcho();
  },
  computed: {},
  watch: {}
};
</script>

