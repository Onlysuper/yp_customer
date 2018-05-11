<template>
  <!-- 聚合支付详情 -->
  <div class="product-detail-box">
    <h2 v-if="false" class="pro-title">变更前</h2>
    <div class="product-detail-body change-before">
      <div class="detaile-left">
        <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
        <div :class="'scroll-view-cus detail-box-pro rightVsible' + detailRightVisible">
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">商户编号:</span>
              <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">预留手机号:</span>
              <span class="line-label-last">{{payStatusDetails.reservedPhoneNo}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">邮箱:</span>
            <span class="line-label-last">{{payStatusDetails.contactEmail}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">身份证有效期:</span>
            <span class="line-label-last">{{payStatusDetails.idNoEffectiveBegin}} 至 {{payStatusDetails.idNoEffectiveEnd}}</span>
          </div>
          <!-- <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
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
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">账户名称:</span>
              <span class="line-label-last">{{payStatusDetails.accountName||""}}</span>
            </div>
            <div v-if="settleIdCardVisible" class="line-cell">
              <span class="lable-title gray-back">结算人身份证:</span>
              <span class="line-label-last">{{payStatusDetails.settleIdCard}}</span>
            </div>
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
          <div class="small-but pre" @click="preFn('scrollPane')" slot="preBut">《</div>
          <div class="small-but next" @click="preNext('scrollPane')" slot="nextBut">》</div>
          <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
            <div class="imgs-group">
              <div class="img-box" v-for="(item,index) in imgsArr" :key="index">
                <p class="img-title">{{item[1].imgname}}:</p>
                <div class="img-back">
                  <!-- <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname,item[1].name)" class="img-size" :src="item[1].url" alt=""> -->
                  <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname,item[1].name,index,'carousel')" class="img-size" :src="item[1].url" alt="">
                </div>

              </div>
            </div>
          </scroll-pane>
        </div>
        <div class="large-img-box">
          <el-carousel ref="carousel" :autoplay='false' :initial-index="initialIndex" :interval="5000" trigger='click' arrow="always" height="100%">
            <el-carousel-item v-for="(item,index) in imgsArr" :key="index" :label="item[1].name">
              <div class="large-img">
                <img @click="largeImageShow(item[1].url,'payStatus',item[0])" :src="item[1].url" alt="">
              </div>
              <p class="large-imgname">{{item[1].imgname}}</p>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <h2 v-if="false" class="pro-title">变更后</h2>
    <div v-if="false" class="product-detail-body change-before">
      <div class="detaile-left">
        <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
        <div :class="'scroll-view-cus detail-box-pro rightVsible' + detailRightVisible">
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">商户编号:</span>
              <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">预留手机号:</span>
              <span class="line-label-last">{{payStatusDetails.reservedPhoneNo}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">身份证有效期:</span>
            <span class="line-label-last">{{payStatusDetails.idNoEffectiveBegin}} 至 {{payStatusDetails.idNoEffectiveEnd}}</span>
          </div>
          <!-- <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
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
          <div class="small-but pre" @click="preFn('scrollPaneAfter')" slot="preBut">《</div>
          <div class="small-but next" @click="preNext('scrollPaneAfter')" slot="nextBut">》</div>
          <scroll-pane class='tags-view-wrapper' ref='scrollPaneAfter'>
            <div class="imgs-group">
              <div class="img-box" v-for="(item,index) in imgsArr" :key="index">
                <p class="img-title">{{item[1].imgname}}:</p>
                <div class="img-back">
                  <!-- <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname,item[1].name)" class="img-size" :src="item[1].url" alt=""> -->
                  <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname,item[1].name,index,'carouselAfter')" class="img-size" :src="item[1].url" alt="">
                </div>
              </div>
            </div>
          </scroll-pane>
        </div>
        <div class="large-img-box">
          <el-carousel ref="carouselAfter" :autoplay='false' :initial-index="initialIndex" :interval="5000" trigger='click' arrow="always" height="100%">
            <el-carousel-item v-for="(item,index) in imgsArr" :key="index" :label="item[1].name">
              <div class="large-img">
                <img @click="largeImageShow(item[1].url,'payStatus',item[0])" :src="item[1].url" alt="">
              </div>
              <p class="large-imgname">{{item[1].imgname}}</p>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <transition name="slide-fade" class="fadeView">
      <largeimg-view :payStatusDetails="payStatusDetails" ref="largeImg" :imgsArr="imgsArr" :largeImg="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" @rotateInit="rotateInit" :fadeViewVisible="fadeViewVisible">
      </largeimg-view>
    </transition>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 18px;
//   opacity: 0.75;
//   line-height: 300px;
//   margin: 0;
//   // background: red;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }

