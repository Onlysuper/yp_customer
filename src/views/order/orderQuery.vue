<template>
  <!-- 订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group v-if="adminFilter('pay_order_sum')" class="button-group">
          <el-button class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span v-if="sumVisible" class="sumtext">
            <span>交易金额:{{utils.accMul(amountSum,0.01)}}元</span>
            <span class="split-line-v"></span>
            <span>交易笔数:{{amountCount}}笔</span>
          </span>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详细信息 start -->
    <el-dialog v-dialogDrag :title="detailsForm.customerName" center :visible.sync="detailsFormVisible">
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
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, today_ } from "@src/common/dateSerialize";
import { getPayOrders, getSumPayOrders } from "@src/apis";
import utils from "@src/common/utils";
export default {
  name: "orderQuery",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      orderNo: "",
      startTime: todayStr,
      endTime: todayStr,
      customerNo: "",
      agentNo: "",
      hasChild: true,
      status: "SUCCESS",
      payType: "",
    };
    return {
      sumVisible: false,
      amountSum: "0",
      amountCount: "0",
      sumLoading: false,
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
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "交易状态",
          show: true, // 普通搜索显示
          defaultVlue: "SUCCESS",
          value: "SUCCESS",
          options: [
            ...this.statusFilterQuery('orderQueryStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
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
              defaultVlue: todayStr,
              value: today_,
              cb: value => {
                this.searchCondition.startTime = value;
              }
            },
            {
              corresattr: "endTime",
              lable: "结束时间",
              defaultVlue: todayStr,
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
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.orderNo = value;
          }
        },

        {
          corresattr: "hasChild",
          type: "select",
          label: "包含关系",
          show: false, // 普通搜索显示
          defaultVlue: "TRUE",
          value: "TRUE",
          options: [
            ...this.statusFilterQuery('containChild')
          ],
          cb: value => {
            this.searchCondition.hasChild = value;
          }
        },

        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "代理商编号", // 输入框前面的文字
          visible:
            !this.$store.state.userInfoAndMenu.isAdmin ? "TRUE" : "FALSE",
          show: false, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "payType",
          type: "select",
          label: "交易类型",
          show: false, // 普通搜索显示
          defaultVlue: "",
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
      actionUrl: getPayOrders,
      postSearch: searchConditionVar,
      tableData: {
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
              return this.statusFilter(data, 'orderQueryStatus');

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
  methods: {
    // 合计
    SumHandle() {
      this.sumVisible = true;
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getSumPayOrders()({
        ...searchCondition
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.amountCount = data.amountCount ? data.amountCount : 0;
          this.amountSum = data.amountSum ? data.amountSum : 0;
          this.sumVisible = true;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
        this.sumLoading = false;
      });
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    }
  },
  mounted() {
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  }
};
</script>

