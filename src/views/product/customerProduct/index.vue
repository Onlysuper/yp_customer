<template>
  <!-- 商户管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>

    <!-- 商户状态 start -->
    <el-dialog title="商户状态" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <div class="line-box-center">
          <el-select @input="customerTypeChange" size="small" v-model="selectOptions.customerType" placeholder="请选择">
            <el-option v-for="item in selectOptions.customerTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <template v-if="payStatusVisible">
          <!-- 聚合详情 -->
          <div class="detail-body">
            <div class="line-label-box">
              <span class="line-label">商户编号:</span>
              <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
            </div>
            <div class="line-label-box">
              <span class="line-label">商户名称:</span>
              <span class="line-label-last">{{detailsForm.customerName}}</span>
            </div>
            <div class="line-label-box">
              <span class="line-label">聚合状态:</span>{{detailsForm.payStatus | handleProductOpenStatus}}
            </div>
            <div class="line-label-box">
              <span class="line-label">所在地区:</span>{{utils.findCity(detailsForm.customer.orgCode).resultAddr}}
            </div>
            <div class="line-label-box">
              <span class="line-label">详细信息:</span>{{detailsForm.customer.bussinessAddress||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">法人:</span>{{detailsForm.customer.legalPerson||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">身份证号:</span>{{detailsForm.customer.idCard||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">行业类型:</span>{{detailsForm.customer.bussinessType||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">邮箱:</span>{{detailsForm.customer.contactEmail||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">账户类型:</span>{{detailsForm.settleCard.accountType | accountType}}
            </div>
            <div class="line-label-box">
              <span class="line-label">账户名称:</span>{{detailsForm.settleCard.accountName||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">开户银行:</span>{{detailsForm.settleCard.bankName||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">开户支行:</span>{{detailsForm.settleCard.branchName||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">账号:</span>{{detailsForm.settleCard.accountNo||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">微信费率:</span>{{utils.accMul(detailsForm.product.wechatRate,100)+'%' ||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">支付宝费率:</span>{{utils.accMul(detailsForm.product.alipayRate,100)+'%'||""}}
            </div>
            <div class="line-label-box">
              <span class="line-label">开通即刷即到:</span>{{detailsForm.product.settleMode | settleMode}}
            </div>
            <div class="line-label-box">
              <span class="line-label">D0手续费:</span>{{detailsForm.product.t0CashCostFixed||""}}
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="grid-content bg-purple">

                    <div class="img-box">
                      <p class="img-title">法人身份证正面:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.identityFrontImg.url||''" alt="">
                      </div>
                    </div>

                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="img-box">
                      <p class="img-title">法人身份证反面:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.identityBackImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">营业执照:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.bussinessLicenseImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">结算卡正面:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.settleCardImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">开户许可证:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.accountLicenseImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">门头照片:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.placeImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">店内照片:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.storeImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="line-label-box">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <div class="img-box">
                      <p class="img-title">收银台照片:</p>
                      <div class="img-back">
                        <img class="img-size" :src="detailsForm.imgs.cashSpaceImg.url||''" alt="">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>

        </template>
        <template v-if="qrcodeStatusVisible">
          <!-- 快速详情 -->
          <div class="line-label-box">
            <span class="line-label">商户编号:</span>
            <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">商户名称:</span>
            <span class="line-label-last">{{detailsForm.customerName}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">快速开票:</span>{{detailsForm.qrcodeStatus | handleProductOpenStatus}}
          </div>

        </template>
        <template v-if="elecStatusVisible">
          <!-- 电子详情 -->
          <div class="line-label-box">
            <span class="line-label">商户编号:</span>
            <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">商户名称:</span>
            <span class="line-label-last">{{detailsForm.customerName}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">开通状态:</span>{{detailsForm.elecStatus | handleProductOpenStatus}}
          </div>
          <!-- 电子发票查询详情 -->
          <div class="line-label-box">
            <span class="line-label">注册省份:</span>
            <span class="line-label-last">{{utils.findCity(elecStatusDetails.customer.orgCode).resultAddr}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">注册地址:</span>
            <span class="line-label-last">{{elecStatusDetails.customer.bussinessAddress}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">联系电话:</span>
            <span class="line-label-last">{{elecStatusDetails.customer.bussinessPhone}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">经营名称:</span>
            <span class="line-label-last">{{elecStatusDetails.customer.bussinessName}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">注册资金:</span>
            <span class="line-label-last">{{elecStatusDetails.customer.registMoney}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">开户银行:</span>
            <span class="line-label-last">{{elecStatusDetails.customerInvoiceConfig.branchName}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">银行账号:</span>
            <span class="line-label-last">{{elecStatusDetails.customerInvoiceConfig.bankAccountNo}}</span>
          </div>
          <div class="line-label-box">
            <span class="line-label">月开票量:</span>
            <span class="line-label-last">{{elecStatusDetails.product.elecBillnum}}</span>
          </div>
          <div class="line-label-box" v-if="elecStatusDetails.product.elecReason==''||elecStatusDetails.product.elecReason==null?false:true">
            <span class="line-label">被拒原因:</span>
            <span class="line-label-last">{{elecStatusDetails.product.elecReason}}</span>
          </div>

        </template>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
        <el-button :disabled="deitDisabled_edit(selectOptions.customerType,detailsForm)" v-if="editVisiblebut" type="primary" @click="editFn()">编辑</el-button>

        <el-button :disabled="deitDisabled_check(selectOptions.customerType,detailsForm)" v-if="checkVisiblebut" type="primary" @click="adoptSave(selectOptions.customerType,detailsForm)">审核通过</el-button>
        <el-button :disabled="deitDisabled_check(selectOptions.customerType,detailsForm)" v-if="checkVisiblebut" type="primary" @click="refuseSave(selectOptions.customerType,detailsForm)">审核拒绝</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 开通产品 start -->
    <el-dialog :title="productOpenTitle" center :visible.sync="editFormVisible">
      <!-- <keep-alive> -->
      <component v-on:titleChange="titleChange" v-on:nextFn="nextFn" v-on:backFn="backFn" v-bind:is="currentView" :customerTypeSelected="customerTypeSelected" :rowData="rowData">
        <!-- 组件在 vm.currentview 变化时改变！ -->
      </component>
      <!-- </keep-alive> -->
    </el-dialog>
    <!-- 开通产品 end -->
    <!-- 关闭start -->
    <el-dialog title="关闭" center :visible.sync="closeVisible">
      <div class="line-box-center">
        <el-select @input="customerTypeChange" size="small" v-model="selectOptions.customerType" placeholder="请选择">
          <el-option v-for="item in selectOptions.customerTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-form size="small" :model="closeForm" ref="closeForm" :rules="closeFormRules" label-width="100px">
        <el-form-item prop="closeReason" label="关闭原因">
          <el-input type="textarea" v-model="closeForm.closeReason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeSave('closeForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 关闭end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.detail-body {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.img-box {
  padding: 10px;
  .img-title {
    padding-bottom: 10px;
  }
  .img-back {
    height: 250px;
    min-width: 250px;
    height: 250px;
    min-width: 250px;
    border: 1px solid #ebeef5;
    text-align: center;
    padding: 5px;
    position: relative;
    &::after {
      content: "暂无图片";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100px;
      text-align: center;
      margin-left: -50px;
      margin-top: -10px;
    }
    .img-size {
      height: 250px;
      max-width: 100%;
      position: relative;
      z-index: 1;
      color: #909399;
    }
  }
  .img-size {
    height: 250px;
    max-width: 100%;
  }
}
</style>
<script>
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
import {
  getCustomerOpenProducts,
  postCustomerOpenProductSearch,
  getCustomerEchoProduct,
  postHandleCustomerProduct,
  getQueryCustomerElectronic
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
    openInfo: openInfo
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var user = this.$store.state.moduleLayour.userMessage.all;
    var isAdmin =
      user.userType === "root" ||
      user.userType === "admin" ||
      user.userType === "operator"; // 运营
    var searchConditionVar = {
      bussinessNo: "",
      customerName: "",
      qrcodeStatus: "",
      elecStatus: "",
      payStatus: ""
    };
    return {
      checkVisiblebut: false,
      editVisiblebut: false,
      closeVisible: false,
      searchDetail: false,
      // editVisible: false,
      rejectReason: "", //拒绝理由
      productOpenTitle: "完善信息",
      rowData: {},
      currentView: "openInfo",
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
            label: "聚合支付"
          },
          {
            value: "qrcodeStatus",
            label: "快速开票"
          },
          {
            value: "elecStatus",
            label: "电子发票"
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
      elecStatusDetails: {
        customer: {},
        customerInvoiceConfig: {},
        product: {}
      }, // 电子发票查询详情
      qrcodeStatusDetails: {}, // 快速开票查询详情
      payStatusDetails: {}, // 聚合支付查询详情
      resaultForm: {}, // 拒绝表单
      closeForm: {},
      closeFormRules: {
        closeReason: [
          { required: true, message: "请填写关闭原因", trigger: "blur" }
        ]
      },
      resaultFormRules: {
        reason: [{ required: true, message: "请填写拒绝理由", trigger: "blur" }]
      },
      detailsForm: {
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
      }, // 详情单个表单
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
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            },
            {
              label: "拒绝",
              value: "REJECT"
            },
            {
              label: "待审核",
              value: "CHECKING"
            },
            {
              label: "待提交",
              value: "WAITING_SUBMIT"
            }
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
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            },
            {
              label: "拒绝",
              value: "REJECT"
            },
            {
              label: "待审核",
              value: "CHECKING"
            },
            {
              label: "待提交",
              value: "WAITING_SUBMIT"
            }
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
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            },
            {
              label: "拒绝",
              value: "REJECT"
            },
            {
              label: "待审核",
              value: "CHECKING"
            },
            {
              label: "待提交",
              value: "WAITING_SUBMIT"
            }
          ],
          cb: value => {
            this.searchCondition.elecStatus = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomerOpenProducts // 初始化数据
        },
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
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
                  type: "info"
                };
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
                  type: "error"
                };
              } else if (data == "CHECKING") {
                return {
                  text: "待审核",
                  type: "warning"
                };
              } else if (data == "WAITING_SUBMIT") {
                return {
                  text: "待提交",
                  type: "warning"
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
            key: "聚合支付",
            width: "",
            word: "payStatus",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
                  type: "info"
                };
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
                  type: "error"
                };
              } else if (data == "CHECKING") {
                return {
                  text: "待审核",
                  type: "warning"
                };
              } else if (data == "WAITING_SUBMIT") {
                return {
                  text: "待提交",
                  type: "warning"
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
            key: "电子发票",
            width: "",
            word: "elecStatus",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
                  type: "info"
                };
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
                  type: "error"
                };
              } else if (data == "CHECKING") {
                return {
                  text: "待审核",
                  type: "warning"
                };
              } else if (data == "WAITING_SUBMIT") {
                return {
                  text: "待提交",
                  type: "warning"
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
          }
        ],
        operation: {
          width: isAdmin ? "180px" : "120px",
          options: [
            // 操作按钮
            {
              text: "查询",
              color: "#00c1df",
              cb: rowdata => {
                this.checkVisiblebut = false;
                this.searchDetail = true;
                this.rowData = rowdata;
                if (
                  rowdata.payStatus == "REJECT" ||
                  rowdata.payStatus == "WAITING_SUBMIT"
                ) {
                  // 被拒跟待提交的状态 显示编辑按钮
                  this.editVisiblebut = true;
                } else {
                  this.editVisiblebut = false;
                }
                this.getCustomerEcho(rowdata); // 聚合支付回显
                this.getElectronicEcho(rowdata); // 电子发票回显
                this.detailsForm = Object.assign(this.detailsForm, rowdata);
                this.detailsFormVisible = true;
                // 聚合支付
                // postCustomerOpenProductSearch()({
                //   businessNo: rowdata.bussinessNo,
                //   businessType: rowdata.bussinessType
                // }).then(data => {
                //   console.log(data);
                //   if (data.code == "00") {
                //     this.detailsForm = Object.assign(
                //       this.detailsForm,
                //       data.data
                //     );
                //     this.detailsForm.wechatRate =
                //       utils.accMul(this.detailsForm.wechatRate, 100) + "%";
                //     this.detailsForm.alipayRate =
                //       utils.accMul(this.detailsForm.alipayRate, 100) + "%";
                //     this.detailsForm.t0CashCostFixed =
                //       this.detailsForm.t0CashCostFixed &&
                //       this.detailsForm.t0CashCostFixed + "元";
                //     this.detailsFormVisible = true;
                //   } else {
                //     this.$message({
                //       message: data.msg,
                //       type: "warning"
                //     });
                //   }
                // });
                // 电子发票
              }
            },
            {
              text: "开通",
              // visibleFn: rowdata => {
              //   if (
              //     rowdata.payStatus == "REJECT" ||
              //     rowdata.payStatus == "WAITING_SUBMIT"
              //   ) {
              //     // 拒绝状态隐藏
              //     return false;
              //   } else {
              //     return true;
              //   }
              // },
              color: "#00c1df",
              disabledFn: rowdata => {
                if (
                  rowdata.payStatus == "INIT" ||
                  rowdata.payStatus == "WAITING_SUBMIT" ||
                  rowdata.qrcodeStatus == "INIT" ||
                  rowdata.elecStatus == "INIT"
                ) {
                  return false;
                } else {
                  return true;
                }
              },
              cb: rowdata => {
                this.openProduct(rowdata);
              }
            },

            // 一下按钮均为运营可操作
            {
              text: "关闭",
              visibleFn: rowdata => {
                if (
                  isAdmin &&
                  (rowdata.payStatus == "TRUE" ||
                    rowdata.qrcodeStatus == "TRUE" ||
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
                this.closeVisible = true;
              }
            },
            {
              text: "审核",
              visibleFn: rowdata => {
                if (
                  isAdmin &&
                  (rowdata.payStatus == "CHECKING" ||
                    rowdata.qrcodeStatus == "CHECKING" ||
                    rowdata.elecStatus == "CHECKING")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.checkVisiblebut = true;
                this.editVisiblebut = false;
                this.searchDetail = false;
                this.rowData = rowdata;
                this.getCustomerEcho(rowdata); // 回显示
                this.detailsForm = Object.assign(this.detailsForm, rowdata);
                postCustomerOpenProductSearch()({
                  businessNo: rowdata.bussinessNo,
                  businessType: rowdata.bussinessType
                }).then(data => {
                  if (data.code == "00") {
                    this.detailsForm = Object.assign(
                      this.detailsForm,
                      data.data
                    );
                    this.detailsForm.wechatRate =
                      utils.accMul(this.detailsForm.wechatRate, 100) + "%";
                    this.detailsForm.alipayRate =
                      utils.accMul(this.detailsForm.alipayRate, 100) + "%";
                    this.detailsFormVisible = true;
                    this.detailsForm.t0CashCostFixed =
                      this.detailsForm.t0CashCostFixed &&
                      this.detailsForm.t0CashCostFixed + "元";
                  } else {
                    this.$message({
                      message: data.msg,
                      type: "warning"
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
          let customerType = this.selectOptions.customerType;
          let obj = {
            bussinessNo: resaultForm.bussinessNo,
            bussinessType: "customer"
          };
          let msg = "";
          if (customerType == "qrcodeStatus") {
            // 快速开票
            obj.qrReason = resaultForm.reason;
            obj.qrcodeStatus = "FALSE";
            msg = "确定关闭快速开票业务业务并且将以短信形式通知商户?";
          } else if (customerType == "elecStatus") {
            obj.elecReason = resaultForm.reason;
            obj.elecStatus = "FALSE";
            msg = "确定关闭电子发票业务并且将以短信形式通知商户?";
          } else if (customerType == "payStatus") {
            obj.payReason = resaultForm.reason;
            obj.payStatus = "FALSE";
            msg = "确定关闭聚合业务并且将以短信形式通知商户?";
          }
          this.$confirm(msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.resaultHandle(obj);
          });
        }
      });
    },
    // 审核通过
    adoptSave(customerType, detailsForm) {
      let resaultForm = this.rowData;
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
        inputPattern: /^[\u4E00-\u9FA5\uF900-\uFA2D\w]+$/,
        inputErrorMessage: "请输入拒绝原因"
      }).then(({ value }) => {
        let resaultForm = this.rowData;
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
    // 点击开通产品
    openProduct(rowdata) {
      console.log(rowdata);
      if (
        rowdata.payStatus == "INIT" ||
        rowdata.qrcodeStatus == "INIT" ||
        rowdata.elecStatus == "INIT" ||
        rowdata.payStatus == "REJECT" ||
        rowdata.qrcodeStatus == "REJECT" ||
        rowdata.elecStatus == "REJECT"
      ) {
        this.editFormVisible = true;
        this.customerTypeSelected = [
          {
            value: "payStatus",
            label: "聚合支付",
            disabled:
              rowdata.payStatus == "INIT" || rowdata.payStatus == "REJECT"
                ? false
                : true
          },
          {
            value: "qrcodeStatus",
            label: "快速开票",
            disabled:
              rowdata.qrcodeStatus == "INIT" || rowdata.qrcodeStatus == "REJECT"
                ? false
                : true
          },
          {
            value: "elecStatus",
            label: "电子发票",
            // disabled: true
            disabled:
              rowdata.elecStatus == "INIT" || rowdata.elecStatus == "REJECT"
                ? false
                : true
          }
        ];
        this.rowData = rowdata;
        this.nextFn("openInfo");
      }
    },
    // 聚合支付回显
    getCustomerEcho(rowData) {
      getCustomerEchoProduct()({
        customerNo: rowData.bussinessNo,
        featureType: "CONVERGE_PAY"
      }).then(res => {
        if (res.code == "00") {
          this.detailsForm.customer = Object.assign(
            this.detailsForm.customer,
            res.data.customer
          );
          this.detailsForm.imgs = Object.assign(
            this.detailsForm.imgs,
            res.data.imgs
          );
          this.detailsForm.product = Object.assign(
            this.detailsForm.product,
            res.data.product
          );
          this.detailsForm.settleCard = Object.assign(
            this.detailsForm.settleCard,
            res.data.settleCard
          );
        }
      });
    },
    // 电子发票回显示
    getElectronicEcho(rowData) {
      getQueryCustomerElectronic()({
        customerNo: rowData.bussinessNo,
        featureType: "ELECTRONIC"
      }).then(res => {
        console.log(res);
        if (res.code == "00") {
          this.elecStatusDetails.customer = Object.assign(
            this.elecStatusDetails.customer,
            res.data.customer
          );
          this.elecStatusDetails.customerInvoiceConfig = Object.assign(
            this.elecStatusDetails.customerInvoiceConfig,
            res.data.customerInvoiceConfig
          );
          this.elecStatusDetails.product = Object.assign(
            this.elecStatusDetails.product,
            res.data.product
          );
        }
      });
    },
    // 返回
    backFn(path) {
      if (path == "close") {
        this.editFormVisible = false;
        this.currentView = "";
      } else if (path == "reload") {
        this.editFormVisible = false;
        this.currentView = "";
        this.reloadData();
      } else {
        this.currentView = path;
      }
    },
    editFn() {
      let customerType = this.selectOptions.customerType;
      if (customerType == "qrcodeStatus") {
      } else if (customerType == "elecStatus") {
      } else if (customerType == "payStatus") {
        this.qrcodeStatusVisible = true;
        this.detailsFormVisible = false;
        this.editFormVisible = true;
        this.openProduct(this.rowData);
        console.log("聚合支付编辑");
      }
    },
    // 下一步
    nextFn(next) {
      this.currentView = next;
    },
    customerTypeSelect() {
      let value = this.selectOptions.customerType;
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
    customerTypeChange() {
      this.customerTypeSelect();
    },
    titleChange(currentView) {
      if (currentView == "paystatusInfo") {
        this.productOpenTitle = "完善信息";
      } else if (currentView == "paystatusGoods") {
        this.productOpenTitle = "开通产品";
      } else if (currentView == "paystatusUpload") {
        this.productOpenTitle = "上传资质";
      } else if (currentView == "paystatusSuccess") {
        this.productOpenTitle = "申请完成";
      }
    },
    // 查询详情 编辑按钮显示问题
    deitDisabled_edit(type, row) {
      console.log(type);
      console.log(row);
      if (
        (type == "payStatus" && row.payStatus == "REJECT") ||
        (type == "qrcodeStatus" && row.qrcodeStatus == "REJECT") ||
        (type == "elecStatus" && row.qrcodeStatus == "REJECT") ||
        (type == "payStatus" && row.payStatus == "REJECT") ||
        (type == "qrcodeStatus" && row.qrcodeStatus == "REJECT") ||
        (type == "elecStatus" && row.qrcodeStatus == "REJECT")
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 查询详情 审核按钮显示
    deitDisabled_check(type, row) {
      console.log(type + "--" + row.elecStatus);
      if (type == "elecStatus" && row.elecStatus == "CHECKING") {
        return false;
      } else {
        return true;
      }
    }
  },

  computed: {},
  watch: {
    editFormVisible(value) {
      if (!value) {
        this.currentView = "";
      }
    }
  },
  mounted() {
    this.customerTypeSelect();
  }
};
</script>

