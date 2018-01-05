<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" @click="importDialog" type="primary" icon="el-icon-download">导入</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增商品信息" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="商品编码" prop="unionNo" :label-width="formLabelWidth">
          <el-select v-model="addForm.unionNo" placeholder="请选择">
            <el-option v-for="item in selectOptions.unionNumOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="addForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth">
          <el-input v-model="addForm.goodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" prop="model" :label-width="formLabelWidth">
          <el-input v-model="addForm.model" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit" :label-width="formLabelWidth">
          <el-input v-model="addForm.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="含税单价" prop="unitPrice" :label-width="formLabelWidth">
          <el-input v-model="addForm.unitPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxRate" :label-width="formLabelWidth">
          <el-select v-model="addForm.taxRate" placeholder="请选择">
            <el-option v-for="item in selectOptions.taxRateOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="享受优惠" prop="enjoyDiscount" :label-width="formLabelWidth">
          <el-select v-model="addForm.enjoyDiscount" placeholder="请选择">
            <el-option v-for="item in selectOptions.enjoyDiscountOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠类型" prop="phoneNo" :label-width="formLabelWidth">
          <el-select v-model="addForm.discountType" placeholder="请选择">
            <el-option v-for="item in selectOptions.discountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button type="primary" @click="addSave('addForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 导入 start -->
    <el-dialog center title="导入商户信息" :visible.sync="importVisible">
      <el-form size="small" :model="importForm" ref="importForm" :rules="importFormRules">
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="importForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form size="small" :model="importForm" ref="importForm" :rules="importFormRules">
        <el-form-item label="商品文件" prop="customerNo" :label-width="formLabelWidth">
          <el-upload :data="{customerNo:importForm.customerNo}" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :auto-upload="false" ref="upload" class="upload-demo" drag :action="oaIp+'/customerGoods/importGoods'">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetImportForm('upload','importForm')">重置</el-button>
        <el-button type="primary" @click="importSave('importForm')">确定导入</el-button>
      </div>
    </el-dialog>
    <!-- 导入 end -->
    <!-- 编辑start -->
    <el-dialog center title="修改商品信息" :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="税局编码" prop="unionNo" :label-width="formLabelWidth">
          <el-select v-model="editForm.unionNo" placeholder="请选择">
            <el-option v-for="item in selectOptions.unionNumOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodsNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editForm.goodsNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth">
          <el-input v-model="editForm.goodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" prop="model" :label-width="formLabelWidth">
          <el-input v-model="editForm.model" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit" :label-width="formLabelWidth">
          <el-input v-model="editForm.unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="含税单价" prop="unitPrice" :label-width="formLabelWidth">
          <el-input v-model="editForm.unitPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxRate" :label-width="formLabelWidth">
          <el-select v-model="editForm.taxRate" placeholder="请选择">
            <el-option v-for="item in selectOptions.taxRateOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="享受优惠" prop="enjoyDiscount" :label-width="formLabelWidth">
          <el-select v-model="editForm.enjoyDiscount" placeholder="请选择">
            <el-option v-for="item in selectOptions.enjoyDiscountOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠类型" prop="phoneNo" :label-width="formLabelWidth">
          <el-select v-model="editForm.discountType" placeholder="请选择">
            <el-option v-for="item in selectOptions.discountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">重置</el-button>
        <el-button type="primary" @click="editSave('editForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { getCustomerProducts } from "@src/apis";
export default {
  name: "customergoods",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      goodsNo: "", // 商户编码
      goodsName: "" // 商品名称
    };
    return {
      selectOptions: {
        unionNumOptions: [
          {
            value: "3070402000000000000",
            label: "住宿服务"
          },
          {
            value: "3070401000000000000",
            label: "餐饮服务"
          }
        ],
        taxRateOptions: [
          {
            value: "0",
            label: "0%"
          },
          {
            value: "0.015",
            label: "1.5%"
          },
          {
            value: "0.03",
            label: "3%"
          },
          {
            value: "0.04",
            label: "4%"
          },
          {
            value: "0.05",
            label: "5%"
          },
          {
            value: "0.06",
            label: "6%"
          },
          {
            value: "0.11",
            label: "11%"
          },
          {
            value: "0.13",
            label: "13%"
          },
          {
            value: "0.17",
            label: "17%"
          }
        ],
        enjoyDiscountOptions: [
          {
            value: "0",
            label: "正常税率"
          },
          {
            value: "1",
            label: "免税"
          },
          {
            value: "2",
            label: "不征税"
          },
          {
            value: "3",
            label: "普通零税率"
          }
        ],
        discountTypeOptions: [
          {
            value: "10",
            label: "不使用优惠政策"
          },
          {
            value: "11",
            label: "不征税"
          },
          {
            value: "12",
            label: "免税"
          },
          {
            value: "13",
            label: "先征后退"
          },
          {
            value: "14",
            label: "100%先征后退"
          },
          {
            value: "15",
            label: "50%先征后退"
          },
          {
            value: "16",
            label: "即征即退30%"
          },
          {
            value: "17",
            label: "即征即退50%"
          },
          {
            value: "18",
            label: "即征即退70%"
          },
          {
            value: "19",
            label: "即征即退100%"
          },
          {
            value: "20",
            label: "超税负3%即征即退"
          },
          {
            value: "21",
            label: "超税负8%即征即退"
          },
          {
            value: "22",
            label: "超税负12%即征即退"
          },
          {
            value: "23",
            label: "简易征收"
          },
          {
            value: "24",
            label: "按5%简易征收减按1.5%计征"
          },
          {
            value: "25",
            label: "按5%简易征收"
          },
          {
            value: "26",
            label: "按3%简易征收"
          },
          {
            value: "27",
            label: "稀土产品"
          }
        ]
      },
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
          corresattr: "businessNo",
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
          corresattr: "featureType",
          type: "select",
          label: "产品类型",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "QRCODE_BILLING",
              label: "快速开票"
            },
            {
              value: "ELECTRONIC",
              label: "电子发票"
            },
            {
              value: "WECHAT_COST",
              label: "微信支付"
            },
            {
              value: "ALIPAY_COST",
              label: "支付宝支付"
            },
            {
              value: "T0_CASH_COST",
              label: "T0提现"
            },
            {
              value: "T1_CASH_COST",
              label: "T1提现"
            }
          ],
          cb: value => {
            this.searchCondition.goodsNo = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomerProducts // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "100px",
            sortable: true,
            word: "bussinessNo"
          },
          {
            key: "代理商",
            width: "100px",
            word: "levelDetail"
          },
          {
            key: "产品类型",
            width: "100px",
            word: "featureType"
          },
          {
            key: "费率",
            width: "80px",
            word: "rate",
            status: true,
            type: data => {
              return {
                text: data * 100 + "%",
                type: "info"
              };
            }
          },
          {
            key: "单笔",
            width: "120px",
            word: "fixed",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "封顶",
            width: "130px",
            word: "capped",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "月电票量",
            width: "80px",
            word: "elecBillnum",
            status: true,
            type: data => {
              return {
                text: data,
                type: "info"
              };
            }
          },
          {
            key: "开始有效期",
            width: "100px",
            word: "effectiveBegin"
          },
          {
            key: "结束有效期",
            width: "100px",
            word: "effectiveEnd"
          }
        ],
        operation: {
          width: "150px",
          options: [
            // 操作按钮
            {
              stateName: "defaultType",
              opposite: false,
              text: "设为默认",
              color: "#00c1df",
              cb: rowdata => {
                this.$confirm("确定继续本次操作吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postDefaultCustomerGood(rowdata.goodsNo)({
                      createTime: rowdata.createTime,
                      lastUpdateTime: rowdata.lastUpdateTime,
                      customerNo: rowdata.customerNo,
                      goodsNo: rowdata.goodsNo,
                      model: rowdata.model,
                      unit: rowdata.unit,
                      unitPrice: rowdata.unitPrice,
                      taxRate: rowdata.taxRate,
                      status: rowdata.status,
                      enjoyDiscount: rowdata.enjoyDiscount,
                      discountType: rowdata.discountType,
                      remark: rowdata.remark,
                      goodsName: rowdata.goodsName,
                      unionNo: rowdata.unionNo,
                      defaultType: rowdata.defaultType,
                      goodsType: rowdata.goodsType
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "操作成功!"
                        });
                        this.reloadData();
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
              stateName: "defaultType", // 有哪个属性决定可见
              opposite: true, // 与以上属性是否相反
              text: "取消默认",
              color: "#00c1df",
              cb: rowdata => {
                this.$confirm("确定继续本次操作吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postCancelDefaultCustomerGood(rowdata.goodsNo)({
                      createTime: rowdata.createTime,
                      lastUpdateTime: rowdata.lastUpdateTime,
                      customerNo: rowdata.customerNo,
                      goodsNo: rowdata.goodsNo,
                      model: rowdata.model,
                      unit: rowdata.unit,
                      unitPrice: rowdata.unitPrice,
                      taxRate: rowdata.taxRate,
                      status: rowdata.status,
                      enjoyDiscount: rowdata.enjoyDiscount,
                      discountType: rowdata.discountType,
                      remark: rowdata.remark,
                      goodsName: rowdata.goodsName,
                      unionNo: rowdata.unionNo,
                      defaultType: rowdata.defaultType,
                      goodsType: rowdata.goodsType
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "操作成功!"
                        });
                        this.reloadData();
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
            },
            {
              text: "删除",
              color: "#00c1df",
              cb: rowdata => {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postDeleteCustomerGood(rowdata.goodsNo)({
                      createTime: rowdata.createTime,
                      lastUpdateTime: rowdata.lastUpdateTime,
                      customerNo: rowdata.customerNo,
                      goodsNo: rowdata.goodsNo,
                      model: rowdata.model,
                      unit: rowdata.unit,
                      unitPrice: rowdata.unitPrice,
                      taxRate: rowdata.taxRate,
                      status: rowdata.status,
                      enjoyDiscount: rowdata.enjoyDiscount,
                      discountType: rowdata.discountType,
                      remark: rowdata.remark,
                      goodsName: rowdata.goodsName,
                      unionNo: rowdata.unionNo,
                      defaultType: rowdata.defaultType,
                      goodsType: rowdata.goodsType
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "删除成功!"
                        });
                        this.reloadData();
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
                      message: "已取消删除"
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

