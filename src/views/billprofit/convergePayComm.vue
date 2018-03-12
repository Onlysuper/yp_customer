<template>
  <!-- 聚合开票分润 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billprofit_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span class="sumtext">分润金额:{{utils.accMul(customerSum, 0.01)}}元</span>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { thisMonth, lastMonth } from "@src/common/dateSerialize";
import { getpayProfits, getBillprofitSum } from "@src/apis";
import utils from "@src/common/utils";
export default {
  name: "billprofit",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      status: "",
      agentNo: "",
      customerNo: "", // 商户编号
      enterpriseName: "", // 商户名称
      containChild: "TRUE",
      dataTime: lastMonth
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
          corresattr: "status",
          type: "select",
          label: "结算状态",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
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
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
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
          corresattr: "enterpriseName",
          type: "text", // 表单类型
          label: "合伙人名称", // 输入框前面的文字
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
            this.searchCondition.enterpriseName = value;
          }
        },
        {
          corresattr: "dataTime",
          type: "dateMonth", // 表单类型
          label: "日期", // 输入框前面的文字
          show:
            this.$store.state.userInfoAndMenu.userMessage.all.userType ==
              "admin" ||
              this.$store.state.userInfoAndMenu.userMessage.all.userType == "root"
              ? false
              : true, // 普通搜索显示
          value: lastMonth, // 表单默认的内容
          cb: value => {
            // console.log(value);
            // 表单输入之后回调函数
            this.searchCondition.dataTime = value;
          }
        }
        // {
        //   corresattr: "containChild",
        //   type: "select",
        //   label: "包含关系",
        //   visible:
        //     this.$store.state.userInfoAndMenu.userMessage.all.userType ==
        //       "admin" ||
        //     this.$store.state.userInfoAndMenu.userMessage.all.userType == "root"
        //       ? "TRUE"
        //       : "FALSE",
        //   show: false, // 普通搜索显示
        //   value: "TRUE",
        //   options: [
        //     {
        //       value: "TRUE",
        //       label: "包含下级"
        //     },
        //     {
        //       value: "FALSE",
        //       label: "不包含下级"
        //     }
        //   ],
        //   cb: value => {
        //     this.searchCondition.containChild = value;
        //   }
        // }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getpayProfits // 初始化数据
        },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "合伙人编号",
            width: "120",
            word: "agentNo"
          },
          {
            key: "合伙人名称",
            width: "180px",
            word: "bussinessName"
          },
          {
            key: "分润金额(元)",
            width: "",
            word: "amount",
            type: data => {
              return {
                text: utils.accMul(data, 0.01),
                type: "success"
              };
            }
          },

          {
            key: "结算状态",
            width: "",
            word: "status",
            status: true,
            type: data => {
              if (data === "TRUE") {
                return {
                  text: "已结算",
                  type: "success"
                };
              } else if (data === "FALSE") {
                return {
                  text: "未结算",
                  type: "info"
                };
              } else if (data === "SUCCESS") {
                return {
                  text: "已结算",
                  type: ""
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
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

