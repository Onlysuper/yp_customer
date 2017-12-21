<template>
  <div class="admin-page">
    快速开票分润
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.admin-page {
  position: relative;
  background: #eff2f5;
  padding: 10px;
  .el-form-item {
    margin-bottom: 10px;
  }
  .detail-content {
    .line-label-box {
      padding: 4px 0;
      .line-label {
        min-width: 100px;
        display: inline-block;
        padding: 0 10px;
      }
      &:nth-child(odd) {
        background-color: rgba(0, 193, 223, 0.1);
      }
      &:nth-child(even) {
        background-color: #fff;
      }
    }
  }
  .content-center-box {
    text-align: center;
  }
  .sep-inline {
    margin: 5px 0;
    width: 100%;
  }
  .operation-box {
    float: left;
    width: 100%;
    .button-group {
      margin-right: 10px;
    }
    .line {
      text-align: center;
    }
  }
  .operation-group {
    padding: 5px 0;
    .line {
      text-align: center;
    }
  }
  .tableHeader {
    background: #f0f0f0;
  }
  .page-tag {
    margin-bottom: 10px;
  }
  .admin-main-box {
    padding: 10px;
    position: relative;
    height: 100%;
    // width: 100%;
    background: #fff;
  }
  .form-box {
    margin-top: 10px;
  }
  .el-pagination {
    text-align: right;
    padding-top: 17px;
  }
  .tip-text {
    color: #67c23a;
  }
  .button-group {
    padding-bottom: 5px;
  }
}
</style>



<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

import {
  getCustomers,
  postAddCustomer,
  postEditCustomer,
  postUploadFile, // 上传文件
  transferCustomer,
  perfectCustomer
} from "@src/apis";

