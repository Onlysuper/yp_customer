<template>
  <!-- 聚合支付详情 -->
  <div class="product-detail-body">
    <!-- <div class="scroll-view-cus detail-box">
        <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
    <div class="detaile-left">
      <div class="scroll-view-cus detail-box-pro">
        <!-- <iscroll-view class="scroll-view-cus " ref="iscroll" :options="iscrollOptions"> -->
        <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">开通状态:</span>
          <span class="line-label-last">{{detailsForm.elecStatus | statusFilter('handleProductOpenStatus')}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">更新时间:</span>
          <span class="line-label-last">{{detailsForm.lastUpdateTime}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">商户名称:</span>
          <span class="line-label-last">{{detailsForm.customerName}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">注册省份:</span>
          <span class="line-label-last"> {{elecStatusDetails.orgCode?utils.findCity(elecStatusDetails.orgCode).resultAddr:""}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">注册地址:</span>
          <span class="line-label-last"> {{elecStatusDetails.bussinessAddress}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">联系电话:</span>
          <span class="line-label-last">{{elecStatusDetails.bussinessPhone}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">经营名称:</span>
          <span class="line-label-last">{{elecStatusDetails.bussinessName}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">注册资金:</span>
          <span class="line-label-last">{{elecStatusDetails.registMoney}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">开户银行:</span>
          <span class="line-label-last">{{elecStatusDetails.branchName}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">银行账号:</span>
          <span class="line-label-last">{{elecStatusDetails.bankAccountNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">月开票量:</span>
          <span class="line-label-last">{{elecStatusDetails.elecBillnum}}</span>
        </div>
        <div class="line-label-box" v-if="elecStatusDetails.elecReason==''||elecStatusDetails.elecReason==null?false:true">
          <span class="lable-title gray-back">被拒原因:</span>
          <span class="line-label-last">{{elecStatusDetails.elecReason}}</span>
        </div>
        <!-- </iscroll-view> -->
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
@import "../../../../src/assets/scss-pc/payDetail.scss";
</style>
<script>
import Vue from "vue";
import IScrollView from "vue-iscroll-view";
import IScroll from "iscroll";
Vue.use(IScrollView, IScroll);
import imageView from 'vue-imageview'
import ScrollPane from "@src/components/ScrollPane";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayStr } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify, idCardVerify_r } from "@src/common/regexp";
import { areaOrgcode } from "@src/common/orgcode";
import utils from "@src/common/utils"
import {
  getQueryCustomerElectronic
} from "@src/apis";
import { banks } from "@src/common/bank";
export default {
  name: "eleDetail",
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    },
    doWhat: {
      type: Object
    }
  },
  components: {
    ScrollPane,
    ImageView: imageView
  },
  mixins: [mixinsPc],
  data() {
    var elecStatusDetails = { // 电子发票默认数据解构
      orgCode: "", //注册省份
      bussinessAddress: "", //注册地址
      bussinessPhone: "", //联系电话
      bussinessName: "", //经营名称
      registMoney: "", //注册资金
      branchName: "", //开户银行
      bankAccountNo: "", //银行账号
      elecBillnum: "", //月开票量
      elecReason: "" //被拒原因
    }
    return {
      iscrollOptions: {
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      },
      fadeViewVisible: false,
      largeUrl: "",
      largeImgUrl: "",
      detailsForm: {},
      elecStatusDetails: elecStatusDetails,
    }
  },
  created() {
    this.detailsForm = Object.assign(this.detailsForm, this.rowData);
    this.getElectronicEcho();
  },
  methods: {
    // 聚合支付回显
    getElectronicEcho() {
      let resaultData = this.rowData;
      let dialogLoading = this.$loading({
        target: document
          .querySelector("#dialogLoding")
          .querySelector(".el-dialog")
      });
      getQueryCustomerElectronic()({
        customerNo: resaultData.bussinessNo,
        featureType: "ELECTRONIC"
      }).then(res => {
        if (res.code == "00") {
          let data = res.data;
          let customerRow = {};
          let customerInvoiceConfigRow = {};
          let productRow = {};
          if (data.customer) {
            customerRow = utils.pickObj(data.customer, [
              "orgCode", 'bussinessAddress', 'bussinessPhone', 'bussinessName', 'registMoney'
            ]);
          }
          if (data.customerInvoiceConfig) {
            customerInvoiceConfigRow = utils.pickObj(data.customerInvoiceConfig, [
              'branchName', 'bankAccountNo'
            ]);
          }
          if (data.product) {
            productRow = utils.pickObj(data.product, ['elecBillnum', 'elecReason']);
          }
          this.elecStatusDetails = { ...this.elecStatusDetails, ...customerRow, ...customerInvoiceConfigRow, ...productRow }
        }
        dialogLoading.close();
      });
    },
    preFn() {
      this.$refs.scrollPane.preFn(90)
    },
    preNext() {
      this.$refs.scrollPane.preNext(90)
    },
    resetScrollViewHeight() {
      this.$nextTick(() => {
        this.$refs.iscroll.refresh();
      })
    },
    largeImageShow(url, type) {
      this.largeUrl = [url];
      this.fadeViewVisible = true
      this.imageIndex = 0
    },
    showImg(val, type) {
      if (type == 'pay') {
        this.largeImgUrl = val
      } else if (type == 'qrcode') {
        this.largeImgUrl = val
      }
    },
    hideImageView() {
      this.fadeViewVisible = false
    }
  }
};
</script>

