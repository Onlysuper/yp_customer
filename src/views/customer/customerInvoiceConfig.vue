<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.admin-page {
  position: relative;
  background: #eff2f5;
  padding: 10px;
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
  getCustomerConfigs,
  postAddCustomerConfigs,
  postEditCustomerConfigs
} from "@src/apis";
export default {
  name: "customergoods",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      goodsNo: "", // 商户编码
      goodsName: "" // 商品名称
    };
    return {
      addFormVisible: false, // 新增框
      importVisible: false,
      addFormRules: {
        unionNo: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        customerNo: [{ required: true, message: "请输入商户编号", trigger: "blur" }],
        goodsName: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        taxRate: [{ required: true, message: "税率为必选项", trigger: "blur" }]
      },
      importForm: {
        customerNo: ""
      },
      importFormRules: {},
      batchNetFormVisible: false, // 批量入网框
      editFormVisible: false, // 编辑框
      batchNetForm: {
        // 批量上传
        url: ""
      },

      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {
        unionNo: "",
        customerNo: "",
        goodsName: "",
        model: "",
        unit: "",
        unitPrice: "",
        taxRate: "",
        enjoyDiscount: "",
        discountType: ""
      }, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        unionNo: "",
        customerNo: "",
        goodsName: "",
        model: "",
        unit: "",
        unitPrice: "",
        taxRate: "",
        enjoyDiscount: "",
        discountType: ""
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
        }
      ],

      // 列表数据
      tableData: {
        getDataUrl: {
          url: getCustomerConfigs, // 初始化数据
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
            key: "设备类型",
            width: "100px",
            word: "deviceType"
          },
          {
            key: "客户端类型",
            width: "100px",
            word: "clientType"
          },
          {
            key: "设备编号",
            width: "100px",
            word: "deviceNo"
          },
          {
            key: "设备编号",
            width: "100px",
            word: "deviceNo"
          },
          {
            key: "收款人",
            width: "100px",
            word: "receiveMan"
          },
          {
            key: "开票人",
            width: "100px",
            word: "invoiceMan"
          },
          {
            key: "复核人",
            width: "100px",
            word: "checkMan"
          }
        ],
        operation: {
          width: "150px",
          options: [
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                if (rowdata.unionNo == "3070401000000000000") {
                  // 餐饮服务
                }
                if (rowdata.unionNo == "3070402000000000000") {
                  // 住宿服务
                }
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
    importDialog() {
      this.importVisible = true;
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    // 导入成功
    uploadSuccess(response, file, fileList) {
      this.$message({
        message: "恭喜你，导入成功",
        type: "success",
        center: true
      });
      this.importDialog();
      this.importVisible = false;
    },
    // 导入失败
    uploadError(err, file, fileList) {
      this.$message({
        message: "很遗憾，导入失败",
        type: "warning",
        center: true
      });
      this.importDialog();
      this.importVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetImportForm(uploadName, formName) {
      this.$refs[formName].resetFields();
      this.$refs[uploadName].clearFiles();
    },
    importSave() {
      // 确定导入
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
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

    // 获取新数据
    reloadData() {
      this.tableData.getDataUrl = {
        url: getCustomerGoods,
        page: 1,
        limit: 10,
        searchCondition: this.searchCondition
      };
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
    // 新增保存
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        let addForm = this.addForm;
        if (valid) {
          postAddCustomerGood()({
            unionNo: addForm.unionNo,
            customerNo: addForm.customerNo,
            goodsName: addForm.goodsName,
            model: addForm.model,
            unit: addForm.unit,
            unitPrice: addForm.unitPrice,
            taxRate: addForm.taxRate,
            enjoyDiscount: addForm.enjoyDiscount,
            discountType: addForm.discountType
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
    // 保存编辑
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let editForm = this.editForm;
          this.resetSearchHandle();
          postEditCustomerGood(editForm.goodsNo)({
            unionNo: editForm.unionNo,
            goodsNo: editForm.goodsNo,
            customerNo: editForm.customerNo,
            goodsName: editForm.goodsName,
            model: editForm.model,
            unit: editForm.unit,
            unitPrice: editForm.unitPrice,
            taxRate: editForm.taxRate,
            enjoyDiscount: editForm.enjoyDiscount,
            discountType: editForm.discountType
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
            console.log(data);
          });
        }
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
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
    }
  },
  mounted() {}
};
</script>

