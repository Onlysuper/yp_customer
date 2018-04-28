<template>
  <!-- 银行商户 -->
  <div class="admin-page">
    <div class="admin-main-box">
      <!-- search form start -->
      <myp-search-form @changeform="callbackformHandle" @resetInput="resetSearchHandle" @visiblesome="visiblesomeHandle" @changeSearchVisible="changeSearchVisible" @seachstart="seachstartHandle" :searchOptions="searchOptions"></myp-search-form>
      <!-- search form end -->
      <myp-data-page :actionUrl="actionUrl" @pagecount="pagecountHandle" @pagelimit="pagelimitHandle" @operation="operationHandle" ref="dataTable" :tableDataInit="tableData" :page="postPage" :limit="postLimit" :search="postSearch"></myp-data-page>
      <!-- 详情 start -->
      <el-dialog title="详情" center :visible.sync="detailsFormVisible">
        <div class="detail-content">
          <div class="line-label-box cross-back">
            <span class="line-label">商户编号:</span>
            <span class="line-label-last">{{detailsForm.customerNo}}</span>
            <span class="line-label">银行商户编号:</span>
            <span class="line-label-last">{{detailsForm.bankCustomerNo}}</span>
          </div>
          <div class="line-label-box cross-back">
            <span class="line-label">通道:</span>
            <span class="line-label-last">{{statusFilter(detailsForm.channelNo, 'channelWay').text}}</span>
            <span class="line-label">状态:</span>
            <span class="line-label-last">{{statusFilter(detailsForm.status, 'bankCustomerStatus').text}}</span>
          </div>
          <div class="line-label-box cross-back">
            <span class="line-label">备注:</span>
            <span class="line-label-last">{{detailsForm.remark}}</span>
          </div>
          <div class="line-label-box cross-back">
            <span class="line-label">审核结果:</span>
            <span class="line-label-last">{{detailsForm.checkReason}}</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="detailsFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 详情 end -->
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.full-width {
  width: 100%;
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
<script>
import SearchForm from "@src/components/SearchForm";
import DataPage from "@src/components/DataPage";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { mixinDataTable } from "@src/components/DataPage/dataPage";
import utils from "@src/common/utils";
import {
  getbankCustomers
} from "@src/apis";
export default {
  name: "bankCustomer",
  components: {
    "myp-search-form": SearchForm, // 搜索组件
    "myp-data-page": DataPage // 数据列表组件
  },
  mixins: [mixinsPc, mixinDataTable],
  data() {
    var searchConditionVar = {
      status: "", // 商户编码
      customerNo: "", // 商户编号
      bankCustomerNo: "", // 商品名称
      channelNo: "" // 商品名称
    };
    return {
      detailsFormVisible: false,
      detailsForm: {},
      formLabelWidth: "100px",
      // 查询条件数据
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
          corresattr: "bankCustomerNo",
          type: "text",
          label: "银行商户编号",
          show: true, // 普通搜索显示
          value: "",
          cb: value => {
            this.searchCondition.bankCustomerNo = value;
          }
        },
        {
          corresattr: "channelWay",
          type: "select",
          label: "通道",
          show: true, // 普通搜索显示
          value: "",
          options: [
            {
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('channelWay')
          ],
          cb: value => {
            this.searchCondition.channelNo = value;
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
              value: "",
              label: "全部"
            },
            ...this.statusFilterQuery('bankCustomerStatus')
          ],
          cb: value => {
            this.searchCondition.status = value;
          }
        },
      ],

      // 列表数据
      actionUrl: getbankCustomers,
      postSearch: searchConditionVar,
      tableData: {
        dataHeader: [
          // table列信息 key=>表头标题，word=>表内容信息
          {
            key: "商户编号",
            width: "120px",
            sortable: true,
            word: "customerNo"
          },
          {
            key: "银行商户编号",
            width: "100px",
            word: "bankCustomerNo"
          },
          {
            key: "通道",
            width: "100px",
            word: "channelNo",
            status: true,
            type: data => {
              return this.statusFilter(data, 'channelWay')
            }
          },

          {
            key: "状态",
            width: "120px",
            word: "status",
            status: true,
            type: data => {
              return this.statusFilter(data, 'bankCustomerStatus')
            }
          }
          // {
          //   key: "备注",
          //   width: "100px",
          //   word: "remark"
          // },
          // {
          //   key: "审核原因",
          //   width: "80px",
          //   word: "checkReason"
          // }
        ],
        operation: {
          width: "80px",
          options: [
            // 操作按钮
            {
              text: "详情",
              color: "#00c1df",
              cb: rowdata => {
                this.detailsForm = rowdata;
                this.detailsFormVisible = true
              }
            }
          ]
        }
      }
    };
  },

  methods: {
  },
  computed: {},
  mounted() { }
};
</script>

