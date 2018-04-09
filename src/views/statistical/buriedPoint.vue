<template>
  <!-- 埋点管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
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
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { todayDate, today_ } from "@src/common/dateSerialize";
import { getBurialPointManages, getNewBurialPointManages, getBurialPointTotal, getNewBurialPointTotal } from "@src/apis";
import buriedPointActionId from "@src/data/buriedPointActionId.json"
export default {
  name: "operator_log",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      agentNo: "", // 合伙人编号
      version: "", // 版本号
      actionId: "", // 操作类型
      userId: "", // 授权码
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate // 结束时间
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
          type: "dateGroup",
          label: "选择时间",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              clearable: false,
              corresattr: "createTimeStart",
              label: "开始时间",
              value: today_,
              cb: value => {
                // this.searchOptions[1].options[0].value = value;
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              clearable: false,
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: today_,
              cb: value => {
                // this.searchOptions[1].options[1].value = value;
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
        },
        {
          corresattr: "userType",
          type: "select",
          label: "用户类型",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "1",
              label: "静默"
            },
            {
              value: "0",
              label: "普通"
            }
          ],
          cb: value => {
            this.searchCondition.userType = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false,
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "oldOrNew",
          type: "select",
          label: "新老版本",
          show: false, // 普通搜索显示
          value: "old",
          options: [
            // {
            //   value: "",
            //   label: "全部"
            // },
            {
              value: "new",
              label: "新版本"
            },
            {
              value: "old",
              label: "老版本"
            }
          ],
          cb: value => {
            if (value == "new") {
              this.actionUrl = getNewBurialPointManages;
              this.SumHandleUrl = getNewBurialPointTotal;
            } else {
              this.actionUrl = getBurialPointManages;
              this.SumHandleUrl = getBurialPointTotal;
            }
          }
        },
        {
          corresattr: "version",
          type: "text", // 表单类型
          label: "版本号", // 输入框前面的文字
          show: false,
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.version = value;
          }
        },
        {
          corresattr: "actionId",
          type: "select",
          label: "操作类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...buriedPointActionId.map((item) => { return { label: item.name, value: item.code } })
          ],
          cb: value => {
            this.searchCondition.actionId = value;
          }
        }
      ],
      SumHandleUrl: getBurialPointTotal,
      // 列表数据
      actionUrl: getBurialPointManages,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getBurialPointManages // 初始化数据
        // },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示复选框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "授权码",
            width: "100px",
            word: "userId"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "操作类型",
            width: "100px",
            word: "actionDesc"
          },
          {
            key: "用户类型",
            width: "100px",
            word: "userType",
            status: true,
            type: data => {
              if (data === "1") {
                return {
                  text: "静默",
                  type: "success"
                };
              } else if (data === "0") {
                return {
                  text: "普通",
                  type: "success"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          },
          {
            key: "版本号",
            width: "100px",
            word: "version"
          },
          {
            key: "IP地址",
            width: "180px",
            word: "ipAddress"
          },
          {
            key: "备注",
            width: "",
            word: "remark"
          }
        ]
        // operation: {
        //   width: "100px",
        //   options: [
        //     {
        //       text: "详情",
        //       color: "#3685FD",
        //       visibleFn: rowdata => {
        //         if (this.adminOperationAll.customer_detail == "TRUE") {
        //           return true;
        //         } else {
        //           return false;
        //         }
        //       },
        //       cb: rowdata => {
        //         // this.uploadDialogVisible = true;
        //         // this.form = { ...rowdata };
        //       }
        //     }
        //   ]
        // }
      }
    };
  },
  methods: {
    SumHandle() {
      this.sumLoading = true;
      this.SumHandleUrl()(this.searchCondition).then(res => {
        console.log(res);
        if (res.ptNum > 0) {
          this.ptTotal = `普通商户共操作${res.ptNum}次,明细如下：<hr>`;
          res.pt.forEach((value, index, array) => {
            this.ptTotal += `${value.actionDesc} ${value.amount} 次 <br>`;
          });
        }
        if (res.jmNum > 0) {
          this.jmTotal = `<br>静默商户共操作${res.ptNum}次,明细如下：<hr>`;
          res.pt.forEach((value, index, array) => {
            this.jmTotal += `${value.actionDesc} ${value.amount} 次 <br>`;
          });
        }
        this.sumLoading = false;
        var content = `<div style='height:400px;overflow:auto'>${this.ptTotal +
          this.jmTotal}</div>`;
        if (res.ptNum > 0 || res.jmNum > 0) {
          this.$alert(content, "统计信息", {
            dangerouslyUseHTMLString: true,
            confirmButtonText: "确定",
            callback: action => { }
          });
        }
      });
    }
  },
  mounted() { }
};
</script>

