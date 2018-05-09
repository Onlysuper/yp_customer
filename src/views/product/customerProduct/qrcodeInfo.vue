<template>
  <div>
    <!-- 快速开票start -->
    暂不支持
    <!-- 快速开票end  -->
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
import { phoneNumVerify } from "@src/common/regexp";
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
          { required: true, message: "请输入注册资金", trigger: "blur,change" }
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
          perfectCustomer()({
            customerNo: thisForm.customerNo,
            featureType: thisForm.featureType,
            enterpriseName: thisForm.enterpriseName,
            province: thisForm.agentArea[0],
            city: thisForm.agentArea[1],
            orgCode: thisForm.agentArea[2],
            bussinessAddress: thisForm.bussinessAddress,
            bussinessPhone: thisForm.bussinessPhone,
            bussinessName: thisForm.bussinessName,
            registMoney: thisForm.registMoney,
            bankCode: thisForm.bankCode,
            bankAccountNo: thisForm.bankAccountNo,
            mounthCount: thisForm.mounthCount,
            unionCode: thisForm.unionCode,
            branchName: branchName,
            bankCode: thisForm.bankCode,
            bankName: bankName
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
          });
        }
      });
    },
    goback(path) {
      this.$emit("backFn", path);
    },
    editInfo() {
      let rowdata = this.rowData;
      this.editForm.featureType = "ELECTRONIC";
      this.editForm.customerNo = rowdata.bussinessNo;
      getQueryCustomerElectronic()({
        customerNo: rowdata.bussinessNo,
        featureType: "ELECTRONIC"
      }).then(data => {
        // console.log(data);
        if (data.code == "00") {
          this.editFormVisible = true;
          let rowdata = data.data;
          if (rowdata) {
            let customer = rowdata.customer;
            let customerInvoiceConfig = rowdata.customerInvoiceConfig;
            let product = rowdata.product;
            if (customer) {
              this.editForm.enterpriseName = customer.enterpriseName;
              this.editForm.agentArea =
                customer.orgCode && areaOrgcode(customer.orgCode);
              this.editForm.bussinessAddress = customer.bussinessAddress;
              this.editForm.bussinessPhone = customer.bussinessPhone;
              this.editForm.bussinessName = customer.bussinessName;
              this.editForm.registMoney = customer.registMoney;
            }
            if (customerInvoiceConfig) {
              this.editForm.bankCode = customerInvoiceConfig.bankCode;
              this.editForm.unionCode = customerInvoiceConfig.unionCode;
              this.editForm.branchName = customerInvoiceConfig.branchName;
              this.editForm.bankAccountNo = customerInvoiceConfig.bankAccountNo;
            }
            if (product) {
              this.editForm.mounthCount = product.elecBillnum;
            }
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
      console.log(value);
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
    }
  },
  created() {
    this.editInfo();
  },
  computed: {},
  mounted() { }
};
</script>

