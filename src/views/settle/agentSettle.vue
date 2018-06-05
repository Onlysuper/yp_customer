<template>
  <!-- 代理商结算统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billprofit_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span v-if="sumVisible" class="sumtext">
            <span>达标商户数量:{{customerNumber}} </span>
            <span class="split-line-v"></span>
            <span>结算金额:{{settlePrice}}</span>
          </span>
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
  todayStr,
  yesterdayStr,
  eightdayStr,
  today_
} from "@src/common/dateSerialize";
import { getSettles, getAgentSettleSum, postUpdateSettles } from "@src/apis";
export default {
  name: "agent-settle",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      createTimeStart: todayStr, // 开始时间
      createTimeEnd: todayStr, // 结束时间
      status: "" // 结算状态
    };
    return {
      sumVisible: true,
      customerNumber: 0,
      settlePrice: 0,
      sumLoading: false,
      formLabelWidth: "100px",
      detailsFormVisible: false,
      editFormVisible: false,
      editForm: {},
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
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
          label: "结算状态",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "TRUE",
              label: "已确认"
            },
            {
              value: "FALSE",
              label: "待确认"
            },
            {
              value: "SUCCESS",
              label: "已结算"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      actionUrl: getSettles,
      tableData: {
        // getDataUrl: {
        //   url: getSettles // 初始化数据
        // },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "结算单号",
            width: "120px",
            word: "settleNo"
          },
          {
            key: "时间",
            width: "180px",
            word: "dataTime"
          },

          {
            key: "商户数量",
            width: "",
            word: "customerNumber"
          },
          {
            key: "结算金额",
            width: "",
            word: "settlePrice"
          },
          {
            key: "结算状态",
            width: "",
            word: "status",
            status: true,
            type: data => {
              if (data === "TRUE") {
                return {
                  text: "已确认",
                  type: ""
                };
              } else if (data === "FALSE") {
                return {
                  text: "待确认",
                  type: "info"
                };
              } else if (data === "SUCCESS") {
                return {
                  text: "已结算",
                  type: "success"
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
          }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "待确认",
              color: "#00c1df",
              visibleFn: rowdata => {
                //已确认
                if (rowdata.status == "FALSE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                // 确认结算订单金额
                this.$confirm("此操作将确认结算订单金额, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  postUpdateSettles()({
                    agentNo: rowdata.agentNo,
                    settleNo: rowdata.settleNo
                  }).then(data => {
                    if (data.code == "00") {
                      this.$message({
                        type: "success",
                        message: "已确认"
                      });
                    } else {
                      this.$message({
                        type: "warning",
                        message: data.msg
                      });
                    }
                    this.reloadData();
                  });
                });
              }
            }
          ]
        }
      }
    };
  },

  methods: {
     seachstartHandle() {
      // 开始搜索
      this.reloadData();
      this.sumVisible = false;
    },
    // 合计
    SumHandle() {
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getAgentSettleSum()({
        createTimeStart: searchCondition.createTimeStart,
        createTimeEnd: searchCondition.createTimeEnd,
        status: searchCondition.status
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.customerNumber = data.customerNumber;
          this.settlePrice = data.settlePrice;
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
    }
  },
  mounted() {
    if (adminFilter('billprofit_sum')) {
      this.SumHandle();
    }
  }
};
</script>

