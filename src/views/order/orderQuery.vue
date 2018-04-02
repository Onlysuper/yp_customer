<template>
  <!-- 订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详细信息 start -->
    <el-dialog :title="detailsForm.customerName" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <div class="line-label-box cross-back">
          <span class="line-label">交易时间:</span>
          <span class="line-label-last">{{detailsForm.paySuccTime}}</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易单号:</span>
          <span class="line-label-last">{{detailsForm.orderNo}}</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易金额:</span>{{utils.accMul(detailsForm.amount, 0.01)}}元
        </div>
        <div v-if="detailsForm.settleMode=='T0'?true:false" class="line-label-box cross-back">
          <span class="line-label">手续费:</span>{{utils.accMul(detailsForm.fee, 0.01)}}元
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易费率:</span>{{utils.accMul(detailsForm.feeRate, 100)+'%'}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">代理商编号:</span>{{detailsForm.agentNo}}
        </div>
        <!-- <div class="line-label-box">
          <span class="line-label">代理商分润:</span>
        </div> -->

        <div class="line-label-box cross-back">
          <span class="line-label">收款方式:</span>{{detailsForm.payTypeDetail | statusFilter('payTypeDetail')}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易来源:</span>{{detailsForm.payFrom | statusFilter('payFrom')}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易类型:</span>{{detailsForm.payType | statusFilter('payType')}}
        </div>
        <div v-if="detailsForm.status=='FAIL'?true:false" class="line-label-box cross-back">
          <span class="line-label">支付失败原因:</span>{{detailsForm.respCode}}
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, today_ } from "@src/common/dateSerialize";
import { getPayOrders } from "@src/apis";
import utils from "@src/common/utils";
export default {
  name: "orderQuery",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      orderNo: "",
      startTime: todayDate,
      endTime: todayDate,
      customerNo: "",
      agentNo: "",
      hasChild: true,
      status: "",
      payType: "",
      status: ""
    };
    return {
      detailsFormVisible: false,
      detailsForm: {},
      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "customerNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "代理商编号", // 输入框前面的文字
          visible:
            this.$store.state.userInfoAndMenu.userMessage.all.userType ==
              "admin" ||
              this.$store.state.userInfoAndMenu.userMessage.all.userType == "root"
              ? "FALSE"
              : "TRUE",
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          type: "dateGroup",
          label: "选择时间",
          show: true, // 普通搜索显示
          options: [
            {
              corresattr: "startTime",
              label: "开始时间",
              value: today_,
              cb: value => {
                this.searchCondition.startTime = value;
              }
            },
            {
              corresattr: "endTime",
              lable: "结束时间",
              value: today_,
              cb: value => {
                this.searchCondition.endTime = value;
              }
            }
          ]
        },
        {
          corresattr: "orderNo",
          type: "text", // 表单类型
          label: "交易单号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.orderNo = value;
          }
        },
        // {
        //   corresattr: "customerName",
        //   type: "text", // 表单类型
        //   label: "商户名称", // 输入框前面的文字
        //   show: false, // 普通搜索显示
        //   value: "", // 表单默认的内容
        //   cb: value => {
        //     // 表单输入之后回调函数
        //     this.searchCondition.customerName = value;
        //   }
        // },
        {
          corresattr: "hasChild",
          type: "select",
          label: "包含关系",
          show: false, // 普通搜索显示
          value: "TRUE",
          options: [
            {
              value: "TRUE",
              label: "包含下级"
            },
            {
              value: "FALSE",
              label: "不包含下级"
            }
          ],
          cb: value => {
            this.searchCondition.hasChild = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "交易状态",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "INIT",
              label: "订单初始化"
            },
            {
              value: "PAY_WAIT",
              label: "等待支付"
            },
            {
              value: "FAIL",
              label: "失败"
            },
            {
              value: "CANCEL",
              label: "撤单"
            },
            {
              value: "SUCCESS",
              label: "成功"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "payType",
          type: "select",
          label: "交易类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "WECHAT",
              label: "微信"
            },
            {
              value: "ALIPAY",
              label: "支付宝"
            }
          ],
          cb: value => {
            this.searchCondition.payType = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getPayOrders // 初始化数据
        },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "160px",
            word: "createTime"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "商户名称",
            width: "160px",
            word: "customerName"
          },
          {
            key: "交易金额(元)",
            width: "120px",
            word: "amount",
            // status: true,
            type: data => {
              return {
                text: utils.accMul(data, 0.01),
                type: ""
              };
            }
          },

          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              if (data == "INIT") {
                return {
                  text: "订单初始化",
                  type: ""
                };
              } else if (data == "PAY_WAIT") {
                return {
                  text: "等待支付",
                  type: ""
                };
              } else if (data == "FAIL") {
                return {
                  text: "失败",
                  type: "danger"
                };
              } else if (data == "SUCCESS") {
                return {
                  text: "成功",
                  type: "success"
                };
              } else if (data == "CANCEL") {
                return {
                  text: "撤单",
                  type: "warning"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          }
        ],
        operation: {
          width: "80px",
          options: [
            {
              /**
               * 审核授权码采购
               */
              text: "详细信息",
              // visibleFn: rowdata => {
              //   if (
              //     this.adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
              //     rowdata.status == "AUDITING" &&
              //     rowdata.receiptType == "AUTHCODE"
              //   ) {
              //     return true;
              //   } else {
              //     return false;
              //   }
              // },
              color: "#00c1df",
              cb: rowdata => {
                console.log(rowdata);
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            }
          ]
        },
        // 数据加载成功
        dataSuccess: data => { }
      }
    };
  },
  methods: {},
  mounted() { },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  }
};
</script>

