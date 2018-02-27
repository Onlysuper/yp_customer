<template>
  <!-- 达标详情 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billcountcustomer_export')" size="small" @click="exportDialog" type="primary" icon="el-icon-upload">导出</el-button>
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
import qs from "qs";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { getBillcountcustomers, getExportcountcustomers } from "@src/apis";

export default {
  name: "billcountcustomer",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      standardTimeBegin: todayDate, // 开始日期
      standardTimeEnd: todayDate, // 结束日期
      customerNo: "", // 商户编号
      agentNo: "", // 代理商编号
      containChild: "TRUE", // 下级
      // billSuccess: "", // 推送次数
      billSuccessBegin: "", // 推送次数开始
      billSuccessEnd: "", // 推送次数结束
      standard: "" // 达标情况
    };
    return {
      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          type: "dateGroup",
          label: "达标时间",
          show: true, // 普通搜索显示
          options: [
            {
              corresattr: "standardTimeBegin",
              label: "开始时间",
              value: todayDate,
              cb: value => {
                this.searchCondition.standardTimeBegin = value;
              }
            },
            {
              corresattr: "standardTimeEnd",
              lable: "结束时间",
              value: todayDate,
              cb: value => {
                this.searchCondition.standardTimeEnd = value;
              }
            }
          ]
        },
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
          corresattr: "billSuccess",
          type: "select",
          label: "推送次数",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "0-5",
              label: "5次以下"
            },
            {
              value: "5-50",
              label: "5-50次"
            },
            {
              value: "50-100",
              label: "50-100次"
            },
            {
              value: "100",
              label: "100次"
            }
          ],
          cb: value => {
            if (value != null) {
              var billSuccessArr = value.split("-");
              if (billSuccessArr.length >= 2) {
                this.searchCondition.billSuccessBegin = billSuccessArr[0];
                this.searchCondition.billSuccessEnd = billSuccessArr[1];
              } else if (billSuccessArr.length >= 1) {
                this.searchCondition.billSuccessBegin = billSuccessArr[0];
              }
            }
          }
        },
        {
          corresattr: "standard",
          type: "select",
          label: "达标情况",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "TRUE",
              label: "已达标"
            },
            {
              value: "FALSE",
              label: "未达标"
            }
          ],
          cb: value => {
            this.searchCondition.standard = value;
          }
        }
      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getBillcountcustomers // 初始化数据
        },
        havecheck: false, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "120",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "达标时间",
            width: "150px",
            word: "standardTime",
            type: data => {
              return {
                text: data != "" && data != null ? data.split(" ")[0] : data,
                type: "danger"
              };
              // return data.split(" ")[0];
            }
          },
          {
            key: "企业名称",
            width: "",
            word: "enterpriseName"
          },
          {
            key: "合伙人编号",
            width: "",
            word: "agentNo"
          },
          {
            key: "RCS",
            width: "",
            word: "realFlag",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "通过",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "未通过",
                  type: "danger"
                };
              } else {
                return {
                  text: data,
                  type: "danger"
                };
              }
            }
          },
          {
            key: "推送次数",
            width: "",
            word: "billSuccess"
          },
          {
            key: "在线时长(天)",
            width: "",
            word: "online"
          },
          {
            key: "达标情况",
            width: "100px",
            word: "standard",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已达标",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "未达标",
                  type: "danger"
                };
              } else {
                return {
                  text: data,
                  type: "danger"
                };
              }
            }
          }
        ]
      }
    };
  },

  methods: {
    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel("/billcountcustomer/export");
    }
  },
  computed: {},
  mounted() {}
};
</script>

