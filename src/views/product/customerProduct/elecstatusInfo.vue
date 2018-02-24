<template>
  <div>
    <!-- 编辑电子发票start -->
    <template v-if="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.customerNo"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商户名称" prop="enterpriseName" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.enterpriseName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" prop="agentArea" label="经营区域" :label-width="formLabelWidth">
                <el-cascader :options="optionsArea" v-model="editForm.agentArea" @change="handleChangeArea">
                </el-cascader>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="经营地址" prop="bussinessAddress" :label-width="formLabelWidth">
                <el-input v-model="editForm.bussinessAddress" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
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
                <el-input v-model="editForm.enterpriseName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="注册资金" prop="registMoney" :label-width="formLabelWidth">
                <el-input v-model="editForm.registMoney"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="开户银行" prop="bankCode" :label-width="formLabelWidth">
                <el-input v-model="editForm.bankCode"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="银行卡号" prop="bankAccountNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.bankAccountNo"></el-input>
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
        <el-button type="primary" @click="editSave('editForm')">确定</el-button>
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
import { regionData } from "element-china-area-data";
import { phoneNumVerify } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
import {
  getCustomerProducts,
  getCheckCustomerProduct,
  getQueryCustomerProduct,
  perfectCustomer
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
      formLabelWidth: "100px",
      addFeatureTypeVisible: false, //新增的产品类型默认隐藏
      editFormVisible: false, // 编辑
      addSubmitBut: true, // 新增提交按钮不可点击
      optionsArea: regionData, //省市县插件
      electronicVisible: false, // 电票开通
      wechatVisible: false, //  微信开通暂不支持
      alipayVisible: false, //  支付宝开通暂不支持
      T0Visible: false, //   T0开通暂不支持
      T1Visible: false, //  T1开通暂不支持
      // addFormVisible: false, // 新增框
      addFormRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur" }
        ],
        // featureType: [
        //   { required: true, message: "请选择商品类型", trigger: "blur" }
        // ],
        agentArea: [
          { required: true, message: "请选择经营区域", trigger: "blur" }
        ],
        bussinessAddress: [
          { required: true, message: "请填写经营地址", trigger: "blur" }
        ],
        // bussinessPhone: [
        //   { required: true, validator: phoneNumVerify, trigger: "blur" }
        // ],
        bussinessPhone: [
          { required: true, message: "请输入有效联系方式", trigger: "blur" }
        ],
        bussinessName: [
          { required: true, message: "请输入经营名称", trigger: "blur" }
        ],
        registMoney: [
          { required: true, message: "请输入注册资金", trigger: "blur" }
        ],
        bankCode: [
          { required: true, message: "请填写开户银行", trigger: "blur" }
        ],
        bankAccountNo: [
          { required: true, message: "请填写银行卡号", trigger: "blur" }
        ],
        mounthCount: [
          { required: true, message: "请填写月开票量", trigger: "blur" }
        ]
      },
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      // 查询条件数据
      addForm: {}
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
            mounthCount: thisForm.mounthCount
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，已成功开通电票",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.goback("reload");
              // this.resetForm("addForm");
              // this.reloadData();
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
      getQueryCustomerProduct()({
        customerNo: rowdata.bussinessNo
      }).then(data => {
        if (data.code == "00") {
          this.editFormVisible = true;
          let rowdata = data.data;
          if (rowdata) {
            this.editForm.mounthCount = rowdata.elecBillnum;
            this.editForm.enterpriseName = rowdata.enterpriseName;
            this.editForm.bussinessAddress = rowdata.bussinessAddress;
            this.editForm.bussinessPhone = rowdata.bussinessPhone;
            this.editForm.bussinessName = rowdata.bussinessName;
            this.editForm.registMoney = rowdata.registMoney;
            this.editForm.bankCode = rowdata.bankCode;
            this.editForm.bankAccountNo = rowdata.bankAccountNo;
            this.editForm.agentArea = areaOrgcode(rowdata.orgCode);
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
    }
  },
  computed: {},
  mounted() {
    this.editInfo();
  }
};
</script>