@import "../../../../src/assets/scss-pc/payDetail.scss";
.rightVsiblefalse {
  .line-label-box.split {
    justify-content: flex-start !important;
  }
  .line-label-last {
    min-width: 250px !important;
  }
}
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
      settleIdCard: ""
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
      settleIdCardVisible: false,
      initialIndex: 0,//图片滚动滚动索引
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
          let imgsRow = {};
          imgsRow = utils.pickObj(data.imgs, [
            "bussinessLicenseImg", "identityFrontImg", "identityBackImg", "placeImg", "cashSpaceImg", "storeImg"
          ]);
          let addImgs = {};
          if (data.customer) {
            customerRow = utils.pickObj(data.customer, [
              "orgCode", 'bussinessAddress', 'legalPerson', 'idCard', 'category',
              'taxNo', 'enterpriseName', 'bussinessLicenseEffectiveBegin', 'bussinessLicenseEffectiveEnd',
              'idNoEffectiveBegin', 'idNoEffectiveEnd', 'contactEmail'
            ]);
          }
          if (data.settleCard) {
            settleCardRow = utils.pickObj(data.settleCard, [
              "accountType", 'accountName', 'bankName', 'branchName', 'accountNo', 'reservedPhoneNo', 'settleIdCard'
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
              imgsRow = {
                ...utils.pickObj(data.imgs, [
                  "accountLicenseImg",
                ]),
                ...imgsRow
              }
            } else if (settleCardRow.accountType == "1") {

              if (settleCardRow.accountName == customerRow.legalPerson) {
                //对私法人
                imgsRow = {
                  ...utils.pickObj(data.imgs, [
                    "settleCardImg",
                    "identityHolderImg"
                  ]), ...imgsRow
                };
              } else {
                //非法人
                imgsRow = {
                  ...utils.pickObj(data.imgs, [
                    "settleCardImg",
                    "certificateImg",
                    "cardHolderFrontImg",
                    "cardHolderBackImg",
                    "holdCertificateImg",
                    "cardHolderIdImg"
                  ]), ...imgsRow
                };

              }
            } else {
              imgsRow = utils.pickObj(data.imgs, [
                "accountLicenseImg"
              ]);
            }
            let imgsArr = Object.entries(imgsRow);
            for (var i = 0; i < imgsArr.length; i++) {
              let item = imgsArr[i][1];
              let index = imgsArr[i][0];
              let imgname = "";
              if (index == "identityFrontImg") {
                imgname = "法人身份证人像面"
              } else if (index == "identityBackImg") {
                imgname = "法人身份证国徽面"
              } else if (index == "bussinessLicenseImg") {
                imgname = "营业执照"
              } else if (index == "identityHolderImg") {
                imgname = "法人手持身份证"
              } else if (index == "settleCardImg") {
                imgname = "结算卡正面"
              } else if (index == "accountLicenseImg") {
                imgname = "开户许可证"
              } else if (index == "placeImg") {
                imgname = "门头照片"
              } else if (index == "storeImg") {
                imgname = "店内照片"
              } else if (index == "cashSpaceImg") {
                imgname = "收银台照片"
              } else if (index == "certificateImg") {
                imgname = "授权书照片"
              } else if (index == "holdCertificateImg") {
                imgname = "法人手持身份证与授权书"
              } else if (index == "cardHolderFrontImg") {
                imgname = "结算人人面像"
              } else if (index == "cardHolderBackImg") {
                imgname = "结算人人国徽面"
              } else if (index == "cardHolderIdImg") {
                imgname = "结算人手持身份证合影"
              }
              if (item) {
                item["imgname"] = imgname;
                // if (item.url) {
                //   if (this.largeImgUrl == "") {
                //     // 默认显示的图片
                //     this.largeImg = { imgname: index, url: item.url, name: imgname };
                //     this.largeImgUrl = item.url
                //   }
                // }
                // ((i) => {
                //   let item = imgsArr[i][1];
                //   let index = imgsArr[i][0];
                //   var newImg = new Image();
                //   newImg.src = item.url;
                //   newImg.onerror = () => {
                //     imgsArr[i][1].url = ""
                //   }
                //   newImg.onload = () => {
                //     if (this.largeImgUrl == "") {
                //       // 默认显示的图片
                //       this.largeImg = { imgname: index, url: item.url };
                //       this.largeImgUrl = item.url
                //     }
                //   }
                // })(i)
              }
              else {
                imgsArr[i][1] = {
                  imgname: imgname,
                  url: ""
                }
              }
            }
            this.imgsArr = imgsArr;
          } else {
            this.detailRightVisible = false;
          }
          if (this.detailsForm.payStatus == 'INIT') {
            this.detailRightVisible = false;
          }
          this.payStatusDetails = {
            ...this.payStatusDetails,
            ...customerRow, 
            ...settleCardRow,
            ...productRow
          }
          if (settleCardRow.accountType == "1") {
            //非法人
            this.settleIdCardVisible = true;
          }
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
            center: true
          });
        }
        dialogLoading.close();
      });
    },
    rotateFn() {
      this.rotateCurrent = (this.rotateCurrent + 90) % 360;
      this.rotateClass = "rotate" + this.rotateCurrent;
    },
    preFn(refname) {
      this.$refs[refname].preFn(90)
    },
    preNext(refname) {
      this.$refs[refname].preNext(90)
    },
    resetScrollViewHeight() {
      this.$nextTick(() => {
        this.$refs.iscroll.refresh();
      })
    },
    largeImageShow(url, type, item) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.largeImg = { imgname: item, url: url, name: name };

      this.fadeViewVisible = true;
      this.$refs.largeImg.imgInit()
    },
    showImg(url, item, imgname, type, name, initialIndex, refname) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.largeImg = { imgname: item, url: url, name: name };
      this.setActiveItem(refname, initialIndex);
      // console.log(initialIndex);
    },
    setActiveItem(refname, index) {
      this.$refs[refname].setActiveItem(index)
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

