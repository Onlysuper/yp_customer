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
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增产品模板" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item v-if="visibleBussinessType" label="业务类型" prop="bussinessType" :label-width="formLabelWidth">
          <el-select @input="bussinessTypeChange" v-model="addForm.bussinessType" placeholder="请选择">
            <el-option v-for="item in selectOptions.bussinessTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="visibleProductName" label="产品名称" prop="productName" :label-width="formLabelWidth">
          <el-input v-model="addForm.productName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="visibleCostMode" label="收费模式" prop="costMode" :label-width="formLabelWidth">
          <el-select v-model="addForm.costMode" placeholder="请选择" @input="costModeChange($event)">
            <el-option v-for="item in selectOptions.costModeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="visibleFixed" label="固定值" prop="fixed" :label-width="formLabelWidth">
          <el-input v-model="addForm.fixed" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="visibleRate" label="费率" prop="rate" :label-width="formLabelWidth">
          <el-input v-model="addForm.rate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="visibleEffectiveDay" label="有效天数" prop="effectiveDay" :label-width="formLabelWidth">
          <el-input v-model="addForm.effectiveDay" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="产品名称" prop="productName" :label-width="formLabelWidth">
          <el-input v-model="editForm.productName" auto-complete="off"></el-input>
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
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import {
  getProducts,
  postAddProduct,
  postEditProduct,
  postToggleProduct
} from "@src/apis";

