<template>
  <div>
    <!-- 编辑电子发票start -->
    <template v-if="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="商户编号" prop="customerNo">
                <el-input :disabled="true" v-model="editForm.customerNo"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商户名称" prop="enterpriseName">
                <el-input :disabled="true" v-model="editForm.enterpriseName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="full-width" prop="agentArea" label="所在地区" :label-width="formLabelWidth">
          <el-cascader :options="optionsArea" v-model="editForm.agentArea" @change="handleChangeArea">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="bussinessAddress" :label-width="formLabelWidth">
          <el-input v-model="editForm.bussinessAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="联系电话" prop="bussinessPhone" :label-width="formLabelWidth">
                <el-input v-model="editForm.bussinessPhone"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="经营名称" prop="bussinessName" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.bussinessName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="full-width" label="注册资金" prop="registMoney" :label-width="formLabelWidth">
          <el-col :span="20">
            <div class="grid-content bg-purple"></div>
            <el-input type="number" v-model.number="editForm.registMoney"></el-input>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <span class="small-line">万</span>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item class="full-width" label="开户银行" prop="bankCode" :label-width="formLabelWidth">
          <el-select :filterable='true' @input="banksChange" size="small" v-model="editForm.bankCode" placeholder="可输入关键字检索选择">
            <el-option v-for="item in bankOptions" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="full-width" v-if="bankAreaVisible" prop="bankArea" label="银行区域">
          <el-cascader @change="bankhandleChangeArea" :options="optionsArea" v-model="editForm.bankArea">
          </el-cascader>
        </el-form-item>
        <el-form-item class="full-width" prop="unionCode" label="选择支行">
          <el-input v-if="branchNameVisible" v-model="editForm.branchName" auto-complete="off"></el-input>
          <el-select filterable v-if="bankAreaVisible" prop="unionCode" v-model="editForm.unionCode" clearable placeholder="请选择">
            <el-option v-for="item in branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="银行账号" prop="bankAccountNo" :label-width="formLabelWidth">
                <el-input @input="validateNum($event,'editForm','bankAccountNo')" v-model="editForm.bankAccountNo"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="月开票量" prop="mounthCount" :label-width="formLabelWidth">
                <el-input v-model="editForm.mounthCount"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goback('close')">关闭</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确定</el-button>
      </div>
    </template>
    <!-- 编辑电子发票end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.dialog-footer {
  text-align: center;
}
</style>
<script>
import { mixinsPc } from "@src/common/mixinsPc";
import { phoneNumVerify, registMoney_r } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
import { banks } from "@src/common/bank";
import utils from "@src/common/utils"
import {
  getCustomerProducts,
  getCheckCustomerProduct,
  getQueryCustomerProduct,
  perfectCustomer,
  getBankList,
  getQueryCustomerElectronic
} from "@src/apis";
export default {
  name: "elecstatusInfo",
  components: {},
  mixins: [mixinsPc],
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    },
    doWhat: {
      type: Object
    }
  },
  data() {
    return {
      bankAreaVisible: false,
      branchNameVisible: true,
      branchBankOptions: [],
      bankCode: "",
      cityId: "",
      bankOptions: banks,
      formLabelWidth: "100px",
      addFeatureTypeVisible: false, //新增的产品类型默认隐藏
      editFormVisible: false, // 编辑
      addSubmitBut: true, // 新增提交按钮不可点击
      optionsArea: utils.areaPicherOptions(), //省市县数据
      electronicVisible: false, // 电票开通
      wechatVisible: false, //  微信开通暂不支持
      alipayVisible: false, //  支付宝开通暂不支持
      T0Visible: false, //   T0开通暂不支持
      T1Visible: false, //  T1开通暂不支持
      // addFormVisible: false, // 新增框
      addFormRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur,change" }
        ],

        agentArea: [
          { required: true, message: "请选择经营区域", trigger: "blur,change" }
        ],
        bussinessAddress: [
          { required: true, message: "请填写经营地址", trigger: "blur,change" }
        ],

        bussinessPhone: [
          { required: true, message: "请输入有效联系方式", trigger: "blur,change" }
        ],
        bussinessName: [
          { required: true, message: "请输入经营名称", trigger: "blur,change" }
        ],
        registMoney: [
          { validator: registMoney_r, trigger: "blur,change" }
          // { required: true, message: "请输入注册资金数", trigger: "blur,change" }
        ],
        bankMyCode: [
          { required: true, message: "请填写开户银行", trigger: "blur,change" }
        ],
        bankAccountNo: [
          { required: true, message: "请填写银行卡号", trigger: "blur,change" }
        ],
        mounthCount: [
          { required: true, message: "请填写月开票量", trigger: "blur,change" }
        ],
        bankCode: [
          { required: true, message: "请输入开户银行", trigger: "blur,change" }
        ],
        bankArea: [
          { required: true, message: "请选择银行区域", trigger: "blur,change" }
        ],
        unionCode: [{ required: true, message: "请选择支行", trigger: "blur,change" }]
      },
      editFormRules: {}, // 编辑单个规则
      editForm: {
        bankCode: "",
        unionCode: "",
        Area: [],
        bankArea: [] // 必须为数组
      } // 编辑单个表单
      // 查询条件数据
    };
  },
  methods: {
    getCheckCustomerProductFn(customerNo, featureType) {
      // 获取新增商户的数据
      getCheckCustomerProduct()({
        customerNo: customerNo,
        featureType: featureType
      }).then(data => {
        if (data.code == "00") {
          // this.addVisibleAll(featureType);
          if (featureType == "ELECTRONIC") {
            var data = data.data;
            this.addForm.enterpriseName = data.enterpriseName;
            this.addForm.bussinessAddress = data.bussinessAddress;
            this.addForm.bussinessName = data.bussinessName;
            this.addForm.bussinessPhone = data.bussinessPhone;
          } else {
            this.$message({
              message: "暂不支持本业务！",
              type: "warning",
              center: true
            });
          }
        } else {
          this.$message({
            message: data.msg,
            type: "warning",
            center: true
          });
          // this.resetForm("addForm");
        }
      });
    },
    addFeatureTypeVisbleFn(value) {
      if (value != "") {
        this.addFeatureTypeVisible = true;
      } else {
        this.addFeatureTypeVisible = false;
      }
    },
    handleChangeArea(value) {
      // 省市区选择
    },
    customerInputBlur() {
      // add商户编号失去焦点
      let customerNo = this.addForm.customerNo;
      let featureType = this.addForm.featureType;
      this.addFeatureTypeVisbleFn(customerNo);
      if (featureType != "" && featureType != undefined) {
        this.getCheckCustomerProductFn(customerNo, featureType);
      }
    },
    customerInputChange(value) {
      // add商户编号值发生改变
      this.addFeatureTypeVisbleFn(value);
    },
    featureTypeChange(value) {
      // add产品类型改变
      let customerNo = this.addForm.customerNo;
      let featureType = value;
      this.getCheckCustomerProductFn(customerNo, featureType);
    },
    // 保存编辑
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        let thisForm = this[formName];
        if (valid) {
          let bankName = this.bankOptions.find(r => r.code == thisForm.bankCode)
            .name;
          let branchName = "";
          if (this.branchBankOptions.length == 0) {
            branchName = thisForm.branchName;
          } else {
            branchName =
              this.branchBankOptions.find(
                r => r.unionCode == thisForm.unionCode
              ).branchName || thisForm.unionCode;
          }
          this.saveLoading = true;
          let sendata = utils.pickObj(thisForm, [
            'customerNo', 'featureType', 'enterpriseName', 'bussinessAddress',
            'bussinessPhone', 'bussinessName', 'registMoney', 'bankCode', 'bankAccountNo',
            'bankAccountNo', 'mounthCount', 'unionCode'
          ]);
          perfectCustomer()({
            branchName: branchName,
            bankName: bankName,
            ...this.changeAgentArea(thisForm.agentArea),
            ...sendata
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，已成功开通电票",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.goback("reload");
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
            this.saveLoading = false;
          });
        }
      });
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
    goback(path) {
      this.$emit("backFn", path);
    },
    // 回显
    editInfo() {
      let rowdata = this.rowData;
      this.editForm.featureType = "ELECTRONIC";
      this.editForm.customerNo = rowdata.bussinessNo;
      getQueryCustomerElectronic()({
        customerNo: rowdata.bussinessNo,
        featureType: "ELECTRONIC"
      }).then(data => {
        if (data.code == "00") {
          this.editFormVisible = true;
          let rowdata = data.data;
          if (rowdata) {
            let customer = rowdata.customer;
            let customerInvoiceConfig = rowdata.customerInvoiceConfig;
            let product = rowdata.product;
            let newCustomer = utils.pickObj(customer, [
              'enterpriseName', 'bussinessAddress', 'bussinessPhone', 'bussinessName', 'registMoney'
            ]);
            let newCustomerInvoiceConfig = utils.pickObj(customerInvoiceConfig, [
              'bankCode', 'unionCode', 'branchName', 'bankAccountNo'
            ]);
            if (customer) {
              this.editForm.agentArea =
                customer.orgCode && areaOrgcode(customer.orgCode);
            }
            if (product) {
              this.editForm.mounthCount = product.elecBillnum;
            }
            this.editForm = { ...this.editForm, ...newCustomer, ...newCustomerInvoiceConfig }
            // this.validateNum(this.editForm.bankAccountNo, 'editForm', 'bankAccountNo');
          }
        } else {
          this.editFormVisible = false;
          this.$message({
            message: data.msg,
            type: "warning",
            center: true
          });
        }
      });
    },
    banksChange(value) {
      // 选择所属银行
      this.bankAreaVisible = true;
      this.branchNameVisible = false;
      this.bankCode = value;
      this.getBankListHandle();
    },
    bankhandleChangeArea(value) {
      //选择银行区域
      this.bankCity = value[2] || value[1] || value[0];
      this.getBankListHandle();
    },
    getBankListHandle(back) {
      this.editForm.unionCode = "";
      this.editForm.branchName = "";
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
  },
  created() {
    this.editInfo();
  },
  computed: {},
  mounted() { },
  watch: {
    addFeatureTypeVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    }
  }
};
</script>

