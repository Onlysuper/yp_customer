<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('agent_add')" class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog :modal-append-to-body="false" :append-to-body="false" center :title="addTitle" :visible.sync="addFormVisible">
      <el-form class="fieldset-box" size="small" ref="addForm" :model="addForm" :rules="addFormRules" label-width="100px">
        <fieldset>
          <legend>基本信息</legend>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item prop="agentName" label="合伙人名称">
                  <el-input v-model="addForm.agentName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="phoneNo" label="手机号">
                  <el-input prop="phoneNo" v-model="addForm.phoneNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item prop="linkMan" label="联系人">
                  <el-input prop="linkMan" v-model="addForm.linkMan"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="fixedPhone" label="固定电话">
                  <el-input prop="fixedPhone" v-model="addForm.fixedPhone"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item class="full-width" prop="agentArea" label="经营区域">
            <el-cascader :options="optionsArea" v-model="addForm.agentArea" @change="handleChangeArea">
            </el-cascader>
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>结算信息</legend>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item prop="accountNo" label="对公账户">
                  <el-input v-model="addForm.accountNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item prop="accountName" label="收款人">
                  <el-input v-model="addForm.accountName"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-form-item class="full-width" prop="bankagentArea" label="银行地区">
            <el-cascader :options="optionsArea" v-model="addForm.bankArea" @change="bankhandleChangeArea">
            </el-cascader>
          </el-form-item>
          <el-form-item class="full-width" prop="bankCode" label="所属银行">
            <el-select prop="bankCode" v-model="addForm.bankCode" clearable placeholder="请选择" @input="banksChange">
              <el-option v-for="item in bankOptions" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="full-width" prop="unionCode" label="选择支行">
            <el-select prop="unionCode" v-model="addForm.unionCode" clearable placeholder="请选择">
              <el-option v-for="item in selectOptions.branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
              </el-option>
            </el-select>
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>开发信息
            <span class="small">（开发能力的第三方合伙人入网的必填选项，无需开发合伙人不填）</span>
          </legend>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item prop="redirectUrl" label="回调地址">
                  <el-input v-model="addForm.redirectUrl"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="150px" prop="isCreateKey" label="是否创建accesskey">
                <el-switch active-value="TRUE" inactive-value="FALSE" v-model="addForm.isCreateKey">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-if="userAll=='branchOffice'?true:false">
          <legend>分润信息
            <span class="small"></span>
          </legend>
          <el-form-item class="full-width" prop="" label="补贴">
            <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
              <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item class="full-width" prop="" label="中间人">
                  <el-input v-model="addForm.intermediary"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item class="full-width" prop="" label="中间人分润">
                <el-select prop="rebate" v-model="addForm.rebate" clearable placeholder="请选择">
                  <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑 start -->
    <el-dialog title="编辑合伙人信息" center :visible.sync="editFormVisible">
      <el-form class="fieldset-box" size="small" :model="editForm" ref="editForm" :rules="addFormRules" label-width="90px">
        <fieldset>
          <legend>基本信息</legend>
          <span class="small"></span>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="" label="合伙人名称">
                <el-input :disabled="true" v-model="editForm.agentName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合伙人编号">
                <el-input :disabled="true" v-model="editForm.agentNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input :disabled="true" v-model="editForm.phoneNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input :disabled="true" v-model="editForm.linkMan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="固定电话">
            <el-input :disabled="true" v-model="editForm.fixedPhone"></el-input>
          </el-form-item>
          <el-form-item class="full-width" label="经营区域">
            <el-cascader :options="optionsArea" v-model="editForm.agentArea" @change="handleChangeArea">
            </el-cascader>
          </el-form-item>
        </fieldset>

        <fieldset>
          <legend>结算信息</legend>
          <span class="small"></span>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="" label="收款人">
                <el-input :disabled="true" v-model="editForm.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对公账户">
                <el-input :disabled="true" v-model="editForm.accountNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="full-width" prop="bankagentArea" label="银行地区">
            <el-cascader :options="optionsArea" v-model="editForm.bankArea" @change="bankhandleChangeArea">
            </el-cascader>
          </el-form-item>
          <el-form-item class="full-width" prop="bankCode" label="所属银行">
            <el-select prop="bankCode" v-model="editForm.bankCode" clearable placeholder="请选择" @input="banksChange">
              <el-option v-for="item in bankOptions" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="full-width" prop="unionCode" label="选择支行">
            <el-select prop="unionCode" v-model="editForm.unionCode" clearable placeholder="请选择">
              <el-option v-for="item in selectOptions.branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
              </el-option>
            </el-select>
          </el-form-item>
        </fieldset>

        <fieldset>
          <legend>开发信息
            <span class="small">（开发能力的第三方合伙人入网的必填选项，无需开发合伙人不填）</span>
          </legend>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item prop="redirectUrl" label="回调地址">
                  <el-input v-model="editForm.redirectUrl"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="150px" prop="isCreateKey" label="是否创建accesskey">
                <el-switch active-value="TRUE" inactive-value="FALSE" v-model="editForm.isCreateKey">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <fieldset v-if="visibleEditIntermediay">
          <legend>分润信息
            <span class="small"></span>
          </legend>
          <el-form-item class="full-width" prop="" label="补贴">
            <el-select prop="subsidy" v-model="editForm.subsidy" clearable placeholder="请选择">
              <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item class="full-width" prop="" label="中间人">
                  <el-input v-model="editForm.intermediary"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item class="full-width" prop="" label="中间人分润">
                <el-select prop="rebate" v-model="editForm.rebate" clearable placeholder="请选择">
                  <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </fieldset>
        <!-- 
       
        
       
        <el-form-item label="回调地址">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editForm.redirectUrl">
          </el-input>
          <p class="tip-text">回调地址是用来通知代理商一些有用信息的接口，无开发能力代理商可不填</p>
        </el-form-item> -->
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

