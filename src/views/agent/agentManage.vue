<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('agent_add')" class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog v-dialogDrag :modal-append-to-body="false" :append-to-body="false" center :title="addTitle" :visible.sync="addFormVisible">
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
          <!-- <el-form-item prop="agentNo" label="合伙人编号">
            <el-input v-model="addForm.agentNo"></el-input>
          </el-form-item> -->
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
        <fieldset v-if="userAll.userType=='branchOffice'?true:false">
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
            <el-select filterable prop="unionCode" v-model="addForm.unionCode" clearable placeholder="请选择">
              <el-option v-for="item in selectOptions.branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
              </el-option>
            </el-select>
          </el-form-item>
        </fieldset>
        <fieldset v-if="userAll.userType=='branchOffice'?true:false">
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
        <template v-if="userAll.userType=='branchOffice'?true:false">
          <!-- <template> -->
          <!-- 快速开票start -->
          <h2 class="title-box">合伙人成本</h2>
          <fieldset>
            <legend>快速开票
              <span class="small"></span>
            </legend>
            <el-form-item class="full-width" prop="" label="补贴">
              <el-col :span="20">
                <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                  <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <span class="unit-inline">元</span>
              </el-col>
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
          <!-- 快速开票 end -->

          <!-- 聚合支付 start -->
          <!-- <fieldset>
            <legend>聚合支付
              <span class="small"></span>
            </legend>
            <el-form-item class="full-width" prop="" label="微信">
              <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                <el-option v-for="item in settleModeOption" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="full-width" prop="" label="支付宝">
              <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                <el-option v-for="item in settleModeOption" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="full-width" prop="" label="即刷即到">
              <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                <el-option v-for="item in settleModeTypeOptions" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :disabled="addForm.settleMode=='T1'?true:false" class="full-width" label="D0手续费" prop="t0CashCostFixed" :label-width="formLabelWidth">
              <el-input v-model="addForm.t0CashCostFixed" auto-complete="off"></el-input>
            </el-form-item>
          </fieldset> -->
          <!-- 聚合支付 end -->

          <!-- 电子发票 start -->
          <!-- <fieldset>
            <legend>电子发票
              <span class="small"></span>
            </legend>
            <el-form-item label-width="210px" class="full-width" prop="" label="服务费">
              <el-col :span="20">
                <el-input v-model="addForm.intermediary"></el-input>
                <p>*服务费成本包含可免费开4000张发票，超出部分按阶梯价格计算</p>
              </el-col>
              <el-col :span="4">
                <span class="unit-inline">元／张</span>
              </el-col>
            </el-form-item>
            <el-form-item label-width="210px" class="full-width" prop="" label="4000 张／年 至 10000 张／年">
              <el-col :span="20">
                <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                  <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <span class="unit-inline">元／张</span>
              </el-col>
            </el-form-item>

            <el-form-item label-width="210px" class="full-width" prop="" label="10000 张／年 至 100000 张／年">
              <el-col :span="20">
                <el-select prop="subsidy" v-model="addForm.subsidy" clearable placeholder="请选择">
                  <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <span class="unit-inline">元／张</span>
              </el-col>
            </el-form-item>
          </fieldset> -->
          <!-- 电子发票end -->
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->

    <!-- 编辑 start -->
    <el-dialog v-dialogDrag title="编辑合伙人信息" center :visible.sync="editFormVisible">
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
                <el-input v-model="editForm.linkMan"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="固定电话">
            <el-input v-model="editForm.fixedPhone"></el-input>
          </el-form-item>
          <el-form-item class="full-width" label="经营区域">
            <el-cascader :options="optionsArea" v-model="editForm.agentArea" @change="handleChangeArea">
            </el-cascader>
          </el-form-item>
        </fieldset>

        <fieldset v-if="visibleEditBank">
          <legend>结算信息</legend>
          <span class="small"></span>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="" label="收款人">
                <el-input v-model="editForm.accountName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对公账户">
                <el-input v-model="editForm.accountNo"></el-input>
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
            <el-select filterable prop="unionCode" v-model="editForm.unionCode" clearable placeholder="请选择">
              <el-option v-for="item in selectOptions.branchBankOptions" :key="item.branchName" :label="item.branchName" :value="item.unionCode">
              </el-option>
            </el-select>
          </el-form-item>
        </fieldset>

        <fieldset v-if="visibleEditDevelop">
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
        <template v-if="visibleEditIntermediay">
          <h2 class="title-box">合伙人成本</h2>
          <fieldset>
            <legend>分润信息
              <span class="small"></span>
            </legend>
            <el-form-item class="full-width" prop="" label="补贴">
              <el-select id="subsidyEdit" ref="subsidyEdit" prop="subsidy" v-model="editForm.subsidy" clearable placeholder="请选择">
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
                  <el-select id="rebateEdit" ref="rebateEdit" prop="rebate" v-model="editForm.rebate" clearable placeholder="请选择">
                    <el-option v-for="item in subsidyOptions" :key="item.code" :label="item.name" :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </fieldset>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->

  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.title-box {
  text-align: center;
  padding-top: 20px;
  font-size: 18px;
}
.unit-inline {
  padding: 0 10px;
}
</style>
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { mixinsPc } from "@src/common/mixinsPc";
import { todayStr, yesterdayStr } from "@src/common/dateSerialize";
import { phoneNumVerify } from "@src/common/regexp";
import utils from "@src/common/utils"
// 省市区一转三格式
import { areaOrgcode } from "@src/common/orgcode";
// 所有可选银行
import { banks } from "@src/common/bank";
import settleModeAgent from "@src/data/settleModeAgent"
import {
  getAgentManages,
  postAddAgentManage,
  postEditAgentManage,
  postDeleteAgent,
  getBankList,
  postEditChange // 编辑权限
} from "@src/apis";

