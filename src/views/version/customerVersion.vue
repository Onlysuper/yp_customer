<template>
  <!-- 商户升级管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" size="small" type="primary" icon="el-icon-plus" @click="reset();isBatchUpdate = false;isUpdate = false;dialogVisible = true">新增升级商户</el-button>
          <el-button class="mybutton" size="small" type="primary" icon="el-icon-edit" @click="reset();isBatchUpdate = true;isUpdate = false;dialogVisible = true">修改升级商户</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
      <!-- 新增版本start -->
      <el-dialog center :title="getDialogTitle()" :visible.sync="dialogVisible" width="600px" @close="dialogClosed">
        <el-form ref="form" :model="form" label-width="110px" :rules="validateRules">
          <el-row>
            <el-col :span="11">
              <el-form-item label="版本类型" prop="type" v-if="!isUpdate">
                <el-select v-model="form.type" placeholder="请选择">
                  <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="升级状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option v-for="item in status_options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="商户编号" prop="customerNo">
                <el-input v-if="isUpdate" readonly v-model="form.customerNo" type="textarea" placeholder="多个商户编号请用英文逗号分开"></el-input>
                <el-input v-if="!isUpdate" v-model="form.customerNo" type="textarea" placeholder="多个商户编号请用英文逗号分开"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reset">重置</el-button>
          <el-button :loading="saveLoading" type="primary" @click="submit" v-if="!isUpdate && !isBatchUpdate">提 交</el-button>
          <el-button :loading="saveLoading" type="primary" @click="update" v-if="isBatchUpdate">批量修改</el-button>
          <el-button :loading="saveLoading" type="primary" @click="update" v-if="isUpdate">修 改</el-button>
        </span>
      </el-dialog>
      <!-- 上传新版本end -->
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate } from "@src/common/dateSerialize";
import {
  postCustomerVersion,
  patchCustomerVersion,
  getCustomerVersions
} from "@src/apis";
export default {
  name: "customer_versionPlugin",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      version: "", // 客户端版本号
      status: "" // 状态
    };
    return {
      dialogVisible: false, //上传面板是否可见
      isUpdate: true,
      isBatchUpdate: false,
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
          corresattr: "version",
          type: "text", // 表单类型
          label: "版本号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.version = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true,
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "TRUE",
              label: "允许升级"
            },
            {
              value: "FALSE",
              label: "不允许升级"
            },
            {
              value: "SUCCESS",
              label: "升级成功"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "type",
          type: "select",
          label: "版本类型",
          show: false,
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "RELEASE",
              label: "官网版本"
            },
            {
              value: "HOST_C",
              label: "HOST_C: c++主程序"
            },
            {
              value: "UPDATE_C",
              label: "UPDATE_C: c++更新程序"
            },
            {
              value: "HOST",
              label: "HOST: c#主程序"
            },
            {
              value: "UPDATE",
              label: "UPDATE: c#更新程序"
            },
            {
              value: "HOST_OLD",
              label: "HOST_OLD: c#老版本主程序"
            },
            {
              value: "UPDATE_OLD",
              label: "UPDATE_OLD: c#老版本更新程序"
            },
            {
              value: "DATA_COLLECTION ",
              label: "DATA_COLLECTION: 数据采集程序"
            }
          ],
          cb: value => {
            this.searchCondition.type = value;
          }
        }
      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomerVersions // 初始化数据
        },
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示复选框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "商户编号",
            width: "150px",
            word: "customerNo"
          },
          {
            key: "版本号",
            width: "100px",
            word: "version"
          },
          {
            key: "版本类型",
            width: "130px",
            word: "type",
            status: true,
            type: data => {
              switch (data) {
                case "HOST_C":
                  return {
                    text: "c++主程序",
                    type: ""
                  };
                case "UPDATE_C":
                  return {
                    text: "c++更新程序",
                    type: ""
                  };
                case "HOST":
                  return {
                    text: "c#主程序",
                    type: "danger"
                  };
                case "UPDATE":
                  return {
                    text: "c#更新程序",
                    type: "danger"
                  };
                case "RELEASE":
                  return {
                    text: "官网版本",
                    type: "danger"
                  };
                case "HOST_OLD":
                  return {
                    text: "c#老版本主程序",
                    type: "danger"
                  };
                case "DATA_COLLECTION":
                  return {
                    text: "数据采集程序",
                    type: "danger"
                  };
                case "MANUAL":
                  return {
                    text: "其他",
                    type: "danger"
                  };
                default:
                  return {
                    text: data,
                    type: "danger"
                  };
              }
            }
          },
          {
            key: "状态",
            width: "130px",
            word: "status",
            status: true,
            type: data => {
              switch (data) {
                case "TRUE":
                  return {
                    text: "允许升级",
                    type: ""
                  };
                case "SUCCESS":
                  return {
                    text: "升级成功",
                    type: "success"
                  };
                default:
                  return {
                    text: "不允许升级",
                    type: "warning"
                  };
              }
            }
          },
          {
            key: "更新时间",
            width: "",
            sortable: true,
            word: "lastUpdateTime"
          }
        ],
        operation: {
          width: "80px",
          options: [
            {
              text: "编辑",

              color: "#3685FD",
              cb: rowdata => {
                this.$refs.form.clearValidate();
                this.dialogVisible = true;
                this.form = { ...rowdata };
              }
            }
          ]
        }
      },
      // 表单数据
      type_options: [
        {
          label: "RELEASE: 官网版本",
          value: "RELEASE"
        },
        {
          label: "HOST_C: c++主程序",
          value: "HOST_C"
        },
        {
          label: "UPDATE_C: c++更新程序",
          value: "UPDATE_C"
        },
        {
          label: "HOST: c#主程序",
          value: "HOST"
        },
        {
          label: "UPDATE: c#更新程序",
          value: "UPDATE"
        },
        {
          label: "HOST_OLD: c#老版本主程序",
          value: "HOST_OLD"
        },
        {
          label: "DATA_COLLECTION: 数据采集程序",
          value: "DATA_COLLECTION"
        }
      ],
      status_options: [
        {
          label: "允许升级",
          value: "TRUE"
        },
        {
          label: "不允许升级",
          value: "FALSE"
        }
      ],
      form: {
        customerNo: "",
        type: "",
        status: ""
      },
      file: "",
      validateRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择客户端类型", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  methods: {
    getDialogTitle() {
      if (this.isBatchUpdate || this.isUpdate) {
        return "修改升级商户";
      } else {
        return "新增升级商户";
      }
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          postCustomerVersion()(this.form).then(data => {
            if (data.code == "00") {
              this.reloadData();
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.dialogVisible = false;
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },
    update() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          // patchCustomerVersion()(this.form).then(data => {
          postCustomerVersion()(this.form).then(data => {
            if (data.code == "00") {
              this.dialogVisible = false;
              this.reloadData();
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },
    beforesubmitFile() {},
    submitFileSuccess() {
      this.$message({
        type: "success",
        message: "上传成功!"
      });
      this.dialogVisible = false;
      this.reloadData();
    },
    submitFileError(err, file, fileList) {
      this.$message({
        type: "danger",
        message: "上传失败!" + err
      });
    },
    reset() {
      this.form.status = "";
      this.form.customerNo = "";
      this.form.type = "";
    },
    dialogClosed() {
      this.isUpdate = true;
      this.isBatchUpdate = false;
    }
  },
  mounted() {}
};
</script>

