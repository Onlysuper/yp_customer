<template>
  <!-- 开票记录 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详情 start -->
    <el-dialog title="详情" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <el-row class="cross-back">
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">订单编号:</span>
              <span class="line-label-last">{{detailsForm.billRecordNo}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">交付状态:</span>
              <span class="line-label-last">{{detailsForm.status | payStatus}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="cross-back">
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">发票代码:</span>
              <span class="line-label-last">{{detailsForm.invoiceCode}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">发票号码:</span>
              <span class="line-label-last">{{detailsForm.invoiceNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="cross-back">
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">含税金额:</span>
              <span class="line-label-last">{{detailsForm.billAmount}} 元</span>
              <!-- <span class="line-label">含税金额:</span>
              <span class="line-label-last">{{detailsForm.totalTax}}</span> -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">手机号码:</span>
              <span class="line-label-last">{{detailsForm.phoneNo}}</span>
            </div>
          </el-col>
        </el-row>

        <el-row class="cross-back">
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">购方名称:</span>
              <span class="line-label-last">{{detailsForm.enterpriseName}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">企业税号:</span>
              <span class="line-label-last">{{detailsForm.taxNo}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="cross-back">
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">公司电话:</span>
              <span class="line-label-last">{{detailsForm.companyPhone}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="line-label-box">
              <span class="line-label">销方名称:</span>
              <span class="line-label-last">{{detailsForm.bussinessName}}</span>
            </div>
          </el-col>
        </el-row>
        <div class="line-label-box cross-back">
          <span class="line-label">银行帐号:</span>
          <span class="line-label-last">{{detailsForm.bankAccountNo}}</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">开户银行:</span>
          <span class="line-label-last">{{detailsForm.bankName}}</span>
        </div>
        <div class="line-label-box cross-back">
          <span class="line-label">单位地址:</span>
          <span class="line-label-last">{{detailsForm.enterpriseAddress}}</span>
        </div>
        <div v-if="detailsForm.status=='BILLING_FAIL'?true:false" class="line-label-box cross-back">
          <span class="line-label">失败原因:</span>
          <span class="line-label-last">{{detailsForm.respMsg}}</span>
        </div>
        <!-- <div class="line-label-box">
          <span class="line-label">发票金额:</span>
          <span class="line-label-last">{{detailsForm.billAmount}}</span>
        </div> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
        <a v-if="downLoadVisible" :href="detailsForm.pdfUrl" target="_blank" download="发票" class="el-button el-button--primary">下载</a>
        <!-- <el-button @click="downLoadpdf(detailsForm.pdfUrl)" v-if="downLoadVisible" class="el-button el-button--primary">下载</el-button> -->
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item v-show="false" label="订单编号" prop="orderNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.orderNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item v-show="false" label="交付状态" prop="status" :label-width="formLabelWidth">
                <el-input v-model="editForm.status" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item v-show="false" label="发票代码" prop="invoiceCode" :label-width="formLabelWidth">
          <el-input v-model="editForm.invoiceCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="发票号码" prop="invoiceNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.invoiceNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="含税金额" prop="totalTax" :label-width="formLabelWidth">
          <el-input v-model="editForm.totalTax" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="手机号码" prop="phoneNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.phoneNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="购方名称" prop="enterpriseName" :label-width="formLabelWidth">
                <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="单位地址" prop="enterpriseAddress" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName" :label-width="formLabelWidth">
          <el-input v-model="editForm.bankName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行帐号" prop="bankAccountNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.bankAccountNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="公司电话" prop="companyPhone" :label-width="formLabelWidth">
                <el-input v-model="editForm.companyPhone" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="销方名称" prop="bussinessName" :label-width="formLabelWidth">
                <el-input v-model="editForm.bussinessName" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="发票金额" prop="billAmount" :label-width="formLabelWidth">
          <el-input v-model="editForm.billAmount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->

  </div>

</template>
  <style lang="scss">
.downLoad-text {
  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import {
  todayDate,
  yesterday,
  today_,
  yesterday_
} from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { getBillrecords, postEditBillrecord } from "@src/apis";
import utils from "@src/common/utils"
export default {
  name: "billrecord",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      authCode: "", // 授权码
      invoiceType: "", // 开票类型
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      status: "" // 状态
    };
    return {
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      downLoadVisible: false,
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
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
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "SUCCESS",
              label: "推送成功"
            },
            {
              value: "BILLING_SUCCESS",
              label: "开票成功"
            },
            {
              value: "BILLING",
              label: "开票中"
            },
            {
              value: "ORDER",
              label: "待开票"
            },
            {
              value: "BILLING_FAIL",
              label: "失败"
            },
            {
              value: "QUERY_FAIL",
              label: "查询失败"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
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
              value: today_,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: today_,
              cb: value => {
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
        },
        {
          corresattr: "authCode",
          type: "text",
          label: "授权码",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.authCode = value;
          }
        },
        {
          corresattr: "invoiceType",
          type: "select",
          label: "开票类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "所有"
            },
            {
              value: "1",
              label: "普票"
            },
            {
              value: "2",
              label: "专票"
            },
            {
              value: "3",
              label: "电票"
            }
          ],
          cb: value => {
            this.searchCondition.invoiceType = value;
          }
        }

      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getBillrecords // 初始化数据
        },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "开票时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "商户号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "经营名称",
            width: "180px",
            word: "bussinessName"
          },
          //  {{#  if(  d.invoiceMedia == 'PAPERY'&&d.billType == 1  ){ }}
          //     <span class="layui-btn layui-btn-mini">普票</span>
          //     {{#  } else if(d.invoiceMedia == 'PAPERY'&&d.billType == 2 ){ }}
          //     <span class="layui-btn layui-btn-mini">专票</span>
          //     {{#  } else if(d.invoiceMedia == 'PAPERY'&&d.billType == 3 ){ }}
          //     <span class="layui-btn layui-btn-mini">普票(个人)</span>
          //     {{#  } else if(d.invoiceMedia == 'ELECTRONIC' ){ }}
          //     <span class="layui-btn layui-btn-mini">电票</span>
          //     {{#  } }}
          {
            key: "开票类型",
            width: "100px",
            word: "billType",
            status: true,
            type: (data, row) => {
              if (row.invoiceMedia == 'PAPERY' && data == "1") {
                return {
                  text: "普票",
                  type: "success"
                };
              } else if (row.invoiceMedia == 'PAPERY' && data == "2") {
                return {
                  text: "专票",
                  type: "danger"
                };
              } else if (row.invoiceMedia == 'PAPERY' && data == "3") {
                return {
                  text: "普票(个人)",
                  type: "warning"
                };
              } else if (row.invoiceMedia == 'ELECTRONIC') {
                return {
                  text: "电票",
                  type: ""
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
            key: "状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              if (data == "SUCCESS") {
                return {
                  text: "推送成功",
                  type: "success"
                };
              } else if (data == "BILLING_SUCCESS") {
                return {
                  text: "开票成功",
                  type: ""
                };
              } else if (data == "BILLING") {
                return {
                  text: "开票中",
                  type: "danger"
                };
              } else if (data == "ORDER") {
                return {
                  text: "待开票",
                  type: "danger"
                };
              } else if (data == "BILLING_FAIL") {
                return {
                  text: "失败",
                  type: "danger"
                };
              } else if (data == "QUERY_FAIL") {
                return {
                  text: "查询失败",
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
            key: "购方",
            width: "180px",
            word: "enterpriseName"
          },
          { key: "税号", word: "taxNo", width: "200px" }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "查看",
              color: "#00c1df",
              cb: rowdata => {
                // downLoadVisible
                //      if (data.pdfUrl != null && data.pdfUrl != "") {
                //     $("#pdfUrlDiv").show();
                //     $("#pdfUrlA").attr("href", data.pdfUrl);
                // } else {
                //     $("#pdfUrlDiv").hide();
                //     $("#pdfUrlA").attr("href", "");
                // }
                this.detailsForm = rowdata;
                if (rowdata.status == "BILLING_SUCCESS") {
                  this.downLoadVisible = true;
                } else {
                  this.downLoadVisible = false;
                }
                this.detailsFormVisible = true;
              }
            },
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                console.log(rowdata);
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    // downLoad(pdfUrl) {
    //   this.$refs.dataTable.ExportExcel(pdfUrl, "download", false, true);
    // },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let editForm = this.editForm;
          let sendata = utils.pickObj(editForm, [
            "billRecordNo", 'orderNo', 'status', 'invoiceCode', 'invoiceNo',
            'totalTax', 'phoneNo', 'taxNo', 'enterpriseAddress', 'bankName',
            'bankAccountNo', 'companyPhone', 'bussinessName', 'billAmount',
            'enterpriseName'
          ]);
          this.saveLoading = true;
          postEditBillrecord()({ ...sendata }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
            this.saveLoading = false;
          });
        }
      });
    },
    downLoadpdf(url) {
      this.$refs.dataTable.ExportExcelDIR(url);
    }
  },
  computed: {
    editFormCustomerFrom() {
      // 表单内用户来源显示状态客户来源
      if (this.editForm.customerFrom == "OPEN_API") {
        return "第三方";
      } else if (this.editForm.customerFrom == "PLUGIN") {
        return "插件";
      } else if (this.editForm.customerFrom == "LOCAL") {
        return "后台";
      }
    }
  },
  mounted() { },
  watch: {
    detailsFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    },
    downLoadVisible(val) {
      this.saveLoadingStop(val);
    },
  }
};
</script>

