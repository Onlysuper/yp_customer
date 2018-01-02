<template>
  <!-- 开票统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button>
          <el-button class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span class="sumtext">扫码次数:{{scanSum}} 推送次数:{{pushSum}} 入网商户:{{netSum}}</span>
        </el-button-group>
      </div>
      <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../../../src/assets/scss-pc/admin-page.scss";
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
import { getBillcountagents, getBillcountSum } from "@src/apis";

export default {
  name: "billCount",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var dataHandle = nowDate => {
      var nowDate = new Date(nowDate);
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      month = month * 1 < 10 ? "0" + month : month;
      var day = nowDate.getDate();
      var todayDate = year + "-" + month + "-" + day;
      return todayDate;
    };
    var todayDate = dataHandle(new Date()); // 初始化默认开始查询日期
    var beforDate = dataHandle(new Date() - 24 * 60 * 60 * 1000); // 初始化默认结束查询日期

    var searchConditionVar = {
      dataTimeBegin: beforDate, // 开始日期
      dataTimeEnd: todayDate, // 结束日期
      agentNo: "", // 合伙人编号
      containChild: "" // 下级
    };
    return {
      scanSum: 0,
      pushSum: 0,
      netSum: 0,
      sumLoading: false,
      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
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
              corresattr: "dataTimeBegin",
              label: "开始时间",
              value: new Date() - 24 * 60 * 60 * 1000,
              cb: value => {
                this.searchCondition.dataTimeBegin = value;
              }
            },
            {
              corresattr: "dataTimeEnd",
              lable: "结束时间",
              value: new Date(),
              cb: value => {
                this.searchCondition.dataTimeEnd = value;
              }
            }
          ]
        },
        {
          corresattr: "containChild",
          type: "select",
          label: "下级",
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
        }
      ],

      // 列表数据
      tableData: {
        getDataUrl: {
          url: getBillcountagents, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: searchConditionVar // 搜索内容
        },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "日期",
            width: "200px",
            sortable: true,
            word: "dataTime"
          },
          {
            key: "扫码次数",
            width: "100px",
            word: "scan"
          },
          {
            key: "推送次数",
            width: "100px",
            word: "billSuccess"
          },
          {
            key: "入网商户",
            width: "100px",
            word: "register"
          },
          {
            key: "活跃商户",
            width: "",
            word: "active"
          }
        ]
      }
    };
  },

  methods: {
    // 重新获取数据
    reloadData(page, Current) {
      let page_ = page ? page : 1;
      let limit_ = Current ? Current : 10;
      this.$store.commit("pageCount", page_);
      this.$store.commit("currentPage", limit_);
      this.tableData.getDataUrl = {
        url: this.tableData.getDataUrl.url,
        page: page_,
        limit: limit_,
        searchCondition: this.searchCondition
      };
    },
    SumHandle() {
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getBillcountSum()({
        dataTimeBegin: searchCondition.dataTimeBegin,
        dataTimeEnd: searchCondition.dataTimeEnd,
        agentNo: searchCondition.agentNo,
        containChild: searchCondition.containChild
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.scanSum = data.scan;
          this.netSum = data.register;
          this.pushSum = data.billSuccess;
        }
        this.sumLoading = false;
      });
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },

    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel("/billcountagent/export");
    },
    /**TABLE页交互 START ************************************************************ */
    // 普通搜索 具备隐藏
    visiblesomeHandle() {
      this.searchOptions.forEach(element => {
        // searchOptions数组里面的corresattr 是索引
        if (!element.show) {
          if (element.type == "dateGroup") {
            // 开始时间 到结束时间组合 特殊处理
            element.options.forEach(element => {
              var corresattr = element.corresattr;
              element.value = "";
              this.searchCondition[corresattr] = "";
            });
          } else {
            var corresattr = element.corresattr;
            element.value = "";
            this.searchCondition[corresattr] = "";
          }
        }
      });
    },
    callbackformHandle(cb, data) {
      // 表单双向绑定 得到输入的内容并返回到本页面
      cb(data);
    },
    resetSearchHandle() {
      // 重置查询表单
      this.searchOptions.forEach(element => {
        if (element.type != "dateGroup") {
          element.value = "";
          this.searchCondition[element.corresattr] = "";
        } else {
          element.options.forEach(element => {
            element.value = "";
            this.searchCondition[element.corresattr] = "";
          });
        }
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
    /**END ***********************************************/
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    //当前页数
    storePageCount() {
      return this.$store.state.dataTable.pageCount;
    },
    //每页条数
    storeCurrentPage() {
      return this.$store.state.dataTable.currentPage;
    }
  },
  mounted() {
    this.SumHandle();
  }
};
</script>

