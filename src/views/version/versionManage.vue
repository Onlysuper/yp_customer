<template>
  <!-- 版本管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" size="small" type="primary" icon="el-icon-plus" @click="uploadDialogVisible=true">上传新版本</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
      <!-- 上传新版本start -->
      <el-dialog center title="上传新版本" :visible.sync="uploadDialogVisible" width="600px">
        <el-form ref="form" label-width="100px">
          <el-form-item label="客户端版本">
            <el-col :span="8">
              <el-input v-model="clientVersion" placeholder="请输入上传版本号"></el-input>
            </el-col>
            <el-col :span="15" :offset="1">
              <el-input v-model="compatibleVersion" placeholder="如无特殊情况填0">
                <template slot="prepend">最低兼容版本</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="客户端类型">
            <el-col :span="8">
              <el-select v-model="type" placeholder="请选择">
                <el-option v-for="item in type_options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="11" :offset="1">
              是否强制更新
              <el-switch v-model="isForced" active-value="TRUE" inactive-value="FALSE">
              </el-switch>
            </el-col>
          </el-form-item>
          <el-form-item label="下载地址">
            <el-input v-model="url" placeholder="url/客户端类型/版本.扩展名"></el-input>
          </el-form-item>
          <el-form-item label="版本描述">
            <el-input v-model="info" placeholder="请输入版本描述"></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload ref="uploadFile" :before-upload="beforeUploadFile" :on-success="uploadFileSuccess" :on-error="uploadFileError" :action="oaIp+'/versionCommand/add'" :auto-upload="false" :limit="1" accept="file">
              <el-button type="primary">选择新版本上传
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="upload">提 交</el-button>
        </span>
        <!-- <form>
          <div class="content-center-box">
            <div>
              属性方式：
              <el-input v-model="clientVersion" placeholder="请输入上传的版本号"></el-input>
            </div>
            <div class="sep-inline">
              <el-upload class="upload-demo" ref="batchBindFile" :before-upload="beforeBindBatchUpload" :on-success="batchBindUploadSuccess" :on-error="uploadFilleError" :action="oaIp+'/qrcode/bindBatchQrCode'" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" accept="file" drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将入网文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传xlsx文件,请注意文件格式</div>
              </el-upload>
            </div>
          </div>
        </form> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="batchBindReset">重置</el-button>
          <el-button type="primary" @click="upload">提 交</el-button>
        </span>-->
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
import { todayDate, yesterday } from "@src/common/dateSerialize";
import {
  postVersion,
  patchVersion,
  getVersions,
  getOldVersions,
  setUsingVersion
} from "@src/apis";
export default {
  name: "versionManage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      clientVersion: "", // 客户端版本号
      status: "" // 状态
    };
    return {
      uploadDialogVisible: false, //上传面板是否可见
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "clientVersion",
          type: "text", // 表单类型
          label: "版本号", // 输入框前面的文字
          show: true, // 普通搜索显示
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
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getVersions // 初始化数据
        },
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
                default:
                  return {
                    text: data,
                    type: "danger"
                  };
              }
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
                    type: "success"
                  };
                default:
                  return {
                    text: "否",
                    type: "info"
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
                    type: "success"
                  };
                default:
                  return {
                    text: "未开启",
                    type: "warning"
                  };
              }
            }
          },
          {
            key: "下载地址",
            width: "",
            word: "url"
          }
        ],
        operation: {
          width: "100px",
          options: [
            {
              text: "编辑",
              color: "#3685FD",
              cb: rowdata => {
                /* this.editForm = rowdata;
                this.editFormVisible = true; */
              }
            },
            {
              text: "启用",
              color: "#3685FD",
              visibleFn: rowdata => {
                if (rowdata.status === "TRUE") {
                  return false;
                } else {
                  return true;
                }
              },
              cb: rowdata => {
                /* this.editForm = rowdata;
                this.editFormVisible = true; */
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
      clientVersion: "",
      url: "",
      type: "",
      isForced: "FALSE",
      compatibleVersion: "0",
      info: ""
    };
  },
  methods: {
    upload() {},
    beforeUploadFile() {},
    uploadFileSuccess() {},
    uploadFileError() {},
    reset() {}
  },
  mounted() {}
};
</script>

