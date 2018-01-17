<template>
  <!-- 开票统计 -->
  <div class="admin-page empower">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @resetSome="resetSomeInputHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button size="small" @click="showDialog('empoverCodeFormVisible')" type="primary" icon="el-icon-tickets">生成授权码</el-button>
          <el-button size="small" @click="showDialog('addMaterielFormVisible')" type="primary" icon="el-icon-sort-down">物料入库</el-button>
          <el-button size="small" @click="showDialog('exportEmpowerCodeVisible')" type="primary" icon="el-icon-sort-up">导出</el-button>
          <el-button size="small" @click="showDialog('batchBindVisible')" type="primary" icon="el-icon-sort">批量绑定</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 生成授权码start -->
    <el-dialog center title="生成授权码" :visible.sync="empoverCodeFormVisible">
      <el-form size="small" :model="empoverCodeForm" ref="empoverCodeForm" :rules="empoverCodeRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="合伙人编号" prop="agentNo" :label-width="formLabelWidth">
                <el-input v-model="empoverCodeForm.agentNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="数量" prop="qrcodeCount" :label-width="formLabelWidth">
                <el-input v-model="empoverCodeForm.qrcodeCount" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item label="服务方式" prop="serviceMode" :label-width="formLabelWidth">
          <el-radio v-model="empoverCodeForm.serviceMode" label="HX">航信</el-radio>
          <el-radio v-model="empoverCodeForm.serviceMode" label="YP">易票</el-radio>
          <el-radio v-model="empoverCodeForm.serviceMode" label="HX_YP">航信_易票</el-radio>
        </el-form-item>
        <el-form-item label="支持类型" prop="supportTypes" :label-width="formLabelWidth">
          <el-checkbox-group v-model="empoverCodeForm.supportTypes">
            <el-checkbox v-for="city in empoverCodeForm.supportTypesArr" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('empoverCodeForm')">重置</el-button>
        <el-button type="primary" @click="empoverCodeSave('empoverCodeForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 生成授权码end -->
    <!-- 物料入库start -->
    <el-dialog center title="物料入库" :visible.sync="addMaterielFormVisible">
      <el-form size="small" :model="addMaterielForm" ref="addMaterielForm" :rules="addMaterielRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="入库类型" prop="deviceType" :label-width="formLabelWidth">
                <el-select v-model="addMaterielForm.deviceType" placeholder="请选择" @change="migrateChagen">
                  <el-option v-for="item in selectOptions.deviceType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="入库数量" prop="receiptCount" :label-width="formLabelWidth">
                <el-input v-model="addMaterielForm.receiptCount" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="入库方式" prop="migrateType" :label-width="formLabelWidth">
                <el-select v-model="addMaterielForm.migrateType" placeholder="请选择" @change="migrateChagen">
                  <el-option v-for="item in selectOptions.addMaterielOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="序列号前缀" prop="prefixNo" :label-width="formLabelWidth">
                <el-input v-model="addMaterielForm.prefixNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item v-if="visibleQrcodes" label="二维码编号" prop="qrcodes" :label-width="formLabelWidth">
          <el-input v-model="addMaterielForm.qrcodes" auto-complete="off" placeholder="多个二维码请用英文逗号分隔"></el-input>
        </el-form-item>
        <el-form-item v-if="visibleQrNums" label="号段" prop="" :label-width="formLabelWidth">
          <el-input-number v-model="addMaterielForm.qrcodeStart" controls-position="right"></el-input-number>
          -
          <el-input-number v-model="addMaterielForm.qrcodeEnd" controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addMaterielForm')">重置</el-button>
        <!-- <el-button type="primary" @click="addMaterielSave('addMaterielForm')">扫码枪入库</el-button> -->
        <el-button type="primary" @click="addTorageMaterielSave('addMaterielForm')">入库</el-button>
      </div>
    </el-dialog>
    <!-- 生成授权码end -->
    <!-- 导出start -->
    <el-dialog center title="导出授权码" :visible.sync="exportEmpowerCodeVisible">
      <el-form size="small" :model="exportEmpowerCodeForm" ref="exportEmpowerCodeForm" :rules="exportEmpowerCodeRules">
        <el-form-item class="full-width" label="选择样式" prop="styleType" :label-width="formLabelWidth">
          <el-select v-model="exportEmpowerCodeForm.styleType" placeholder="请选择">
            <el-option v-for="item in selectOptions.exportEmpowerCodeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('exportEmpowerCodeForm')">重置</el-button>
        <el-button type="primary" @click="exportEmpowerSave('exportEmpowerCodeForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 导出end -->
    <!-- 批量绑定start -->
    <el-dialog center title="批量绑定" :visible.sync="batchBindVisible">
      <form>
        <div class="content-center-box">
          <div class="sep-inline">
            <a class="link-Label" :href="oaIp+'/static/template/qrcode-batch-bind.xlsx'">下载绑定模板</a>
          </div>
          <div class="sep-inline">
            <el-upload :with-credentials="true" class="upload-demo" ref="batchBindFile" :before-upload="beforeBindBatchUpload" :on-success="batchBindUploadSuccess" :on-error="uploadFilleError" :action="oaIp+'/qrcode/bindBatchQrCode'" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" accept="file" drag>
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
        <el-button type="primary" @click="batchBindSave">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 批量绑定end -->
    <!-- 预览 start -->
    <el-dialog ref="qrcodebox" center title="预览" :visible.sync="detailVisible" width="300px">
      <el-row id="qrcodeboxchild" ref="qrcodeboxchild" class="qrcodeboxchild">
      </el-row>
    </el-dialog>
    <!-- 预览end -->
    <!-- 编辑 start -->
    <el-dialog center title="修改信息" :visible.sync="editFormVisible">
      <el-form size="small" :model="editForm" ref="editForm" :rules="editFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="序列号" prop="qrcode" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.qrcode" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="授权码" prop="authCode" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.authCode" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="合伙人编号" prop="agentNo" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.agentNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input :disabled="true" v-model="editForm.customerNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item label="分机号" prop="extensionNum" :label-width="formLabelWidth">
          <el-input v-model="editForm.extensionNum" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="服务方式" prop="serviceMode" :label-width="formLabelWidth">
          <el-radio v-model="editForm.serviceMode" label="HX">航信</el-radio>
          <el-radio v-model="editForm.serviceMode" label="YP">易票</el-radio>
          <el-radio v-model="editForm.serviceMode" label="HX_YP">航信_易票</el-radio>
        </el-form-item>
        <el-form-item label="支持类型" prop="supportTypes" :label-width="formLabelWidth">
          <el-checkbox-group v-model="editForm.supportTypes">
            <el-checkbox ref="editFormP" @change="nomalCheck" label="普票"></el-checkbox>
            <el-checkbox ref="editFormZ" label="专票"></el-checkbox>
            <el-checkbox ref="editFormT" @change="specialCheck" label="特殊"></el-checkbox>
            <!-- <el-checkbox v-for="city in editForm.supportTypesArr" :label="city.value" :key="'index'+city.value">{{city.value}}</el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.editFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="editSave('editForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 绑定 start -->
    <el-dialog center title="修改信息" :visible.sync="bindFormVisible">
      <el-form size="small" :model="bindForm" ref="bindForm" :rules="bindFormRules">
        <el-form-item label="二维码编号" prop="qrcode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="bindForm.qrcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="授权码" prop="authCode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="bindForm.authCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="合伙人编号" prop="agentNo" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="bindForm.agentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="bindForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('bindForm')">重置</el-button>
        <el-button type="primary" @click="bindFormSave('bindForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 绑定end -->
    <!-- 绑定子码 start -->
    <el-dialog center title="绑定子码" :visible.sync="bindChildFormVisible">
      <el-form size="small" :model="bindChildForm" ref="bindChildForm" :rules="bindChildFormRules">
        <el-form-item label="二维码编号" prop="qrcode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="bindChildForm.qrcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="子码编号" prop="childQrcodes" :label-width="formLabelWidth">
          <el-input v-model="bindChildForm.childQrcodes" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('bindForm')">重置</el-button>
        <el-button type="primary" @click="bindChildFormSave('bindChildForm')">确定</el-button>
      </div>
    </el-dialog>
    <!-- 绑定end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.empower {
  .operation-box {
    .sumtext {
      font-size: 14px;
      padding-left: 10px;
      line-height: 32px;
      color: #606266;
    }
  }
  .qrcodeboxchild {
    text-align: center;
  }
}
</style>
<script>
import $ from "jquery";
import QRCode from "qrcode";
import qs from "qs";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";

// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, yesterday } from "@src/common/dateSerialize";
import {
  getArantNumManages,
  postMakeEmpower,
  postScanMakeMateriel,
  postMakeMateriel,
  postEditEmpower,
  postBindEmpower,
  postUnBindEmpower,
  postBindChildEmpower,
  postMakeTorageEmpower
} from "@src/apis";

export default {
  name: "billCount",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable],
  data() {
    var searchConditionVar = {
      createTimeStart: yesterday, // 开始日期
      createTimeEnd: todayDate, // 结束日期
      batchNo: "", // 批次编号
      agentNo: "", // 合伙人编号
      containChild: "", // 下级
      customerNo: "", // 商户编号
      qrcode: "", // 序号
      authCode: "", // 授权码
      status: "", // 状态
      deviceType: "", // 设备类型
      materiel: "" // 是否有物料
    };
    return {
      deviceType: "AUTHCODE",
      formLabelWidth: "100px",
      qrcodeUrl: "",
      empoverCodeFormVisible: false, // 生成授权吗弹出框
      addMaterielFormVisible: false, // 物料入库
      visibleQrcodes: false, // 入库方式
      detailVisible: false, // 预览
      editFormVisible: false, // 编辑
      visibleQrNums: true,
      exportEmpowerCodeVisible: false, // 导出授权码
      batchBindVisible: false, // 批量绑定
      bindFormVisible: false, //绑定
      bindChildFormVisible: false, // 绑定子码
      bindChildForm: {
        authCode: "",
        qrcode: "",
        childQrcodes: ""
      },
      bindChildFormRules: {
        childQrcodes: [{ required: true, message: "请输入子码编号", trigger: "blur" }]
      },
      bindForm: {
        qrcode: "",
        authCode: "",
        agentNo: "",
        customerNo: ""
      },
      bindFormRules: {
        customerNo: [{ required: true, message: "请输入合伙人编号", trigger: "blur" }]
      },
      fileList: [],
      exportEmpowerCodeForm: {
        styleType: ""
      },
      exportEmpowerCodeRules: {
        styleType: [{ required: true, message: "请先选择模版样式", trigger: "blur" }]
      },

      empoverCodeForm: {
        serviceMode: "HX",
        supportTypes: ["普票", "专票"],
        supportTypesArr: ["普票", "专票", "特殊"]
      },
      empoverCodeRules: {
        agentNo: [{ required: true, message: "请输入合伙人编号", trigger: "blur" }],
        qrcodeCount: [{ required: true, message: "批次数量不能为空", trigger: "blur" }]
      },
      editForm: {
        serviceMode: "HX",
        supportTypes: ["普票", "专票"],
        supportTypesArr: ["普票", "专票", "特殊"]
      },
      editFormRules: {
        extensionNum: [{ required: true, message: "分机号不能为空", trigger: "blur" }],
        supportTypes: [{ required: true, message: "请选择支持类型", trigger: "blur" }]
      },
      addMaterielForm: {},
      addMaterielRules: {
        deviceType: [{ required: true, message: "入库类型不能为空", trigger: "blur" }],
        qrcodeStart: [
          { required: true, message: "号段起始号码不能为空", trigger: "blur" }
        ],
        qrcodeStart: [
          { required: true, message: "号段起始号码不能为空", trigger: "blur" }
        ],
        migrateType: [{ required: true, message: "请选择入库方式", trigger: "blur" }],
        receiptCount: [{ required: true, message: "请输入入库数量", trigger: "blur" }]
      },
      // formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      selectOptions: {
        deviceType: [
          {
            value: "MATERIEL",
            label: "物料"
          },
          {
            value: "SCANCODEGUN",
            label: "扫码枪"
          },
          {
            value: "POS",
            label: "POS"
          }
        ],
        addMaterielOptions: [
          {
            value: "ORDER",
            label: "号段入库"
          },
          {
            value: "OUT_ORDER",
            label: "序号入库"
          }
        ],
        exportEmpowerCodeOptions: [
          {
            value: "6",
            label: "带样式模式（带背景 , 带logo ,带序列号）"
          },
          {
            value: "0",
            label: "纯黑白模式（不带背景,不带logo,不带序列号）"
          },
          {
            value: "1",
            label: "纯黑白模式（不带背景,不带logo,带序列号）"
          },
          {
            value: "2",
            label: "纯黑白模式（不带背景, 带logo,不带序列号）"
          },
          {
            value: "3",
            label: "纯黑白模式（不带背景, 带logo,带序列号）"
          },
          {
            value: "4",
            label: "带样式模式（不带背景, 带logo,带序列号）"
          },
          {
            value: "5",
            label: "带样式模式（不带背景, 带logo,不带序列号)"
          }
        ]
      },
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "batchNo",
          type: "text", // 表单类型
          label: "批次编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.batchNo = value;
          }
        },
        {
          type: "dateGroup2",
          label: "选择日期",
          limit: false, //日期联动
          limitnum: 7,
          show: true, // 普通搜索显示
          value: [yesterday, todayDate],
          option1: "createTimeStart",
          option2: "createTimeEnd",
          cb: (startTime, endTime) => {
            this.searchCondition.createTimeStart = startTime;
            this.searchCondition.createTimeEnd = endTime;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "合伙人编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "customerNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.customerNo = value;
          }
        },
        {
          corresattr: "qrcode",
          type: "text", // 表单类型
          label: "序号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.qrcode = value;
          }
        },
        {
          corresattr: "authCode",
          type: "text", // 表单类型
          label: "授权码", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.authCode = value;
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
              value: "BINDED",
              label: "已绑定"
            },
            {
              value: "TRUE",
              label: "未绑定"
            },
            {
              value: "FALSE",
              label: "无效"
            }
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "deviceType",
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
            this.searchCondition.deviceType = value;
          }
        },
        {
          corresattr: "materiel",
          type: "select",
          label: "是否有物料",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "TRUE",
              label: "有物料"
            },
            {
              value: "FALSE",
              label: "无物料"
            }
          ],
          cb: value => {
            this.searchCondition.materiel = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getArantNumManages // 初始化数据api
        },
        havecheck: true, //是否显示输入框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "批次号",
            width: "120px",
            // sortable: true,
            word: "batchNo"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "商户编号",
            width: "100px",
            word: "customerNo"
          },
          {
            key: "序列号",
            width: "100px",
            word: "qrcode"
          },
          {
            key: "授权码",
            width: "100px",
            word: "authCode"
          },
          {
            key: "创建时间",
            width: "100px",
            word: "createTime"
          },
          {
            key: "设备类型",
            width: "100px",
            word: "deviceType",
            status: true,
            type: data => {
              if (data == "AUTHCODE") {
                return {
                  text: "授权码",
                  type: ""
                };
              } else if (data == "SCANCODEGUN") {
                return {
                  text: "扫码枪",
                  type: ""
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
            key: "状态",
            width: "100px",
            word: "status",
            status: true,
            type: data => {
              if (data == "BINDED") {
                return {
                  text: "已绑定",
                  type: "success"
                };
              } else if (data == "TRUE") {
                return {
                  text: "未绑定",
                  type: "warning"
                };
              } else if (data == "FALSE") {
                return {
                  text: "无效",
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
            key: "是否有物料",
            width: "100px",
            word: "materiel",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "有物料",
                  type: "success"
                };
              } else if (data == "FALSE") {
                return {
                  text: "无物料",
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
            key: "上级授权码",
            width: "130px",
            word: "parentCode"
          }
        ],
        operation: {
          width: "180px",
          options: [
            // 操作按钮
            {
              text: "预览",
              visibleFn: rowdata => {
                if (rowdata.deviceType == "AUTHCODE") {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                let url_ = this.qrcodeUrl + rowdata.authCode;
                this.detailVisible = true;
                this.$nextTick(function() {
                  // DOM 现在更新了
                  // `this` 绑定到当前实例
                  this._getQart(url_);
                });
              }
            },
            {
              text: "编辑",
              visibleFn: rowdata => {
                if (rowdata.deviceType == "AUTHCODE") {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#e6a23c",
              cb: rowdata => {
                var thisForm = this.editForm;
                if (rowdata.supportType == "1") {
                  thisForm.supportTypes = ["普票"];
                } else if (rowdata.supportType == "2") {
                  thisForm.supportTypes = ["专票"];
                } else if (rowdata.supportType == "3") {
                  thisForm.supportTypes = ["普票", "专票"];
                } else if (rowdata.supportType == "5") {
                  thisForm.supportTypes = ["普票", "特殊"];
                } else if (rowdata.supportType == "7") {
                  thisForm.supportTypes = ["普票", "专票", "特殊"];
                }
                thisForm.qrcode = rowdata.qrcode;
                thisForm.authCode = rowdata.authCode;
                thisForm.agentNo = rowdata.agentNo;
                thisForm.customerNo = rowdata.customerNo;
                thisForm.extensionNum = rowdata.extensionNum;
                thisForm.serviceMode = rowdata.serviceMode;
                console.log(rowdata.supportType);
                this.editFormVisible = true;
              }
            },
            {
              stateName: "status",
              opposite: true,
              text: "绑定",
              color: "#67c23a",
              visibleFn: rowdata => {
                if (
                  rowdata.deviceType == "AUTHCODE" &&
                  rowdata.status == "TRUE" &&
                  (rowdata.agentNo == this.userBussinessNo ||
                    this.userType == "admin")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                // this.bindForm = rowdata;
                // console.log(rowdata);
                this.bindForm.authCode = rowdata.authCode;
                this.bindForm.qrcode = rowdata.qrcode;
                this.bindFormVisible = true;
              }
            },
            {
              stateName: "status",
              opposite: false,
              visibleFn: rowdata => {
                return true;
              },
              text: "解绑",
              color: "#F56C6C",
              visibleFn: rowdata => {
                if (
                  rowdata.deviceType == "AUTHCODE" &&
                  rowdata.status == "BINDED" &&
                  (rowdata.agentNo == this.userBussinessNo ||
                    this.userType == "admin")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.$confirm("确定解绑吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postUnBindEmpower()({
                      createTime: rowdata.createTime,
                      lastUpdateTime: rowdata.lastUpdateTime,
                      qrcode: rowdata.qrcode,
                      parentCode: rowdata.parentCode,
                      authCode: rowdata.authCode,
                      deviceType: rowdata.deviceType,
                      agentNo: rowdata.agentNo,
                      levelDetail: rowdata.levelDetail,
                      level: rowdata.level,
                      customerNo: rowdata.customerNo,
                      batchNo: rowdata.batchNo,
                      receiptNo: rowdata.receiptNo,
                      extensionNum: rowdata.extensionNum,
                      supportType: rowdata.supportType,
                      materiel: rowdata.materiel,
                      serviceMode: rowdata.serviceMode,
                      status: rowdata.status
                    }).then(data => {
                      if (data.code == "00") {
                        this.$message({
                          type: "success",
                          message: "解绑成功!"
                        });
                        this.reloadData(this.postPage, this.postLimit);
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
                      message: "已取消操作"
                    });
                  });
              }
            },
            {
              text: "绑定子绑",
              color: "#909399",
              visibleFn: rowdata => {
                if (
                  (rowdata.deviceType == "AUTHCODE" &&
                    rowdata.status == "BINDED" &&
                    rowdata.parentCode == null) ||
                  (rowdata.parentCode == "" &&
                    (rowdata.agentNo == this.userBussinessNo ||
                      this.userType == "admin"))
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.bindChildForm = rowdata;
                this.bindChildFormVisible = true;
              }
            }
          ]
        },
        // 数据加载成功
        dataSuccess: data => {
          this.qrcodeUrl = data.remark.qrcodeUrl;
        }
      }
    };
  },

  methods: {
    specialCheck(value) {
      var have = this.editForm.supportTypes.indexOf("普票");
      if (value) {
        if (have == "-1") {
          this.editForm.supportTypes.push("普票");
        }
      } else {
        this.editForm.supportTypes.pop();
      }
    },
    nomalCheck(value) {
      if (!value) {
        var have = this.editForm.supportTypes.indexOf("特殊");
        if (have != "-1") {
          this.editForm.supportTypes.push("普票");
        }
      }
    },
    // 授权码保存
    empoverCodeSave(formName) {
      this.$refs[formName].validate(valid => {
        let addForm = this.addForm;
        if (valid) {
          let empoverCodeForm = this.empoverCodeForm;
          let supportTypes1 = "";
          let supportTypes2 = "";
          let supportTypes3 = "";
          empoverCodeForm.supportTypes.forEach((element, index) => {
            if (element == "普票") {
              supportTypes1 = 1;
            } else if (element == "专票") {
              supportTypes2 = 2;
            } else if (element == "特殊") {
              supportTypes3 = 4;
            }
          });
          postMakeEmpower()({
            deviceType: this.deviceType,
            agentNo: empoverCodeForm.agentNo,
            qrcodeCount: empoverCodeForm.qrcodeCount,
            serviceMode: empoverCodeForm.serviceMode,
            "supportTypes[0]": supportTypes1,
            "supportTypes[1]": supportTypes2,
            "supportTypes[2]": supportTypes3
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，已成功生成授权码！",
                type: "success",
                center: true
              });
              this.empoverCodeFormVisible = false;
              this.resetForm("empoverCodeForm");
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },
    migrateChagen(event) {
      if (event == "ORDER") {
        // 号段入库
        this.visibleQrcodes = false;
        this.visibleQrNums = true;
      } else if (event == "OUT_ORDER") {
        // 序号入库
        this.visibleQrcodes = true;
        this.visibleQrNums = false;
      }
    },
    // 物料入库保存
    addTorageMaterielSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          postMakeTorageEmpower()({
            deviceType: thisForm.deviceType,
            receiptCount: thisForm.receiptCount,
            prefixNo: thisForm.prefixNo,
            migrateType: thisForm.migrateType,
            qrcodeStart: thisForm.qrcodeStart,
            qrcodeEnd: thisForm.qrcodeEnd,
            qrcodes: thisForm.qrcodes
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                message: "恭喜你，物料入库成功！",
                type: "success",
                center: true
              });
              this.addMaterielFormVisible = false;
              this.resetForm(formName);
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },

    // 导出授权吗保存
    exportEmpowerSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.dataTable.ExportExcel("/qrcode/export", {
            styleType: thisForm.styleType
          });
        }
      });
    },
    // 编辑保存
    editSave(formName) {
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          let supportTypes1 = "";
          let supportTypes2 = "";
          let supportTypes3 = "";
          thisForm.supportTypes.forEach((element, index) => {
            if (element == "普票") {
              supportTypes1 = 1;
            } else if (element == "专票") {
              supportTypes2 = 2;
            } else if (element == "特殊") {
              supportTypes3 = 4;
            }
          });
          postEditEmpower()({
            qrcode: thisForm.qrcode,
            authCode: thisForm.authCode,
            agentNo: thisForm.agentNo,
            customerNo: thisForm.customerNo,
            extensionNum: thisForm.extensionNum,
            serviceMode: thisForm.serviceMode,
            "supportTypes[0]": supportTypes1,
            "supportTypes[1]": supportTypes2,
            "supportTypes[2]": supportTypes3
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                message: "恭喜你，修改成功！",
                type: "success",
                center: true
              });
              this.editFormVisible = false;
              this.resetForm(formName);
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },
    bindFormSave(formName) {
      // 绑定start
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          postBindEmpower()({
            qrcode: thisForm.qrcode,
            authCode: thisForm.authCode,
            agentNo: thisForm.agentNo,
            customerNo: thisForm.customerNo
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                message: "恭喜你，绑定成功！",
                type: "success",
                center: true
              });
              this.bindFormVisible = false;
              this.resetForm(formName);
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },
    // 保存子码
    bindChildFormSave(formName) {
      // 绑定start
      var thisForm = this[formName];
      this.$refs[formName].validate(valid => {
        if (valid) {
          postBindChildEmpower()({
            authCode: thisForm.authCode,
            qrcode: thisForm.qrcode,
            childQrcodes: thisForm.childQrcodes
          }).then(data => {
            if (data.code == "00") {
              this.$message({
                message: "恭喜你，绑定成功！",
                type: "success",
                center: true
              });
              this.bindFormVisible = false;
              this.resetForm(formName);
              this.reloadData();
            } else {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },
    batchBindUploadSuccess(res, file) {
      // 文件上传成功
      this.$message.success("恭喜您！上传成功");
      this.$refs.batchBindFile.clearFiles();
      this.batchBindVisible = false;
    },
    uploadFilleError(response, file, fileList) {
      this.$message({
        message: "很抱歉，上传失败！",
        type: "warning",
        center: true
      });
      this.$refs.batchBindFile.clearFiles();
    },
    // 批量绑定
    batchBindSave() {
      this.$refs.batchBindFile.submit();
    },
    batchBindReset() {
      this.$refs.batchBindFile.clearFiles();
    },
    beforeBindBatchUpload(file) {
      const extension = file.name.split(".")[1] === "xlsx";
      const extension2 = file.name.split(".")[1] === "numbers";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xlsx,numbers 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传文件图片大小不能超过 10MB!");
      }
      return extension || (extension2 && isLt2M);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    _getQart(value) {
      var qrcodebox = $(this.$refs.qrcodebox.$el)
        .find("#qrcodeboxchild")
        .empty();
      qrcodebox = qrcodebox[0];
      // var qrcodebox = this.$refs.qrcodeboxchild;
      QRCode.toCanvas(value, { errorCorrectionLevel: "H" }, (err, canvas) => {
        if (err) throw err;
        qrcodebox.appendChild(canvas);
      });
    }
  },
  mounted() {},
  computed: {
    userBussinessNo() {
      return this.$store.state.moduleLayour.userMessage.userBussinessNo;
    },
    userType() {
      return this.$store.state.moduleLayour.userMessage.userType;
    }
  }
};
</script>

