<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addDialog" size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" @click="batchNetDialog" type="primary" icon="el-icon-upload">批量入网</el-button>
          <el-button size="small" @click="batchTransferDialog" type="primary" icon="el-icon-sort">批量转移</el-button>
          <el-button size="small" @click="exportDialog" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </div>
      <myp-data-page ref="dataTable" :tableDataInit="tableData" @operation="operationHandle"></myp-data-page>
    </div>
    <!-- 新增start -->
    <el-dialog center title="新增商户" :visible.sync="addFormVisible">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
          <el-input v-model="addForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
          <el-input v-model="addForm.taxNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业法人" prop="legalPerson" :label-width="formLabelWidth">
          <el-input v-model="addForm.legalPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
          <el-input v-model="addForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkMan" :label-width="formLabelWidth">
          <el-input v-model="addForm.linkMan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNo" :label-width="formLabelWidth">
          <el-input v-model="addForm.phoneNo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetAddForm('addForm')">重置</el-button>
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
            <el-upload :auto-upload="false" ref="batchnetFile" :action="oaIp+'/customer/incomeBatch'" accept="file" :on-success="handleBatchNetSuccess" :before-upload="beforeBatchNetUpload" class="upload-demo" drag>
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
          <el-upload ref="batchtransferFile" :auto-upload="false" :action="oaIp+'/customer/transBatch'" class="upload-demo" drag :on-success="handleBatchTransferSuccess" :before-upload="beforeBatchNetUpload">
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
    <!-- 详情 start -->
    <el-dialog title="详情" center :visible.sync="detailsFormVisible" width="400px">
      <div class="detail-content">
        <div class="line-label-box">
          <span class="line-label">企业名称:</span>{{detailsForm.enterpriseName}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业税号:</span>{{detailsForm.taxNo?detailsForm.taxNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业法人:</span>{{detailsForm.legalPerson?detailsForm.legalPerson:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">身份证:</span>{{detailsForm.idCard?detailsForm.idCard:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">联系人:</span>{{detailsForm.linkMan?detailsForm.linkMan:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">手机号:</span>{{detailsForm.phoneNo?detailsForm.phoneNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户编号:</span>{{detailsForm.agentNo?detailsForm.agentNo:"??"}}
        </div>
        <div class="line-label-box">
          <span class="line-label">商户来源:</span>{{detailsForm.customerFrom?detailsForm.customerFrom:"??"}}
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="修改商户信息" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="企业名称" prop="enterpriseName" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税号" prop="taxNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业法人" prop="legalPerson" :label-width="formLabelWidth">
          <el-input v-model="editForm.legalPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard" :label-width="formLabelWidth">
          <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkMan" :label-width="formLabelWidth">
          <el-input v-model="editForm.linkMan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.phoneNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="customerNo" :label-width="formLabelWidth">
          <el-input v-model="editForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户来源" prop="customerFrom" :label-width="formLabelWidth">
          <el-input v-model="editFormCustomerFrom" auto-complete="off"></el-input>
        </el-form-item>
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
  name: "customermanage",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var dataHandle = nowDate => {
      var nowDate = new Date(nowDate);
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      month = month * 1 < 10 ? "0" + month : month;
      var day = nowDate.getDate();
      var todayDate = year + "-" + month + "-" + day;
      return todayDate;
    };
    var todayDate = dataHandle(new Date()); // 初始化默认开始查询日期
    var beforDate = dataHandle(new Date() - 24 * 60 * 60 * 1000); // 初始化默认结束查询日期

    var searchConditionVar = {
      customerNo: "", // 商户编号
      taxNo: "", // 企业税号
      enterpriseName: "", // 企业名称
      createTimeStart: beforDate, // 开始时间
      createTimeEnd: todayDate, // 结束时间
      agentNo: "", // 合伙人编号
      customerFrom: "" // 入网来源
    };
    return {
      addFormVisible: false, // 新增框
      batchNetFormVisible: false, // 批量入网框
      batchTransferFormVisible: false, // 批量转移模板
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
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
        legalPerson: [{ required: true, message: "请输入企业法人", trigger: "blur" }],
        idCard: [{ validator: idCardVerify, trigger: "blur" }],
        linkMan: [{ required: true, message: "请输入联系人姓名", trigger: "blur" }],
        phoneNo: [{ validator: phoneNumVerify, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      editFormRules: {}, // 编辑单个规则
      editForm: {}, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      transferFormRules: {
        receiveAgentNo: [{ required: true, message: "不能为空", trigger: "blur" }]
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
              value: new Date() - 24 * 60 * 60 * 1000,
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
              label: "请选择"
            },
            {
              value: "插件",
              label: "插件"
            },
            {
              value: "扫码",
              label: "扫码"
            },
            {
              value: "公众号",
              label: "公众号"
            },
            {
              value: "静默",
              label: "静默"
            },
            {
              value: "后台",
              label: "后台"
            },
            {
              value: "第三方",
              label: "第三方"
            }
          ],
          cb: value => {
            this.searchCondition.customerFrom = value;
          }
        }
      ],

      // 列表数据
      tableData: {
        getDataUrl: {
          url: getCustomers, // 初始化数据
          page: 1, // 当前页数
          limit: 10, // 每页条数
          searchCondition: searchConditionVar // 搜索内容
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "100px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "企业名称",
            width: "100px",
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
            width: "80px",
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
              } else if (data == null || data == "") {
                return {
                  text: "未知",
                  type: "info"
                };
              } else {
                return {
                  text: "未定义",
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
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true;
              }
            },
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                this.editForm = rowdata;
                this.editFormVisible = true;
              }
            },
            {
              text: "转移",
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
    // 重新获取数据
    reloadData(page, Current) {
      let page_ = page ? page : 1;
      let limit_ = Current ? Current : 10;
      this.tableData.getDataUrl = {
        url: this.tableData.getDataUrl.url,
        page: page_,
        limit: limit_,
        searchCondition: this.searchCondition
      };
    },
    handleBatchTransferSuccess() {
      // 批量转移文件上传成功
      this.$message.success("恭喜您！上传成功");
      this.batchTransferForm.url = URL.createObjectURL(file.raw);
    },
    handleBatchNetSuccess(res, file) {
      // 批量入网文件上传成功
      this.$message.success("恭喜您！上传成功");
      this.batchNetForm.url = URL.createObjectURL(file.raw);
    },
    beforeBatchNetUpload(file) {
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

    resetAddForm(formName) {
      this.$refs[formName].resetFields();
    },
    seachstartHandle() {
      // 开始搜索
      this.reloadData();
    },
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
              this.resetAddForm("addForm");
              this.reloadData();
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.resultMsg,
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
      this.$refs.batchnetFile.submit();
    },
    // 批量转移文件提交
    saveBatchTransfer() {
      this.$refs.batchtransferFile.submit();
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
              this.reloadData(this.storePageCount, this.storeCurrentPage);
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.resultMsg,
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
              this.reloadData(this.storePageCount, this.storeCurrentPage);
            } else if (data.code === "98") {
              this.$message({
                message: data.msg,
                type: "warning",
                center: true
              });
            } else {
              this.$message({
                message: data.resultMsg,
                type: "warning",
                center: true
              });
            }
          });
        }
      });
    },

    addDialog() {
      // 新增数据 弹出框
      this.addFormVisible = true;
    },
    batchNetDialog() {
      // 批量入网 弹出框
      this.batchNetFormVisible = true;
    },
    batchTransferDialog() {
      // 批量转移 弹出框
      this.batchTransferFormVisible = true;
    },
    exportDialog() {
      // 导出
      this.$refs.dataTable.ExportExcel("/customer/export");
    },
    /**TABLE页交互 START ************************************************************ */
    // 普通搜索 具备隐藏
    visiblesomeHandle() {
      this.searchOptions.forEach(element => {
        // searchOptions数组里面的corresattr 是索引
        if (!element.show) {
          if (element.type == "dateGroup") {
            // 开始时间 到结束时间组合 特殊处理
            element.options.forEach(element => {
              var corresattr = element.corresattr;
              element.value = "";
              this.searchCondition[corresattr] = "";
            });
          } else {
            var corresattr = element.corresattr;
            element.value = "";
            this.searchCondition[corresattr] = "";
          }
        }
      });
    },
    callbackformHandle(cb, data) {
      // 表单双向绑定 得到输入的内容并返回到本页面
      cb(data);
    },
    resetSearchHandle() {
      // 重置查询表单
      this.searchOptions.forEach(element => {
        if (element.type != "dateGroup") {
          element.value = "";
          this.searchCondition[element.corresattr] = "";
        } else {
          element.options.forEach(element => {
            element.value = "";
            this.searchCondition[element.corresattr] = "";
          });
        }
      });
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
    /**END ***********************************************/
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    editFormCustomerFrom() {
      // 表单内用户来源显示状态客户来源
      if (this.editForm.customerFrom == "OPEN_API") {
        return "第三方";
      } else if (this.editForm.customerFrom == "PLUGIN") {
        return "插件";
      } else if (this.editForm.customerFrom == "LOCAL") {
        return "后台";
      }
    },
    //当前页数
    storePageCount() {
      return this.$store.state.dataTable.pageCount;
    },
    //每页条数
    storeCurrentPage() {
      return this.$store.state.dataTable.currentPage;
    }
  },
  mounted() {}
};
</script>

