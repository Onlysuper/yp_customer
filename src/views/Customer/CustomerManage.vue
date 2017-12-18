<template>
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <search-form @changeform="callbackformHandle" @visiblesome="visiblesomeHandle" @seachstart="seachstartHandle" :searchOptions="searchOptions"></search-form>
      <!-- search form end -->
      <div class="operation-box">
        <el-button-group class="button-group">
          <el-button class="mybutton" @click="addHandle" size="small" type="primary" icon="el-icon-plus">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload">批量入网</el-button>
          <el-button size="small" type="primary" icon="el-icon-sort">批量转移</el-button>
          <el-button size="small" type="primary" icon="el-icon-upload2">导出</el-button>
        </el-button-group>
      </div>
      <myp-data-page :table-data="tableData" v-on:childmanage="getCustomersHandle" @operation="operationHandle"></myp-data-page>
    </div>

    <!-- 详情 start -->
    <el-dialog title="详情" center :visible.sync="detailsFormVisible" width="500px">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">企业名称:{{addform.enterpriseName}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">企业税号:{{addform.taxNo}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">企业法人:{{addform.legalPerson}}</div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple">身份证:{{addform.idCard}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">联系人:{{addform.linkMan}}</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">手机号:{{addform.phoneNo}}</div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 编辑 start -->
    <el-dialog title="编辑" center :visible.sync="editFormVisible" width="500px">
      <el-form :model="editForm">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.enterpriseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业税号" :label-width="formLabelWidth">
          <el-input v-model="editForm.taxNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业法人" :label-width="formLabelWidth">
          <el-input v-model="editForm.legalPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="editForm.idCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="editForm.linkMan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="editForm.phoneNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" :label-width="formLabelWidth">
          <el-input v-model="editForm.customerNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户来源" :label-width="formLabelWidth">
          <el-input v-model="editForm.customerFrom" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 end -->
    <!-- 新增start -->
    <el-dialog center title="新增商户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addFormRules">
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
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormfn('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.admin-page {
  position: relative;
  background: #eff2f5;
  padding: 10px;
  .operation-box {
    float: left;
    width: 100%;
    .button-group {
      margin-right: 10px;
    }
    .line {
      text-align: center;
    }
  }
  .operation-group {
    padding: 5px 0;
    .line {
      text-align: center;
    }
  }
  .tableHeader {
    background: #f0f0f0;
  }
  .page-tag {
    margin-bottom: 10px;
  }
  .admin-main-box {
    padding: 10px;
    position: relative;
    height: 100%;
    // width: 100%;
    background: #fff;
  }
  .form-box {
    margin-top: 10px;
  }
  .el-pagination {
    text-align: right;
    padding-top: 17px;
  }
  .tip-text {
    color: #67c23a;
  }
  .button-group {
    padding-bottom: 5px;
  }
}
</style>
<script>
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
  addCustomer,
  editCustomer,
  transferCustomer,
  perfectCustomer
} from "@src/apis";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";

export default {
  name: "customermanage",
  components: {
    "search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  data() {
    var notNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空!"));
      } else {
        callback();
      }
    };
    var agentName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("合伙人姓名不能为空!"));
      } else {
        callback();
      }
    };
    return {
      addFormRules: {
        enterpriseName: [{ validator: notNull, trigger: "blur" }],
        taxNo: [
          {
            validator: (rule, value, callback) => {
              var reg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
              if (!reg.test(value)) {
                return callback(new Error("税号有误！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        legalPerson: [{ validator: notNull, trigger: "blur" }],
        idCard: [
          {
            validator: (rule, value, callback) => {
              var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
              if (!reg.test(value)) {
                return callback(new Error("身份证号有误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        linkMan: [{ validator: notNull, trigger: "blur" }],
        phoneNo: [{ validator: notNull, trigger: "blur" }]
      },
      formLabelWidth: "100px",
      addFormVisible: false, // 新增框
      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      addForm: {},
      editForm: {},
      detailsForm: {},
      addform: {
        // 新增数据
      },
      addRules: {
        agentName: [
          {
            validator: this.$store.state.InputValidation.notNull,
            trigger: "blur"
          }
        ]
      },
      // 查询条件数据
      searchCondition: {
        customerNo: "", // 商户编号
        taxNo: "", // 企业税号
        enterpriseName: "", // 企业名称
        createTimeStart: "", // 开始时间
        createTimeEnd: "", // 结束时间
        agentNo: "", // 合伙人编号
        customerFrom: "" // 入网来源
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
          show: false, // 普通搜索显示
          options: [
            {
              corresattr: "createTimeStart",
              label: "开始时间",
              value: "",
              cb: value => {
                this.searchCondition.createTimeStart = value;
              }
            },
            {
              corresattr: "createTimeEnd",
              lable: "结束时间",
              value: "",
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
        tableData: [], // table列表数据
        dataCount: 0, //数据条数
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
                  type: ""
                };
              } else if ((data = "PLUGIN")) {
                return {
                  text: "插件",
                  type: "warning"
                };
              }
            }
          },
          {
            key: "状态",
            word: "status",
            width: "70px",
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
              }
            }
          },
          { key: "入网时间", word: "createTime", width: "170" }
        ],
        // states: [
        //   // 状态列信息 key=>表头标题，word=>表内容信息
        //   {
        //     key: "状态",
        //     word: "status"
        //   }
        // ],
        operation: [
          // 操作按钮
          {
            text: "详情",
            cb: rowdata => {
              this.addform = rowdata;
              this.detailsFormVisible = true;
            }
          },
          {
            text: "编辑",
            cb: rowdata => {
              this.editForm = rowdata;
              this.editFormVisible = true;
            }
          },
          {
            text: "转移",
            cb: rowdata => {
              console.log(rowdata);
            }
          }
        ]
      }
    };
  },

  methods: {
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
    seachstartHandle() {
      // 开始搜索
      this.getCustomersHandle(1, 10);
    },
    //列表数据获取
    getCustomersHandle(page, limit) {
      var searchcon = this.searchCondition;
      getCustomers()({
        page: page,
        limit: limit,
        customerNo: searchcon.customerNo, // 商户编号
        taxNo: searchcon.taxNo, // 企业税号
        enterpriseName: searchcon.enterpriseName, // 企业名称
        createTimeStart: searchcon.createTimeStart, // 开始时间
        createTimeEnd: searchcon.createTimeEnd, // 结束时间
        agentNo: searchcon.agentNo, // 合伙人编号
        customerFrom: searchcon.customerFrom // 入网来源
      }).then(data => {
        if (data.code === "00") {
          // 数据获取成功
          this.tableData.tableData = data.data;
          this.tableData.dataCount = data.count;
        }
      });
    },
    // 保存新增内容
    addFormfn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCustomer()({}).then(data => {
            console.log(data);
          });
        }
      });
    },
    addHandle() {
      // 新增数据
      this.addFormVisible = true;
    },
    operationHandle(data, cb) {
      // 操作按钮回调
      cb(data);
    }
  },
  mounted() {}
};
</script>

