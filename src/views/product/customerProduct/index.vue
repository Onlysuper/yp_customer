<template>
  <!-- 商户管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 商户状态 start -->
    <!-- <el-dialog top="10px" class="special-dialog" title="信息详情" center :visible.sync="detailsFormVisible" id="dialogLoding"> -->
    <el-dialog class="special-dialog-new" bottom="10px" title="" center :visible.sync="detailsFormVisible" id="dialogLoding" :close-on-click-modal="false">
      <div class="detail-content-pro">
        <template>
          <!-- 聚合详情 -->
          <div class="line-box-left dialog-title-box">
            <el-select size="small" v-model="selectOptions.customerType" placeholder="请选择">
              <el-option v-for="item in selectOptions.customerTypeOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
            <span class="title-box">信息详情</span>
          </div>
          <component ref="detailProductView" v-on:nextFn="nextFn" v-on:backFn="backFn" v-bind:is="detailProductView" :customerTypeSelected="customerTypeSelected" :rowData="resaultData">
          </component>
        </template>
      </div>
      <div v-if="editVisiblebut||checkVisiblebut||checkVisiblebut" slot="footer" class="dialog-footer">
        <el-button v-if="editVisiblebut" type="primary" @click="editFn()">编辑</el-button>
        <el-button v-if="checkVisiblebut" type="primary" @click="adoptSave(selectOptions.customerType,detailsForm)">审核通过</el-button>
        <el-button v-if="checkVisiblebut" type="primary" @click="refuseSave(selectOptions.customerType,detailsForm)">审核拒绝</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 开通产品 start -->
    <el-dialog :title="productOpenTitle" center :visible.sync="editFormVisible">
      <!-- <keep-alive> -->
      <component v-on:titleChange="titleChange" v-on:nextFn="nextFn" v-on:backFn="backFn" v-bind:is="openProductView" :customerTypeSelected="customerTypeSelected" :rowData="resaultData">
        <!-- 组件在 vm.openProductView 变化时改变！ -->
      </component>
      <!-- </keep-alive> -->
    </el-dialog>
    <!-- 开通产品 end -->
    <!-- 关闭start -->
    <el-dialog title="关闭" center :visible.sync="closeVisible">
      <div class="line-box-center">
        <el-select size="small" v-model="selectOptions.customerType" placeholder="请选择">
          <el-option v-for="item in selectOptions.customerTypeOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <el-form size="small" :model="closeForm" ref="closeForm" :rules="closeFormRules" label-width="100px">
        <el-form-item prop="reason" label="关闭原因">
          <el-input type="textarea" v-model="closeForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeSave('closeForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 关闭end -->
    <!-- 排版 -->
    <el-dialog title="" center :visible.sync="styleVisible">
      <el-form size="small" :model="styleForm" ref="styleForm" :rules="styleFormRules" label-width="100px">
        <el-form-item label="开票类型:" prop="supportTypes" :label-width="formLabelWidth">
          <el-checkbox-group @input="supportTypesChange" v-model="styleForm.supportTypes">
            <el-checkbox v-for="item in supportTypesOptions" :label="item.code" :key="item.code">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="支付类型:" prop="" :label-width="formLabelWidth">
          <el-checkbox-group @change="payTypesChange" v-model="styleForm.payTypes">
            <el-checkbox v-for="item in payTypesOptions" :disabled="item.disabled" :label="item.code" :key="item.code">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="styleVisible = false">取 消</el-button>
        <el-button type="primary" @click="styleFormSave('styleForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@media screen and (min-width: 500px) {
  .scroll-view-cus {
    // touch-action: none;
    /* -- Attention-- */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .admin-page {
    .small-but {
      position: absolute;
      // width: 30px;
      // height: 30px;
      padding: 0 5px;
      text-align: center;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      z-index: 10;
      top: 40px;
      color: #fff;
      cursor: pointer;
      &.next {
        right: 0;
      }
      &.pre {
        left: 0;
      }
    }
    .imageBox li {
      text-align: center;
    }
    .special-dialog-new {
      // height: 100%;
      top: 20px !important;
      left: 20px !important;
      right: 20px !important;
      bottom: 20px !important;
      position: fixed;
      align-items: stretch;
      overflow: hidden;
      flex-direction: column;
      .el-dialog__headerbtn {
        z-index: 999;
      }
      .dialog-title-box {
        display: flex;
        padding: 4px 0;
        padding-bottom: 10px;
        position: relative;
        flex-shrink: 0;
        box-sizing: border-box;
        .title-box {
          // flex: 1;
          flex: 1;
          align-self: center;
          text-align: center;
          font-size: 20px;
          padding-right: 120px;
        }
      }
      .el-dialog {
        margin: 0px !important;
        width: 100%;
        flex: 1;
        flex-direction: column;
        height: 100%;
        align-items: stretch;
        display: flex;
      }
      .el-dialog__header {
        width: 100%;
        flex: 1;
        flex-grow: 0;
        margin: 0;
        padding: 0;
        height: 0;
      }
      .el-dialog__body {
        padding-top: 0px;
        padding-bottom: 0px;
        flex: 1;
        display: flex;
        // flex-basis: 100%;
        height: 100%;
      }
      .el-dialog__footer {
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }
  .detail-content-pro {
    flex: 1;
    height: 100%;
    // overflow: auto;
    // position: relative;
    display: flex;
    flex-direction: column;
    // width: 100%;
    // background: red;
  }
}
</style>
<script> 
import imageView from 'vue-imageview'
import ScrollPane from "@src/components/ScrollPane";
import FullShade from "@src/components/FullShade";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { regionData } from "element-china-area-data";
import utils from "@src/common/utils";
import openInfo from "./openInfo";
import paystatusGoods from "./paystatusGoods";
import paystatusUpload from "./paystatusUpload";
import paystatusSuccess from "./paystatusSuccess";
import payDetail from "./payDetail";
import elecDetail from "./elecDetail";
import qrcodeDetail from "./qrcodeDetail";
import {
  getCustomerOpenProducts,
  postCustomerOpenProductSearch,
  getCustomerEchoProduct,
  postHandleCustomerProduct,
  getQueryCustomerElectronic,
  getUserProductStatus
} from "@src/apis";

export default {
  name: "customerProduct",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    openInfo: openInfo,
    paystatusGoods: paystatusGoods,
    paystatusUpload: paystatusUpload,
    paystatusSuccess: paystatusSuccess,
    openInfo: openInfo,
    payDetail,
    elecDetail,
    qrcodeDetail
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var user = this.$store.state.userInfoAndMenu.userMessage.all;
    var isAdmin = user.userType === "root" || user.userType === "admin" || user.userType === "operator"; // 运营
    var isBranchOffice = user.userType === "branchOffice"; // 分公司
    var searchConditionVar = {
      bussinessNo: "",
      customerName: "",
      qrcodeStatus: "",
      elecStatus: "",
      payStatus: ""
    };
    var detailsForm = { // 查看一级数据详情 数据解构
      customer: {},
      settleCard: {},
      product: {},
      imgs: {
        identityBackImg: {
          url: ""
        },

        identityFrontImg: {
          url: ""
        },
        identityHolderImg: {
          url: ""
        },
        bussinessLicenseImg: {
          url: ""
        },
        settleCardImg: {
          url: ""
        },
        accountLicenseImg: {
          url: ""
        },
        placeImg: {
          url: ""
        },
        storeImg: {
          url: ""
        },
        cashSpaceImg: {
          url: ""
        }
      }
    }
    // 聚合支付详情默认数据解构
    var payStatusDetails = {
      orgCode: "", //所在地
      bussinessAddress: "", //注册地址
      legalPerson: "", //法人
      idCard: "", //身份证号
      category: "", //行业类型
      // contactEmail: "", //邮箱
      accountType: "", //账户类型
      accountName: "", //账户名称
      bankName: "", //开户银行
      branchName: "", //开户支行
      accountNo: "", //账号
      wechatRate: "", //微信费率
      settleMode: "", //开通即刷即到
      t0CashCostFixed: "", //D0手续费
      identityFrontImg: "", //法人身份证人像面
      identityBackImg: "", //法人身份证国徽面
      identityHolderImg: "", //手持身份证
      bussinessLicenseImg: "", //营业执照
      settleCardImg: "", //结算卡正面
      accountLicenseImg: "", //开户许可证
      placeImg: "", //门头照片
      storeImg: "", //店内照片
      cashSpaceImg: "" //收银台照片
    }
    var elecStatusDetails = { // 电子发票默认数据解构
      orgCode: "", //注册省份
      bussinessAddress: "", //注册地址
      bussinessPhone: "", //联系电话
      bussinessName: "", //经营名称
      registMoney: "", //注册资金
      branchName: "", //开户银行
      bankAccountNo: "", //银行账号
      elecBillnum: "", //月开票量
      elecReason: "" //被拒原因
    }
    var qrcodeImgs = { // 快速开票图片
      fastBussinessImg: {
        url: "",
      },
      fastCashImg: {
        url: "",
      },
      fastHeaderImg: {
        url: "",
      }
    }
    return {
      accountVisible: false,// 开户行许可证 
      certificateVisible: false,// 授权书
      detailProductView: "",
      iscrollOptions: {
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      },
      styleForm: {
        supportTypes: [],
        // supportTypesArr: ["普票", "专票", "特殊"],
        payTypes: [],
        // payTypesArr: ["B扫C", "C扫B"]
      },
      supportTypesOptions: [
        {
          name: "普票",
          code: "1"
        },
        {
          name: "专票",
          code: "2"
        },
        {
          name: "特殊",
          code: "4"
        }
      ],
      payTypesOptions: [
        {
          name: "B扫C",
          code: "1"
        },
        {
          name: "C扫B",
          code: "2"
        },
        {
          name: "纯支付",
          code: "4"
        }
      ],
      largeUrl: "",
      fadeViewVisible: false,
      styleVisible: false,
      // showImageVisible: true,
      largeImgUrl: "",
      qrcodelargeImgUrl: "",
      isAdmin: isAdmin,
      // 默认数据初始值
      detailsFormDefault: { ...detailsForm },
      resaultDataDefault: {},
      payStatusDetailsDefault: { ...payStatusDetails },
      elecStatusDetailsDefault: { ...elecStatusDetails },
      qrcodeImgsDefault: { ...qrcodeImgs },
      // 默认数据初始值 end
      detailsForm: detailsForm,
      resaultData: {},
      payStatusDetails: payStatusDetails,
      elecStatusDetails: elecStatusDetails,
      qrcodeImgs: qrcodeImgs,
      search: false,// 查询状态
      check: false,// 查询状态
      checkVisiblebut: false,
      editVisiblebut: false,
      closeVisible: false,
      rejectReason: "", //拒绝理由
      productOpenTitle: "完善信息",
      openProductView: "openInfo",
      customerTypeSelected: [],
      optionsArea: regionData, //省市县插件
      sumLoading: false,
      payStatusVisible: false, // 聚合详情
      qrcodeStatusVisible: false, // 快速
      elecStatusVisible: false, // 电子
      selectOptions: {
        customerType: "payStatus",
        customerTypeOptions: [
          {
            value: "payStatus",
            label: "聚合支付",
            disabled: false
          },
          {
            value: "qrcodeStatus",
            label: "快速开票",
            disabled: false
          },
          {
            value: "elecStatus",
            label: "电子发票",
            disabled: false
          }
        ]
      },

      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "130px",
      payStatusFormRules: {}, // 编辑单个规则
      payStatusForm: {
        Area: [] // 必须为数组
      }, // 编辑单个表单
      // 聚合支付查询详情

      qrcodeStatusDetails: {}, // 快速开票查询详情
      resaultForm: {}, // 拒绝表单
      closeForm: {},
      closeFormRules: {
        reason: [
          { required: true, message: "请填写关闭原因", trigger: "blur,change" }
        ]
      },
      styleFormRules: {
        payTypes: [
          { required: true, message: "请选择支付类型", trigger: "blur" }
        ],
        supportTypes: [
          { required: true, message: "请选择开票类型", trigger: "blur" }
        ]
      },
      resaultFormRules: {
        reason: [{ required: true, message: "请填写拒绝理由", trigger: "blur,change" }]
      },


      // 查询条件数据
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "bussinessNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.bussinessNo = value;
          }
        },
        {
          corresattr: "customerName",
          type: "text",
          label: "商户名称",
          show: true, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.customerName = value;
          }
        },
        {
          corresattr: "payStatus",
          type: "select",
          label: "聚合支付",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              label: "全部",
              value: ""
            },
            ...this.statusFilterQuery('handleProductOpenStatus')
          ],
          cb: value => {
            this.searchCondition.payStatus = value;
          }
        },
        {
          corresattr: "qrcodeStatus",
          type: "select",
          label: "快速开票",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              label: "全部",
              value: ""
            },
            ...this.statusFilterQuery('handleProductOpenStatus')
          ],
          cb: value => {
            this.searchCondition.qrcodeStatus = value;
          }
        },
        {
          corresattr: "elecStatus",
          type: "select",
          label: "电子发票",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              label: "全部",
              value: ""
            },
            ...this.statusFilterQuery('handleProductOpenStatus')
          ],
          cb: value => {
            this.searchCondition.elecStatus = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getCustomerOpenProducts,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getCustomerOpenProducts // 初始化数据
        // },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "",
            sortable: true,
            word: "bussinessNo"
          },
          {
            key: "商户名称",
            width: "",
            word: "customerName"
          },

          {
            key: "快速开票",
            width: "",
            word: "qrcodeStatus",
            status: true,
            type: data => {
              return this.statusFilter(data, 'handleProductOpenStatus')
            }
          },
          {
            key: "聚合支付",
            width: "",
            word: "payStatus",
            status: true,
            type: data => {
              return this.statusFilter(data, 'handleProductOpenStatus')
            }
          },
          {
            key: "电子发票",
            width: "",
            word: "elecStatus",
            status: true,
            type: data => {
              return this.statusFilter(data, 'handleProductOpenStatus')
            }
          }
        ],
        operation: {
          width: "200px",
          options: [
            {
              text: "开通",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (
                  isAdmin || !isBranchOffice
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              disabledFn: rowdata => {
                if (
                  rowdata.payStatus == "INIT" ||
                  rowdata.payStatus == "WAITING_SUBMIT" ||
                  rowdata.payStatus == "REJECT" ||
                  rowdata.payStatus == "FALSE" ||
                  rowdata.qrcodeStatus == "INIT" ||
                  rowdata.qrcodeStatus == "FALSE" ||
                  rowdata.elecStatus == "INIT" ||
                  rowdata.elecStatus == "REJECT" ||
                  rowdata.elecStatus == "FALSE"
                ) {
                  return false;
                } else {
                  return true;
                }
              },
              cb: rowdata => {
                this.resaultData = rowdata;
                this.openProduct('payStatus');
              }
            },
            // 操作按钮
            {
              text: "查询",
              color: "#00c1df",
              cb: rowdata => {
                this.resaultData = rowdata;
                this.search = true;
                this.check = false;
                this.changeVisibleFn();
                // // 所有选项均可选
                this.selectOptions.customerTypeOptions.forEach(element => {
                  element.disabled = false;
                });
                this.selectOptions.customerType = "payStatus";
                this.detailsFormVisible = true;
              }
            },
            {
              text: "审核",
              visibleFn: rowdata => {
                if (
                  isAdmin &&
                  (
                    rowdata.elecStatus == "CHECKING")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.resaultData = rowdata;
                this.search = false;
                this.check = true;
                this.changeVisibleFn();
                // 只有电子发票可以审核
                this.selectOptions.customerTypeOptions.forEach(element => {
                  if (element.value != "elecStatus") {
                    element.disabled = true;
                    this.selectOptions.customerType = "elecStatus";
                  }
                });
                this.detailsFormVisible = true;
              }
            },
            // 一下按钮均为运营可操作
            {
              text: "关闭",
              visibleFn: rowdata => {
                if (
                  isAdmin &&
                  (
                    // rowdata.payStatus == "TRUE" ||
                    // rowdata.qrcodeStatus == "TRUE" ||
                    rowdata.elecStatus == "TRUE")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.resaultForm = rowdata;
                // 只有电子发票可以关闭
                this.selectOptions.customerTypeOptions.forEach(element => {
                  if (element.value != "elecStatus") {
                    element.disabled = true;
                    this.selectOptions.customerType = "elecStatus"
                  }
                });
                this.closeVisible = true;
              }
            },
            {
              text: "配置",
              color: "#00c1df",
              visibleFn: rowdata => {
                console.log(this.adminFilter("userProductStatus_config"));
                if (
                  this.adminFilter("userProductStatus_config")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                // adminFilter
                this.resaultData = rowdata;
                let payType = rowdata.payType;
                let invoiceType = rowdata.invoiceType;
                this.styleForm.payTypes = [payType];
                this.styleForm.supportTypes = [invoiceType];
                switch (payType) {
                  case 0:
                    this.styleForm.payTypes = [];
                    break
                  case 1:
                    this.styleForm.payTypes = ["1"];
                    break
                  case 2:
                    this.styleForm.payTypes = ["2"];
                    break
                  case 3:
                    this.styleForm.payTypes = ["1", "2"];
                    break;
                  case 4:
                    this.styleForm.payTypes = ["4"];
                    break
                }
                switch (invoiceType) {
                  case 0:
                    this.styleForm.supportTypes = [];
                    break
                  case 1:
                    this.styleForm.supportTypes = ["1"];
                    break
                  case 2:
                    this.styleForm.supportTypes = ["2"];
                    break
                  case 4:
                    this.styleForm.supportTypes = ["4"];
                    break
                  case 3:
                    this.styleForm.supportTypes = ["1", "2"];
                    break
                  case 7:
                    this.styleForm.supportTypes = ["1", "2", "4"];
                    break
                  case 5:
                    this.styleForm.supportTypes = ["1", "4"];
                    break
                  case 6:
                    this.styleForm.supportTypes = ["2", "4"];
                    break
                }
                this.styleVisible = true;
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    //开票类型
    payTypesChange(value) {
      let thisChecked = value[value.length - 1];
      let payTypes = this.styleForm.payTypes;
      if (thisChecked == '4' && payTypes.length > 1) {
        let index = payTypes.findIndex(function (value, index, arr) {
          return value == 4;
        })
        let length = this.styleForm.payTypes.length;
        payTypes.splice(0, index);
        payTypes.splice(1);
      } else {
        if (new Set(payTypes).has("4") && payTypes.length > 1) {
          let index = payTypes.findIndex(function (value, index, arr) {
            return value == 4;
          })
          payTypes.splice(index, 1);
        }
      }
    },
    supportTypesChange(value) {
      let supportTypes = this.styleForm.supportTypes
      // 选择特殊的时候必须勾选普票
      if (new Set(supportTypes).has("4")) {
        let newCheck = Array.from(new Set(supportTypes).add("1"));
        this.styleForm.supportTypes = Object.assign(
          this.styleForm.supportTypes,
          newCheck
        );
      }
    },
    // 关闭，拒绝，通过
    resaultHandle(obj) {
      postHandleCustomerProduct()(obj).then(res => {
        if (res.code == "00") {
          this.closeVisible = false;
          this.detailsFormVisible = false;
          this.reloadData();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    // 关闭
    closeSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let resaultForm = this.resaultForm;
          let closeForm = this.closeForm;
          let customerType = this.selectOptions.customerType;
          let obj = {
            bussinessNo: resaultForm.bussinessNo,
            bussinessType: "customer"
          };
          let msg = "";
          if (customerType == "qrcodeStatus") {
            // 快速开票
            obj.qrReason = closeForm.reason;
            obj.qrcodeStatus = "FALSE";
            msg = "确定关闭快速开票业务业务并且将以短信形式通知商户?";
          } else if (customerType == "elecStatus") {
            obj.elecReason = closeForm.reason;
            obj.elecStatus = "FALSE";
            msg = "确定关闭电子发票业务并且将以短信形式通知商户?";
          } else if (customerType == "payStatus") {
            obj.payReason = closeForm.reason;
            obj.payStatus = "FALSE";
            msg = "确定关闭聚合业务并且将以短信形式通知商户?";
          }
          this.$confirm(msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.resaultHandle(obj);
          }).catch(() => {
          });;
        }
      });
    },
    // 审核通过
    adoptSave(customerType, detailsForm) {
      let resaultForm = this.resaultData;
      let obj = {
        bussinessNo: resaultForm.bussinessNo,
        bussinessType: "customer"
      };
      let msg = "";
      if (customerType == "qrcodeStatus") {
        obj.qrcodeStatus = "TRUE";
        msg = "确定通过 快速开票业务业务并且将以短信形式通知商户?";
      } else if (customerType == "elecStatus") {
        obj.elecStatus = "TRUE";
        msg = "确定通过 电子发票业务并且将以短信形式通知商户?";
      } else if (customerType == "payStatus") {
        obj.payStatus = "TRUE";
        msg = "确定通过 聚合业务并且将以短信形式通知商户?";
      }
      this.$confirm(msg, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.resaultHandle(obj);
      });
    },
    // 审核拒绝
    refuseSave(customerType, detailsForm) {
      this.$prompt("请输入拒绝原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S{1,}/,
        inputErrorMessage: "请输入拒绝原因"
      }).then(({ value }) => {
        let resaultForm = this.resaultData;
        let obj = {
          bussinessNo: resaultForm.bussinessNo,
          bussinessType: "customer"
        };
        let msg = "";
        if (customerType == "qrcodeStatus") {
          obj.qrReason = value;
          obj.qrcodeStatus = "REJECT";
          msg = "确定拒绝快速开票业务业务并且将以短信形式通知商户?";
        } else if (customerType == "elecStatus") {
          obj.elecReason = value;
          obj.elecStatus = "REJECT";
          msg = "确定拒绝电子发票业务并且将以短信形式通知商户?";
        } else if (customerType == "payStatus") {
          obj.payReason = value;
          obj.payStatus = "REJECT";
          msg = "确定拒绝聚合业务并且将以短信形式通知商户?";
        }
        this.$confirm(msg, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.resaultHandle(obj);
        });
      });
    },
    // 排版保存
    styleFormSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let invoiceType = this.styleForm.supportTypes.length == 0 ? ['0'] : this.styleForm.supportTypes;//开票类型
          let payType = this.styleForm.payTypes.length == 0 ? ['0'] : this.styleForm.payTypes; //支付类型
          let bussinessNo = this.resaultData.bussinessNo;
          getUserProductStatus()({
            bussinessNo: bussinessNo,
            bussinessType: "customer",
            invoiceTypes: invoiceType,
            payTypes: payType
          }).then(res => {
            if (res.code == "00") {
              this.$message({
                message: "操作成功！",
                type: "success",
                center: true
              });
              this.reloadData();
              this.styleVisible = false;
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                center: true
              });
            }
          })
        }
      })
    },
    // 点击开通产品
    openProduct(type) {
      let rowdata = { ...this.resaultData };
      this.customerTypeSelected = [
        {
          value: "payStatus",
          label: "聚合支付",
          disabled:
            rowdata.payStatus == "INIT" ||
              rowdata.payStatus == "REJECT" ||
              rowdata.payStatus == "WAITING_SUBMIT" ||
              rowdata.payStatus == "FALSE"
              ? false
              : true
        },
        {
          value: "qrcodeStatus",
          label: "快速开票",
          disabled:
            rowdata.qrcodeStatus == "INIT" ||
              rowdata.qrcodeStatus == "REJECT" ||
              rowdata.qrcodeStatus == "WAITING_SUBMIT" ||
              rowdata.qrcodeStatus == "FALSE"
              ? false
              : true
        },
        {
          value: "elecStatus",
          label: "电子发票",
          disabled:
            rowdata.elecStatus == "INIT" ||
              rowdata.elecStatus == "REJECT" ||
              rowdata.elecStatus == "WAITING_SUBMIT" ||
              rowdata.elecStatus == "FALSE"
              ? false
              : true
        }
      ];
      this.resaultData = { ...rowdata };
      this.nextFn("openInfo");
      this.editFormVisible = true;
    },
    editFn() {
      let customerType = this.selectOptions.customerType;
      if (customerType == "qrcodeStatus") {
      } else if (customerType == "elecStatus") {
        this.editFormVisible = true;
        this.openProduct('elecStatus');
      } else if (customerType == "payStatus") {
        this.editFormVisible = true;
        this.openProduct('payStatus');
      }
      this.detailsFormVisible = false
    },
    // 下一步
    nextFn(next) {
      this.openProductView = next;
      this.reloadData()
    },
    // 返回
    backFn(path) {
      if (path == "close") {
        this.editFormVisible = false;
        this.openProductView = "";
      } else if (path == "reload") {
        this.editFormVisible = false;
        this.openProductView = "";
      } else {
        this.openProductView = path;
      }
      this.reloadData()
    },
    titleChange(openProductView) {
      if (openProductView == "paystatusInfo") {
        this.productOpenTitle = "完善信息";
      } else if (openProductView == "paystatusGoods") {
        this.productOpenTitle = "开通产品";
      } else if (openProductView == "paystatusUpload") {
        this.productOpenTitle = "上传资质";
      } else if (openProductView == "paystatusSuccess") {
        this.productOpenTitle = "申请完成";
      } else if (openProductView == "elecstatusInfo") {
        this.productOpenTitle = "电子发票开通";
      } else if (openProductView == "qrcodeInfo") {
        this.productOpenTitle = "快速开票";
      } else {
        this.productOpenTitle = openProductView;
      }
    },
    // 编辑与审核按钮的显示隐藏
    changeVisibleFn() {
      this.checkVisiblebut = false;
      this.editVisiblebut = false;
      let row = this.resaultData;
      let type = this.selectOptions.customerType;
      /*新改代码start */
      switch (type) {
        case "payStatus":
          this.detailProductView = "payDetail"
          break
        case "elecStatus":
          this.detailProductView = "elecDetail"
          break
        case "qrcodeStatus":
          this.detailProductView = "qrcodeDetail"
          break
      }
      /*新改代码end */
      if (this.check) {
        switch (type) {
          case "qrcodeStatus":
            this.qrcodeStatusVisible = true;
            break;
          case "elecStatus":
            this.elecStatusVisible = true;
            if (row.elecStatus == "CHECKING" || row.elecStatus == "PROCESSING") {
              this.checkVisiblebut = true;
            }
            break;
          case "payStatus":
            this.payStatusVisible = true;
            if (row.payStatus == "CHECKING" || row.payStatus == "PROCESSING") {
              this.checkVisiblebut = true;
            }
            break;
        }
      }
      if (this.search) {
        switch (type) {
          case "qrcodeStatus":
            this.qrcodeStatusVisible = true;
            break;
          case "elecStatus":
            this.elecStatusVisible = true;
            if (row.elecStatus == "REJECT" || row.elecStatus == "WAITING_SUBMIT" && (this.isAdmin || !isBranchOffice)) {
              this.editVisiblebut = true;
            }
            break;
          case "payStatus":
            this.payStatusVisible = true;
            if (row.payStatus == "REJECT" || row.payStatus == "WAITING_SUBMIT" && (this.isAdmin || !isBranchOffice)) {
              this.editVisiblebut = true;
            }
            break;
        }
      }
    },
    dialogViewSize() {
      // let reduceHeight = 180
      // if (this.editVisiblebut || this.checkVisiblebut || this.checkVisiblebut) {
      //   reduceHeight += 30;
      // }
      // let windowHeight = $(window).height() - reduceHeight;
      // $(".product-detail-body").height(windowHeight);
    }
  },
  computed: {
    customerType() {
      return this.selectOptions.customerType
    },
    supportTypes() {
      return this.styleForm.supportTypes;
    },
    payTypesType() {
      return this.styleForm.payTypes;
    }
  },
  watch: {
    customerType(val) {
      if (val == "qrcodeStatus") {
        this.detailProductView = "qrcodeDetail"
      } else if (val == "elecStatus") {
        this.detailProductView = "elecDetail"
      } else if (val == "payStatus") {
        this.detailProductView = "payDetail"
      }
      this.$nextTick(() => {
        this.changeVisibleFn();
        // this.dialogViewSize();
      })
    },
    detailsFormVisible(val) {
      if (!val) {
        this.detailProductView = "";
      }
      this.$nextTick(() => {
        // console.log($('.dialog-footer').height());
        // let reduceHeight = 180
        // if (this.editVisiblebut || this.checkVisiblebut || this.checkVisiblebut) {
        //   reduceHeight += 30;
        // }
        // let windowHeight = $(window).height() - reduceHeight;
        // $(".product-detail-body").height(windowHeight);
      })
    },
    editFormVisible(val) {
      if (!val) {
        this.openProductView = "";
      }
    }
  },
  mounted() {
    window.onresize = () => {
      // this.dialogViewSize();
      if (this.$refs.detailProductView) {
        let detailProductView = this.detailProductView;
        if (detailProductView == "payDetail" || detailProductView == "elecDetail")
          this.$refs.detailProductView.hideImageView();
      }
    }
  }
};
</script>