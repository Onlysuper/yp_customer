<template>
  <!-- 快速开票分润 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span class="sumtext">商户:{{customerSum}}个 返利:{{rebateSum}}元 中间人:{{subsidySum}}元</span>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.operation-box {
  .sumtext {
    font-size: 14px;
    padding-left: 10px;
    line-height: 32px;
    color: #606266;
  }
}
</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { getBillprofits, getBillprofitSum } from "@src/apis";
export default {
  name: "billCount",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      customerNo: "", // 商户编号
      enterpriseName: "", // 商户名称
      agentNo: "",
      containChild: "",
      settleStatus: "",
      dataTime: ""
    };
    return {
      customerSum: 0,
      rebateSum: 0,
      subsidySum: 0,
      sumLoading: false,
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
          corresattr: "enterpriseName",
          type: "text", // 表单类型
          label: "商户名称", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.enterpriseName = value;
          }
        },
        {
          corresattr: "dataTime",
          type: "dateMonth", // 表单类型
          label: "日期", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: todayDate, // 表单默认的内容
          cb: value => {
            console.log(value);
            // 表单输入之后回调函数
            this.searchCondition.dataTime = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "containChild",
          type: "select",
          label: "是否有下级",
          show: false, // 普通搜索显示
          value: "",
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
            this.searchCondition.containChild = value;
          }
        },
        {
          corresattr: "settleStatus",
          type: "select",
          label: "结算情况",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "TRUE",
              label: "已结算"
            },
            {
              value: "FALSE",
              label: "未结算"
            }
          ],
          cb: value => {
            this.searchCondition.settleStatus = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getBillprofits // 初始化数据
        },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "100px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "企业名称",
            width: "150px",
            word: "enterpriseName"
          },
          {
            key: "入网时间",
            width: "180px",
            word: "registerTime"
          },
          {
            key: "补贴(元)",
            width: "100px",
            word: "subsidy"
          },
          {
            key: "中间人(元)",
            width: "",
            word: "rebate"
          }
        ]
      }
    };
  },

  methods: {
    // 合计
    SumHandle() {
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getBillprofitSum()({
        customerNo: searchCondition.customerNo,
        enterpriseName: searchCondition.enterpriseName,
        agentNo: searchCondition.agentNo,
        containChild: searchCondition.containChild,
        settleStatus: searchCondition.settleStatus,
        dataTime: searchCondition.dataTime
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.customerSum = data.customerSum;
          this.rebateSum = data.rebateSum;
          this.subsidySum = data.subsidySum;
        }
        this.sumLoading = false;
      });
    }
  },
  mounted() {
    this.SumHandle();
  }
};
</script>

