<template>
  <!-- 商户产品 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="showDialog('addFormVisible')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增产品开通" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input v-model="addForm.customerNo" @blur="customerInputBlur" @input="customerInputChange"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12" v-if="addFeatureTypeVisible">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width" label="产品类型" prop="featureType" :label-width="formLabelWidth">
                <el-select @change="featureTypeChange" v-model="addForm.featureType" placeholder="请选择">
                  <el-option v-for="item in selectOptions.featureType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!-- 新增隐藏start -->
        <template v-if="electronicVisible">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="商户名称" prop="enterpriseName" :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="addForm.enterpriseName" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="经营名称" prop="bussinessName" :label-width="formLabelWidth">
                  <el-input v-model="addForm.bussinessName" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item class="full-width" prop="agentArea" label="经营区域" :label-width="formLabelWidth">
                  <el-cascader :options="optionsArea" v-model="addForm.agentArea" @change="handleChangeArea">
                  </el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="经营地址" prop="bussinessAddress" :label-width="formLabelWidth">
                  <el-input v-model="addForm.bussinessAddress" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="注册资金" prop="registMoney" :label-width="formLabelWidth">
                  <el-input v-model="addForm.registMoney" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="联系电话" prop="bussinessPhone" :label-width="formLabelWidth">
                  <el-input v-model="addForm.bussinessPhone" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="开户银行" prop="bankCode" :label-width="formLabelWidth">
                  <el-input v-model="addForm.bankCode" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="银行卡号" prop="bankAccountNo" :label-width="formLabelWidth">
                  <el-input v-model="addForm.bankAccountNo" auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item label="月开票量" prop="mounthCount" :label-width="formLabelWidth">
            <el-input v-model="addForm.mounthCount" auto-complete="off"></el-input>
          </el-form-item>
        </template>
        <template v-if="wechatVisible">
          微信开通暂不支持
        </template>
        <template v-if="alipayVisible">
          支付宝开通暂不支持
        </template>
        <template v-if="T0Visible">
          T0开通暂不支持
        </template>
        <template v-if="T1Visible">
          T1开通暂不支持
        </template>
        <!-- 新增隐藏end -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button type="primary" @click="addSave('addForm')" :disabled="addSubmitBut">提交</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑start -->
    <el-dialog center title="修改商户信息" :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.customerNo"></el-input>
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
        <el-button @click="editFormVisible=false">关闭</el-button>
        <el-button type="primary" @click="editSave('editForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import { regionData } from "element-china-area-data";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { phoneNumVerify } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import {
  getCustomerProducts,
  getCheckCustomerProduct,
  getQueryCustomerProduct,
  perfectCustomer
} from "@src/apis";
export default {
  name: "customerProduct",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      businessNo: "", // 商户编号
      featureType: "" // 产品类型
    };
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
      selectOptions: {
        featureType: [
          // 产品类型
          {
            value: "ELECTRONIC",
            label: "电子发票"
          },
          {
            value: "WECHAT_COST",
            label: "微信支付"
          },
          {
            value: "ALIPAY_COST",
            label: "支付宝支付"
          },
          {
            value: "T0_CASH_COST",
            label: "T0提现"
          },
          {
            value: "T1_CASH_COST",
            label: "T1提现"
          }
        ]
      },
      addFormVisible: false, // 新增框
      addFormRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur" }
        ],
        featureType: [
          { required: true, message: "请选择商品类型", trigger: "blur" }
        ],
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
      addForm: {},
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "businessNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.businessNo = value;
          }
        },
        {
          corresattr: "featureType",
          type: "select",
          label: "产品类型",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "QRCODE_BILLING",
              label: "快速开票"
            },
            {
              value: "ELECTRONIC",
              label: "电子发票"
            },
            {
              value: "WECHAT_COST",
              label: "微信支付"
            },
            {
              value: "ALIPAY_COST",
              label: "支付宝支付"
            },
            {
              value: "T0_CASH_COST",
              label: "T0提现"
            },
            {
              value: "T1_CASH_COST",
              label: "T1提现"
            }
          ],
          cb: value => {
            this.searchCondition.featureType = value;
          }
        }
      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomerProducts // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "120px",
            sortable: true,
            word: "bussinessNo"
          },
          {
            key: "代理商",
            width: "100px",
            word: "levelDetail"
          },
          {
            key: "产品类型",
            width: "130px",
            word: "featureType",
            status: true,
            type: data => {
              if (data == "QRCODE_BILLING") {
                return {
                  text: "快速开票",
                  type: "success"
                };
              } else if (data == "ELECTRONIC") {
                return {
                  text: "电子发票",
                  type: "warning"
                };
              } else if (data == "WECHAT_COST") {
                return {
                  text: "微信支付",
                  type: "success"
                };
              } else if (data == "ALIPAY_COST") {
                return {
                  text: "支付宝支付",
                  type: ""
                };
              } else if (data == "T0_CASH_COST") {
                return {
                  text: "T0提现",
                  type: ""
                };
              } else if (data == "T1_CASH_COST") {
                return {
                  text: "T1提现",
                  type: "info"
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
          },
          {
            key: "费率",
            width: "100px",
            word: "rate"
            // status: true,
            // type: data => {
            //   return {
            //     text: data,
            //     type: "info"
            //   };
            // }
          },
          {
            key: "单笔",
            width: "120px",
            word: "fixed",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "封顶",
            width: "80px",
            word: "capped",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "月电票量",
            width: "80px",
            word: "elecBillnum",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "开始有效期",
            width: "150px",
            word: "effectiveBegin"
          },
          {
            key: "结束有效期",
            width: "",
            word: "effectiveEnd"
          }
        ],
        operation: {
          width: "50px",
          options: [
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                console.log(rowdata);
                this.editForm.featureType = rowdata.featureType;
                this.editForm.customerNo = rowdata.bussinessNo;
                getQueryCustomerProduct()({
                  customerNo: rowdata.bussinessNo
                }).then(data => {
                  if (data.code == "00") {
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
                      this.editFormVisible = true;
                    }
                  } else {
                    this.$message({
                      message: data.msg,
                      type: "warning",
                      center: true
                    });
                  }
                });
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    addVisibleAll(featureType) {
      if ("ELECTRONIC" == featureType) {
        this.electronicVisible = true; // 电票开通
        this.wechatVisible = false; //  微信开通暂不支持
        this.alipayVisible = false; //  支付宝开通暂不支持
        this.T0Visible = false; //   T0开通暂不支持
        this.T1Visible = false; //  T1开通暂不支持
        this.addSubmitBut = false; // 可提交
      } else if ("WECHAT_COST" == featureType) {
        this.electronicVisible = false; // 电票开通
        this.wechatVisible = true; //  微信开通暂不支持
        this.alipayVisible = false; //  支付宝开通暂不支持
        this.T0Visible = false; //   T0开通暂不支持
        this.T1Visible = false; //  T1开通暂不支持
        this.addSubmitBut = true; //不可提交
      } else if ("ALIPAY_COST" == featureType) {
        this.electronicVisible = false; // 电票开通
        this.wechatVisible = false; //  微信开通暂不支持
        this.alipayVisible = true; //  支付宝开通暂不支持
        this.T0Visible = false; //   T0开通暂不支持
        this.T1Visible = false; //  T1开通暂不支持
        this.addSubmitBut = true; //不可提交
      } else if ("T0_CASH_COST" == featureType) {
        this.electronicVisible = false; // 电票开通
        this.wechatVisible = false; //  微信开通暂不支持
        this.alipayVisible = false; //  支付宝开通暂不支持
        this.T0Visible = true; //   T0开通暂不支持
        this.T1Visible = false; //  T1开通暂不支持
        this.addSubmitBut = true; //不可提交
      } else if ("T1_CASH_COST" == featureType) {
        this.electronicVisible = false; // 电票开通
        this.wechatVisible = false; //  微信开通暂不支持
        this.alipayVisible = false; //  支付宝开通暂不支持
        this.T0Visible = false; //   T0开通暂不支持
        this.T1Visible = true; //  T1开通暂不支持
        this.addSubmitBut = true; //不可提交
      }
    },
    addHideAll() {
      this.electronicVisible = false; // 电票开通
      this.wechatVisible = false; //  微信开通暂不支持
      this.alipayVisible = false; //  支付宝开通暂不支持
      this.T0Visible = false; //   T0开通暂不支持
      this.T1Visible = false; //  T1开通暂不支持
      this.addSubmitBut = true; //不可提交
    },
    getCheckCustomerProductFn(customerNo, featureType) {
      // 获取新增商户的数据
      getCheckCustomerProduct()({
        customerNo: customerNo,
        featureType: featureType
      }).then(data => {
        if (data.code == "00") {
          this.addVisibleAll(featureType);
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
            this.addHideAll();
          }
        } else {
          this.$message({
            message: data.msg,
            type: "warning",
            center: true
          });
          // this.resetForm("addForm");
          this.addHideAll();
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

    // 新增保存
    addSave(formName) {
      // 新增内容保存
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
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetForm("addForm");
              this.reloadData();
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
                message: "恭喜你，数据修改成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.resetForm("addForm");
              this.reloadData();
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
    }
  },
  computed: {},
  mounted() {}
};
</script>