export default {
  name: "customermanage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      taxNo: "", // 企业税号
      enterpriseName: "", // 企业名称
      createTimeStart: yesterday, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      agentNo: "", // 合伙人编号
      customerFrom: "" // 入网来源
    };
    return {
      /********新增弹出框表单显示 start*********** */
      visibleBussinessType: true, // 业务类型
      visibleProductName: true, // 产品名称
      visibleCostMode: true, // 收费模式
      visibleRate: true, //费率
      visibleFixed: false, // 固定成本
      visibleEffectiveDay: false, // 有效天数
      /********新增弹出框表单显示 end*********** */
      addFormVisible: false, // 新增框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        bussinessType: "",
        productName: "",
        costMode: "",
        rate: "",
        fixed: "",
        effectiveDay: ""
      },
      selectOptions: {
        // 业务类型
        bussinessTypeOptions: [
          {
            value: "AGENT_PROFIT_COST",
            label: "一合伙人分润成本"
          },
          {
            value: "SECOND_AGENT_PROFIT_COST",
            label: "多级合伙人分润成本"
          },
          {
            value: "CUSTOMER_TRANSACTION_COST",
            label: "商户交易费率"
          },
          {
            value: "CUSTOMER_QRCODE_BILLING",
            label: "商户开票"
          },
          {
            value: "CUSTOMER_ELECTRONIC",
            label: "商户电票"
          }
        ],
        costModeOptions: [
          {
            value: "RATE",
            label: "比例"
          }
          // {
          //   value: "FIXED",
          //   label: "固定值"
          // },
          // {
          //   value: "FIXED_RATE",
          //   label: "比例+固定值"
          // },
          // {
          //   value: "FLOAT_RATE",
          //   label: "浮动比例"
          // }
        ]
      },
      addFormRules: {
        bussinessType: [
          { required: true, message: "请选择业务类型", trigger: "blur" }
        ],
        productName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        costMode: [{ required: true, message: "请选择收费模式", trigger: "blur" }],
        fixed: [{ required: true, message: "请输入固定值", trigger: "blur" }],
        rate: [{ required: true, message: "请输入费率", trigger: "blur" }],
        effectiveDay: [
          { required: true, message: "请输入输入有效天数", trigger: "blur" }
        ]
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "productNo",
          type: "text", // 表单类型
          label: "产品编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.productNo = value;
          }
        },
        {
          corresattr: "productName",
          type: "text",
          label: "产品名称",
          show: true, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.productName = value;
          }
        },
        {
          corresattr: "bussinessType",
          type: "select",
          label: "业务类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "AGENT_PROFIT_COST",
              label: "一合伙人分润成本"
            },
            {
              value: "SECOND_AGENT_PROFIT_COST",
              label: "多级合伙人分润成本"
            },
            {
              value: "CUSTOMER_TRANSACTION_COST",
              label: "商户交易费率"
            },
            {
              value: "CUSTOMER_QRCODE_BILLING",
              label: "商户开票"
            },
            {
              value: "CUSTOMER_ELECTRONIC",
              label: "商户电票"
            }
          ],
          cb: value => {
            this.searchCondition.bussinessType = value;
          }
        },
        {
          corresattr: "costMode",
          type: "select",
          label: "收费模式",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "FLOAT_RATE",
              label: "浮动比例"
            },
            {
              value: "RATE",
              label: "比例"
            },
            {
              value: "FIXED",
              label: "固定值"
            },
            {
              value: "FIXED_RATE",
              label: "比例+固定值"
            }
          ],
          cb: value => {
            this.searchCondition.costMode = value;
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
              value: "TRUE",
              label: "有效"
            },
            {
              value: "FALSE",
              label: "无效"
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
          url: getProducts // 获取Table列表数据的后台url
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "产品编号",
            width: "100px",
            sortable: true,
            word: "productNo"
          },
          {
            key: "产品名称",
            width: "100px",
            word: "productName"
          },
          {
            key: "用户类型",
            width: "150px",
            word: "bussinessType",
            status: true,
            type: data => {
              if (data == "AGENT_PROFIT_COST") {
                return {
                  text: "一合伙人分润成本",
                  type: "success"
                };
              } else if (data == "SECOND_AGENT_PROFIT_COST") {
                return {
                  text: "多级合伙人分润成本",
                  type: "success"
                };
              } else if (data == "CUSTOMER_TRANSACTION_COST") {
                return {
                  text: "商户交易费率",
                  type: "success"
                };
              } else if ((data = "CUSTOMER_QRCODE_BILLING")) {
                return {
                  text: "商户开票",
                  type: "success"
                };
              } else if ((data = "CUSTOMER_ELECTRONIC")) {
                return {
                  text: "商户电票",
                  type: "success"
                };
              } else {
                return {
                  text: data,
                  type: "success"
                };
              }
            }
          },
          {
            key: "收费模式",
            width: "130px",
            word: "costMode",
            status: true,
            type: data => {
              if (data == "FLOAT_RATE") {
                return {
                  text: "浮动比例",
                  type: "success"
                };
              } else if (data == "RATE") {
                return {
                  text: "比例",
                  type: ""
                };
              } else if (data == "FIXED") {
                return {
                  text: "固定值",
                  type: ""
                };
              } else if (data == "FIXED_RATE") {
                return {
                  text: "比例+固定值",
                  type: ""
                };
              } else {
                return {
                  text: data,
                  type: "success"
                };
              }
            }
          },
          {
            key: "费率",
            width: "100px",
            word: "rate"
          },
          {
            key: "固定成本",
            width: "100px",
            word: "fixed"
          },
          {
            key: "有效天数",
            width: "80px",
            word: "effectiveDay"
          },
          {
            key: "状态",
            width: "80px",
            word: "status",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "有效",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "无效",
                  type: "danger"
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
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              stateName: "status",
              opposite: false,
              text: "启用",
              color: "#67c23a",
              cb: rowdata => {
                // postToggleProduct
                this.$confirm("该操作将启用该产品，确定继续吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postToggleProduct()({
                      productNo: rowdata.productNo,
                      status: "TRUE"
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "操作成功!"
                        });
                        this.reloadData(this.page, this.limit);
                      } else {
                        this.$message({
                          type: "warning",
                          message: data.msg
                        });
                      }
                    });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消操作"
                    });
                  });
              }
            },
            {
              stateName: "status",
              opposite: true,
              text: "禁用",
              color: "#00c1df",
              cb: rowdata => {
                this.$confirm("该操作将禁用该产品，确定继续吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postToggleProduct()({
                      productNo: rowdata.productNo,
                      status: "FALSE"
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "操作成功!"
                        });
                        this.reloadData(this.postPage, this.postLimit);
                      } else {
                        this.$message({
                          type: "warning",
                          message: data.msg
                        });
                      }
                    });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消操作"
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
    // 业务类型切换
    bussinessTypeChange(type) {
      this.addForm.rate = "";
      this.addForm.costMode = "";
      this.addForm.fixed = "";
      this.effectiveDay = "";
      if (type == "AGENT_PROFIT_COST") {
        this.selectOptions.costModeOptions = [
          {
            value: "RATE",
            label: "比例"
          }
        ];
      } else if (type == "SECOND_AGENT_PROFIT_COST") {
        this.selectOptions.costModeOptions = [
          {
            value: "FLOAT_RATE",
            label: "浮动比例"
          }
        ];
      } else if (type == "CUSTOMER_TRANSACTION_COST") {
        this.selectOptions.costModeOptions = [
          {
            value: "RATE",
            label: "比例"
          },
          {
            value: "FIXED",
            label: "固定值"
          },
          {
            value: "FIXED_RATE",
            label: "比例+固定值"
          }
        ];
      }
      if (
        type == "AGENT_PROFIT_COST" ||
        type == "SECOND_AGENT_PROFIT_COST" ||
        type == "CUSTOMER_TRANSACTION_COST"
      ) {
        this.visibleBussinessType = true; // 业务类型
        this.visibleProductName = true; // 产品名称
        this.visibleCostMode = true; // 收费模式
        this.visibleRate = true; //费率
        this.visibleFixed = false; // 固定成本
        this.visibleEffectiveDay = false; // 有效天数
      } else if (
        type == "CUSTOMER_QRCODE_BILLING" ||
        type == "CUSTOMER_ELECTRONIC"
      ) {
        this.visibleBussinessType = true; // 业务类型
        this.visibleProductName = true; // 产品名称
        this.visibleCostMode = false; // 收费模式
        this.visibleRate = false; //费率
        this.visibleFixed = false; // 固定成本
        this.visibleEffectiveDay = true; // 有效天数
      }
    },
    //收费模式切换
    costModeChange(event) {
      if (event == "FIXED_RATE") {
        this.visibleFixed = true;
      }
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          var addForm = this.addForm;
          this.resetSearchHandle();
          postAddProduct()({
            bussinessType: addForm.bussinessType,
            productName: addForm.productName,
            costMode: addForm.costMode,
            rate: addForm.rate,
            fixed: addForm.fixed,
            effectiveDay: addForm.effectiveDay
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
          });
        }
      });
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          var editForm = this.editForm;
          postEditProduct()({
            productNo: editForm.productNo,
            productName: editForm.productName
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData(this.page, this.limit);
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
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    }
  },
  watch: {},
  mounted() {}
};
</script>

