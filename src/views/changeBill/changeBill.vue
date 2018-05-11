<template>
  <!-- 订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
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
import { getChangeBills } from "@src/apis";
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
      customerNo: "",
      status: "",
      agentNo: "",
      billNo: ""
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
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },

        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          value: "SUCCESS",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('changeBill')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "代理商编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "billNo",
          type: "text", // 表单类型
          label: "变更单号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.billNo = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getChangeBills,
      postSearch: searchConditionVar,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [
          {
            key: "变更单号",
            width: "100px",
            word: "billNo"
          },
          {
            key: "商户编号",
            width: "160px",
            word: "customerNo"
          },

          {
            key: "入网时间",
            width: "120px",
            word: "createTimeStart"
          },

          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'changeBill');
            }
          }
        ],
        operation: {
          width: "160px",
          options: [
            {
              text: "查看",
              color: "#00c1df",
              cb: rowdata => {

              }
            },
            {
              text: "审核",
              color: "#00c1df",
              cb: rowdata => {
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
    // seachstartHandle() {
    //   // 开始搜索
    //   this.reloadData();
    //   this.sumVisible = false;
    // }
  },
  mounted() {
  },
  computed: {

  }
};
</script>

