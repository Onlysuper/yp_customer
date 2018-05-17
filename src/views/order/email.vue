<template>
  <!-- 订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
     <div class="operation-box">
        <el-button-group v-if="adminFilter('pay_order_sum')" class="button-group">
          <el-button class="mybutton" @click="Add" size="small" type="primary" icon="el-icon-plus">新增</el-button>
        </el-button-group>
      </div>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 新增start -->
     <el-dialog title="新增邮箱配置" center :visible.sync="addFormVisible">
        <el-form size="small" ref="editForm" :model="editForm" label-width="110px" :rules="editFormRules">
          <el-form-item label="商户编号" prop="customerNo">
            <el-input  v-model="editForm.customerNo" placeholder="商户编号"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="type">
            <el-select v-model="editForm.status" placeholder="请选择">
              <el-option v-for="item in emailOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="商户编号" prop="bussinessType">
            <el-input  v-model="editForm.bussinessType"  placeholder="商户类型"></el-input>
          </el-form-item>
           <el-form-item label="联系邮箱" prop="contactEmail">
            <el-input v-model="editForm.contactEmail" placeholder="联系邮箱"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible=false">取消</el-button>
          <el-button :loading="saveLoading" type="primary" @click="addSave">确定</el-button>
        </span>
     </el-dialog>
    <!-- 新增end -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, today_ } from "@src/common/dateSerialize";
import {
  getEmailconfigs,
  postAddEmailconfig,
  postEditEmailconfig
} from "@src/apis";
import utils from "@src/common/utils";
export default {
  name: "orderQuery",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      bussinessNo: "",
      status: ""
    };
    return {
      addFormVisible: false,
      emailOptions: [],
      editForm: {},
      editFormRules: {
        // customerNo: [
        //   { required: true, message: "请输入商户编号", trigger: "blur,change" }
        // ],
        // status: [{ required: true, message: "请选择状态", trigger: "blur,change" }]
      },
      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "bussinessNo",
          type: "text", // 表单类型
          label: "业务编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.bussinessNo = value;
          }
        },
        {
          corresattr: "status",
          type: "select",
          label: "状态",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('emailStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getEmailconfigs,
      postSearch: searchConditionVar,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "业务编号",
            width: "160px",
            word: "bussinessNo"
          },
          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'emailStatus');
            }
          }
        ],
        operation: {
          width: "80px",
          options: [
            {
              text: "新增",
              color: "#00c1df",
              cb: rowdata => {
                console.log(rowdata)
              }
            },
            {
              text: "编辑",
              color: "#00c1df",
              cb: rowdata => {
                this.addFormVisible = true;
                console.log(rowdata)
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
    // 新增
    Add() {
      this.addFormVisible = true
    },
    addSave() {

    }
  },
  created() {
    this.emailOptions = this.statusFilterQuery('emailStatus');
  },
  mounted() {
    // this.SumHandle()
  },
  computed: {
    isAdmin() {
      var user = this.$store.state.userInfoAndMenu.userMessage.all;
      var isAdmin = (
        user.userType === "root" ||
        user.userType === "admin" ||
        user.userType === "operator"
      ); // 运营
      return isAdmin
    },
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  }
};
</script>

