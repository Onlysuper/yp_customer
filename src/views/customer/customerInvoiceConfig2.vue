<template>
  <!-- 开票配置 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="formVisible('add')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    
    <!-- 新增start -->
    <el-dialog v-dialogDrag center :title="dialogTitle" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input v-model="addForm.customerNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width" label="设备类型" prop="deviceType" :label-width="formLabelWidth">
                <el-select v-model="addForm.deviceType" placeholder="请选择">
                  <el-option v-for="item in selectOptions.deviceTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="full-width" label="开票地区" prop="invoiceLocation" :label-width="formLabelWidth">
          <el-select v-model="addForm.invoiceLocation" placeholder="请选择">
            <el-option v-for="item in invoiceAreaOptions" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" label="客户端类型" prop="clientType" :label-width="formLabelWidth">
                <el-select v-model="addForm.clientType" placeholder="请选择">
                  <el-option v-for="item in selectOptions.clientTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="设备编号" prop="deviceNo" :label-width="formLabelWidth">
                <el-input v-model="addForm.deviceNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="收款人" prop="receiveMan" :label-width="formLabelWidth">
                <el-input v-model="addForm.receiveMan" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="开票人" prop="invoiceMan" :label-width="formLabelWidth">
                <el-input v-model="addForm.invoiceMan" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="复核人" prop="checkMan" :label-width="formLabelWidth">
          <el-input v-model="addForm.checkMan" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm('addForm')">重置</el-button>
        <!-- <el-button v-if="isAdd?true:false" :loading="saveLoading" type="primary" @click="addSave('addForm')">立即提交</el-button> -->
         <!-- <el-button v-if="isEdit?true:false"  :loading="saveLoading" type="primary" @click="editSave('addForm')">确定</el-button> -->
         <el-button v-if="isAdd?true:false"  :loading="saveLoading" type="primary" @click="submit('addForm','add')">确定</el-button>
         <el-button v-if="isEdit?true:false"  :loading="saveLoading" type="primary" @click="submit('addForm','edit')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import utils from "@src/common/utils";
import invoiceAreaJson from "@src/data/invoiceArea.json"
import {
  getCustomerConfigs,
  postAddCustomerConfigs,
  postEditCustomerConfigs
} from "@src/apis";
export default {
  name: "customerInvoiceConfig",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var searchConditionVar = {
      customerNo: "" // 商户编号
    };
    return {
      isAdd: false,
      isEdit: false,
      // 查询条件数据
      invoiceAreaOptions: invoiceAreaJson,
      addFormVisible: false, // 新增框
      editFormVisible: false,
      searchCondition: searchConditionVar,
      formLabelWidth: "100px",
      addFormRules: {
        customerNo: [
          { required: true, message: "请输入商户编号", trigger: "blur,change" }
        ],
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "blur,change" }
        ],
        deviceNo: [
          { required: true, message: "请输入设备编号", trigger: "blur,change" }
        ],
        invoiceMan: [
          { required: true, message: "请输入开票人", trigger: "blur,change" }
        ],
        invoiceLocation: [
          { required: true, message: "请选择区域", trigger: "blur,change" }
        ]
      },
      editFormRules: {}, // 编辑单个规则
      editForm: {
        customerNo: "",
        deviceType: "",
        deviceNo: "",
        receiveMan: "",
        invoiceMan: "",
        checkMan: ""
      },
      addForm: {},
      selectOptions: {
        deviceTypeOptions: [
          {
            value: "HX_PAN",
            label: "金税盘"
          },
          {
            value: "BW_PAN",
            label: "税控盘"
          }
        ],
        clientTypeOptions: [
          {
            value: "BROWER",
            label: "浏览器"
          },
          {
            value: "CLIENT",
            label: "桌面客户端"
          }
        ]
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
        }
      ],
      // 列表数据
      actionUrl: getCustomerConfigs,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getCustomerConfigs // 初始化数据
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
            key: "设备类型",
            width: "100px",
            word: "deviceType",
            status: true,
            type: data => {
              if (data == "HX_PAN") {
                return {
                  text: "金税盘",
                  type: ""
                };
              } else if (data == "BW_PAN") {
                return {
                  text: "税控盘",
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
            key: "客户端类型",
            width: "120px",
            word: "clientType",
            status: true,
            type: data => {
              if (data == "CLIENT") {
                return {
                  text: "桌面客户端",
                  type: "success"
                };
              } else if (data == "BROWER") {
                return {
                  text: "浏览器端",
                  type: "warning"
                };
              } else {
                return {
                  text: data ? data : "",
                  type: "info"
                };
              }
            }
          },
          {
            key: "设备编号",
            width: "",
            word: "deviceNo"
          },
          {
            key: "收款人",
            width: "",
            word: "receiveMan"
          },
          {
            key: "开票人",
            width: "",
            word: "invoiceMan"
          },
          {
            key: "复核人",
            width: "",
            word: "checkMan"
          }
        ],
        operation: {
          width: "100px",
          options: [
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                this.formVisible('eidt', rowdata);

              }
            }
          ]
        }
      }
    };
  },

  methods: {
    formVisible(type, data) {
      this.addFormVisible = true;
      this.isAdd = false;
      this.isEdit = false;
      if (type == 'add') {
        this.isAdd = true;
        this.addForm = {
          customerNo: "",
          deviceType: "",
          clientType: "",
          deviceNo: "",
          receiveMan: "",
          invoiceMan: "",
          checkMan: "",
          invoiceLocation: ""
        };
      }
      if (type == 'eidt') {
        this.isEdit = true;
        this.addForm = { ...data };
      }
      this.$nextTick(() => {
        this.$refs.addForm.clearValidate()
      })
    },
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit(formName, type) {
      let submitApi = "";
      let submitMsg = "";
      let sendData = {};
      if (type == 'add') {
        submitApi = postAddCustomerConfigs;
        submitMsg = "恭喜你，新增数据成功";
        sendData = { ...this.addForm }
      }
      if (type == 'edit') {
        submitApi = postEditCustomerConfigs;
        submitMsg = "恭喜你，修改数据成功";
        sendData = utils.pickObj(this[formName], [
          "customerNo",
          "deviceType",
          "clientType",
          "deviceNo",
          "receiveMan",
          "invoiceMan",
          "checkMan",
          "invoiceLocation"
        ]);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          submitApi()(sendData).then(data => {
            if (data.code === "00") {
              this.$message({
                message: submitMsg,
                type: "success",
                center: true
              });
              this.addFormVisible = false;
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
  watch: {
    addFormVisible(val) {
      this.saveLoadingStop(val);
    },
    editFormVisible(val) {
      this.saveLoadingStop(val);
    }
  },
  computed: {
    dialogTitle() {
      if (this.isAdd) {
        return "新增开票配置"
      }
      if (this.isEdit) {
        return "编辑开票配置"
      }
    }
  },
  mounted() { }
};
</script>