export default {
  name: "agent",
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
    var user = this.$store.state.userInfoAndMenu.userMessage.all;

    var hideData = !(
      user.userType === "admin" ||
      user.userType === "branchOffice" ||
      user.userType === "agent"
    );
    return {
      settleModeOption: settleModeAgent,
      visibleEditIntermediay: false, // 编辑的分润模块
      visibleEditBank: false, // 编辑的结算模块
      visibleEditDevelop: false, // 编辑信息开发模块
      settleModeTypeOptions: [
        {
          code: "T0",
          name: "开通"
        },
        {
          code: "T1",
          name: "不开通"
        }
      ],
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
        agentName: "",
        agentNo: "",
        linkMan: "",
        phoneNo: "",
        fixedPhone: "",
        province: "",
        city: "",
        orgCode: "",
        accountName: "",
        accountNo: "",
        accountType: 0,
        provinceId: "",
        cityId: "",
        bankOrgCode: "",
        bankCode: "",
        isCreateKey: "",
        intermediary: "",
        unionCode: "",
        // 编辑合伙人信息
        // agentArea: ["150000", "150400", "150404"],//合伙人省市县
        agentArea: [], //合伙人省市县
        redirectUrl: "", //合伙人地址
        subsidy: 0,
        rebate: 0
        // agentArea: [], // 必须为数组
      }, // 编辑单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      optionsArea: utils.areaPicherOptions(), //省市县数据
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
        // agentArea: ["150000", "150400", "150404"],//合伙人省市县
        // agentArea: ["130000", "130200", "130202"],
        agentName: "", // 合伙人名称
        phoneNo: "", //合伙人手机号
        agentArea: [], // 必须为数组
        bankArea: [], // 必须为数组
        frValue: "", // 合伙人分润成本
        unionCode: "", // 交易费率
        sqValue: "", // 商户授权
        dqValue: "" // 商户电票
      },
      addFormRules: {
        agentName: [
          { required: true, message: "请输入合伙人名称", trigger: "blur,change" }
        ],
        phoneNo: [
          { required: true, validator: phoneNumVerify, trigger: "blur,change" }
        ],
        agentArea: [
          { required: true, message: "请选择经营区域", trigger: "blur,change" }
        ]
      },
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少

        {
          corresattr: "agentNo",
          type: "text",
          label: "合伙人编号",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "agentName",
          type: "text",
          label: "合伙人名称",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          cb: value => {
            this.searchCondition.agentName = value;
          }
        },

        {
          corresattr: "level", // 只有运营显示
          visible: !this.$store.state.userInfoAndMenu.isAdmin ? "TRUE" : "FALSE",
          type: "select",
          label: "级别",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "0",
              label: "分公司"
            },
            {
              value: "1",
              label: "一级合伙人"
            },
            {
              value: "2",
              label: "二级合伙人"
            },
            {
              value: "3",
              label: "三级合伙人"
            }
          ],
          cb: value => {
            this.searchCondition.level = value;
          }
        },
        {
          corresattr: "level", // 非运营显示
          visible: this.$store.state.userInfoAndMenu.isAdmin ? "TRUE" : "FALSE",
          type: "select",
          label: "级别",
          show: true, // 普通搜索显示
          defaultVlue: "",
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "1",
              label: "本级合伙人"
            },
            {
              value: "2",
              label: "下级合伙人"
            }
          ],
          cb: value => {
            this.searchCondition.level = value;
          }
        },
        {
          corresattr: "phoneNo",
          type: "text", // 表单类型
          label: "手机号", // 输入框前面的文字
          show: false, // 普通搜索显示
          defaultVlue: "", // 表单默认的内容
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.phoneNo = value;
          }
        }
      ],
      // 列表数据
      actionUrl: getAgentManages,
      postSearch: searchConditionVar,
      tableData: {
        // getDataUrl: {
        //   url: getAgentManages // 初始化数据
        // },
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
            width: "100px",
            word: "phoneNo"
          },
          {
            key: "层级详情",
            width: "130px",
            word: "levelDetail",
            hidden: hideData // 显示条件
          },
          {
            key: "状态",
            width: "100px",
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
          width: "70px",
          options: [
            // 操作按钮
            {
              text: "编辑",
              color: "#e6a23c",
              cb: rowdata => {
                this.editFormVisible = true;
                if (rowdata.level == "1") {
                  this.visibleEditBank = true;
                  this.visibleEditIntermediay = true;
                  this.visibleEditDevelop = true;
                } else {
                  this.visibleEditBank = false;
                  this.visibleEditIntermediay = false;
                  this.visibleEditDevelop = false;
                }
                let newRow = utils.pickObj(rowdata, [
                  "agentName", 'agentNo', 'linkMan', 'phoneNo', 'fixedPhone', "redirectUrl", 'orgCode',
                ]);
                this.editForm = {
                  ...newRow,
                  ...{ agentArea: areaOrgcode(rowdata.orgCode) }
                }
                postEditChange()({
                  agentNo: rowdata.agentNo
                }).then(res => {
                  if (res.code == "00") {
                    if (rowdata.level == "1") {
                      let row_s = res.data;
                      let newRow_s = utils.pickObj(row_s, ["rebate", 'subsidy', 'isCreateKey', 'intermediary', "accountName", "accountNo", "accountType"]);
                      this.selectOptions.branchBankOptions = row_s.bankList || [];
                      this.editForm = {
                        ...this.editForm,
                        ...this.branchBankChange(row_s.branchBank),
                        ...newRow_s
                      }
                    }
                  }
                });
              }
            }
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
    handleChangeArea() {
    },
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
    getBankListHandle(back) {
      // 获取支行
      this.addForm.unionCode = "";
      this.editForm.unionCode = "";
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
    // 将后台有关银行的数据转换成前端需要的数据
    branchBankChange(branchBank) {
      let obj = {};
      if (branchBank) {
        this.bankCode = branchBank.bankCode || "";
        this.bankCity = branchBank.cityId || "";
        obj.unionCode = branchBank.unionCode || "";
        obj.bankCode = branchBank.bankCode || "";
        obj.bankArea = [branchBank.provinceId, branchBank.cityId];
      }
      return obj;
    },
    // 将表单里面的区域转化成需要往后台传送的数据
    changeAgentArea(agentArea) {
      let obj = {};
      if (agentArea) {
        obj.province = agentArea[0] ? agentArea[0] : "";
        obj.city = agentArea[1] || agentArea[0] || "";
        obj.orgCode =
          agentArea[2] ||
          agentArea[1] ||
          agentArea[0] ||
          "";
      }
      return obj
    },
    // 将表单里面的银行区域转化成需要往后台传送的数据
    changeBankArea(bankArea) {
      let obj = {};
      if (bankArea) {
        obj.provinceId = bankArea[0] || "";
        obj.cityId = bankArea[1] || bankArea[0] || "";
        obj.bankOrgCode = bankArea[2] || bankArea[1] || bankArea[0] || ""
      }
      return obj
    },
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {

          let sendata = {
            ...this.addForm,
            ...this.changeAgentArea(this.addForm.agentArea),
            ...this.changeBankArea(this.addForm.bankArea)
          };
          this.saveLoading = true;
          postAddAgentManage()(sendata).then(data => {
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
                message: data.msg,
                type: "warning",
                center: true
              });
            }
            this.saveLoading = false;
          });
        }
      });
    },

    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          let sendata = {
            ...this.editForm,
            ...this.changeAgentArea(this.editForm.agentArea),
            ...this.changeBankArea(this.editForm.bankArea)
          };
          postEditAgentManage()(sendata).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，修改数据成功",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
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
  watch: {
    editFormVisible(value) {
      if (!value) {
        this.saveLoading = false;
      }
    }
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    },
    // 新增输入框标题
    addTitle() {
      let user = this.$store.state.userInfoAndMenu.userMessage.all;
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

