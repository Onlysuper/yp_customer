<template>
  <!-- 授权码采购 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('qr_code_reciept_add')" size="small" @click="showDialog('purchaseFormVisible')" type="primary" icon="elresetSearchHandle-icon-upload">采购授权码</el-button>
          <el-button v-if="adminFilter('qr_code_reciept_add')" size="small" @click="showDialog('scangunFormVisible')" type="primary">采购扫码枪</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 授权码采购  start-->
    <el-dialog center title="授权码采购" :visible.sync="purchaseFormVisible">
      <el-form size="small" :model="purchaseForm" ref="purchaseForm" :rules="purchaseFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
                <el-input v-model="purchaseForm.qrcodeCount" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">

              <el-form-item label="是否需要生产水牌" prop="isPrint" :label-width="formLabelWidth">
                <el-switch v-model="purchaseForm.isPrint" active-value="Y" inactive-value="N" active-text="" inactive-text="">
                </el-switch>
                <!-- <el-select v-model="purchaseForm.isPrint" placeholder="请选择" @change="migrateTypeChange1">
                  <el-option v-for="item in selectOptions.isPrint" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('purchaseForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="purchaseSave('purchaseForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 授权码采购 end -->
    <!-- 抢购扫码枪  start-->
    <el-dialog center title="抢购扫码枪" :visible.sync="scangunFormVisible">
      <el-form size="small" :model="scangunForm" ref="scangunForm" :rules="scangunFormRules">
        <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
          <el-input v-model="scangunForm.qrcodeCount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('scangunForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="scangunSave('scangunForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 抢购扫码枪 end -->
    <!-- 授权码采购单修改  start-->
    <el-dialog center title="授权码采购单修改" :visible.sync="editPayFormVisible">
      <el-form size="small" :model="editPayForm" ref="editPayForm" :rules="editPayFormRules">
        <el-form-item label="采购单号" prop="receiptNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editPayForm.receiptNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
                <el-input v-model="editPayForm.qrcodeCount" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="是否需要生产水牌" prop="isPrint" :label-width="formLabelWidth">
                <el-switch v-model="editPayForm.isPrint" active-value="Y" inactive-value="N">
                </el-switch>
                <!-- <el-select v-model="editPayForm.isPrint" placeholder="请选择" @change="migrateTypeChange1">
            <el-option v-for="item in selectOptions.isPrint" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editPayForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editPaySave('editPayForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 授权码采购单修改 end -->
    <!-- 扫描枪采购单修改  start-->
    <el-dialog center title="扫描枪采购单修改" :visible.sync="editScangunFormVisible">
      <el-form size="small" :model="editScangunForm" ref="editScangunForm" :rules="editScangunFormRules">
        <el-form-item label="采购单号" prop="receiptNo" :label-width="formLabelWidth">
          <el-input disabled v-model="editScangunForm.receiptNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
          <el-input v-model="editScangunForm.qrcodeCount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.editScangunFormVisible = false">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editScangunSave('editScangunForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 扫描枪采购单修改 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.operation-box {
  .sumtext {
    font-size: 14px;
    padding-left: 10px;
    line-height: 32px;
    color: #606266;
  }
}
</style>
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { todayDate } from "@src/common/dateSerialize";
import {
  getArantNumBuybacks,
  postPurchaseArantNum,
  patchPurchaseArantNum
} from "@src/apis";
export default {
  name: "qr_code_reciept",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      receiptNo: "", // 采购单号
      status: "", // 状态
      receiptType: "", //设备类型
      createTimeStart: todayDate, //开始日期
      createTimeEnd: todayDate //结束日期
    };
    return {
      formLabelWidth: "140px",
      purchaseFormVisible: false,
      scangunFormVisible: false,
      editPayFormVisible: false,
      editScangunFormVisible: false,
      purchaseForm: {
        // 授权码采购表单
        receiptType: "AUTHCODE"
      },
      purchaseFormRules: {
        qrcodeCount: [
          { required: true, message: "请输入申请数量", trigger: "blur" }
        ],
        isPrint: [
          { required: true, message: "请选择是否需要生产水牌", trigger: "blur" }
        ]
      },
      scangunForm: {
        // 扫码枪表单
        receiptType: "SCANCODEGUN"
      },
      scangunFormRules: {
        qrcodeCount: [
          { required: true, message: "请输入申请数量", trigger: "blur" }
        ]
      },
      editPayForm: {},
      editPayFormRules: {
        qrcodeCount: [
          { required: true, message: "请输入申请数量", trigger: "blur" }
        ],
        isPrint: [
          { required: true, message: "请选择是否生成水牌", trigger: "blur" }
        ]
      },
      editScangunForm: {},
      editScangunFormRules: {
        qrcodeCount: [
          { required: true, message: "请输入申请数量", trigger: "blur" }
        ]
      },
      searchCondition: searchConditionVar,
      selectOptions: {
        // isPrint: [
        //   {
        //     value: "Y",
        //     label: "是"
        //   },
        //   {
        //     value: "N",
        //     label: "否"
        //   }
        // ],
        deviceType: [
          {
            value: "AUTHCODE",
            label: "二维码"
          },
          {
            value: "SCANCODEGUN",
            label: "扫码枪"
          }
        ],
        // 分配方式
        migrateType: [
          {
            value: "ORDER",
            label: "号段转移"
          },
          {
            value: "OUT_ORDER",
            label: "二维码编号"
          }
        ]
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "receiptNo",
          type: "text", // 表单类型
          label: "采购单号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.receiptNo = value;
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
              label: "全部"
            },
            {
              value: "AUDITING",
              label: "待审核"
            },
            {
              value: "SUCCESS",
              label: "审核通过"
            },
            {
              value: "REJECT",
              label: "拒绝"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "receiptType",
          type: "select",
          label: "设备类型",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "AUTHCODE",
              label: "授权码"
            },
            {
              value: "SCANCODEGUN",
              label: "扫码枪"
            }
          ],
          cb: value => {
            this.searchCondition.receiptType = value;
          }
        },
        {
          type: "dateGroup",
          label: "选择时间",
          show: true, // 普通搜索显示
          options: [
            {
              corresattr: "dataTimeBegin",
              label: "开始时间",
              value: todayDate,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "dataTimeEnd",
              lable: "结束时间",
              value: todayDate,
              cb: value => {
                this.searchCondition.createTimeEnd = value;
              }
            }
          ]
        }
        // {
        //   type: "dateGroup2",
        //   label: "选择日期",
        //   limit: false, //日期联动
        //   limitnum: 7,
        //   show: true, // 普通搜索显示
        //   value: [todayDate, todayDate],
        //   option1: "createTimeStart",
        //   option2: "createTimeEnd",
        //   cb: (startTime, endTime) => {
        //     this.searchCondition.createTimeStart = startTime;
        //     this.searchCondition.createTimeEnd = endTime;
        //   }
        // }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getArantNumBuybacks // 初始化数据
        },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "采购单号",
            width: "150px",
            word: "receiptNo"
          },
          {
            key: "合伙人编号",
            width: "150px",
            word: "agentNo"
          },
          {
            key: "数量",
            width: "120px",
            word: "qrcodeCount"
          },
          {
            key: "设备类型",
            width: "120px",
            word: "receiptType",
            status: true,
            type: (data, row) => {
              if (data == "AUTHCODE") {
                return {
                  text: "授权码",
                  type: "success"
                };
              } else if (data == "SCANCODEGUN") {
                return {
                  text: "扫码枪",
                  type: ""
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
            key: "单价",
            width: "80px",
            word: "price"
          },
          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              if (data == "SUCCESS") {
                return {
                  text: "审核通过",
                  type: "success"
                };
              } else if (data == "AUDITING") {
                return {
                  text: "待审核",
                  type: "warning"
                };
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
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
            key: "是否生产水牌",
            width: "",
            word: "isPrint",
            status: true,
            type: (data, row) => {
              if (data == "Y") {
                return {
                  text: "是",
                  type: "success"
                };
              } else if (data == "N") {
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
          }
        ],
        operation: {
          width: "50px",
          options: [
            {
              text: "下载",
              visibleFn: rowdata => {
                if (
                  !(
                    rowdata.status == "AUDITING" || rowdata.status == "REJECT"
                  ) &&
                  rowdata.status == "SUCCESS"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.$refs.dataTable.ExportExcel(
                  "/qrReciept/download?receiptNo=" + rowdata.receiptNo,
                  "download"
                );
              }
            },
            {
              // 授权码编辑
              text: "编辑",
              visibleFn: rowdata => {
                if (
                  this.adminOperationAll.qr_code_reciept_edit == "TRUE" &&
                  (rowdata.status == "AUDITING" ||
                    rowdata.status == "REJECT") &&
                  rowdata.receiptType == "SCANCODEGUN"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#67c23a",
              cb: rowdata => {
                this.editPayForm = rowdata;
                this.editPayFormVisible = true;
              }
            },
            {
              // 扫码枪编辑
              text: "编辑",
              visibleFn: rowdata => {
                if (
                  this.adminOperationAll.qr_code_reciept_edit == "TRUE" &&
                  (rowdata.status == "AUDITING" ||
                    rowdata.status == "REJECT") &&
                  rowdata.receiptType == "AUTHCODE"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#e6a23c",
              cb: rowdata => {
                this.editScangunForm = rowdata;

                this.editScangunFormVisible = true;
              }
            }
          ]
        },
        // 数据加载成功
        dataSuccess: data => {}
      }
    };
  },
  methods: {
    // 授权码采购保存
    purchaseSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          postPurchaseArantNum()({
            qrcodeCount: thisForm.qrcodeCount,
            receiptType: thisForm.receiptType,
            isPrint: thisForm.isPrint
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，授权码采购成功!"
              });
              // this.checkFormVisible = false;
              this.purchaseFormVisible = false;
              this.reloadData();
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
    // 扫码枪采购保存
    scangunSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          postPurchaseArantNum()({
            qrcodeCount: thisForm.qrcodeCount,
            receiptType: thisForm.receiptType
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，扫码枪采购成功!"
              });
              this.scangunFormVisible = false;
              this.reloadData(this.postPage, this.postLimit);
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
    // 授权码修改保存
    editPaySave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          patchPurchaseArantNum()({
            receiptNo: thisForm.receiptNo,
            qrcodeCount: thisForm.qrcodeCount,
            isPrint: thisForm.isPrint
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，授权码修改保存成功!"
              });
              this.editPayFormVisible = false;
              this.reloadData();
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
    // 扫码枪修改保存
    editScangunSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          patchPurchaseArantNum()({
            receiptNo: thisForm.receiptNo,
            qrcodeCount: thisForm.qrcodeCount
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，扫码枪修改保存成功!"
              });
              this.editScangunFormVisible = false;
              this.reloadData();
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
    migrateTypeChange1() {}
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.moduleLayour.userMessage.all;
    },
    qr_code_reciept_audit_agent() {
      return this.$store.state.moduleLayour.userMessage.all
        .qr_code_reciept_audit_agent;
    },
    qr_code_reciept_audit_admin() {
      return this.$store.state.moduleLayour.userMessage.all
        .qr_code_reciept_audit_admin;
    },
    qr_code_reciept_audit_all() {
      return this.$store.state.moduleLayour.userMessage.all
        .qr_code_reciept_audit_all;
    }
  }
};
</script>

