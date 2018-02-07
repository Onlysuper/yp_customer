<template>
  <!-- 结算统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button size="small" @click="exportDialog" type="primary" icon="el-icon-upload2">导出</el-button>
          <el-button v-if="adminFilter('billprofit_sum')" class="mybutton" @click="SumHandle" :loading="sumLoading" size="small" type="primary" icon="el-icon-plus">合计</el-button>
          <span class="sumtext">达标商户数量:{{customerNumber}}个 结算金额:{{settlePrice}}元</span>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详情 start -->
    <el-dialog title="已结算清单" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">订单编号:</span>
              <span class="line-label-last">{{detailsForm.orderNo}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">收款人:</span>
              <span class="line-label-last">{{detailsForm.receiveMan}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">收款账户:</span>
              <span class="line-label-last">{{detailsForm.accountNo}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">开户行:</span>
              <span class="line-label-last">{{detailsForm.bankName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">实付金额:</span>
              <span class="line-label-last">{{detailsForm.settlePrice}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">达标商户数量:</span>
              <span class="line-label-last">{{detailsForm.customerNumber}}</span>
            </div>
          </el-col>

        </el-row>
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">联系电话:</span>
              <span class="line-label-last">{{detailsForm.agentPhone}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">打款时间:</span>
              <span class="line-label-last">{{detailsForm.remitTime}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改" center :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="订单编号" prop="orderNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.orderNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="收款人" prop="receiveMan" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.receiveMan" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="收款账户" prop="accountNo" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.accountNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="联系电话" prop="agentPhone" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.agentPhone" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="实付金额" prop="settlePrice" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.settlePrice" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="达标商户数量" prop="customerNumber" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.customerNumber" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="开户行" prop="bankName" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editForm.bankName" auto-complete="off"></el-input>
        </el-form-item>
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
import { getSettle, getSettleSum, postUpdateSettle } from "@src/apis";
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
      agentNo: "", // 代理商编号
      agentName: "", // 代理商名称
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      status: "" // 结束时间
    };
    return {
      detailsFormVisible: false,
      editFormVisible: false,
      detailsForm: {},
      editForm: {},
      customerNumber: 0,
      settlePrice: 0,
      sumLoading: false,
      formLabelWidth: "100px",
      editFormRules: {
        orderNo: [
          { required: true, message: "请输入订单编号", trigger: "blur" }
        ]
      },
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "代理商编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "agentName",
          type: "text", // 表单类型
          label: "代理商名称", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentName = value;
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
          label: "打款状态",
          show: false, // 普通搜索显示
          value: "TRUE",
          options: [
            {
              value: "",
              label: "所有"
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
          url: getSettle // 初始化数据
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
            sortable: true,
            word: "settleNo"
          },
          {
            key: "代理商编号",
            width: "",
            word: "agentNo"
          },
          {
            key: "代理商名称",
            width: "180px",
            word: "agentName"
          },
          {
            key: "时间",
            width: "",
            word: "dataTime"
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
                this.editForm = Object.assign(this.editForm, rowdata);
                this.editFormVisible = true;
              }
            },
            {
              text: "查询",
              color: "#e6a23c",
              visibleFn: rowdata => {
                //待确认
                if (rowdata.status == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            }
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
      getSettleSum()({
        createTimeStart: searchCondition.createTimeStart,
        createTimeEnd: searchCondition.createTimeEnd,
        status: searchCondition.status,
        agentNo: searchCondition.agentNo, // 代理商编号
        agentName: searchCondition.agentName // 代理商名称
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.customerNumber = data.customerNumber;
          this.settlePrice = data.settlePrice;
        }
        this.sumLoading = false;
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let editForm = this.editForm;
          this.resetSearchHandle();
          postUpdateSettle()({
            agentNo: editForm.agentNo,
            orderNo: editForm.orderNo,
            receiveMan: editForm.receiveMan,
            accountNo: editForm.accountNo,
            bankName: editForm.bankName,
            settlePrice: editForm.settlePrice,
            customerNumber: editForm.customerNumber,
            agentPhone: editForm.agentPhone
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，编辑数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData(this.storePageCount, this.storeCurrentPage);
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },
    // 导出
    exportDialog() {
      this.$refs.dataTable.ExportExcel("/agentSettle/export");
      return false;
    }
  },
  mounted() {
    this.SumHandle();
  }
};
</script>

