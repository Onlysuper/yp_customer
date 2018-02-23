<template>
  <!-- 授权码审核 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <!-- {{adminOperationAll.qr_code_reciept_audit_all}} -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 审核授权码采购 -->
    <el-dialog center title="授权码采购清单" :visible.sync="checkFormVisible">
      <el-form size="small" :model="checkForm" ref="checkForm" :rules="checkFormRules">
        <el-form-item label="采购单号" prop="receiptNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm.receiptNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务商编号" prop="agentNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm.agentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm.qrcodeCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="采购单价" prop="price" :label-width="formLabelWidth">
          <el-input v-model="checkForm.price" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="migrateTypeVisible" label="分发方式" prop="migrateType" :label-width="formLabelWidth">
          <el-select v-model="checkForm.migrateType" placeholder="请选择" @change="migrateTypeChange1">
            <el-option v-for="item in selectOptions.checkFormOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row v-if="qrNumsVisible">
          <el-col :span="11">
            <el-form-item label="号段开始" prop="" :label-width="formLabelWidth">
              <el-input v-model="checkForm.qrcodeStart" auto-complete="off"></el-input>
              <!-- <el-input-number v-model="checkForm.qrcodeStart" controls-position="right"></el-input-number> -->
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="号段结束" prop="" :label-width="formLabelWidth">
              <el-input v-model="checkForm.qrcodeEnd" auto-complete="off"></el-input>
              <!-- <el-input-number v-model="checkForm.qrcodeEnd" controls-position="right"></el-input-number> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="qrcodesVisible" label="授权码序列号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input placeholder="多个二维码请用英文逗号分隔" v-model="checkForm.qrcodes" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('checkForm')">重置</el-button>
        <el-button :disabled="buttonDisabled" :loading="saveLoading" type="primary" @click="checkAdoptSave('checkForm')">审核通过</el-button>
        <el-button :disabled="buttonDisabled2" :loading="saveLoading2" type="primary" @click="checkRefuseSave('checkForm')">拒绝通过</el-button>
      </div>
    </el-dialog>
    <!-- 审核下级授权码采购 end -->

    <!-- 扫码枪采购 start-->
    <el-dialog center title="扫码枪采购清单" :visible.sync="checkFormVisible2">
      <el-form size="small" :model="checkForm2" ref="checkForm2" :rules="checkFormRules">
        <el-form-item label="服务商编号" prop="agentNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm2.agentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="采购单号" prop="receiptNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm2.receiptNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="申请数量" prop="qrcodeCount" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="checkForm2.qrcodeCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="采购单价" prop="price" :label-width="formLabelWidth">
          <el-input v-model="checkForm2.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序列号前缀" prop="prefixNo" :label-width="formLabelWidth">
          <el-input v-model="checkForm2.prefixNo" auto-complete="off" placeholder="有前缀时必须填入前缀"></el-input>
        </el-form-item>
        <el-form-item label="分发方式" prop="migrateType" :label-width="formLabelWidth">
          <el-select v-model="checkForm2.migrateType" placeholder="请选择" @change="migrateTypeChange2">
            <el-option v-for="item in selectOptions.checkFormOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row v-if="qrNumsVisible2">
          <el-col :span="11">
            <el-form-item label="号段开始" prop="" :label-width="formLabelWidth">
              <el-input v-model="checkForm2.qrcodeStart" auto-complete="off" placeholder="号段不需要加前缀"></el-input>
              <!-- <el-input-number v-model="checkForm2.qrcodeStart" controls-position="right"></el-input-number> -->
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="号段结束" prop="" :label-width="formLabelWidth">
              <el-input v-model="checkForm2.qrcodeEnd" auto-complete="off" placeholder="号段不需要加前缀"></el-input>
              <!-- <el-input-number v-model="checkForm2.qrcodeEnd" controls-position="right"></el-input-number> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="qrcodesVisible2" label="扫码枪编号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input placeholder="多个扫码枪请用英文逗号分隔" v-model="checkForm2.qrcodes" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('checkForm2')">重置</el-button>
        <el-button :disabled="buttonDisabled" :loading="saveLoading" type="primary" @click="checkAdoptSave('checkForm2')">审核通过</el-button>
        <el-button :disabled="buttonDisabled2" :loading="saveLoading2" type="primary" @click="checkRefuseSave('checkForm2')">拒绝通过</el-button>
      </div>
    </el-dialog>
    <!-- 扫码枪采购 end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate } from "@src/common/dateSerialize";
