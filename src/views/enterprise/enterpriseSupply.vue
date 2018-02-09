<template>
  <!-- 资质补充 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="showDialog('addFormVisible')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增资质" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="资质名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="税号" prop="tax" :label-width="formLabelWidth">
                <el-input v-model="addForm.tax" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
                <el-input v-model="addForm.address" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="电话" prop="tel" :label-width="formLabelWidth">
                <el-input v-model="addForm.tel" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="开户银行名称" prop="bank" :label-width="formLabelWidth">
                <el-input v-model="addForm.bank" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="银行帐号" prop="account" :label-width="formLabelWidth">
                <el-input v-model="addForm.account" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 详情 start -->
    <el-dialog title="资质补充单详情" center :visible.sync="detailsFormVisible">
      <div class="detail-content">
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">税号:</span>
              <span class="line-label-last">{{detailsForm.tax}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">名称:</span>
              <span class="line-label-last">{{detailsForm.name}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">电话:</span>
              <span class="line-label-last">{{detailsForm.tel}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">银行:</span>
              <span class="line-label-last">{{detailsForm.bank}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line-label-box">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <span class="line-label">帐号:</span>
              <span class="line-label-last">{{detailsForm.account}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <span class="line-label">操作员:</span>
              <span class="line-label-last">{{detailsForm.operator}}</span>
            </div>
          </el-col>

        </el-row>
        <el-row class="line-label-box">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <span class="line-label">状态:</span>
              <span class="line-label-last">{{detailsForm.status | enterprisesupplyStatus}}</span>
            </div>
          </el-col>
        </el-row>

        <el-alert v-if="!detailsForm.remark?false:true" type="info" center :closable="false" :title="detailsForm.remark">
        </el-alert>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import "@src/common/filters";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import {
  postEnterpriseSupplys,
  postAddEnterpriseSupply,
  postEditBillrecord
} from "@src/apis";

export default {
  name: "billrecord",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      name: "",
      tax: "",
      operator: ""
    };
    return {
      addFormVisible: false,
      addForm: {},
      addFormRules: {
        name: [{ required: true, message: "请输入资质名称", trigger: "blur" }],
        tax: [{ required: true, message: "请输入税号", trigger: "blur" }]
      },
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
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
          corresattr: "name",
          type: "text",
          label: "企业名称",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.name = value;
          }
        },
        {
          corresattr: "tax",
          type: "text",
          label: "企业税号",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.tax = value;
          }
        },
        {
          corresattr: "operator",
          type: "text",
          label: "操作员",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.operator = value;
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
        }
      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: postEnterpriseSupplys // 初始化数据
        },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "税号",
            width: "180px",
            sortable: true,
            word: "tax"
          },
          {
            key: "名称",
            width: "200px",
            word: "name"
          },
          {
            key: "状态",
            width: "80px",
            word: "status",
            status: true,
            type: data => {
              if (data == "INIT") {
                return {
                  text: "未处理",
                  type: "info"
                };
              } else if (data == "SUCCESS") {
                return {
                  text: "已处理",
                  type: "danger"
                };
              } else if (data == "FAIL") {
                return {
                  text: "失败",
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
            key: "地址",
            width: "180px",
            word: "address"
          },
          {
            key: "电话",
            width: "180px",
            word: "tel"
          },
          {
            key: "银行",
            width: "180px",
            word: "bank"
          },
          {
            key: "帐号",
            width: "180px",
            word: "account"
          },
          {
            key: "操作员",
            width: "180px",
            word: "operator"
          }
        ],
        operation: {
          width: "60px",
          options: [
            // 操作按钮
            {
              text: "查看",
              color: "#00c1df",
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
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          var addForm = this.addForm;
          // this.resetSearchHandle();
          postAddEnterpriseSupply()({
            name: addForm.name,
            tax: addForm.tax,
            address: addForm.address,
            tel: addForm.tel,
            bank: addForm.bank,
            account: addForm.account
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetForm("addForm");
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          let editForm = this.editForm;
          // this.resetSearchHandle();
          postEditBillrecord()({
            billRecordNo: editForm.billRecordNo,
            orderNo: editForm.orderNo,
            status: editForm.status,
            invoiceCode: editForm.invoiceCode,
            invoiceNo: editForm.invoiceNo,
            totalTax: editForm.totalTax,
            phoneNo: editForm.phoneNo,
            enterpriseName: editForm.phoneNo,
            taxNo: editForm.taxNo,
            enterpriseAddress: editForm.enterpriseAddress,
            bankName: editForm.bankName,
            bankAccountNo: editForm.bankAccountNo,
            companyPhone: editForm.companyPhone,
            bussinessName: editForm.bussinessName,
            billAmount: editForm.billAmount
          }).then(data => {
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
            this.saveLoading = false;
            console.log(data);
          });
        }
      });
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
  mounted() {}
};
</script>

