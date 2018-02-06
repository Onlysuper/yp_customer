<template>
  <div>
    第三部
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSave('editForm')">确 定</el-button>
    </div>
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
import { regionData } from "element-china-area-data";

import { getCustomerOpenProducts } from "@src/apis";

export default {
  name: "customerlist",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var searchConditionVar = {
      bussinessNo: "",
      customerName: "",
      qrcodeStatus: "",
      elecStatus: "",
      payStatus: ""
    };
    return {
      optionsArea: regionData, //省市县插件
      sumLoading: false,
      payStatusVisible: false, // 聚合详情
      qrcodeStatusVisible: false, // 快速
      elecStatusVisible: false, // 电子
      selectOptions: {
        customerType: "payStatus",
        customerTypeOptions: [
          {
            value: "payStatus",
            label: "聚合支付"
          },
          {
            value: "qrcodeStatus",
            label: "快速开票"
          },
          {
            value: "elecStatus",
            label: "电子发票"
          }
        ]
      },

      detailsFormVisible: false, // 详情框
      editFormVisible: false, // 编辑框
      formLabelWidth: "100px",
      payStatusFormRules: {}, // 编辑单个规则
      payStatusForm: {
        Area: [] // 必须为数组
      }, // 编辑单个表单
      detailsForm: {}, // 详情单个表单
      // 查询条件数据
      searchCondition: searchConditionVar,
      // 顶部搜索表单信息
      searchOptions: [
        // 请注意 该数组里对象的corresattr属性值与searchCondition里面的属性是一一对应的 不可少
        {
          corresattr: "bussinessNo",
          type: "text", // 表单类型
          label: "商户编号", // 输入框前面的文字
          show: true, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.bussinessNo = value;
          }
        },
        {
          corresattr: "customerName",
          type: "text",
          label: "商户名称",
          show: false, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.customerName = value;
          }
        },

        {
          corresattr: "qrcodeStatus",
          type: "select",
          label: "快速开票",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            }
          ],
          cb: value => {
            this.searchCondition.qrcodeStatus = value;
          }
        },
        {
          corresattr: "payStatus",
          type: "select",
          label: "聚合状态",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            },
            {
              label: "拒绝",
              value: "REJECT"
            },
            {
              label: "待审核",
              value: "CHECKING"
            }
          ],
          cb: value => {
            this.searchCondition.payStatus = value;
          }
        },

        {
          corresattr: "elecStatus",
          type: "select",
          label: "电子发票",
          show: false, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            {
              label: "已开通",
              value: "TRUE"
            },
            {
              label: "未开通",
              value: "INIT"
            }
          ],
          cb: value => {
            this.searchCondition.elecStatus = value;
          }
        }
      ],

      // 列表数据
      postSearch: searchConditionVar,
      tableData: {
        getDataUrl: {
          url: getCustomerOpenProducts // 初始化数据
        },
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "",
            sortable: true,
            word: "bussinessNo"
          },
          {
            key: "商户名称",
            width: "",
            word: "customerName"
          },

          {
            key: "快速开票",
            width: "",
            word: "qrcodeStatus",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
                  type: "info"
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
            key: "聚合支付",
            width: "",
            word: "qrcodeStatus",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
                  type: "info"
                };
              } else if (data == "REJECT") {
                return {
                  text: "拒绝",
                  type: "info"
                };
              } else if (data == "CHECKING") {
                return {
                  text: "待审核",
                  type: "info"
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
            key: "电子发票",
            width: "",
            word: "elecStatus",
            status: true,
            type: data => {
              if (data == "TRUE") {
                return {
                  text: "已开通",
                  type: "success"
                };
              } else if (data == "INIT") {
                return {
                  text: "未开通",
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
              text: "查询",
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
              text: "开通产品",
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
            }
          ]
        }
      }
    };
  },

  methods: {
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
    // 合计
    SumHandle() {
      this.sumLoading = true;
      var searchCondition = this.searchCondition;
      getBillcountSum()({
        dataTimeBegin: searchCondition.dataTimeBegin,
        dataTimeEnd: searchCondition.dataTimeEnd,
        agentNo: searchCondition.agentNo,
        containChild: searchCondition.containChild
      }).then(res => {
        if (res.code == "00") {
          var data = res.data;
          this.scanSum = data.scan;
          this.netSum = data.register;
          this.pushSum = data.billSuccess;
        }
        this.sumLoading = false;
      });
    },
    customerTypeSelect() {
      let value = this.selectOptions.customerType;
      this.payStatusVisible = false; // 聚合详情
      this.qrcodeStatusVisible = false; // 快速
      this.elecStatusVisible = false; // 电子
      if (value == "qrcodeStatus") {
        this.qrcodeStatusVisible = true;
      } else if (value == "elecStatus") {
        this.elecStatusVisible = true;
      } else if (value == "payStatus") {
        this.payStatusVisible = true;
      }
    },
    customerTypeChange() {
      this.customerTypeSelect();
    }
  },

  computed: {
    // customerTypeSelect() {
    //   return this.selectOptions.customerType;
    // }
  },
  watch: {},
  mounted() {
    this.customerTypeSelect();
  }
};
</script>

