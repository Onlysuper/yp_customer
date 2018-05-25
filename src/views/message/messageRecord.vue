<template>
  <!-- 消息记录 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, today_ } from "@src/common/dateSerialize";
import { getMessages } from "@src/apis";
export default {
  name: "message-list",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      sendBusinessNo: "", // 发送方
      receiveBusinessNo: "", // 接收方
      status: "", // 消息状态
      createTimeStart: todayStr, // 开始时间
      createTimeEnd: todayStr // 结束时间
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
          corresattr: "sendBusinessNo",
          type: "text", // 表单类型
          label: "发送方", // 输入框前面的文字
          show: true, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.sendBusinessNo = value;
          }
        },
        {
          type: "dateGroup",
          label: "选择时间",
          show: true, // 普通搜索显示
          options: [
            {
              corresattr: "createTimeStart",
              label: "开始时间",
              defaultVlue: todayStr,
              value: today_,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              defaultVlue: todayStr,
              value: today_,
              cb: value => {
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
        },
        {
          corresattr: "status",
          type: "select",
          label: "消息状态",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "WAIT_SEND",
              label: "待发送"
            },
            {
              value: "TO_QUEUE",
              label: "队列中"
            },
            {
              value: "SUCCESS",
              label: "成功"
            },
            {
              value: "FAIL",
              label: "失败"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getMessages,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getMessages // 初始化数据
        // },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示复选框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "发送时间",
            width: "170px",
            sortable: true,
            word: "triggerTime"
          },
          {
            key: "发送方",
            width: "100px",
            word: "sendBusinessNo"
          },
          {
            key: "接收方",
            width: "100px",
            word: "receiveBusinessNo"
          },
          {
            key: "消息类别",
            width: "100px",
            word: "type",
            status: true,
            type: data => {
              switch (data) {
                case "TEXT":
                  return {
                    text: "文本类",
                    type: "success"
                  };
                case "DOWNLOAD":
                  return {
                    text: "下载类",
                    type: ""
                  };

                default:
                  return {
                    text: data,
                    type: ""
                  };
              }
            }
          },
          {
            key: "标题",
            width: "100px",
            word: "title"
          },
          {
            key: "内容",
            width: "200px",
            word: "content",
            type: data => {
              let msg = "";
              try {
                msg = JSON.parse(data).data
              } catch (err) {
                msg = data
              }
              return {
                text: msg
              };
            }
          },
          {
            key: "状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              switch (data) {
                case "SUCCESS":
                  return {
                    text: "成功",
                    type: "success"
                  };
                case "WAIT_SEND":
                  return {
                    text: "待发送",
                    type: "info"
                  };
                case "TO_QUEUE":
                  return {
                    text: "队列中",
                    type: "info"
                  };
                case "FAIL":
                  return {
                    text: "失败",
                    type: "danger"
                  };
                default:
                  return {
                    text: "全部",
                    type: ""
                  };
              }
            }
          },
          {
            key: "备注",
            width: "",
            word: "remark"
          }
        ]
      }
    };
  },
  methods: {},
  mounted() { }
};
</script>

