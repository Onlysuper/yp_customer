<template>
  <!-- 订单查询 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
    </div>
    <!-- 详细信息 start -->
    <el-dialog class="special-dialog-new" bottom="10px" title="变更单详情" center :visible.sync="detailsFormVisible" id="dialogLoding" :close-on-click-modal="false">
      <div class="detail-content-pro">
        <template>
          <component ref="detailProductView" v-bind:is="'payDetail'" :customerTypeSelected="customerTypeSelected" :rowData="rowData" :oldData="oldData" :newData="newData">
          </component>
        </template>
      </div>
      <div v-if="editVisiblebut||checkVisiblebut" slot="footer" class="dialog-footer">
        <el-button v-if="editVisiblebut" type="primary" @click="editFn()">编辑</el-button>
        <el-button v-if="checkVisiblebut" type="primary" @click="adoptSave(selectOptions.customerType,detailsForm)">审核通过</el-button>
        <el-button v-if="checkVisiblebut" type="primary" @click="refuseSave(selectOptions.customerType,detailsForm)">审核拒绝</el-button>
      </div>
    </el-dialog>
    <!-- 详情 end -->
    <!-- 开通产品 start -->
    <el-dialog :title="productOpenTitle" center :visible.sync="editFormVisible">
      <!-- <keep-alive> -->
      <!-- <component v-on:titleChange="titleChange" v-on:nextFn="nextFn" v-on:backFn="backFn" @backDetail="backDetail" v-bind:is="openProductView" :customerTypeSelected="customerTypeSelected" :rowData="resaultData"> -->
      <component ref="editProductView" v-on:titleChange="titleChange" v-on:nextFn="nextFn" v-on:backFn="backFn" @backDetail="backDetail" v-bind:is="openProductView" :customerTypeSelected="customerTypeSelected" :rowData="rowData" :oldData="oldData" :newData="newData">
        <!-- 组件在 vm.openProductView 变化时改变！ -->
      </component>
      <!-- </keep-alive> -->
    </el-dialog>
    <!-- 开通产品 end -->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@media screen and (min-width: 500px) {
  .scroll-view-cus {
    // touch-action: none;
    /* -- Attention-- */
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // overflow: hidden;
  }
  .admin-page {
    .small-but {
      position: absolute;
      // width: 30px;
      // height: 30px;
      padding: 0 5px;
      text-align: center;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      z-index: 10;
      top: 40px;
      color: #fff;
      cursor: pointer;
      &.next {
        right: 0;
      }
      &.pre {
        left: 0;
      }
    }
    .imageBox li {
      text-align: center;
    }
    .special-dialog-new {
      // height: 100%;
      top: 20px !important;
      left: 20px !important;
      right: 20px !important;
      bottom: 20px !important;
      position: fixed;
      align-items: stretch;
      overflow: hidden;
      flex-direction: column;
      .el-dialog__headerbtn {
        z-index: 999;
      }
      .dialog-title-box {
        display: flex;
        padding: 4px 0;
        padding-bottom: 10px;
        position: relative;
        flex-shrink: 0;
        box-sizing: border-box;
        .title-box {
          // flex: 1;
          flex: 1;
          align-self: center;
          text-align: center;
          font-size: 20px;
          padding-right: 120px;
        }
      }
      .el-dialog {
        margin: 0px !important;
        width: 100%;
        flex: 1;
        flex-direction: column;
        height: 100%;
        align-items: stretch;
        display: flex;
      }
      .el-dialog__header {
        // width: 100%;
        // flex: 1;
        // flex-grow: 0;
        // margin: 0;
        // padding: 0;
        // height: 0;
      }
      .el-dialog__body {
        padding-top: 0px;
        padding-bottom: 0px;
        flex: 1;
        display: flex;
        // flex-basis: 100%;
        height: 100%;
      }
      .el-dialog__footer {
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }
  .detail-content-pro {
    flex: 1;
    // height: 100%;
    // overflow: auto;
    // position: relative;
    display: flex;
    flex-direction: column;
    position: relative;
    // width: 100%;
    // background: red;
  }
}
</style>
<script>
import $ from "jquery";
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
// table页与搜索页公用功能
import { mixinsPc } from "@src/common/mixinsPc";
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import { todayDate, today_ } from "@src/common/dateSerialize";
import { getChangeBills, postUpdateBill, getOneChangeBill } from "@src/apis";
import utils from "@src/common/utils";
import payDetail from "./payDetail";
import openInfo from "./openInfo";
import paystatusGoods from "./paystatusGoods";
import paystatusUpload from "./paystatusUpload";
import paystatusSuccess from "./paystatusSuccess";
export default {
  name: "changeBill",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage, // 数据列表组件
    "payDetail": payDetail,
    paystatusGoods: paystatusGoods,
    paystatusUpload: paystatusUpload,
    paystatusSuccess: paystatusSuccess,
    openInfo: openInfo,
  },
  mixins: [mixinDataTable, mixinsPc],
  data() {
    // 日期格式转换成如“2017-12-19”的格式
    var searchConditionVar = {
      customerNo: "",
      status: "",
      agentNo: "",
      billNo: ""
    };
    return {
      oldData: {},
      newData: {},
      rowData: {},
      doWhat: {
        type: "change"
      },
      selectOptions: {
        customerType: "payStatus",
        customerTypeOptions: [
          {
            value: "payStatus",
            label: "聚合支付",
            disabled: false
          },
          {
            value: "qrcodeStatus",
            label: "快速开票",
            disabled: false
          },
          {
            value: "elecStatus",
            label: "电子发票",
            disabled: false
          }
        ]
      },
      customerTypeSelected: [
        {
          value: "payStatus",
          label: "聚合支付",
          disabled: false
        },
        {
          value: "qrcodeStatus",
          label: "快速开票",
          disabled: true
        },
        {
          value: "elecStatus",
          label: "电子发票",
          disabled: true
        }
      ],
      openProductView: "openInfo",
      editFormVisible: false,
      productOpenTitle: "",
      editVisiblebut: false,
      checkVisiblebut: false,

      detailProductView: "",
      sumVisible: false,
      amountSum: "0",
      amountCount: "0",
      sumLoading: false,
      detailsFormVisible: false,
      detailsForm: {},
      formLabelWidth: "100px",
      searchCondition: searchConditionVar,
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
            ...this.statusFilterQuery('changeBill')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
        {
          corresattr: "agentNo",
          type: "text", // 表单类型
          label: "代理商编号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.agentNo = value;
          }
        },
        {
          corresattr: "billNo",
          type: "text", // 表单类型
          label: "变更单号", // 输入框前面的文字
          show: false, // 普通搜索显示
          value: "", // 表单默认的内容
          cb: value => {
            // 表单输入之后回调函数
            this.searchCondition.billNo = value;
          }
        }
      ],

      // 列表数据
      actionUrl: getChangeBills,
      postSearch: searchConditionVar,
      tableData: {
        havecheck: false, //是否显示选择框
        dataHeader: [
          {
            key: "变更单号",
            width: "100px",
            word: "billNo"
          },
          {
            key: "商户编号",
            width: "160px",
            word: "customerNo"
          },

          {
            key: "入网时间",
            width: "120px",
            word: "createTimeStart"
          },

          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'changeBill');
            }
          }
        ],
        operation: {
          width: "160px",
          options: [
            {
              text: "查看",
              color: "#00c1df",
              cb: rowdata => {
                console.log(rowdata);
                this.checkVisiblebut = false;
                this.editVisiblebut = false;
                if (rowdata.status == "ADMIN_AUDIT" || rowdata.status == "REJECT" || rowdata.status == "INIT") {
                  this.editVisiblebut = true;
                }
                this.detailsFormVisible = true;
                // this.rowData = {
                //   bussinessNo: rowdata.customerNo,
                //   ...rowdata
                // }
                this.rowData = {
                  ...rowdata
                }
                this.newData = { ...JSON.parse(rowdata.nowData) };
                this.oldData = { ...JSON.parse(rowdata.oldData) };
                this.$nextTick(() => {
                  this.$refs.detailProductView.dataInit();
                })
              }
            },
            {
              text: "审核",
              color: "#00c1df",
              visibleFn: rowdata => {
                if (
                  rowdata.status == "ADMIN_AUDIT"
                ) {
                  return true;
                } else {
                  return false;
                }
              },
              cb: rowdata => {

                this.checkVisiblebut = true;
                this.editVisiblebut = false;
                this.detailsFormVisible = true;
                // this.rowData = {
                //   bussinessNo: rowdata.customerNo,
                //   ...rowdata
                // }
                this.rowData = {
                  ...rowdata
                }
                this.newData = { ...JSON.parse(rowdata.nowData) };
                this.oldData = { ...JSON.parse(rowdata.oldData) };
                this.$nextTick(() => {
                  this.$refs.detailProductView.dataInit();
                })
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
    //编辑
    editFn() {
      this.detailsFormVisible = false;
      this.editFormVisible = true;
      this.openProductView = "openInfo";
      // this.$nextTick(() => {
      //   this.$refs.editProductView.dataInit();
      // })
    },
    titleChange(openProductView) {
      if (openProductView == "paystatusInfo") {
        this.productOpenTitle = "完善信息";
      } else if (openProductView == "paystatusGoods") {
        this.productOpenTitle = "开通产品";
      } else if (openProductView == "paystatusUpload") {
        this.productOpenTitle = "上传资质";
      } else if (openProductView == "paystatusSuccess") {
        this.productOpenTitle = "申请完成";
      } else {
        this.productOpenTitle = openProductView;
      }
    },
    // 下一步
    nextFn(next, nextFn) {
      console.log('首页');
      this.openProductView = next;
      this.reloadData()
    },
    backDetail(type) {
      if (type == 'qrcode') {
        this.selectOptions.customerType = "qrcodeStatus";
        this.detailsFormVisible = true;
        this.editFormVisible = false;
      }
      this.changeVisibleFn();
    },
    // 返回
    backFn(path) {
      if (path == "close") {
        this.editFormVisible = false;
        this.openProductView = "";
      } else if (path == "reload") {
        this.editFormVisible = false;
        this.openProductView = "";
      } else {
        this.openProductView = path;
        // this.editFormVisible = true;
      }
      this.reloadData()
    },
    // 审核通过
    adoptSave(customerType, detailsForm) {
      let resaultForm = this.rowData;
      console.log(resaultForm);
      let obj = {
        billNo: resaultForm.billNo,
        status: "WAIT_AUDIT"
      };
      let msg = "确认变更信息申请通过？";
      this.$confirm(msg, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.resaultHandle(obj);
      }).catch(() => {
      });
    },
    // 审核拒绝
    refuseSave(customerType, detailsForm) {
      this.$prompt("请输入拒绝原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S{1,}/,
        inputErrorMessage: "请输入拒绝原因"
      }).then(({ value }) => {
        let resaultForm = this.rowData;
        let obj = {
          billNo: resaultForm.billNo,
          status: "REJECT",
          auditResult: value
        };
        let msg = "确定要拒绝申请吗？";
        this.confirmVisible = true;
        this.confirmMsg = msg;
        this.confirmTitle = "提示";
        this.resaultHandle(obj);
      }).catch(() => {
      });
    },
    // 关闭，拒绝，通过
    resaultHandle(obj) {
      postUpdateBill()(obj).then(res => {
        if (res.code == "00") {
          this.closeVisible = false;
          this.detailsFormVisible = false;
          this.reloadData();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    }
  },
  mounted() {
  },

  computed: {

  },
  watch: {
    editFormVisible(val) {
      if (!val) {
        this.$nextTick(() => {
          if (this.openProductView == "openInfo") {
            this.$refs.editProductView.dataInit();
          }
        })
      }
    }
  }
};
</script>

