<template>
  <!-- 开票统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billcountagent_export')" size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button>
          <el-button v-if="adminFilter('billcountagent_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span v-if="sumVisible" class="sumtext">扫码次数:{{scanSum}} 推送次数:{{pushSum}} 入网商户:{{netSum}}</span>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
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
import {
  todayDate,
  yesterday,
  eightday,
  todayDate_,
  yesterday_,
  eightday_
} from "@src/common/dateSerialize";
import { getBillcountagents, getBillcountSum } from "@src/apis";
export default {
  name: "billcountagent",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      dataTimeBegin: eightday, // 开始日期
      dataTimeEnd: yesterday, // 结束日期
      agentNo: "", // 合伙人编号
      containChild: "TRUE" // 下级
    };
    return {
      sumVisible: false,
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
              value: eightday_,
              cb: value => {
                this.searchCondition.dataTimeBegin = value;
              }
            },
            {
              corresattr: "dataTimeEnd",
              lable: "结束时间",
              value: yesterday_,
              cb: value => {
                this.searchCondition.dataTimeEnd = value;
              }
            }
          ]
        },
        {
          corresattr: "containChild",
          type: "select",
          label: "包含关系",
          show: true, // 普通搜索显示
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
        }
      ],

      // 列表数据
      actionUrl: getBillcountagents,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getBillcountagents // 初始化数据
        // },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "日期",
            width: "",
            sortable: true,
            word: "dataTime"
          },
          // {
          //   key: "合伙人编号",
          //   width: "",
          //   sortable: true,
          //   word: "agentNo"
          // },
          {
            key: "扫码次数",
            width: "",
            word: "scan"
          },
          {
            key: "推送次数",
            width: "",
            word: "billSuccess"
          },
          {
            key: "入网商户",
            width: "",
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
          this.sumVisible = true
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
    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel("/billcountagent/export");
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    }
  },
  computed: {
    billcountagent_export() {
      return this.$store.state.userInfoAndMenu.userMessage.all
        .billcountagent_export;
    }
  },
  mounted() {
    // this.SumHandle();
  },
  activated() {
    this.SumHandle();
  }
};
</script>

