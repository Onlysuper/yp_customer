<template>
  <!-- 商户管理 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button v-if="adminFilter('customer_add')" class="mybutton" @click="showDialog('addFormVisible')" size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button v-if="adminFilter('customer_incomeBatch')" size="small" @click="showDialog('batchNetFormVisible')" type="primary" icon="el-icon-upload">批量入网</el-button>
          <el-button v-if="adminFilter('customer_transBatch')" size="small" @click="showDialog('batchTransferFormVisible')" type="primary" icon="el-icon-sort">批量转移</el-button>
          <el-button v-if="adminFilter('customer_electronicOpen')" size="small" @click="showDialog('electronicOpenFormVisible')" type="primary" icon="el-icon-sort">商户电票开通</el-button>
          <el-button v-if="adminFilter('customer_export')" size="small" @click="exportDialog" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </div>
      <myp-data-page @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增商户" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item class="full-width" label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
                <el-input v-model="addForm.enterpriseName" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
                <el-input v-model="addForm.taxNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业法人" prop="legalPerson" :label-width="formLabelWidth">
                <el-input v-model="addForm.legalPerson" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
                <el-input v-model="addForm.idCard" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="联系人" prop="linkMan" :label-width="formLabelWidth">
                <el-input v-model="addForm.linkMan" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="手机号" prop="phoneNo" :label-width="formLabelWidth">
                <el-input v-model="addForm.phoneNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addForm')">重置</el-button>
        <el-button type="primary" @click="addSave('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
    <!-- 批量入网 start -->
    <el-dialog title="商户批量入网" center :visible.sync="batchNetFormVisible" width="500px">
      <form>
        <div class="content-center-box">
          <div class="sep-inline">
            <a class="link-Label" :href="oaIp+'/static/template/customer-batch-2007.xlsx'">下载入网模板</a>
          </div>
          <div class="sep-inline">
            <el-upload :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false" ref="batchnetFile" :action="oaIp+'/customer/incomeBatch'" :on-success="handleBatchNetSuccess" :before-upload="beforeBatchNetUpload" class="upload-demo" drag>
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
        <el-button @click="batchNetFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveBatchNet">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 批量入网 end -->
    <!-- 批量转移 start -->
    <el-dialog title="商户批量转移" center :visible.sync="batchTransferFormVisible" width="500px">
      <div class="content-center-box">
        <div class="sep-inline">
          <a class="link-Label" :href="oaIp+'/static/template/trans-batch-2007.xlsx'">下载转移模板</a>
        </div>
        <div class="sep-inline">
          <el-upload :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' ref="batchtransferFile" :limit="1" :on-exceed="handleExceed" :auto-upload="false" :action="oaIp+'/customer/transBatch'" class="upload-demo" drag :on-success="handleBatchTransferSuccess" :before-upload="beforeBatchNetUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将需要转移的文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件,请注意文件格式</div>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchTransferFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveBatchTransfer">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 批量转移 end -->
    <!-- 商户电票开通start -->
    <el-dialog title="商户批量开通电票" center :visible.sync="electronicOpenFormVisible" width="500px">
      <div class="content-center-box">
        <div class="sep-inline">
          <a class="link-Label" :href="oaIp+'/static/template/electronicOpen-2007.xlsx'">下载点票开通模板</a>
        </div>
        <div class="sep-inline">
          <el-upload :limit="1" :on-exceed="handleExceed" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' ref="electronicOpenFile" :auto-upload="false" :action="oaIp+'/customer/electronicOpen'" class="upload-demo" drag :on-success="handleElectronicOpenSuccess" :before-upload="beforeBatchNetUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将需要转移的文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件,请注意文件格式</div>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="electronicOpenFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="saveElectronicOpen">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 商户电票开通 end -->
    <!-- 详情 start -->
    <el-dialog title="详情" center :visible.sync="detailsFormVisible" width="400px">
      <div class="detail-content">
        <div class="line-label-box">
          <span class="line-label">企业名称:</span>{{detailsForm.enterpriseName}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业税号:</span>{{detailsForm.taxNo}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业法人:</span>{{detailsForm.legalPerson}}
        </div>
        <div class="line-label-box">
          <span class="line-label">身份证:</span>{{detailsForm.idCard}}
        </div>
        <div class="line-label-box">
          <span class="line-label">联系人:</span>{{detailsForm.linkMan}}
        </div>
        <div class="line-label-box">
          <span class="line-label">手机号:</span>{{detailsForm.phoneNo}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户编号:</span>{{detailsForm.agentNo}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户来源:</span>{{detailsForm.customerFrom}}
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible" width="600px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
                <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="企业法人" prop="legalPerson" :label-width="formLabelWidth">
                <el-input v-model="editForm.legalPerson" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="联系人" prop="linkMan" :label-width="formLabelWidth">
                <el-input v-model="editForm.linkMan" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
                <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="手机号" prop="phoneNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.phoneNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
                <el-input v-model="editForm.customerNo" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商户来源" prop="customerFrom" :label-width="formLabelWidth">
                <el-input v-model="editFormCustomerFrom" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 商户转移 start -->
    <el-dialog title="商户转移" center :visible.sync="transferFormVisible" width="500px">
      <el-form size="small" :model="transferForm" ref="transferForm" :rules="transferFormRules">
        <el-form-item label="商户编号" prop="" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="transferForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" prop="" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="transferForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="现有合伙人" prop="" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="transferForm.agentNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接受合伙人" prop="receiveAgentNo" :label-width="formLabelWidth">
          <el-input v-model="transferForm.receiveAgentNo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferSave('transferForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 商户转移 end -->
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
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

import {
  getCustomers,
  postAddCustomer,
  postEditCustomer,
  postUploadFile, // 上传文件
  transferCustomer,
  perfectCustomer
} from "@src/apis";

export default {
  name: "customerlist",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var searchConditionVar = {
      customerNo: "", // 商户编号
      taxNo: "", // 企业税号
      enterpriseName: "", // 企业名称
      createTimeStart: todayDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      agentNo: "", // 合伙人编号
      customerFrom: "", // 入网来源
      containChild: "TRUE"
    };
    return {
      fileList: [],
      addFormVisible: false, // 新增框
      batchNetFormVisible: false, // 批量入网框
      batchTransferFormVisible: false, // 批量转移模板
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      electronicOpenFormVisible: false, // 批量开通电票
      transferFormVisible: false,
      batchNetForm: {
        // 批量上传
        url: ""
      },
      batchTransferForm: {
        // 批量转移
        url: ""
      },
      addFormRules: {
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        taxNo: [{ validator: taxNumVerify, trigger: "blur" }],
        legalPerson: [
          { required: true, message: "请输入企业法人", trigger: "blur" }
        ],
        idCard: [{ validator: idCardVerify, trigger: "blur" }],
        linkMan: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        phoneNo: [{ validator: phoneNumVerify, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      transferFormRules: {
        receiveAgentNo: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }, // 转移单个规则
      transferForm: {}, // 转移单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      addForm: {
        enterpriseName: "",
        taxNo: "",
        legalPerson: "",
        idCard: "",
        linkMan: "",
        phoneNo: ""
      },
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
          corresattr: "taxNo",
          type: "text",
          label: "企业税号",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.taxNo = value;
          }
        },
        {
          corresattr: "enterpriseName",
          type: "text",
          label: "企业名称",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.enterpriseName = value;
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
        },
        {
          corresattr: "agentNo",
          type: "text",
          label: "合伙人编号",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "customerFrom",
          type: "select",
          label: "入网来源",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              value: "PLUGIN",
              label: "插件"
            },
            {
              label: "扫码",
              value: "SCAN_CODE"
            },
            {
              label: "公众号",
              value: "OFFICAL_ACCOUNT"
            },
            {
              label: "静默",
              value: "SLIENT"
            },
            {
              label: "后台",
              value: "LOCAL"
            },
            {
              label: "第三方",
              value: "OPEN_API"
            }
          ],
          cb: value => {
            this.searchCondition.customerFrom = value;
          }
        },
        {
          corresattr: "containChild",
          type: "select",
          label: "是否包含下级",
          show: false, // 普通搜索显示
          value: "TRUE",
          options: [
            {
              value: "TRUE",
              label: "包含下级"
            },
            {
              value: "FALSE",
              label: "不包含下级"
            }
          ],
          cb: value => {
            this.searchCondition.containChild = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomers // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "120px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "企业名称",
            width: "120px",
            word: "enterpriseName"
          },
          {
            key: "企业税号",
            word: "taxNo"
          },
          {
            key: "联系人",
            width: "100px",
            word: "linkMan"
          },
          {
            key: "合伙人编号",
            width: "100px",
            word: "agentNo"
          },
          {
            key: "来源",
            width: "120px",
            word: "customerFrom",
            status: true,
            type: data => {
              if (data == "OPEN_API") {
                return {
                  text: "第三方",
                  type: "danger"
                };
              } else if (data == "PLUGIN") {
                return {
                  text: "插件",
                  type: "warning"
                };
              } else if (data == "LOCAL") {
                return {
                  text: "后台",
                  type: ""
                };
              } else if (data == "SCAN_CODE") {
                return {
                  text: "扫码",
                  type: ""
                };
              } else if (data == "OFFICAL_ACCOUNT") {
                return {
                  text: "公众号",
                  type: ""
                };
              } else if (data == "SLIENT") {
                return {
                  text: "静默",
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
            key: "状态",
            word: "status",
            width: "80px",
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
                  text: "没写",
                  type: ""
                };
              }
            }
          },
          { key: "入网时间", word: "createTime", width: "170" }
        ],
        operation: {
          width: "120px",
          options: [
            // 操作按钮
            {
              text: "详情",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (this.adminOperationAll.customer_detail == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            },
            {
              text: "编辑",
              visibleFn: rowdata => {
                if (
                  this.adminOperationAll.customer_edit == "TRUE" &&
                  (rowdata.agentNo == this.userBussinessNo ||
                    this.userType == "admin")
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "转移",
              visibleFn: rowdata => {
                if (this.adminOperationAll.customer_transfer == "TRUE") {
                  return true;
                } else {
                  return false;
                }
              },
              color: "#00c1df",
              cb: rowdata => {
                this.transferForm = rowdata;
                this.transferFormVisible = true;
              }
            }
          ]
        }
      }
    };
  },

  methods: {
    addSave(formName) {
      // 新增内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetSearchHandle();
          postAddCustomer()(this.addForm).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，新增数据成功",
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
            console.log(data);
          });
        }
      });
    },
    // 批量入网文件保存
    saveBatchNet() {
      console.log(this.$refs.batchnetFile);
      this.$refs.batchnetFile.submit();
    },
    // 批量转移文件提交
    saveBatchTransfer() {
      this.$refs.batchtransferFile.submit();
    },
    // 批量开通点票
    saveElectronicOpen() {
      this.$refs.electronicOpenFile.submit();
    },
    handleBatchTransferSuccess(res, file) {
      // 批量转移文件上传成功
      if (res.data == "00") {
        this.batchTransferFormVisible = false;
      } else if (res.data == "98") {
        this.$message({
          message: "新增数据存在失败",
          type: "warning"
        });
      } else {
        this.$message({
          message: "上传失败",
          type: "warning"
        });
      }
      this.reloadData();
      this.$message.success("恭喜您！上传成功");
      this.$refs["batchtransferFile"].clearFiles();
    },
    handleBatchNetSuccess(res, file) {
      // 批量入网文件上传成功
      if (res.data == "00") {
        this.$message.success("恭喜您！上传成功");
      } else if (res.data == "98") {
        this.$message({
          message: "新增数据存在失败",
          type: "warning"
        });
      } else {
        this.$message({
          message: "上传失败",
          type: "warning"
        });
      }
      this.reloadData();
      this.$refs["batchnetFile"].clearFiles();
      this.batchNetFormVisible = false;
    },
    // 批量开通电票成功
    handleElectronicOpenSuccess(res, file) {
      if (res.data == "00") {
        this.$message.success("恭喜您！上传成功");
      } else if (res.data == "98") {
        this.$message({
          message: "新增数据存在失败",
          type: "warning"
        });
      } else {
        this.$message({
          message: "上传失败",
          type: "warning"
        });
      }
      this.reloadData();
      this.$refs["electronicOpenFile"].clearFiles();
      this.electronicOpenFormVisible = false;
    },
    editSave(formName) {
      // 编辑内容保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetSearchHandle();
          postEditCustomer()(this.editForm).then(data => {
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
            console.log(data);
          });
        }
      });
    },
    transferSave(formName) {
      // 转移保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.transferForm);
          transferCustomer()({
            customerNo: this.transferForm.customerNo,
            enterpriseName: this.transferForm.enterpriseName,
            agentNo: this.transferForm.agentNo,
            receiveAgentNo: this.transferForm.receiveAgentNo
          }).then(data => {
            if (data.code === "00") {
              this.$message({
                message: "恭喜你，转移数据成功",
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
          });
        }
      });
    },
    beforeBatchNetUpload(file) {
      const extension = file.name.split(".")[1] === "xlsx";
      // const extension2 = file.name.split(".")[1] === "numbers";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xlsx 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传文件图片大小不能超过 10MB!");
      // }
      // return extension || (extension2 && isLt2M);
      return extension;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel("/customer/export");
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前共选择了 ${files.length +
          fileList.length} 个文件,超出限定个数。可删除下方上传列表，再重新选择上传`
      );
    }
  },
  computed: {
    editFormCustomerFrom() {
      // 表单内用户来源显示状态客户来源
      if (this.editForm.customerFrom == "OPEN_API") {
        return "第三方";
      } else if (this.editForm.customerFrom == "PLUGIN") {
        return "插件";
      } else if (this.editForm.customerFrom == "LOCAL") {
        return "后台";
      }
    }
  },
  mounted() {}
};
</script>