import {
  getArantNumExamines,
  putAdoptArantNumExamine,
  putRefuseArantNumExamine
} from "@src/apis";
export default {
  name: "qr_code_reciept_audit",
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
      createTimeStart: todayDate, // 开始日期
      createTimeEnd: todayDate // 结束日期
    };
    return {
      // 授权码
      checkFormVisible: false,

      checkFormVisible2: false,
      migrateTypeVisible: false,
      qrNumsVisible: false,
      qrcodesVisible: false,
      qrNumsVisible2: false,
      qrcodesVisible2: false,
      checkFormRules: {
        price: [
          { required: true, message: "采购单价不能为空", trigger: "blur" }
        ],
        migrateType: [
          { required: true, message: "请选择开发方式", trigger: "blur" }
        ]
      },
      checkForm: {},

      // 扫码枪

      checkFormRules2: {
        price: [
          { required: true, message: "采购单价不能为空", trigger: "blur" }
        ],
        migrateType: [
          { required: true, message: "请选择开发方式", trigger: "blur" }
        ]
      },
      checkForm2: {},

      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      selectOptions: {
        checkFormOptions: [
          {
            value: "OUT_ORDER",
            label: "序列号"
          },
          {
            value: "ORDER",
            label: "号段转移"
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
              corresattr: "createTimeStart",
              label: "开始时间",
              value: todayDate,
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
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getArantNumExamines // 初始化数据
        },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "180px",
            word: "createTime"
          },
          {
            key: "采购单号",
            width: "",
            word: "receiptNo"
          },
          {
            key: "合伙人编号",
            width: "",
            word: "agentNo"
          },
          {
            key: "数量",
            width: "",
            word: "qrcodeCount"
          },
          {
            key: "单价",
            width: "",
            word: "price"
          },
          {
            key: "状态",
            width: "100px",
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
                  type: "warning"
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
            key: "设备类型",
            width: "100px",
            word: "receiptType",
            status: true,
            type: data => {
              if (data == "AUTHCODE") {
                return {
                  text: "授权码",
                  type: "success"
                };
              } else if (data == "SCANCODEGUN") {
                return {
                  text: "扫码枪",
                  type: "warning"
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
            width: "120px",
            word: "isPrint",
            status: true,
            type: data => {
              if (data == "N") {
                return {
                  text: "否",
                  type: "success"
                };
              } else if (data == "Y") {
                return {
                  text: "是",
                  type: "warning"
                };
              } else {
                return {
                  text: data,
                  type: ""
                };
              }
            }
          }
          // {
          //   key: "单价",
          //   width: "",
          //   word: "price"
          // }
        ],
        operation: {
          width: "50px",
          options: [
            {
              /**
               * 审核授权码采购
               */
              text: "审核",
              visibleFn: rowdata => {
                if (
                  this.adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
                  rowdata.status == "AUDITING" &&
                  rowdata.receiptType == "AUTHCODE"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.checkForm = rowdata;
                this.checkFormVisible = true;
                let isPrint = rowdata.isPrint == "Y";
                let isAdmin =
                  this.userType == "root" || this.userType == "admin";
                let isShow = !(isAdmin && !isPrint);
                this.isShowDistributeType(isShow);
              }
            },
            {
              /**
               * 审核扫码枪采购
               */
              text: "审核",
              ref: "qr_code_reciept_audit_agent",
              visibleFn: rowdata => {
                if (
                  this.adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
                  rowdata.status == "AUDITING" &&
                  rowdata.receiptType == "SCANCODEGUN"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.checkForm2 = rowdata;
                this.checkFormVisible2 = true;
                // this.showScancodegunOrderDiv(true);
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
    // 审核通过保存
    checkAdoptSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading = true;
          this.buttonDisabled2 = true;
          var thisForm = this[formName];
          let receiptType = "";
          if (formName == "checkForm") {
            receiptType = "AUTHCODE";
          } else if (formName == "checkForm2") {
            receiptType = "SCANCODEGUN";
          } else {
            receiptType = thisForm.receiptType;
          }

          putAdoptArantNumExamine(thisForm.receiptNo)({
            receiptNo: thisForm.receiptNo,
            receiptType: receiptType,
            agentNo: thisForm.agentNo,
            qrcodeCount: thisForm.qrcodeCount,
            price: thisForm.price,
            prefixNo: thisForm.prefixNo,
            migrateType: thisForm.migrateType,
            qrcodeStart: thisForm.qrcodeStart,
            qrcodeEnd: thisForm.qrcodeEnd,
            qrcodes: thisForm.qrcodes
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "审核已通过!"
              });
              this.checkFormVisible = false;
              this.checkFormVisible2 = false;
              this.reloadData(this.postPage, this.postLimit);
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
            this.saveLoading = false;
            this.buttonDisabled2 = false;
          });
        }
      });
    },
    // 审核拒绝保存
    checkRefuseSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveLoading2 = true;
          this.buttonDisabled = true;
          var thisForm = this[formName];
          putRefuseArantNumExamine(thisForm.receiptNo)({
            agentNo: thisForm.agentNo,
            receiptNo: thisForm.receiptNo,
            receiptType: thisForm.receiptType,
            qrcodeCount: thisForm.qrcodeCount,
            price: thisForm.price,
            prefixNo: thisForm.prefixNo,
            migrateType: thisForm.migrateType,
            qrcodeStart: thisForm.qrcodeStart,
            qrcodeEnd: thisForm.qrcodeEnd,
            qrcodes: thisForm.qrcodes
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "已拒绝通过!"
              });
              this.reloadData(this.postPage, this.postLimit);
              this.checkFormVisible = false;
              this.checkFormVisible2 = false;
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
            this.saveLoading2 = false;
            this.buttonDisabled = false;
          });
        }
      });
    },
    migrateTypeChange1(value) {
      console.log(value);
      this.checkForm.qrcodes = "";
      this.checkForm.qrcodeStart = "";
      this.checkForm.qrcodeEnd = "";
      if (value == "ORDER") {
        //号段转移
        this.qrNumsVisible = true;
        this.qrcodesVisible = false;
      } else if (value == "OUT_ORDER") {
        //二维码编号
        this.qrcodesVisible = true;
        this.qrNumsVisible = false;
      }
    },
    migrateTypeChange2(value) {
      this.checkForm2.qrcodes = "";
      this.checkForm2.qrcodeStart = "";
      this.checkForm2.qrcodeEnd = "";
      if (value == "ORDER") {
        //号段转移
        this.qrNumsVisible2 = true;
        this.qrcodesVisible2 = false;
      } else if (value == "OUT_ORDER") {
        //二维码编号
        this.qrcodesVisible2 = true;
        this.qrNumsVisible2 = false;
      }
    },
    /**
     * 审核授权码采购
     */
    isShowDistributeType(isShow) {
      if (!isShow) {
        this.migrateTypeVisible = false;
        // this.qrNumsVisible = false;
        // this.qrcodesVisible = false;
      } else {
        this.migrateTypeVisible = true;
        // this.qrNumsVisible = true;
        // this.qrcodesVisible = true;
      }
    },
    /**
     * 审核扫码枪采购
     */
    showScancodegunOrderDiv(isOrder) {
      if (isOrder) {
        this.qrNumsVisible2 = true;
        this.qrcodesVisible2 = false;
      } else {
        this.qrNumsVisible2 = false;
        this.qrcodesVisible2 = true;
      }
    }
  },
  mounted() {},
  computed: {
    userType() {
      return this.$store.state.moduleLayour.userMessage.userType;
    },
    userAll() {
      // 所有的用户信息
      return this.$store.state.moduleLayour.userMessage.all;
    }
  }
};
</script>

