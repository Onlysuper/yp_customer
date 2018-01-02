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
          <span class="line-label">企业名称:</span>{{detailsForm.enterpriseName}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业税号:</span>{{detailsForm.taxNo?detailsForm.taxNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业法人:</span>{{detailsForm.legalPerson?detailsForm.legalPerson:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">身份证:</span>{{detailsForm.idCard?detailsForm.idCard:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">联系人:</span>{{detailsForm.linkMan?detailsForm.linkMan:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">手机号:</span>{{detailsForm.phoneNo?detailsForm.phoneNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户编号:</span>{{detailsForm.agentNo?detailsForm.agentNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户来源:</span>{{detailsForm.customerFrom?detailsForm.customerFrom:"??"}}
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业法人" prop="legalPerson" :label-width="formLabelWidth">
          <el-input v-model="editForm.legalPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
          <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkMan" :label-width="formLabelWidth">
          <el-input v-model="editForm.linkMan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.phoneNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户来源" prop="customerFrom" :label-width="formLabelWidth">
          <el-input v-model="editFormCustomerFrom" auto-complete="off"></el-input>
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
import { getBillrecords } from "@src/apis";

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
      addFormRules: {
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        taxNo: [{ validator: taxNumVerify, trigger: "blur" }],
        legalPerson: [{ required: true, message: "请输入企业法人", trigger: "blur" }],
        idCard: [{ validator: idCardVerify, trigger: "blur" }],
        linkMan: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        phoneNo: [{ validator: phoneNumVerify, trigger: "blur" }]
      },
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        enterpriseName: "",
        taxNo: "",
        legalPerson: "",
        idCard: "",
        linkMan: "",
        phoneNo: ""
      },
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
              return {
                text: data,
                type: "danger"
              };
            }
          },
          {
            key: "状态",
            width: "80px",
            word: "status",
            status: true,
            type: data => {
              return {
                text: data,
                type: "danger"
              };
            }
          },
          { key: "税号", word: "taxNo", width: "170" }
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
          this.resetSearchHandle();
          postEditCustomer()(this.editForm).then(data => {
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

