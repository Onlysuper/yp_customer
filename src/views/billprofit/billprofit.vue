<template>
  <!-- 快速开票分润 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billprofit_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span v-if="sumVisible" class="sumtext">
            <span>商户:{{customerSum}}个 </span>
            <span class="split-line-v"></span>
            <span>返利:{{subsidySum}}元</span>
            <span class="split-line-v"></span>
            <span v-if="isAdmin">中间人:{{rebateSum}}元</span>
          </span>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { thisMonth } from "@src/common/dateSerialize";
import { getBillprofits, getBillprofitSum } from "@src/apis";
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
      customerNo: "", // 商户编号
      enterpriseName: "", // 商户名称
      agentNo: "",
      containChild: "TRUE",
      settleStatus: "",
      dataTime: thisMonth
    };
    var user = this.$store.state.userInfoAndMenu.userMessage.all;
    var isAdmin = user.userType === "admin" || user.userType === "branchOffice"; // 运营
    return {
      sumVisible: false,
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
          show: true, // 普通搜索显示
          value: thisMonth, // 表单默认的内容
          cb: value => {
            // console.log(value);
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
            this.searchCondition.settleStatus = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getBillprofits,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getBillprofits // 初始化数据
        // },
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
            key: "商户名称",
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
            width: "100px",
            word: "rebate",
            hidden: isAdmin ? false : true
          },
          {
            key: "结算状态",
            width: "",
            word: "settleStatus",
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
    isAdmin() {
      let user = this.$store.state.userInfoAndMenu.userMessage.all;
      if (user.userType === "admin" || user.userType === "branchOffice") {
        return true;
      } else {
        return false;
      }
    },
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  }
};
</script>