export default {
  name: "customermanage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    // 不能为空
    var notNullVerify = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空!"));
      } else {
        callback();
      }
    };
    // 税号
    var taxNumVerify = (rule, value, callback) => {
      var reg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
      if (!reg.test(value)) {
        return callback(new Error("税号有误！"));
      } else {
        callback();
      }
    };
    // 身份证号
    var idCardVerify = (rule, value, callback) => {
      var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      if (!reg.test(value)) {
        return callback(new Error("身份证号有误!"));
      } else {
        callback();
      }
    };
    // 电话号码
    var phoneNumVerify = (rule, value, callback) => {
      var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
      if (!reg.test(value)) {
        return callback(new Error("手机号有误!"));
      } else {
        callback();
      }
    };
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
      taxNo: "", // 企业税号
      enterpriseName: "", // 企业名称
      createTimeStart: beforDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      agentNo: "", // 合伙人编号
      customerFrom: "" // 入网来源
    };
    return {
      addFormVisible: false, // 新增框
      batchNetFormVisible: false, // 批量入网框
      batchTransferFormVisible: false, // 批量转移模板
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      transferFormVisible: false,
      batchNetForm: {
        url: ""
      },
      addFormRules: {
        enterpriseName: [{ validator: notNullVerify, trigger: "blur" }],
        taxNo: [{ validator: taxNumVerify, trigger: "blur" }],
        legalPerson: [{ validator: notNullVerify, trigger: "blur" }],
        idCard: [{ validator: idCardVerify, trigger: "blur" }],
        linkMan: [{ validator: notNullVerify, trigger: "blur" }],
        phoneNo: [{ validator: phoneNumVerify, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      transferFormRules: {
        receiveAgentNo: [{ validator: notNullVerify, trigger: "blur" }]
      }, // 转移单个规则
      transferForm: {}, // 转移单个表单
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
          corresattr: "taxNo",
          type: "text",
          label: "企业税号",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.taxNo = value;
          }
        },
        {
          corresattr: "enterpriseName",
          type: "text",
          label: "企业名称",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.enterpriseName = value;
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
          corresattr: "agentNo",
          type: "text",
          label: "合伙人编号",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "customerFrom",
          type: "select",
          label: "入网来源",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "插件",
              label: "插件"
            },
            {
              value: "扫码",
              label: "扫码"
            },
            {
              value: "公众号",
              label: "公众号"
            },
            {
              value: "静默",
              label: "静默"
            },
            {
              value: "后台",
              label: "后台"
            },
            {
              value: "第三方",
              label: "第三方"
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
          url: getCustomers, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: searchConditionVar // 搜索内容
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "100px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "企业名称",
            width: "100px",
            word: "enterpriseName"
          },
          {
            key: "企业税号",
            word: "taxNo"
          },
          {
            key: "联系人",
            width: "100px",
            word: "linkMan"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "来源",
            width: "80px",
            word: "customerFrom",
            status: true,
            type: data => {
              if (data == "OPEN_API") {
                return {
                  text: "第三方",
                  type: "danger"
                };
              } else if (data == "PLUGIN") {
                return {
                  text: "插件",
                  type: "warning"
                };
              } else if (data == "LOCAL") {
                return {
                  text: "后台",
                  type: ""
                };
              } else if (data == null || data == "") {
                return {
                  text: "未知",
                  type: "info"
                };
              } else {
                return {
                  text: "未定义",
                  type: "info"
                };
              }
            }
          },
          {
            key: "状态",
            word: "status",
            width: "80px",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "开启",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "未开启",
                  type: "info"
                };
              } else {
                return {
                  text: "没写",
                  type: ""
                };
              }
            }
          },
          { key: "入网时间", word: "createTime", width: "170" }
        ],
        operation: [
          // 操作按钮
          {
            text: "详情",
            cb: rowdata => {
              this.detailsForm = rowdata;
              this.detailsFormVisible = true;
            }
          },
          {
            text: "编辑",
            cb: rowdata => {
              this.editForm = rowdata;
              this.editFormVisible = true;
            }
          },
          {
            text: "转移",
            cb: rowdata => {
              this.transferForm = rowdata;
              this.transferFormVisible = true;
            }
          }
          // {
          //   text: "修改商户产品",
          //   cb: rowdata => {
          //     console.log(rowdata);
          //   }
          // }
        ]
      }
    };
  },

  methods: {
    handleBatchTransferSuccess() {
      // 批量转移文件上传成功
      this.$message.success("恭喜您！上传成功");
      batchNetForm.url = URL.createObjectURL(file.raw);
      console.log(batchNetForm.url);
    },
    handleBatchNetSuccess(res, file) {
      // 批量入网文件上传成功
      this.$message.success("恭喜您！上传成功");
      batchNetForm.url = URL.createObjectURL(file.raw);
      console.log(batchNetForm.url);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeBatchNetUpload(file) {
      const extension = file.name.split(".")[1] === "xlsx";
      const extension2 = file.name.split(".")[1] === "numbers";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xlsx,numbers 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件图片大小不能超过 10MB!");
      }
      return extension || (extension2 && isLt2M);
    },
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
    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取新数据
    reloadData() {
      console.log(this.searchCondition);
      this.tableData.getDataUrl = {
        url: getCustomers,
        page: 1,
        limit: 10,
        searchCondition: this.searchCondition
      };
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetSearchHandle();
          postAddCustomer()(this.addForm).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
                type: "success",
                center: true
              });
              this.addFormVisible = false;
              this.resetAddForm("addForm");
              this.reloadData();
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
    // 批量入网文件提交
    saveBatchNet() {
      alert("入网ok");
    },
    // 批量转移文件提交
    saveBatchTransfer() {
      alert("转移ok");
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
              this.reloadData();
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
    transferSave(formName) {
      // 转移保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.transferForm);
          transferCustomer()({
            customerNo: this.transferForm.customerNo,
            enterpriseName: this.transferForm.enterpriseName,
            agentNo: this.transferForm.agentNo,
            receiveAgentNo: this.transferForm.receiveAgentNo
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData();
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
          });
        }
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    batchNetDialog() {
      // 批量入网 弹出框
      this.batchNetFormVisible = true;
    },
    batchTransferDialog() {
      // 批量转移 弹出框
      this.batchTransferFormVisible = true;
    },
    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel();
      // console.log(this.searchCondition);
      // window.location.href = "/customer/export?" + this.searchCondition;
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    editFormCustomerFrom() {
      // 客户来源
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

