<template>
  <!-- 开票统计 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('qr_code_migrate_distribute')" size="small" @click="showDialog('allotFormVisible')" type="primary" icon="elresetSearchHandle-icon-upload">授权码分配</el-button>
          <el-button v-if="adminFilter('qr_code_migrate_recover')" size="small" @click="showDialog('payFormVisible')" type="primary" icon="">授权码上缴</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 授权码分配  start-->
    <el-dialog v-dialogDrag id="dialogLoding" ref="allotFormVisible" center title="授权码分配" :visible.sync="allotFormVisible">
      <el-form size="small" :model="allotForm" ref="allotForm" :rules="allotFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="设备类型" prop="deviceType" :label-width="formLabelWidth">
                <el-select v-model="allotForm.deviceType" placeholder="请选择">
                  <el-option v-for="item in selectOptions.deviceType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width" label="分配方式" prop="migrateType" :label-width="formLabelWidth">
                <el-select v-model="allotForm.migrateType" placeholder="请选择" @change="migrateTypeChange1">
                  <el-option v-for="item in selectOptions.migrateType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="序列号前缀" prop="prefixNo" :label-width="formLabelWidth">
                <el-input v-model="allotForm.prefixNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="合伙人编号" prop="agentNo" :label-width="formLabelWidth">
                <el-input v-model="allotForm.agentNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item v-if="qrNumsVisible" label="号段开始" prop="qrcodeStart" :label-width="formLabelWidth">
              <el-input v-model="allotForm.qrcodeStart" auto-complete="off" @blur="qrcodeBlur($event,'allotQrcodeStart')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item v-if="qrNumsVisible" label="号段结束" prop="qrcodeEnd" :label-width="formLabelWidth">
              <el-input v-model="allotForm.qrcodeEnd" auto-complete="off" @blur="qrcodeBlur($event,'allotQrcodeEnd')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="qrcodesVisible" label="授权码序列号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input placeholder="多个二维码请用英文逗号分隔" @blur="qrcodeBlur($event,'allotQrcodes')" v-model="allotForm.qrcodes" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转移数量" prop="migrateCount" :label-width="formLabelWidth">
          <el-input v-model="allotForm.migrateCount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('allotForm')">重置</el-button>
        <el-button type="primary" @click="allotSave('allotForm')">分配</el-button>
      </div>
    </el-dialog>
    <!-- 授权码分配 end -->

    <!-- 授权码上缴  start-->
    <el-dialog v-dialogDrag center title="授权码上缴" :visible.sync="payFormVisible">
      <el-form size="small" :model="payForm" ref="payForm" :rules="payFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" label="设备类型" prop="deviceType" :label-width="formLabelWidth">
                <el-select v-model="payForm.deviceType" placeholder="请选择">
                  <el-option v-for="item in selectOptions.deviceType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item class="full-width" label="上缴方式" prop="migrateType" :label-width="formLabelWidth">
                <el-select v-model="payForm.migrateType" placeholder="请选择" @change="migrateTypeChange2">
                  <el-option v-for="item in selectOptions.migrateType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="序列号前缀" prop="prefixNo" :label-width="formLabelWidth">
                <el-input v-model="payForm.prefixNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item v-if="qrNumsPayVisible" label="号段开始" prop="qrcodeStart" :label-width="formLabelWidth">
              <el-input v-model="payForm.qrcodeStart" @blur="qrcodeBlur($event,'payQrcodeStart')" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item v-if="qrNumsPayVisible" label="号段结束" prop="qrcodeEnd" :label-width="formLabelWidth">
              <el-input v-model="payForm.qrcodeEnd" @blur="qrcodeBlur($event,'payQrcodeEnd')" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="qrcodesPayVisible" label="授权码序列号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input placeholder="多个二维码请用英文逗号分隔" @blur="qrcodeBlur($event,'payQrcodes')" v-model="payForm.qrcodes" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转移数量" prop="migrateCount" :label-width="formLabelWidth">
          <el-input v-model="payForm.migrateCount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('payForm')">重置</el-button>
        <el-button type="primary" @click="paySave('payForm')">上缴</el-button>
      </div>
    </el-dialog>
    <!-- 授权码上缴 end -->

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.centertext {
  text-align: center;
}
</style>
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayStr, today_ } from "@src/common/dateSerialize";
import { getArantNumTransfers, postMigrateNumTransfer } from "@src/apis";
export default {
  name: "qr_code_migrate",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      migrateNo: "", // 转移单号
      migrateMode: "", // 转移类型
      createTimeStart: todayStr, //开始日期
      createTimeEnd: todayStr //结束日期
    };
    return {
      formLabelWidth: "110px",
      allotFormVisible: false,
      payFormVisible: false,
      qrNumsVisible: false, // 号段
      qrcodesVisible: false, // 二维码
      qrNumsPayVisible: false, // 授权码上缴段号
      qrcodesPayVisible: false, //授权码上缴二维码
      allotForm: {
        migrateCount: 0
      },
      allotFormRules: {
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "blur,change" }
        ],
        migrateCount: [
          { required: true, message: "请输入转移数量", trigger: "blur,change" }
        ],
        migrateType: [
          { required: true, message: "请选择分配方式", trigger: "blur,change" }
        ],
        price: [
          { required: true, message: "请输入二维码序列号", trigger: "blur,change" }
        ],
        agentNo: [
          { required: true, message: "合伙人编号不能为空", trigger: "blur,change" }
        ],
        qrcodeStart: [
          { required: true, message: "开始号段不能为空", trigger: "blur,change" }
        ],
        qrcodeEnd: [
          { required: true, message: "结束号段不能为空", trigger: "blur,change" }
        ],
        qrcodes: [
          { required: true, message: "二维码序列号不能为空", trigger: "blur,change" }
        ]
      },
      payForm: {
        migrateCount: 0
      },
      payFormRules: {
        deviceType: [
          { required: true, message: "请选择设备类型", trigger: "blur,change" }
        ],
        migrateCount: [
          { required: true, message: "请输入转移数量", trigger: "blur,change" }
        ],
        migrateType: [
          { required: true, message: "请选择上缴方式", trigger: "blur,change" }
        ],
        qrcodeStart: [
          { required: true, message: "开始号段不能为空", trigger: "blur,change" }
        ],
        qrcodeEnd: [
          { required: true, message: "结束号段不能为空", trigger: "blur,change" }
        ],
        qrcodes: [
          { required: true, message: "请输入二维码序列号", trigger: "blur,change" }
        ]
      },
      searchCondition: searchConditionVar,
      selectOptions: {
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
            label: "授权码号段转移"
          },
          {
            value: "OUT_ORDER",
            label: "授权码序列号"
          }
        ]
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "migrateNo",
          type: "text", // 表单类型
          label: "转移单号", // 输入框前面的文字
          show: true, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.migrateNo = value;
          }
        },
        {
          corresattr: "migrateMode",
          type: "select",
          label: "转移类型",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "INPUT",
              label: "转入"
            },
            {
              value: "OUTPUT",
              label: "转出"
            }
          ],
          cb: value => {
            this.searchCondition.migrateMode = value;
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
              defaultVlue: todayStr,
              value: today_,
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "dataTimeEnd",
              lable: "结束时间",
              defaultVlue: todayStr,
              value: today_,
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
        //   value: [todayStr, todayStr],
        //   option1: "createTimeStart",
        //   option2: "createTimeEnd",
        //   cb: (startTime, endTime) => {
        //     this.searchCondition.createTimeStart = startTime;
        //     this.searchCondition.createTimeEnd = endTime;
        //   }
        // }
      ],

      // 列表数据
      actionUrl: getArantNumTransfers,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getArantNumTransfers // 初始化数据
        // },
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "创建时间",
            width: "170px",
            word: "createTime"
          },
          {
            key: "转移单号",
            width: "100px",
            word: "migrateNo"
          },
          {
            // key: "来源合伙人",
            key: "转移状态",
            width: "220px",
            word: "agentNo",
            status: true,
            type: (agentNo, row) => {
              let migrateMode = row.migrateMode;
              let moveType = "";
              let who = "";
              if (
                row.agentNo != row.operator &&
                row.otherAgentNo != row.operator
              ) {
                who = " (运营操作)";
              }
              if (migrateMode == "INPUT") {
                moveType = " <==转入" + who + " ";
                return {
                  text: agentNo + moveType + row.otherAgentNo,
                  type: ""
                };
              } else if (migrateMode == "OUTPUT") {
                moveType = " 转出" + who + "==> ";
                return {
                  text: agentNo + moveType + row.otherAgentNo,
                  type: "warning"
                };
              } else {
                moveType = migrateMode + who;
              }
            }
          },
          // {
          //   key: "目标合伙人",
          //   width: "120px",
          //   word: "otherAgentNo"
          // },
          {
            key: "操作员",
            width: "100px",
            word: "operator"
          },
          {
            key: "数量",
            width: "80px",
            word: "qrcodeCount"
          },
          // {
          //   key: "转移类型",
          //   width: "130px",
          //   word: "migrateMode",
          //   status: true,
          //   type: (data, row) => {
          //     var who = "";
          //     if (
          //       row.agentNo != row.operator &&
          //       row.otherAgentNo != row.operator
          //     ) {
          //       who = " (运营操作)";
          //     }
          //     if (data == "INPUT") {
          //       return {
          //         text: "转入" + who,
          //         type: "success"
          //       };
          //     } else if (data == "OUTPUT") {
          //       return {
          //         text: "转出" + who,
          //         type: "warning"
          //       };
          //     } else {
          //       return {
          //         text: data + who,
          //         type: ""
          //       };
          //     }
          //   }
          // },
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
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
                  type: "info"
                };
              } else if (data == "AUDITING") {
                return {
                  text: "待审核",
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
        ],
        operation: {
          width: "50px",
          options: [
            {
              text: "下载",
              visibleFn: rowdata => {
                if (rowdata.status == "SUCCESS") {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.$refs.dataTable.ExportExcel(
                  "/qrcodemigrate/download?receiptNo=" + rowdata.migrateNo,
                  "download"
                );
              }
            }
          ]
        },
        // 数据加载成功
        dataSuccess: data => { }
      }
    };
  },
  methods: {
    migrateTypeChange1(value) {
      this.allotForm.migrateCount = "";
      if (value == "ORDER") {
        //号段转移
        this.qrNumsVisible = true;
        this.qrcodesVisible = false;
        this.allotForm.qrcodes = "";
      } else if (value == "OUT_ORDER") {
        //二维码序列号
        this.qrcodesVisible = true;
        this.qrNumsVisible = false;
        this.allotForm.qrcodeStart = "";
        this.allotForm.qrcodeEnd = "";
      }
    },
    migrateTypeChange2(value) {
      this.payForm.migrateCount = "";
      if (value == "ORDER") {
        //号段转移
        this.qrNumsPayVisible = true;
        this.qrcodesPayVisible = false;
        this.payForm.qrcodes = "";
      } else if (value == "OUT_ORDER") {
        //二维码序列号
        this.qrcodesPayVisible = true;
        this.qrNumsPayVisible = false;
        this.payForm.qrcodeStart = "";
        this.payForm.qrcodeEnd = "";
      }
    },
    // 授权码分配保存
    allotSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dialogLoading = this.$loading({
            target: document
              .querySelector("#dialogLoding")
              .querySelector(".el-dialog")
          });
          postMigrateNumTransfer()({
            deviceType: thisForm.deviceType,
            migrateCount: thisForm.migrateCount,
            prefixNo: thisForm.prefixNo,
            migrateType: thisForm.migrateType,
            migrateMode: "DOWNWARD_MIGRATE",
            // this.userAll.userType == "admin"
            //   ? "OPERATOR_MIGRATE"
            //   : "DOWNWARD_MIGRATE",
            qrcodeStart: thisForm.qrcodeStart,
            qrcodeEnd: thisForm.qrcodeEnd,
            qrcodes: thisForm.qrcodes,
            agentNo: thisForm.agentNo
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，授权码分配成功!"
              });
              this.allotFormVisible = false;
              this.payFormVisible = false;
              this.reloadData(this.postPage, this.postLimit);
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
            dialogLoading.close();
          });
        }
      });
    },
    // 授权码上缴保存
    paySave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          postMigrateNumTransfer()({
            deviceType: thisForm.deviceType,
            migrateCount: thisForm.migrateCount,
            prefixNo: thisForm.prefixNo,
            migrateType: thisForm.migrateType,
            migrateMode: "UPWARD_MIGRATE",
            qrcodeStart: thisForm.qrcodeStart,
            qrcodeEnd: thisForm.qrcodeEnd,
            qrcodes: thisForm.qrcodes
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                type: "success",
                message: "恭喜您，授权码上缴成功!"
              });
              this.allotFormVisible = false;
              this.payFormVisible = false;
              this.reloadData(this.postPage, this.postLimit);
            } else {
              this.$message({
                type: "warning",
                message: data.msg
              });
            }
          });
        }
      });
    },
    allotQrcodeCheck(type) {
      if (type == "allotQrcode") {
        let qrcodes = this.allotForm.qrcodes;
        if (qrcodes) {
          let qrcodesArr = qrcodes.split(",");
          this.allotForm.migrateCount = qrcodesArr.length;
        }
      } else {
        // 号段转移
        let qrcodeEnd = this.allotForm.qrcodeEnd;
        let qrcodeStart = this.allotForm.qrcodeStart;
        if (qrcodeStart !== "" && qrcodeEnd != "") {
          let num = isNaN(parseInt(qrcodeEnd) - parseInt(qrcodeStart))
            ? ""
            : parseInt(qrcodeEnd) - parseInt(qrcodeStart);
          this.allotForm.migrateCount = num + 1;
        }
      }
    },
    payQrcodeCheck(type) {
      if (type == "payQrcode") {
        let qrcodes = this.payForm.qrcodes;
        if (qrcodes) {
          let qrcodesArr = qrcodes.split(",");
          this.payForm.migrateCount = qrcodesArr.length;
        }
      } else {
        // 号段转移
        let qrcodeEnd = this.payForm.qrcodeEnd;
        let qrcodeStart = this.payForm.qrcodeStart;
        if (qrcodeStart && qrcodeEnd) {
          let num = isNaN(parseInt(qrcodeEnd) - parseInt(qrcodeStart))
            ? ""
            : parseInt(qrcodeEnd) - parseInt(qrcodeStart);
          this.payForm.migrateCount = num + 1;
        }
      }
    },
    qrcodeBlur(ev, type) {
      if (type == "allotQrcodeStart" || type == "allotQrcodeEnd") {
        // 授权码分配开始号段
        this.allotQrcodeCheck("allotQrcodeSE");
      } else if (type == "allotQrcodes") {
        this.allotQrcodeCheck("allotQrcode");
        //授权码分配序列号
      } else if (type == "payQrcodeStart" || type == "payQrcodeEnd") {
        // 授权码上缴开始号段
        this.payQrcodeCheck("payQrcodeSE");
      } else if (type == "payQrcodes") {
        //授权码上缴序列号
        this.payQrcodeCheck("payQrcode");
      }
    }
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    },
    qr_code_reciept_audit_agent() {
      return this.$store.state.userInfoAndMenu.userMessage.all
        .qr_code_reciept_audit_agent;
    },
    qr_code_reciept_audit_admin() {
      return this.$store.state.userInfoAndMenu.userMessage.all
        .qr_code_reciept_audit_admin;
    },
    qr_code_reciept_audit_all() {
      return this.$store.state.userInfoAndMenu.userMessage.all
        .qr_code_reciept_audit_all;
    }
  },
  mounted() { }
};
</script>

