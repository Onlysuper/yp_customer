<template>
  <!-- 聚合支付详情 -->
  <div class="product-detail-body">
    <!-- {{detailsForm}}  -->
    <div class="detaile-left">
      <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
      <div class="scroll-view-cus detail-box-pro">
        <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">更新时间:</span>
            <span class="line-label-last">{{detailsForm.lastUpdateTime}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">开通状态:</span>
            <span class="line-label-last">{{detailsForm.payStatus | statusFilter('handleProductOpenStatus')}}</span>
          </div>
        </div>
        <div class="split－padding"></div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">微信费率:</span>
            <span class="line-label-last">{{utils.accMul(payStatusDetails.wechatRate,100)+'%' ||""}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">支付宝费率:</span>
            <span class="line-label-last">{{utils.accMul(payStatusDetails.alipayRate,100)+'%'||""}}</span>
          </div>
        </div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">开通秒到:</span>
            <span class="line-label-last">{{payStatusDetails.settleMode | statusFilter('settleMode')}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">D0手续费:</span>
            <span class="line-label-last">{{payStatusDetails.t0CashCostFixed||"0"}}</span>
          </div>
        </div>
        <div class="split－padding"></div>
        <div class="line-label-box">
          <span class="lable-title gray-back">企业名称:</span>
          <span class="line-label-last">{{payStatusDetails.enterpriseName}}</span>
        </div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">企业税号:</span>
            <span class="line-label-last">{{payStatusDetails.taxNo}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">行业类型:</span>
            <span class="line-label-last">{{payStatusDetails.category?utils.findBussinessType(payStatusDetails.category).name:""}}</span>
          </div>
        </div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">身份证号:</span>
            <span class="line-label-last">{{payStatusDetails.idCard}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">法人:</span>
            <span class="line-label-last">{{payStatusDetails.legalPerson}}</span>
          </div>
        </div>
        <div class="line-label-box">
          <div class="line-cell">
            <span class="lable-title gray-back">所在地区:</span>
            <span class="line-label-last">{{payStatusDetails.orgCode?utils.findCity(payStatusDetails.orgCode).resultAddr:""}}</span>
          </div>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">详细地址:</span>
          <span class="line-label-last">{{payStatusDetails.bussinessAddress}}</span>
        </div>
        <div class="split－padding"></div>
        <div class="line-label-box">
          <span class="lable-title gray-back">账户名称:</span>
          <span class="line-label-last">{{payStatusDetails.accountName||""}}</span>
        </div>
        <div class="line-label-box split">
          <div class="line-cell">
            <span class="lable-title gray-back">账号:</span>
            <span class="line-label-last">{{payStatusDetails.accountNo||""}}</span>
          </div>
          <div class="line-cell">
            <span class="lable-title gray-back">账户类型:</span>
            <span class="line-label-last">{{payStatusDetails.accountType | statusFilter('accountType')}}</span>
          </div>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">开户银行:</span>
          <span class="line-label-last">{{payStatusDetails.bankName||""}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">开户支行:</span>
          <span class="line-label-last">{{payStatusDetails.branchName||""}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">营业期限:</span>
          <span class="line-label-last">{{payStatusDetails.bussinessLicenseEffectiveBegin}} - {{payStatusDetails.bussinessLicenseEffectiveEnd}}</span>
        </div>
      </div>
      <!-- </iscroll-view> -->
    </div>
    <div class="detaile-right" v-if="detailRightVisible">
      <div class="scroll-box">
        <div class="small-but pre" @click="preFn" slot="preBut">《</div>
        <div class="small-but next" @click="preNext" slot="nextBut">》</div>
        <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
          <div class="imgs-group">
            <div class="img-box" v-for="(item,index) in imgsArr" :key="index">
              <p class="img-title">{{item[1].imgname}}:</p>
              <div class="img-back">
                <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname)" class="img-size" :src="item[1].url" alt="">
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
      <largeimg-view :payStatusDetails="payStatusDetails" ref="largeImg" :imgsArr="imgsArr" :largeImg="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" @rotateInit="rotateInit" :fadeViewVisible="fadeViewVisible">
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
      identityFrontImg: "", //法人身份证人像面
      identityBackImg: "", //法人身份证国徽面
      identityHolderImg: "", //手持身份证
      bussinessLicenseImg: "", //营业执照
      settleCardImg: "", //结算卡正面
      accountLicenseImg: "", //开户许可证
      placeImg: "", //门头照片
      storeImg: "", //店内照片
      cashSpaceImg: "", //授权书照片
      certificateImg: "", //收银台照片
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
        },
        certificateImg: {
          url: ""
        }
      }
    }
    return {
      detailRightVisible: true,// 右侧是否显示
      accountVisible: false,// 开户行许可证 
      certificateVisible: false,// 授权书
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
      largeImg: {},
      detailsForm: detailsForm,
      payStatusDetails: { ...payStatusDetails },
      imgsArr: []
      // imgsRow: {},

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
          let imgsRow = utils.pickObj(data.imgs, [
            "identityFrontImg", "identityBackImg", "identityHolderImg", "bussinessLicenseImg", "settleCardImg", "placeImg", "storeImg", "cashSpaceImg"
          ]);
          let addImgs = {};
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
            if (settleCardRow.accountType == "0") {
              // 对公  有开户许可证 没有授权证
              imgsRow = {                ...utils.pickObj(data.imgs, [
                  "accountLicenseImg",
                ]), ...imgsRow              }
            } else if (settleCardRow.accountType == "1") {
              // 对私
              if (settleCardRow.accountName == customerRow.legalPerson) {
                //没有开户许可证 没有授权证
              } else {
                //没有开户许可证 有授权证
                imgsRow = {                  ...utils.pickObj(data.imgs, [
                    "certificateImg"
                  ]), ...imgsRow                };
              }
            } else {
              // imgsRow = utils.pickObj(data.imgs, [
              //   "accountLicenseImg"
              // ]);
            }
            let imgsArr = Object.entries(imgsRow);
            for (var i = 0; i < imgsArr.length; i++) {
              let item = imgsArr[i][1];
              let index = imgsArr[i][0];
              if (index == "identityFrontImg") {
                item["imgname"] = "法人身份证人像面"
              } else if (index == "identityBackImg") {
                item["imgname"] = "法人身份证国徽面"
              } else if (index == "bussinessLicenseImg") {
                item["imgname"] = "营业执照"
              } else if (index == "identityHolderImg") {
                item["imgname"] = "手持身份证"
              } else if (index == "settleCardImg") {
                item["imgname"] = "结算卡正面"
              } else if (index == "accountLicenseImg") {
                item["imgname"] = "开户许可证"
              } else if (index == "placeImg") {
                item["imgname"] = "门头照片"
              } else if (index == "storeImg") {
                item["imgname"] = "店内照片"
              } else if (index == "cashSpaceImg") {
                item["imgname"] = "收银台照片"
              } else if (index == "certificateImg") {
                item["imgname"] = "授权书照片"
              } else {
                item["imgname"] = ""
              }
              ((i) => {
                let item = imgsArr[i][1];
                let index = imgsArr[i][0];
                var newImg = new Image();
                newImg.src = item.url;
                // console.log(item.url);
                newImg.onerror = () => {
                  imgsArr[i][1].url = ""
                }
                newImg.onload = () => {
                  if (this.largeImgUrl == "") {
                    // 默认显示的图片
                    this.largeImg = { imgname: index, url: item.url };
                    this.largeImgUrl = item.url
                  }
                }
              })(i)

            }
            this.imgsArr = imgsArr;
            if (this.imgsArr.length == 0) {
              this.detailRightVisible = false;
            } else {
              this.detailRightVisible = true;
            }
          } else {
            this.detailRightVisible = false;
          }
          // this.imgsRow = imgsRow;
          this.payStatusDetails = {
            ...this.payStatusDetails,
            ...customerRow,
            ...settleCardRow,
            ...productRow,
            // ...imgsRow
          }

        }
        dialogLoading.close();
      });
    },
    rotateFn() {
      this.rotateCurrent = (this.rotateCurrent + 90) % 360;
      this.rotateClass = "rotate" + this.rotateCurrent;
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
    largeImageShow() {
      this.fadeViewVisible = true;
      this.$refs.largeImg.imgInit()
    },
    showImg(url, imgname, type) {
      console.log(url + "--" + imgname + "--" + type)
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.largeImg = { imgname: imgname, url: url };
      // this.rotateCurrent = 0
      // this.rotateClass = "";
      // this.largeImgUrl = val.url;
      // this.largeImg = { imgname: imgname, ...val };
    },
    rotateInit() {
      this.rotateCurrent = 0
      this.rotateClass = "";
    },
    hideImageView() {
      this.fadeViewVisible = false;
    }
  }
};
</script>

