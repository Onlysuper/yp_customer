<template>
  <!-- 代理商结算统计 -->
  <div class="admin-page">
    代理商结算统计
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('billprofit_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span class="sumtext">达标商户数量:{{customerNumber}} 结算金额:{{settlePrice}}</span>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>

    <!-- 编辑 start -->
    <el-dialog title="修改" center :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="代理商名称" prop="agentNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.agentNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="企业税号" prop="dataTime" :label-width="formLabelWidth">
                <el-input v-model="editForm.dataTime" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
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
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday, eightday } from "@src/common/dateSerialize";
import { getAgentSettle, getAgentSettleSum } from "@src/apis";
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
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      status: "" // 结算状态
    };
    return {
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
              value: todayDate,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: todayDate,
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
          show: false, // 普通搜索显示
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
      tableData: {
        getDataUrl: {
          url: getAgentSettle // 初始化数据
        },
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
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "编辑",
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
                this.editFormVisible = true;
              }
            }
            // {
            //   text: "详情",
            //   color: "#00c1df",
            //   visibleFn: rowdata => {
            //     //待确认
            //     if (rowdata.status == "TRUE") {
            //       return true;
            //     } else {
            //       return false;
            //     }
            //   },
            //   cb: rowdata => {
            //     this.detailsFormVisible = true;
            //   }
            // }
          ]
        }
      }
    };
  },

  methods: {
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
        }
        this.sumLoading = false;
      });
    }
  },
  mounted() {
    this.SumHandle();
  }
};
</script>

