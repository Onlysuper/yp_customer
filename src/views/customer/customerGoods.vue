<template>
  <!-- 商品管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" @click="importDialog" type="primary" icon="el-icon-download">导入</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog v-dialogDrag center title="新增商品信息" :visible.sync="formDialogVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="商品名称" prop="goodsName" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="addForm.goodsName" class="input-with-select">
            <el-dropdown @command="goodsNameChange($event,'ADD')" slot="append">
              <span class="el-dropdown-link">
                <el-button @click="goodsNameGet(addForm.goodsName)" slot="append" icon="el-icon-search"></el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in goodsNameOptions" :key="item.name" :command="item.name">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>

        </el-form-item>
        <el-form-item label="统一编码" prop="unionNo" :label-width="formLabelWidth">
          <el-input v-model="addForm.unionNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别简称" prop="goodsFirstType" :label-width="formLabelWidth">
          <el-input v-model="addForm.goodsFirstType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别名称" prop="goodsType" :label-width="formLabelWidth">
          <el-input v-model="addForm.goodsType" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item class="full-width" label="税率" prop="taxRate" :label-width="formLabelWidth">
              <el-select @change="taxRateChange($event,'ADD')" v-model="addForm.taxRate" placeholder="请选择">
                <el-option v-for="item in taxRateOptions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否为成品油商品" prop="type" :label-width="'140px'">
              <el-switch v-model="addForm.type" active-text="是" inactive-text="否" active-value="TRUE" inactive-value="FALSE">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="editFormVisible" label="商品编号" prop="goodsNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="addForm.goodsNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input :disabled="editFormVisible?true:false" v-model="addForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="单位" prop="unit" :label-width="formLabelWidth">
                <el-input v-model="addForm.unit" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="含税单价" prop="unitPrice" :label-width="formLabelWidth">
                <el-input v-model="addForm.unitPrice" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="规格型号" prop="model" :label-width="formLabelWidth">
                <el-input v-model="addForm.model" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width" label="享受优惠" prop="enjoyDiscount" :label-width="formLabelWidth">
                <el-select v-model="addForm.enjoyDiscount" placeholder="请选择">
                  <el-option v-for="item in selectOptions.enjoyDiscountOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="full-width" label="优惠类型" prop="phoneNo" :label-width="formLabelWidth">
          <el-select v-model="addForm.discountType" placeholder="请选择">
            <el-option v-for="item in selectOptions.discountTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button v-if="addFormVisible" :loading="saveLoading" type="primary" @click="submitSave('addForm','add')">确定</el-button>
        <el-button v-if="editFormVisible" :loading="saveLoading" type="primary" @click="submitSave('addForm','edit')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 导入 start -->
    <el-dialog center title="导入商户信息" :visible.sync="importVisible">
      <el-form size="small" :model="importForm" ref="importForm" :rules="importFormRules">
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="importForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品文件" :label-width="formLabelWidth">
          <el-upload :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :on-exceed="handleExceed" :data="importForm" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :auto-upload="false" ref="upload" class="upload-demo" drag :action="oaIp+'/customerGoods/importGoods'">
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
        <el-button :loading="saveLoading" type="primary" @click="importSave('importForm')">确定导入</el-button>
      </div>
    </el-dialog>
    <!-- 导入 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.full-width {
  width: 100%;
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import utils from "@src/common/utils";
import tax from "@src/data/tax.json";
import {
  getCustomerGoods,
  postAddCustomerGood,
  postEditCustomerGood,
  postDeleteCustomerGood,
  postDefaultCustomerGood,
  postCancelDefaultCustomerGood,
  getsmartgoodscodeCustomerGood
} from "@src/apis";
export default {
  name: "customerGoods",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      goodsNo: "", // 商户编码
      goodsName: "" // 商品名称
    };
    return {
      taxRate: {
        name: "",
        code: ""
      },
      formLabelWidth: "100px",
      taxRateOptions: tax,
      goodsName: "", // 商品名称
      selectLoading: false,
      goodsNameOptions: [], // 商品名称 智能编码
      selectOptions: {
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
      addFormRules: {
        unionNo: [
          { required: true, message: "请输入活动名称", trigger: "blur,change" }
        ],
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur,change" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur,change" }
        ],
        taxRate: [{ required: true, message: "税率为必选项", trigger: "blur,change" }]
      },
      // 查询条件数据
      searchCondition: searchConditionVar,

      addFormVisible: false, // 新增框
      formDialogVisible: false,
      importVisible: false,
      batchNetFormVisible: false, // 批量入网框
      editFormVisible: false, // 编辑框
      addForm: {
        type: "",
        unionNo: "",
        customerNo: "",
        goodsName: "",
        model: "",
        unit: "",
        unitPrice: "",
        taxRate: "",
        enjoyDiscount: "",
        discountType: "",
        goodsFirstType: ""
      },
      importForm: {
        customerNo: ""
      },

      importFormRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur,change" }
        ]
      },
      batchNetForm: {
        // 批量上传
        url: ""
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "customerNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "goodsNo",
          type: "text",
          label: "商品编号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.goodsNo = value;
          }
        },
        {
          corresattr: "goodsName",
          type: "text",
          label: "商品名称",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.goodsName = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getCustomerGoods,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getCustomerGoods // 获取Table列表数据的后台url
        // },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "120px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "商品编号",
            width: "100px",
            word: "goodsNo"
          },
          {
            key: "商品名称",
            width: "100px",
            word: "goodsName"
          },
          {
            key: "税率",
            width: "80px",
            word: "taxRate",
            status: true,
            type: data => {
              return {
                text: data * 100 + "%",
                type: ""
              };
            }
          },
          {
            key: "享受优惠",
            width: "120px",
            word: "enjoyDiscount",
            status: true,
            type: data => {
              if (data == "0") {
                return {
                  text: "正常税率",
                  type: ""
                };
              } else if (data == "1") {
                return {
                  text: "免税",
                  type: "success"
                };
              } else if (data == "2") {
                return {
                  text: "不征税",
                  type: "info"
                };
              } else if (data == "3") {
                return {
                  text: "普通零税率",
                  type: "warning"
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
          },
          {
            key: "优惠类型",
            width: "130px",
            word: "discountType",
            status: true,
            type: data => {
              if (data == "10") {
                return {
                  text: "不使用优惠政策",
                  type: ""
                };
              } else if (data == "11") {
                return {
                  text: "不征税",
                  type: "info"
                };
              } else if (data == "12") {
                return {
                  text: "免税",
                  type: "warning"
                };
              } else if (data == "13") {
                return {
                  text: "先征后退",
                  type: "info"
                };
              } else if (data == "14") {
                return {
                  text: "100%先征后退",
                  type: "info"
                };
              } else if (data == "15") {
                return {
                  text: "50%先征后退",
                  type: "info"
                };
              } else if (data == "16") {
                return {
                  text: "即征即退30%",
                  type: "info"
                };
              } else if (data == "17") {
                return {
                  text: "即征即退50%",
                  type: "info"
                };
              } else if (data == "18") {
                return {
                  text: "即征即退70%",
                  type: "info"
                };
              } else if (data == "19") {
                return {
                  text: "即征即退100%",
                  type: "info"
                };
              } else if (data == "20") {
                return {
                  text: "超税负3%即征即退",
                  type: "info"
                };
              } else if (data == "21") {
                return {
                  text: "超税负8%即征即退",
                  type: "info"
                };
              } else if (data == "22") {
                return {
                  text: "超税负12%即征即退",
                  type: "info"
                };
              } else if (data == "23") {
                return {
                  text: "简易征收",
                  type: "info"
                };
              } else if (data == "24") {
                return {
                  text: "按5%简易征收减按1.5%计征",
                  type: "info"
                };
              } else if (data == "25") {
                return {
                  text: "按5%简易征收",
                  type: "info"
                };
              } else if (data == "26") {
                return {
                  text: "按3%简易征收",
                  type: "info"
                };
              } else if (data == "27") {
                return {
                  text: "稀土产品",
                  type: "info"
                };
              } else {
                return {
                  text: data,
                  type: "info"
                };
              }
            }
          },
          {
            key: "默认",
            width: "80px",
            word: "defaultType",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "是",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "否",
                  type: "info"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          },
          {
            key: "单价",
            width: "100px",
            word: "unitPrice"
          },
          {
            key: "单位",
            width: "80px",
            word: "unit"
          },
          {
            key: "规格型号",
            width: "",
            word: "model"
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
              color: "#67c23a",
              visibleFn: rowdata => {
                if (rowdata.defaultType == "FALSE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                if (!rowdata.unitPrice) {
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
                    });
                } else {
                  this.$message({
                    type: "warning",
                    message: "存在单价，不可设置为默认"
                  });
                }
              }
            },
            {
              stateName: "defaultType", // 有哪个属性决定可见
              opposite: true, // 与以上属性是否相反
              text: "取消默认",
              visibleFn: rowdata => {
                if (rowdata.defaultType == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#e6a23c",
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
                    // this.$message({
                    //   type: "info",
                    //   message: "已取消操作"
                    // });
                  });
              }
            },
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {

                var rowNew = utils.pickObj(rowdata, [
                  "goodsNo",
                  "unionNo",
                  "customerNo",
                  "goodsName",
                  "model",
                  "unit",
                  "unitPrice",
                  "taxRate",
                  "enjoyDiscount",
                  "discountType",
                  "goodsType",
                  "type",
                  "goodsFirstType"
                ]);
                // console.log(rowNew);
                this.addForm = rowNew;
                // this.addForm.taxRate = rowNew.taxRate;
                if (this.dataTaxRateHave(rowNew.taxRate)) {
                  this.addForm.taxRate = rowNew.taxRate + '';
                } else {
                  this.addForm.taxRate = '';
                }
                this.addFormVisible = false;
                this.editFormVisible = true;
                this.formDialogVisible = true;
              }
            },
            {
              text: "删除",
              color: "#909399",
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
    taxRateChange(event, type) { },
    // 商品名称智能编码select start----------
    goodsNameGet(value) {
      this.selectLoading = true;
      getsmartgoodscodeCustomerGood()({ name: value, tax: "0" }).then(res => {
        let data = res.data;
        if (res.code == "00") {
          this.goodsNameOptions = res.data;
          this.selectLoading = false;
          console.log(this.goodsNameOptions);
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
      this.goodsName = value;
    },
    //商品名称被改变
    goodsNameChange(value, type) {
      let selectObj = this.goodsNameOptions.find(item => {
        return item.name == value;
      });
      this.addForm.unionNo = selectObj.code;
      this.addForm.goodsType = selectObj.name;
      this.addForm.taxRate = selectObj.rate;
      this.addForm.goodsFirstType = selectObj.shortName;
      this.addForm.goodsName = this.goodsName;
    },
    // handleSelect(item) {
    //   console.log(item);
    // },


    importDialog() {
      this.importVisible = true;
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
      this.editFormVisible = false;
      this.formDialogVisible = true;
      this.addForm = {
        type: "",
        unionNo: "",
        customerNo: "",
        goodsName: "",
        model: "",
        unit: "",
        unitPrice: "",
        taxRate: "",
        enjoyDiscount: "",
        discountType: "",
        goodsFirstType: ""
      }
      this.clearValidate();
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    // 导入成功
    uploadSuccess(res, file, fileList) {
      if (res.data == "00") {
        this.$message({
          message: "恭喜你，导入成功",
          type: "success",
          center: true
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
      this.reloadData();
      this.$refs["upload"].clearFiles();
      this.importVisible = false;
      this.saveLoading = false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前共选择了 ${files.length +
        fileList.length} 个文件,超出限定个数。可删除下方上传列表`
      );
    },
    // 导入失败
    uploadError(err, file, fileList) {
      this.$message({
        message: "很遗憾，导入失败",
        type: "warning",
        center: true
      });
      this.importDialog();
      this.$refs["upload"].clearFiles();
      this.importVisible = false;
      this.saveLoading = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetImportForm(uploadName, formName) {
      this.$refs[formName].resetFields();
      this.$refs[uploadName].clearFiles();
    },
    importSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 确定导入
          this.$refs.upload.submit();
          // this.saveLoading = true;
        }
      });
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
      this.saveLoading = false;
      return (extension || extension2) && isLt2M;
    },

    dataTaxRateHave(code) {
      let index_ = this.taxRateOptions.findIndex(item => {
        return item.code == code;
      });
      console.log(index_);
      if (index_ == "-1") {
        return false;
      } else {
        return true;
      }
    },
    // 新增保存
    submitSave(formName, type) {
      // 新增内容保存
      if (type == 'add') {
        // 新增保存
        this.$refs[formName].validate(valid => {
          let addForm = this.addForm;
          addForm.goodsName = this.goodsName || addForm.goodsName;
          if (valid) {
            // this.saveLoading = true;
            let sendata = { ...addForm };
            postAddCustomerGood()({ ...sendata }).then(data => {
              if (data.code === "00") {
                this.$message({
                  message: "恭喜你，新增数据成功",
                  type: "success",
                  center: true
                });
                this.formDialogVisible = false;
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
              console.log(data);
            });
          }
        });
      } else if (type == 'edit') {
        // 编辑内容保存
        this.$refs[formName].validate(valid => {
          if (valid) {
            let addForm = this.addForm;
            // editForm.goodsName = this.goodsName;
            let sendata = { ...addForm };

            this.saveLoading = true;
            postEditCustomerGood(addForm.goodsNo)({ ...sendata }).then(data => {
              if (data.code === "00") {
                this.$message({
                  message: "恭喜你，修改数据成功",
                  type: "success",
                  center: true
                });
                this.formDialogVisible = false;
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
  },
  computed: {},
  mounted() { }
};
</script>

