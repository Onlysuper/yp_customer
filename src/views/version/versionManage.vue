<template>
  <!-- 版本管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" size="small" type="primary" icon="el-icon-plus">上传新版本</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import {
  postVersion,
  patchVersion,
  getVersions,
  getOldVersions,
  setUsingVersion
} from "@src/apis";
export default {
  name: "messageRecord",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      clientVersion: "", // 客户端版本号
      status: "" // 状态
    };
    return {
      scanSum: 0,
      pushSum: 0,
      netSum: 0,
      sumLoading: false,
      formLabelWidth: "100px",
      jmTotal: "",
      ptTotal: "",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "clientVersion",
          type: "text", // 表单类型
          label: "版本号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.clientVersion = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "TRUE",
              label: "开启"
            },
            {
              value: "FALSE",
              label: "未开启"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getVersions // 初始化数据
        },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示复选框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "上传时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "版本号",
            width: "100px",
            word: "clientVersion"
          },
          {
            key: "兼容版本",
            width: "80px",
            word: "compatibleVersion"
          },
          {
            key: "版本类型",
            width: "130px",
            word: "type",
            status: true,
            type: data => {
              switch (data) {
                case "HOST_C":
                  return {
                    text: "c++主程序",
                    type: ""
                  };
                case "UPDATE_C":
                  return {
                    text: "c++更新程序",
                    type: ""
                  };
                case "HOST":
                  return {
                    text: "c#主程序",
                    type: "danger"
                  };
                case "UPDATE":
                  return {
                    text: "c#更新程序",
                    type: "danger"
                  };
                case "RELEASE":
                  return {
                    text: "官网版本",
                    type: "danger"
                  };
                case "HOST_OLD":
                  return {
                    text: "c#老版本主程序",
                    type: "danger"
                  };
                case "DATA_COLLECTION":
                  return {
                    text: "数据采集程序",
                    type: "danger"
                  };
                default:
                  return {
                    text: data,
                    type: "danger"
                  };
              }
            }
          },
          {
            key: "强制更新",
            width: "80px",
            word: "isForced",
            status: true,
            type: data => {
              switch (data) {
                case "TRUE":
                  return {
                    text: "是",
                    type: "success"
                  };
                default:
                  return {
                    text: "否",
                    type: "info"
                  };
              }
            }
          },
          {
            key: "状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              switch (data) {
                case "TRUE":
                  return {
                    text: "开启",
                    type: "success"
                  };
                default:
                  return {
                    text: "未开启",
                    type: "warning"
                  };
              }
            }
          },
          {
            key: "下载地址",
            width: "",
            word: "url"
          }
        ],
        operation: {
          width: "100px",
          options: [
            {
              text: "编辑",
              color: "#3685FD",
              cb: rowdata => {
                /* this.editForm = rowdata;
                this.editFormVisible = true; */
              }
            },
            {
              text: "启用",
              color: "#3685FD",
              visibleFn: rowdata => {
                if (rowdata.status === "TRUE") {
                  return false;
                } else {
                  return true;
                }
              },
              cb: rowdata => {
                /* this.editForm = rowdata;
                this.editFormVisible = true; */
              }
            }
          ]
        }
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>

