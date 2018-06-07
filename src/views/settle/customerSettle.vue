<template>
  <!-- 代理商结算统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详细信息 start -->
    <el-dialog :title="detailsForm.customerName" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <div class="line-label-box cross-back">
          <span class="line-label">交易金额:</span>
          <span class="line-label-last">{{detailsForm.payAmount}} 元</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">手续费:</span>
          <span class="line-label-last">{{detailsForm.proceduresFee}} 元</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">出款手续费:</span>{{detailsForm.outMoneyFee}} 元
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">冻结金额:</span>{{detailsForm.freezeAmount}} 元
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">结算金额:</span>{{detailsForm.settleAmount}} 元
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">银行名称:</span>{{detailsForm.settleAmount}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">身份证号:</span>{{detailsForm.settleIdCard}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易类型:</span>{{detailsForm.settleType}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">交易时间:</span>{{detailsForm.payTime}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">出款状态:</span>{{detailsForm.outMoneyStatus | statusFilter('customerSettleOutMoneyStatus')}}
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">备注:</span>{{detailsForm.remark}}
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
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
import { getCustomerSettles, postStatusCustomerSettle } from "@src/apis";
export default {
  name: "customerSettle",
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
      detailsForm: {},
      detailsFormVisible: false,
      sumVisible: true,
      customerNumber: 0,
      settlePrice: 0,
      sumLoading: false,
      formLabelWidth: "100px",
      editFormVisible: false,
      editForm: {},
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "customerNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
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
          corresattr: "outMoneyStatus",
          type: "select",
          label: "出款状态",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('customerSettleOutMoneyStatus')
          ],
          cb: value => {
            this.searchCondition.outMoneyStatus = value;
          }
        },
        {
          corresattr: "customerName",
          type: "text", // 表单类型
          label: "商户名称", // 输入框前面的文字
          show: false, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerName = value;
          }
        },
        {
          corresattr: "settleName",
          type: "text", // 表单类型
          label: "结算名称", // 输入框前面的文字
          show: false, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.settleName = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      actionUrl: getCustomerSettles,
      tableData: {
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "120px",
            word: "createTime"
          },
          {
            key: "商户名称",
            width: "120px",
            word: "customerName"
          },
          {
            key: "商户编号",
            width: "180px",
            word: "customerNo"
          },
          {
            key: "出款状态",
            width: "120px",
            word: "outMoneyStatus",
            status: true,
            type: data => {
              return this.statusFilter(data, 'customerSettleOutMoneyStatus')
            }
          },
          {
            key: "结算名称",
            width: "120px",
            word: "settleName"
          },
          {
            key: "结算账号",
            width: "160px",
            word: "settleNo"
          },
          {
            key: "交易金额",
            width: "120px",
            word: "payAmount"
          },
          {
            key: "手续费",
            width: "120px",
            word: "proceduresFee"
          },
          {
            key: "冻结金额",
            width: "120px",
            word: "freezeAmount"
          },
          {
            key: "结算金额",
            width: "120px",
            word: "settleAmount"
          },
          {
            key: "交易类型",
            width: "120px",
            word: "settleType"
          }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "详情",
              color: "#00c1df",
              cb: rowdata => {
                this.detailsForm = { ...rowdata }
                this.detailsFormVisible = true
              }
            },
            {
              text: "状态更新",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (
                  // rowdata.outMoneyStatus != "OUT_SUCCESS"
                  rowdata.outMoneyStatus == "OUT_FAIL" || rowdata.outMoneyStatus == "WAIT_AUDIT" || rowdata.outMoneyStatus == "OUT_SEND" || rowdata.outMoneyStatus == "AUDIT_FAIL"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                postStatusCustomerSettle()({
                  customerNo: rowdata.customerNo,
                  payTime: rowdata.payTime
                }).then(res => {
                  if (res.code == "00") {
                    let nowStatus = res
                    rowdata.outMoneyStatus = res.data;
                    this.$message({
                      message: "已更新",
                      type: "success",
                      center: true
                    });
                  } else {
                    this.$message({
                      message: res.msg,
                      type: "warning",
                      center: true
                    });
                  }
                });
              }
            }
          ]
        }
      }
    };
  },

  methods: {
  },
  mounted() {
  }
};
</script>

