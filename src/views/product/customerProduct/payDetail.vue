<template>
  <!-- 聚合支付详情 -->
  <div class="product-detail-body">
    <!-- {{detailsForm}}  -->
    <div class="detaile-left">
      <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
      <div class="scroll-view-cus">
        <div class="line-label-box">
          <span class="line-label">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">商户名称:</span>
          <span class="line-label-last">{{detailsForm.customerName}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">聚合状态:</span>{{detailsForm.payStatus | handleProductOpenStatus}}
        </div>
        <div class="line-label-box">
          <span class="line-label">企业名称:</span>
          <span class="line-label-last">{{payStatusDetails.enterpriseName}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">企业税号:</span>
          <span class="line-label-last">{{payStatusDetails.taxNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">营业执照期限:</span>
          <span class="line-label-last">{{payStatusDetails.bussinessLicenseEffectiveBegin}} - {{payStatusDetails.bussinessLicenseEffectiveEnd}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">所在地区:</span>{{payStatusDetails.orgCode?utils.findCity(payStatusDetails.orgCode).resultAddr:""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">详细地址:</span>{{payStatusDetails.bussinessAddress}}
        </div>
        <div class="line-label-box">
          <span class="line-label">法人:</span>{{payStatusDetails.legalPerson}}
        </div>
        <div class="line-label-box">
          <span class="line-label">身份证号:</span>{{payStatusDetails.idCard}}
        </div>
        <div class="line-label-box">
          <span class="line-label">行业类型:</span>{{payStatusDetails.category?utils.findBussinessType(payStatusDetails.category).name:""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">账户类型:</span>{{payStatusDetails.accountType | accountType}}
        </div>
        <div class="line-label-box">
          <span class="line-label">账户名称:</span>{{payStatusDetails.accountName||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">开户银行:</span>{{payStatusDetails.bankName||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">开户支行:</span>{{payStatusDetails.branchName||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">账号:</span>{{payStatusDetails.accountNo||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">微信费率:</span>{{utils.accMul(payStatusDetails.wechatRate,100)+'%' ||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">支付宝费率:</span>{{utils.accMul(payStatusDetails.alipayRate,100)+'%'||""}}
        </div>
        <div class="line-label-box">
          <span class="line-label">开通即刷即到:</span>{{payStatusDetails.settleMode | settleMode}}
        </div>
        <div class="line-label-box">
          <span class="line-label">D0手续费:</span>{{payStatusDetails.t0CashCostFixed||""}}
        </div>
      </div>
      <!-- </iscroll-view> -->
    </div>
    <div class="detaile-right">
      <div class="scroll-box">
        <div class="small-but pre" @click="preFn" slot="preBut">《</div>
        <div class="small-but next" @click="preNext" slot="nextBut">》</div>
        <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
          <div class="imgs-group">
            <div class="img-box">
              <p class="img-title">法人身份证正面:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.identityFrontImg.url||'','pay','法人身份证正面')" class="img-size" :src="payStatusDetails.identityFrontImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">法人身份证反面:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.identityBackImg.url||'','pay','法人身份证反面')" class="img-size" :src="payStatusDetails.identityBackImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">营业执照:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.bussinessLicenseImg.url||'','pay','营业执照')" class="img-size" :src="payStatusDetails.bussinessLicenseImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">手持身份证:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.identityHolderImg.url||'','pay','手持身份证')" class="img-size" :src="payStatusDetails.identityHolderImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">结算卡正面:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.settleCardImg.url||'','pay','结算卡正面')" class="img-size" :src="payStatusDetails.settleCardImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">开户许可证:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.accountLicenseImg.url||'','pay','开户许可证')" class="img-size" :src="payStatusDetails.accountLicenseImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">门头照片:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.placeImg.url||'','pay','门头照片')" class="img-size" :src="payStatusDetails.placeImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">店内照片:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.storeImg.url||'','pay','店内照片')" class="img-size" :src="payStatusDetails.storeImg.url||''" alt="">
              </div>
            </div>
            <div class="img-box">
              <p class="img-title">收银台照片:</p>
              <div class="img-back">
                <img @click="showImg(payStatusDetails.cashSpaceImg.url||'','pay','收银台照片')" class="img-size" :src="payStatusDetails.cashSpaceImg.url||''" alt="">
              </div>
            </div>
          </div>
        </scroll-pane>
      </div>
      <div class="large-img-box">
        <div class="large-img">
          <!-- <img @click="largeImageShow(largeImgUrl,'payStatus')" :class="'img-large '+rotateClass" :src="largeImgUrl" :alt="largeImgArt"> -->
          <img @click="largeImageShow(largeImgUrl,'payStatus')" :class="'img-large'" :src="largeImgUrl" :alt="largeImgArt">
        </div>
      </div>
      <!-- <div class="largeButgroup">
        <i title="旋转" @click="rotateFn" class="el-icon-refresh but"></i>
      </div> -->
    </div>
    <!-- <transition name="slide-fade" class="fadeView">
      <div v-if="fadeViewVisible">
        <image-view :class="rotateClass" :imgArr="largeUrl" :showImageView="true" :imageIndex="0" v-on:hideImage="hideImageView"></image-view>
      </div>
    </transition> -->
    <transition name="slide-fade" class="fadeView">
      <largeimg-view ref="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" :fadeViewVisible="fadeViewVisible">
      </largeimg-view>
    </transition>
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
import LargeimgView from '@src/components/LargeimgView'
import ScrollPane from "@src/components/ScrollPane";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayDate } from "@src/common/dateSerialize";
import { taxNumVerify, idCardVerify, phoneNumVerify, idCardVerify_r } from "@src/common/regexp";
import { regionData } from "element-china-area-data";
import { areaOrgcode } from "@src/common/orgcode";
import utils from "@src/common/utils"
import {
  getBankList,
  completeSettleInfo,
  getCustomerEchoProduct
} from "@src/apis";
import { banks } from "@src/common/bank";
export default {
  name: "payDetail",
  props: {
    customerTypeSelected: {
      type: Array
    },
    rowData: {
      type: Object
    }
  },
  components: {
    ScrollPane,
    ImageView: imageView,
    LargeimgView
  },
  mixins: [mixinsPc],
  data() {
    var payStatusDetails = {
      orgCode: "", //所在地
      bussinessAddress: "", //注册地址
      legalPerson: "", //法人
      idCard: "", //身份证号
      category: "", //行业类型
      // contactEmail: "", //邮箱
      accountType: "", //账户类型
      accountName: "", //账户名称
      bankName: "", //开户银行
      branchName: "", //开户支行
      accountNo: "", //账号
      wechatRate: "", //微信费率
      settleMode: "", //开通即刷即到
      t0CashCostFixed: "", //D0手续费
      identityFrontImg: "", //法人身份证正面
      identityBackImg: "", //法人身份证反面
      identityHolderImg: "", //手持身份证
      bussinessLicenseImg: "", //营业执照
      settleCardImg: "", //结算卡正面
      accountLicenseImg: "", //开户许可证
      placeImg: "", //门头照片
      storeImg: "", //店内照片
      cashSpaceImg: "" //收银台照片
    }
    var detailsForm = { // 查看一级数据详情 数据解构
      customer: {},
      settleCard: {},
      product: {},

      imgs: {
        identityBackImg: {
          url: ""
        },

        identityFrontImg: {
          url: ""
        },
        identityHolderImg: {
          url: ""
        },
        bussinessLicenseImg: {
          url: ""
        },
        settleCardImg: {
          url: ""
        },
        accountLicenseImg: {
          url: ""
        },
        placeImg: {
          url: ""
        },
        storeImg: {
          url: ""
        },
        cashSpaceImg: {
          url: ""
        }
      }
    }
    return {
      iscrollOptions: {
        preventDefault: false,
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      },
      largeImgArt: "",
      rotateClass: "",
      rotateCurrent: 0,
      fadeViewVisible: false,
      largeUrl: "",
      largeImgUrl: "",
      detailsForm: detailsForm,
      payStatusDetails: { ...payStatusDetails }
    }
  },
  created() {
    this.detailsForm = Object.assign(this.detailsForm, this.rowData);
    this.getCustomerEcho();
  },
  methods: {
    // 聚合支付回显
    getCustomerEcho() {
      let resaultData = this.rowData;
      let dialogLoading = this.$loading({
        target: document
          .querySelector("#dialogLoding")
          .querySelector(".el-dialog")
      });
      getCustomerEchoProduct()({
        customerNo: resaultData.bussinessNo,
        featureType: "CONVERGE_PAY"
      }).then(res => {
        if (res.code == "00") {
          // 聚合支付查询详情

          let data = res.data;
          let customerRow = {};
          let settleCardRow = {};
          let productRow = {};
          let imgsRow = {};
          if (data.customer) {
            customerRow = utils.pickObj(data.customer, [
              "orgCode", 'bussinessAddress', 'legalPerson', 'idCard', 'category',
              'taxNo', 'enterpriseName', 'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd'
            ]);
          }
          if (data.settleCard) {
            settleCardRow = utils.pickObj(data.settleCard, [
              "accountType", 'accountName', 'bankName', 'branchName', 'accountNo',
            ]);
          }
          if (data.product) {
            productRow = utils.pickObj(data.product, [
              "wechatRate", 'alipayRate', 'settleMode', 't0CashCostFixed',
            ]);
          }

          if (data.imgs) {
            imgsRow = utils.pickObj(data.imgs, [
              "identityFrontImg", "identityBackImg", "identityHolderImg", "bussinessLicenseImg", "settleCardImg",
              "accountLicenseImg", "placeImg", "storeImg", "cashSpaceImg"
            ]);
          }
          let accountName = "";// 账户名称
          if (settleCardRow.accountType == "0") {
            // 对公:带入企业名称 不可更改
            accountName = customerRow.enterpriseName
          } else if (settleCardRow.accountType == "1") {
            // 对私
            accountName = settleCardRow.accountName == customerRow.enterpriseName ? customerRow.legalPerson : settleCardRow.accountName || customerRow.legalPerson;
          }
          this.payStatusDetails = {
            ...this.payStatusDetails,
            ...customerRow,
            ...settleCardRow,
            ...productRow,
            ...imgsRow,
            ...{ accountName: accountName }
          }
          // for (var i in imgsRow) {
          //   if (imgsRow[i].url) {
          //     this.largeImgUrl = imgsRow[i].url
          //     // break;
          //   }
          // }
        }
        dialogLoading.close();
      });
    },
    rotateFn() {
      this.rotateCurrent = (this.rotateCurrent + 90) % 360;
      this.rotateClass = "rotate" + this.rotateCurrent;
      console.log(this.rotateClass);
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
    // largeImageShow(url, type, imgName) {
    //   this.largeImgArt = imgName;
    //   this.largeUrl = [url];
    //   this.fadeViewVisible = true
    //   this.imageIndex = 0
    // },
    largeImageShow() {
      this.fadeViewVisible = true;
      this.$refs.largeImg.imgInit()
    },
    showImg(val, type) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = val
    },
    hideImageView() {
      this.fadeViewVisible = false;
    }
  }
};
</script>