</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import { regionData } from "element-china-area-data";
import { phoneNumVerify } from "@src/common/regexp";
// 省市区一转三格式
import { areaOrgcode } from "@src/common/orgcode";
// 所有可选银行
import { banks } from "@src/common/bank";
import {
  getAgentManages,
  postAddAgentManage,
  postEditAgentManage,
  postDeleteAgent,
  getBankList,
  postEditChange // 编辑权限
} from "@src/apis";

export default {
  name: "agentManage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    var searchConditionVar = {
      phoneNo: "", // 手机号
      agentNo: "", // 合伙人编号
      agentName: "" // 合伙人名称
    };
    return {
      visibleEditIntermediay: false, // 编辑的分润模块
      subsidyOptions: [
        {
          name: "0",
          code: "0"
        },
        {
          name: "20",
          code: "20"
        },
        {
          name: "30",
          code: "30"
        },
        {
          name: "50",
          code: "50"
        },
        {
          name: "60",
          code: "60"
        },
        {
          name: "70",
          code: "70"
        },
        {
          name: "80",
          code: "80"
        },
        {
          name: "100",
          code: "100"
        }
      ],
      addFormVisible: false, // 新增框
      fixedinput: false, // 固定成本
      editFormVisible: false, // 编辑框
      bankCity: "",
      bankCode: "",
      formLabelWidth: "200px",
      editFormRules: {}, // 编辑单个规则
      editForm: {
        // 编辑合伙人信息
        agentName: "", // 合伙人名称
        agentNo: "", // 合伙人编号
        phoneNo: "",
        // agentArea: ["150000", "150400", "150404"],//合伙人省市县
        agentArea: [], //合伙人省市县
        redirectUrl: "" //合伙人地址
        // agentArea: [], // 必须为数组
      }, // 编辑单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      optionsArea: regionData, //省市县插件
      selectOptions: {
        branchBankOptions: [], // 支行
        isCreateKeyOptions: [
          {
            value: "TRUE",
            label: "是"
          },
          {
            value: "FALSE",
            label: "否"
          }
        ]
      },
      addForm: {
        // 新增合伙人信息
        agentName: "", // 合伙人名称
        phoneNo: "", //合伙人手机号
        // agentArea: ["150000", "150400", "150404"],//合伙人省市县
        // agentArea: ["130000", "130200", "130202"],
        agentArea: [], // 必须为数组
        bankArea: [], // 必须为数组
        frValue: "", // 合伙人分润成本
        unionCode: "", // 交易费率
        sqValue: "", // 商户授权
        dqValue: "" // 商户电票
      },
      addFormRules: {
        agentName: [
          { required: true, message: "请输入合伙人名称", trigger: "blur" }
        ],
        phoneNo: [
          { required: true, validator: phoneNumVerify, trigger: "blur" }
        ],
        agentArea: [
          { required: true, message: "请选择经营区域", trigger: "blur" }
        ]
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "phoneNo",
          type: "text", // 表单类型
          label: "手机号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.phoneNo = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text",
          label: "合伙人编号",
          show: true, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "agentName",
          type: "text",
          label: "合伙人名称",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.agentName = value;
          }
        }
      ],
      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getAgentManages // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "合伙人名称",
            width: "100px",
            word: "agentName"
          },
          {
            key: "手机号",
            width: "150px",
            word: "phoneNo"
          },
          {
            key: "层级详情",
            width: "150px",
            word: "levelDetail"
          },
          {
            key: "状态",
            width: "",
            word: "status",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "开启",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "未开启",
                  type: "info"
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
              color: "#e6a23c",
              visibleFn: rowdata => {
                if (this.adminOperationAll.agent_edit == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                console.log(rowdata);
                this.editForm = rowdata;
                this.editForm.agentArea = areaOrgcode(rowdata.orgCode);
                this.editFormVisible = true;
                postEditChange()({
                  agentNo: rowdata.agentNo
                }).then(data => {
                  if (data == "00") {
                    console.log(data);
                    this.editForm.intermediary = data.intermediary;
                    this.editForm.rebate = parseInt(data.rebate);
                    this.editForm.subsidy = parseInt(data.subsidy);
                    //结算卡信息
                    this.editForm.accountName = data.accountName;
                    this.editForm.accountNo = data.accountNo;
                    this.editForm.accountType = data.accountType;
                    this.editForm.unionCode = data.unionCode;
                  }
                });
                if (rowdata == "1") {
                  this.visibleEditIntermediay = true;
                } else {
                  this.visibleEditIntermediay = false;
                }
                if (rowdata.bankArea && rowdata.bankArea.some(r => r)) {
                  this.editForm.bankArea = rowdata.bankArea.map(r => r);
                  console.log(this.editForm.bankArea);
                }
              }
            }
            // {
            // text: "删除",
            // color: "#f56c6c",
            // visibleFn: rowdata => {
            //   if (this.adminOperationAll.agent_delete == "TRUE") {
            //     return true;
            //   } else {
            //     return false;
            //   }
            // }
            // 以下功能已作废
            // cb: rowdata => {
            //   console.log(rowdata.agentNo);
            //   this.$confirm("该操作将启用该产品，确定继续吗?", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning"
            //   })
            //     .then(() => {
            //       postDeleteAgent()({
            //         agentNo: rowdata.agentNo
            //       }).then(data => {
            //         if (data == "00") {
            //           this.$message({
            //             message: "删除成功！",
            //             type: "success",
            //             center: true
            //           });
            //           this.reloadData();
            //         }
            //       });
            //     })
            //     .catch(() => {
            //       this.$message({
            //         type: "info",
            //         message: "已取消操作"
            //       });
            //     });
            // }
            // }
          ]
        }
      }
    };
  },

  methods: {
    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    handleChangeArea() {},
    bankhandleChangeArea(value) {
      console.log(value);
      //选择银行区域
      this.bankCity = value[2] || value[1] || value[0];
      this.getBankListHandle();
    },
    banksChange(value) {
      // 选择所属银行
      this.bankCode = value;
      this.getBankListHandle();
    },
    getBankListHandle() {
      // 获取支行
      console.log("bankCode:" + this.bankCode + "bankCity:" + this.bankCity);
      this.addForm.unionCode = "";
      if (this.bankCode && this.bankCity) {
        // 获取支行列表数据
        getBankList()({
          bankCode: this.bankCode,
          cityId: this.bankCity
        }).then(data => {
          this.selectOptions.branchBankOptions = data.data;
        });
      }
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          var addForm = this.addForm;
          this.resetSearchHandle();
          postAddAgentManage()({
            agentName: addForm.agentName || "",
            linkMan: addForm.linkMan || "",
            phoneNo: addForm.phoneNo || "",
            fixedPhone: addForm.fixedPhone || "",
            province: addForm.agentArea[0] || "",
            city: addForm.agentArea[1] || addForm.agentArea[0] || "",
            orgCode:
              addForm.agentArea[2] ||
              addForm.agentArea[1] ||
              addForm.agentArea[0] ||
              "",
            accountName: addForm.accountName || "",
            accountNo: addForm.accountNo || "",
            accountType: addForm.accountType || 0,
            provinceId: addForm.bankArea[0] || "",
            cityId: addForm.bankArea[1] || addForm.bankArea[0] || "",
            bankOrgCode:
              addForm.bankArea[2] ||
              addForm.bankArea[1] ||
              addForm.bankArea[0] ||
              "",
            bankCode: addForm.bankCode || "",
            unionCode: addForm.unionCode || "",
            isCreateKey: addForm.isCreateKey || "",
            redirectUrl: addForm.redirectUrl || "",
            subsidy: addForm.subsidy || "",
            intermediary: addForm.intermediary || "",
            rebate: addForm.rebate || ""
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
              console.log(data);
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            console.log(data);
          });
        }
      });
    },

    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          var editForm = this.editForm;
          postEditAgentManage()({
            agentName: editForm.agentName || "",
            agentNo: editForm.agentNo || "",
            phoneNo: editForm.phoneNo || "",
            province: editForm.agentArea[0] || "",
            city: editForm.agentArea[1] || "",
            orgCode:
              editForm.agentArea[2] ||
              editForm.agentArea[1] ||
              editForm.agentArea[0] ||
              "",
            redirectUrl: editForm.redirectUrl || "",
            subsidy: editForm.subsidy || "",
            intermediary: editForm.intermediary || "",
            rebate: editForm.rebate || ""
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.reloadData(this.storePageCount, this.storeCurrentPage);
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.msg,
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
    userAll() {
      // 所有的用户信息
      return this.$store.state.moduleLayour.userMessage.all;
    },
    // 新增输入框标题
    addTitle() {
      let user = this.$store.state.moduleLayour.userMessage.all;
      if (user.userType == "admin") {
        return "新增分公司";
      } else if (user.userType == "branchOffice") {
        return "新增一级合伙人";
      } else {
        return "新增合伙人";
      }
    },
    bankOptions() {
      return banks;
    }
  }
};
</script>

