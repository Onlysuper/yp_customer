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
import qs from "qs";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { getBillcountdays, getExportBillcountdays } from "@src/apis";

export default {
  name: "billCount",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      dataTimeBegin: yesterday, // 开始日期
      dataTimeEnd: todayDate, // 结束日期
      customerNo: "", // 商户编号
      agentNo: "", // 代理商编号
      containChild: "" // 下级
    };
    return {
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
          show: false, // 普通搜索显示
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
          label: "包含关系",
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
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getBillcountdays // 初始化数据
        },
        havecheck: true, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "时间",
            width: "160px",
            sortable: true,
            word: "dataTime"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "企业名称",
            width: "100px",
            word: "enterpriseName"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
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
            key: "在线时长(时)",
            width: "",
            word: "online"
          }
        ]
      }
    };
  },

  methods: {
    exportDialog() {
      // 导出
      var searchForm = qs.stringify(this.searchCondition);
      getExportBillcountdays(searchForm)().then(data => {
        if (data == "00") {
          this.$message({
            message: "已发起导出任务，请耐心等待通知",
            type: "success",
            center: true
          });
        }
      });
    }
  },
  computed: {},
  mounted() {}
};
</script>

