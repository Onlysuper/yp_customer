<template>
  <!-- 版本管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('agent_add')" class="mybutton" size="small" type="primary" icon="el-icon-plus" @click="addVisible">上传新版本</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
      <!-- 上传新版本start -->
      <el-dialog v-dialogDrag center :title="getDialogTitle()" :visible.sync="uploadDialogVisible" @close="dialogClosed">
        <el-form ref="form" :model="form" label-width="110px" :rules="validateRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户端版本" prop="clientVersion">
                <el-input v-model="form.clientVersion" placeholder="请输入上传版本号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="最低兼容版本" prop="compatibleVersion">
                <el-input v-model="form.compatibleVersion" placeholder="如无特殊情况填0">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户端类型" prop="type">
                <el-select :disabled="editType" v-model="form.type" placeholder="请选择">
                  <el-option v-for="item in versionTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否强制更新">
                <el-switch v-model="form.isForced" active-value="TRUE" inactive-value="FALSE">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="下载地址" prop="url">
                <el-input v-model="form.url" placeholder="url/客户端类型/版本.扩展名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="版本描述" prop="info">
                <el-input type="textarea" v-model="form.info" placeholder="请输入版本描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="is-required" label="上传文件" v-if="!isUpdate">
            <el-upload ref="uploadFile" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :on-exceed="handleExceed" :data="form" :before-upload="beforeUploadFile" :on-success="uploadFileSuccess" :on-error="uploadFileError" :action="oaIp+'/versionCommand/add'" :auto-upload="false" accept="file">
              <el-button type="primary">选择新版本上传
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reset">重置</el-button>
          <el-button :loading="saveLoading" type="primary" @click="upload" v-if="!isUpdate">提 交</el-button>
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
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { todayStr } from "@src/common/dateSerialize";
import {
  patchVersion,
  getVersions,
  getOldVersions,
  setUsingVersion
} from "@src/apis";
export default {
  name: "versionCommand",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      clientVersion: "", // 客户端版本号
      status: "" // 状态
    };
    return {
      versionTypeOptions: [],
      uploadDialogVisible: false, //上传面板是否可见
      isUpdate: true,
      editType: false,
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "clientVersion",
          type: "text", // 表单类型
          label: "版本号", // 输入框前面的文字
          show: true, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.clientVersion = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "TRUE",
              label: "开启"
            },
            {
              value: "FALSE",
              label: "未开启"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],
      // 列表数据
      actionUrl: getVersions,
      postSearch: searchConditionVar,
      tableData: {
        summary: {
          is: false
        }, //显示合计
        havecheck: false, //是否显示复选框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "上传时间",
            width: "170px",
            sortable: true,
            word: "createTime"
          },
          {
            key: "版本号",
            width: "100px",
            word: "clientVersion"
          },
          {
            key: "兼容版本",
            width: "80px",
            word: "compatibleVersion"
          },
          {
            key: "版本类型",
            width: "170px",
            word: "type",
            status: true,
            type: data => {
              return this.statusFilter(data, 'typeCustomerVersion')
            }
          },
          {
            key: "强制更新",
            width: "80px",
            word: "isForced",
            status: true,
            type: data => {
              switch (data) {
                case "TRUE":
                  return {
                    text: "是",
                    type: "#67C23A"
                  };
                default:
                  return {
                    text: "否",
                    type: "#909399"
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
              switch (data) {
                case "TRUE":
                  return {
                    text: "开启",
                    type: "#67C23A"
                  };
                default:
                  return {
                    text: "未开启",
                    type: "#909399"
                  };
              }
            }
          },
          {
            key: "下载地址",
            width: "420px",
            word: "url"
          }
        ],
        operation: {
          width: "100px",
          options: [
            {
              text: "编辑",
              color: "#3685FD",
              visibleFn: rowdata => {
                return this.adminFilter('agent_edit')
                // if (this.adminOperationAll.agent_edit == "TRUE") {
                //   return true;
                // } else {
                //   return false;
                // }
              },
              cb: rowdata => {
                this.uploadDialogVisible = true;
                this.editType = true;
                this.form = { ...rowdata };
                this.$nextTick(() => {
                  this.$refs["form"].clearValidate();
                })
              }
            },
            {
              text: "启用",
              visibleFn: rowdata => {
                return this.adminFilter('agent_edit')
                // if (this.adminOperationAll.agent_edit == "TRUE") {
                //   return true;
                // } else {
                //   return false;
                // }
              },
              color: "#3685FD",
              visibleFn: rowdata => {
                if (rowdata.status === "TRUE") {
                  return false;
                } else {
                  return true;
                }
              },
              cb: rowdata => {
                this.$confirm("确认执行当前操作?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  setUsingVersion()({
                    clientVersion: rowdata.clientVersion,
                    type: rowdata.type
                  }).then(data => {
                    this.reloadData();
                    this.$message({
                      type: "success",
                      message: "启用成功!"
                    });
                  });
                });
              }
            }
          ]
        }
      },

      isForce_options: [
        {
          label: "是",
          value: "TRUE"
        },
        {
          label: "否",
          value: "FALSE"
        }
      ],
      form: {
        clientVersion: "",
        url: "",
        type: "",
        isForced: "FALSE",
        compatibleVersion: "0",
        info: ""
      },
      file: "",
      validateRules: {
        clientVersion: [
          { required: true, message: "请输入上传客户端版本号", trigger: "blur,change" }
        ],
        url: [
          {
            required: true,
            message: "请输入上传版本的下载地址",
            trigger: "blur,change"
          }
        ],
        type: [
          { required: true, message: "请输入客户端类型", trigger: "blur,change" }
        ],
        compatibleVersion: [
          { required: true, message: "请输入最低兼容版本", trigger: "blur,change" }
        ],
        info: [{ required: true, message: "请输入版本描述", trigger: "blur,change" }],
        file: [{ required: true, message: "请选择上传文件", trigger: "blur,change" }]
      }
    };
  },
  methods: {
    addVisible() {
      this.isUpdate = false;
      this.uploadDialogVisible = true;
      this.editType = false;
      this.reset();
    },
    getDialogTitle() {
      return this.isUpdate ? "修改上传版本" : "上传新版本";
    },
    upload() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          console.log(this.$refs.uploadFile);
          if (this.$refs.uploadFile.uploadFiles.length === 0) {
            this.$message({
              type: "danger", //warning
              message: "请选择上传文件!"
            });
            this.saveLoading = false;
            return;
          }
          this.saveLoading = false;
          this.$refs.uploadFile.submit();
        }
      });
    },
    update() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          patchVersion()(this.form).then(data => {
            this.uploadDialogVisible = false;
            this.reloadData();
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.saveLoading = false;
          });
        }
      });
    },
    beforeUploadFile(file) {
      // const extension = file.name.split(".")[1] === "xlsx";
      // const extension2 = file.name.split(".")[1] === "numbers";
      // const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!extension && !extension2) {
      //   this.$message.error("上传文件只能是 xlsx,numbers 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传文件图片大小不能超过 10MB!");
      // }
      // this.saveLoading = false;
      // return (extension || extension2) && isLt2M;
    },
    uploadFileSuccess(res, file, fileList) {
      if (res.code == "00") {
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
      this.$refs["uploadFile"].clearFiles();
      this.uploadDialogVisible = false;
    },
    uploadFileError(err, file, fileList) {
      this.$message({
        type: "danger",
        message: "上传失败!" + err
      });
    },
    reset() {
      this.form = {
        clientVersion: "",
        url: "",
        type: "",
        isForced: "FALSE",
        compatibleVersion: "0",
        info: ""
      }
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      })
    },
    dialogClosed() {
      this.isUpdate = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前共选择了 ${files.length + fileList.length} 个文件,超出限定个数。`
      );
    }
  },
  mounted() { },
  created() {
    this.versionTypeOptions = this.statusFilterQuery('typeCustomerVersion')
  },
  watch: {
    uploadDialogVisible(val) {
      this.saveLoadingStop(val);
    },
  }
};
</script>

