<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
    </div>
    <!-- 详情 start -->
    <el-dialog title="详情" center :visible.sync="detailsFormVisible" width="400px">
      <div class="detail-content">
        <div class="line-label-box">
          <span class="line-label">订单编号:</span>{{detailsForm.orderNo}}
        </div>
        <div class="line-label-box">
          <span class="line-label">交付状态:</span>{{detailsForm.status?detailsForm.status:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">发票代码:</span>{{detailsForm.invoiceCode?detailsForm.invoiceCode:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">发票号码:</span>{{detailsForm.invoiceNo?detailsForm.invoiceNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">含税金额:</span>{{detailsForm.totalTax?detailsForm.totalTax:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">手机号码:</span>{{detailsForm.phoneNo?detailsForm.phoneNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">购方名称:</span>{{detailsForm.enterpriseName?detailsForm.enterpriseName:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业税号:</span>{{detailsForm.taxNo?detailsForm.taxNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">单位地址:</span>{{detailsForm.enterpriseAddress?detailsForm.enterpriseAddress:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">开户银行:</span>{{detailsForm.bankName?detailsForm.bankName:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">银行帐号:</span>{{detailsForm.bankAccountNo?detailsForm.bankAccountNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">公司电话:</span>{{detailsForm.companyPhone?detailsForm.companyPhone:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">销方名称:</span>{{detailsForm.bussinessName?detailsForm.bussinessName:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">发票金额:</span>{{detailsForm.billAmount?detailsForm.billAmount:"??"}}
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm">
        <el-form-item v-show="false" label="订单编号" prop="orderNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.orderNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="交付状态" prop="status" :label-width="formLabelWidth">
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
        </el-form-item>
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
        <el-form-item label="购方名称" prop="enterpriseName" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位地址" prop="enterpriseAddress" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName" :label-width="formLabelWidth">
          <el-input v-model="editForm.bankName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行帐号" prop="bankAccountNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.bankAccountNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="companyPhone" :label-width="formLabelWidth">
          <el-input v-model="editForm.companyPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销方名称" prop="bussinessName" :label-width="formLabelWidth">
          <el-input v-model="editForm.bussinessName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票金额" prop="billAmount" :label-width="formLabelWidth">
          <el-input v-model="editForm.billAmount" auto-complete="off"></el-input>
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
@import "../../../src/assets/scss-pc/admin-page.scss";
</style>



<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { getBillrecords, postEditBillrecord } from "@src/apis";

export default {
  name: "customermanage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var dataHandle = nowDate => {
      var nowDate = new Date(nowDate);
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      month = month * 1 < 10 ? "0" + month : month;
      var day = nowDate.getDate();
      var todayDate = year + "-" + month + "-" + day;
      return todayDate;
    };
    var todayDate = dataHandle(new Date()); // 初始化默认开始查询日期
    var beforDate = dataHandle(new Date() - 24 * 60 * 60 * 1000); // 初始化默认结束查询日期

    var searchConditionVar = {
      customerNo: "", // 商户编号
      authCode: "", // 授权码
      invoiceType: "", // 开票类型
      createTimeStart: beforDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      status: "" // 状态
    };
    return {
      // addFormRules: {
      //   enterpriseName: [
      //     { required: true, message: "请输入企业名称", trigger: "blur" }
      //   ],
      //   taxNo: [{ validator: taxNumVerify, trigger: "blur" }],
      //   legalPerson: [{ required: true, message: "请输入企业法人", trigger: "blur" }],
      //   idCard: [{ validator: idCardVerify, trigger: "blur" }],
      //   linkMan: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
      //   phoneNo: [{ validator: phoneNumVerify, trigger: "blur" }]
      // },
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
          corresattr: "authCode",
          type: "text",
          label: "授权码",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.taxNo = value;
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
              value: new Date() - 24 * 60 * 60 * 1000,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: new Date(),
              cb: value => {
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
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
              label: "请选择"
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
            this.searchCondition.customerFrom = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: false, // 普通搜索显示
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
            this.searchCondition.customerFrom = value;
          }
        }
      ],
      // 列表数据
      tableData: {
        getDataUrl: {
          url: getBillrecords, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: searchConditionVar // 搜索内容
        },
        havecheck: true, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "开票时间",
            width: "150px",
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
            width: "100px",
            word: "bussinessName"
          },
          {
            key: "企业名称",
            width: "100px",
            word: "enterpriseName"
          },
          {
            key: "开票类型",
            width: "100px",
            word: "billType",
            status: true,
            type: data => {
              if (data == "1") {
                return {
                  text: "普票(个人)",
                  type: "success"
                };
              } else if (data == "2") {
                return {
                  text: "专票",
                  type: ""
                };
              } else if (data == "3") {
                return {
                  text: "电票",
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
          { key: "税号", word: "taxNo", width: "" }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "查看",
              color: "#00c1df",
              cb: rowdata => {
                this.detailsForm = rowdata;
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
    // 重新获取数据
    reloadData(page, Current) {
      let page_ = page ? page : 1;
      let limit_ = Current ? Current : 10;
      this.$store.commit("pageCount", page_);
      this.$store.commit("currentPage", limit_);
      this.tableData.getDataUrl = {
        url: this.tableData.getDataUrl.url,
        page: page_,
        limit: limit_,
        searchCondition: this.searchCondition
      };
    },
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let editForm = this.editForm;
          this.resetSearchHandle();
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
              this.reloadData(this.storePageCount, this.storeCurrentPage);
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.resultMsg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },

    /**TABLE页交互 START ************************************************************ */
    // 普通搜索 具备隐藏
    visiblesomeHandle() {
      this.searchOptions.forEach(element => {
        // searchOptions数组里面的corresattr 是索引
        if (!element.show) {
          if (element.type == "dateGroup") {
            // 开始时间 到结束时间组合 特殊处理
            element.options.forEach(element => {
              var corresattr = element.corresattr;
              element.value = "";
              this.searchCondition[corresattr] = "";
            });
          } else {
            var corresattr = element.corresattr;
            element.value = "";
            this.searchCondition[corresattr] = "";
          }
        }
      });
    },
    callbackformHandle(cb, data) {
      // 表单双向绑定 得到输入的内容并返回到本页面
      cb(data);
    },
    resetSearchHandle() {
      // 重置查询表单
      this.searchOptions.forEach(element => {
        if (element.type != "dateGroup") {
          element.value = "";
          this.searchCondition[element.corresattr] = "";
        } else {
          element.options.forEach(element => {
            element.value = "";
            this.searchCondition[element.corresattr] = "";
          });
        }
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
    /**END ***********************************************/
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    editFormCustomerFrom() {
      // 表单内用户来源显示状态客户来源
      if (this.editForm.customerFrom == "OPEN_API") {
        return "第三方";
      } else if (this.editForm.customerFrom == "PLUGIN") {
        return "插件";
      } else if (this.editForm.customerFrom == "LOCAL") {
        return "后台";
      }
    },
    //当前页数
    storePageCount() {
      return this.$store.state.dataTable.pageCount;
    },
    //每页条数
    storeCurrentPage() {
      return this.$store.state.dataTable.currentPage;
    }
  },
  mounted() {}
};
</script>

