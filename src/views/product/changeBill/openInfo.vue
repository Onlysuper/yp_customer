<template>
  <div>
    <div v-if="selectTypeVisible" class="line-box-center">
      <el-select @input="customerTypeChange" size="small" v-model="payStatusForm.customerType" placeholder="请选择">
        <el-option v-for="item in customerTypeSelected" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
        </el-option>
      </el-select>
    </div>
    <!-- 聚合支付开通 start -->
    <component @titleChange="titleChange" v-on:nextFn="nextFn" v-on:backFn="backFn" v-bind:is="currentChildView" :customerTypeSelected="customerTypeSelected" :rowData="rowData" :oldData="oldData" :newData="newData">
    </component>
  </div>

</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.dialog-footer {
  text-align: center;
}
</style>
<script>
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayStr } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
import paystatusInfo from "./paystatusInfo";
import paystatusGoods from "./paystatusGoods";
import paystatusUpload from "./paystatusUpload";
import paystatusSuccess from "./paystatusSuccess";

import {
  getBankList,
  completeSettleInfo,
  getCustomerEchoProduct,
  getCheckCustomerProduct
} from "@src/apis";
import { banks } from "@src/common/bank";
export default {
  name: "changeBillOpenInfo",
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    },
    newData: {
      type: Object
    },
    oldData: {
      type: Object
    }
  },
  components: {
    // 聚合支付
    paystatusInfo: paystatusInfo,
    paystatusGoods,
    paystatusUpload,
    paystatusSuccess
  },
  mixins: [mixinsPc],
  data() {
    return {
      selectTypeVisible: true,
      payStatusForm: {
        // customerType: this.customerTypeSelected[0].value
        customerType: ""
      }, // 必须为数组
      // currentChildView: "paystatusInfo",
      currentChildView: "paystatusInfo",
      formLabelWidth: "100px"
    };
  },

  methods: {
    dataInit() {
      this.currentChildView = "paystatusInfo";
    },
    customerTypeChange(value) {
      this.currentChildView = ""; // 聚合详情
      if (value == "qrcodeStatus") {
        // 快速开票
        this.currentChildView = "qrcodeInfo";
      } else if (value == "elecStatus") {
        // 电子发票
        this.currentChildView = "elecstatusInfo";
      } else if (value == "payStatus") {
        // 聚合支付
        this.currentChildView = "paystatusInfo";
      }
    },
    // 返回
    backFn(path) {
      if (path == "close" || path == "reload") {
        this.$emit("backFn", path);
      } else {
        this.currentChildView = path;
      }
    },
    // 下一步
    nextFn(next) {
      this.currentChildView = next;
    },
    selectInfo() {
      let check = this.customerTypeSelected.find(item => {
        if (!item.disabled) {
          return item;
        }
      });
      this.payStatusForm.customerType = check ? check.value : "";
      this.customerTypeChange(check ? check.value : "");
    },
    titleChange(value) {
      this.$emit("titleChange", value);
    }
  },
  created() {
    console.log('info');
  },
  computed: {},
  mounted() {
    // 默认选择开通第一个可选项
    this.selectInfo();
  },
  watch: {
    currentChildView(value) {
      this.$emit("titleChange", value);
      if (
        value == "paystatusInfo" ||
        value == "elecstatusInfo" ||
        value == "qrcodeInfo"
      ) {
        this.selectTypeVisible = true;
      } else {
        this.selectTypeVisible = false;
      }
    }
  }
};
</script>

