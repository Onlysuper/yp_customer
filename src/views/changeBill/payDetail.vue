<template>
  <!-- 聚合支付详情 -->
  <div class="product-detail-box">
    <h2 v-if="true" class="pro-title">变更前</h2>
    <div class="product-detail-body change-before">
      <div class="detaile-left">
        <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
        <div :class="'scroll-view-cus detail-box-pro rightVsible' + detailRightVisible">
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">商户编号:</span>
              <span class="line-label-last">{{oldData.bussinessNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">预留手机号:</span>
              <span class="line-label-last">{{oldData.reservedPhoneNo}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">邮箱:</span>
            <span class="line-label-last">{{oldData.contactEmail}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">身份证有效期:</span>
            <span class="line-label-last">{{oldData.idNoEffectiveBegin}} 至 {{oldData.idNoEffectiveEnd}}</span>
          </div>
          <!-- <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">更新时间:</span>
              <span class="line-label-last">{{oldData.lastUpdateTime}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">开通状态:</span>
              <span class="line-label-last">{{oldData.status | statusFilter('handleProductOpenStatus')}}</span>
            </div>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">微信费率:</span>
              <span class="line-label-last">{{utils.accMul(oldData.wechatRate,100)+'%' ||""}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">支付宝费率:</span>
              <span class="line-label-last">{{utils.accMul(oldData.alipayRate,100)+'%'||""}}</span>
            </div>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">开通秒到:</span>
              <span class="line-label-last">{{oldData.settleMode | statusFilter('settleMode')}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">D0手续费:</span>
              <span class="line-label-last">{{oldData.t0CashCostFixed||"0"}}</span>
            </div>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box">
            <span class="lable-title gray-back">企业名称:</span>
            <span class="line-label-last">{{oldData.enterpriseName}}</span>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">企业税号:</span>
              <span class="line-label-last">{{oldData.taxNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">行业类型:</span>
              <span class="line-label-last">{{oldData.category?utils.findBussinessType(oldData.category).name:""}}</span>
            </div>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">身份证号:</span>
              <span class="line-label-last">{{oldData.idCard}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">法人:</span>
              <span class="line-label-last">{{oldData.legalPerson}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <div class="line-cell">
              <span class="lable-title gray-back">所在地区:</span>
              <span class="line-label-last">{{oldData.orgCode?utils.findCity(oldData.orgCode).resultAddr:""}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">详细地址:</span>
            <span class="line-label-last">{{oldData.bussinessAddress}}</span>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">账户名称:</span>
              <span class="line-label-last">{{oldData.accountName||""}}</span>
            </div>
            <div v-if="settleIdCardVisible" class="line-cell">
              <span class="lable-title gray-back">结算人身份证:</span>
              <span class="line-label-last">{{oldData.settleIdCard}}</span>
            </div>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">账号:</span>
              <span class="line-label-last">{{oldData.accountNo||""}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">账户类型:</span>
              <span class="line-label-last">{{oldData.accountType | statusFilter('accountType')}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">开户银行:</span>
            <span class="line-label-last">{{oldData.bankName||""}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">开户支行:</span>
            <span class="line-label-last">{{oldData.branchName||""}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">营业期限:</span>
            <span class="line-label-last">{{oldData.bussinessLicenseEffectiveBegin}} - {{oldData.bussinessLicenseEffectiveEnd}}</span>
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
              <div class="img-box" v-for="(item,index) in oldImgsRow" :key="index">
                <p class="img-title">{{item[1].imgname}}:</p>
                <div class="img-back">
                  <!-- <img @click="showImg(item[1].url||'',item[0],'pay',item[1].imgname,item[1].name)" class="img-size" :src="item[1].url" alt=""> -->
                  <img @click="showImg(item[1].url,item[0],'pay',item[1].imgname,item[1].name,index,'carousel')" class="img-size" :src="item[1].url" alt="">
                </div>
              </div>
            </div>
          </scroll-pane>
        </div>
        <div class="large-img-box">
          <el-carousel ref="carousel" :autoplay='false' :initial-index="initialIndex" :interval="5000" trigger='click' arrow="always" height="100%">
            <el-carousel-item v-for="(item,index) in oldImgsRow" :key="index" :label="item[1].name">
              <div class="large-img">
                <img @click="largeImageShow(item[1].url,'payStatus',item[0])" :src="item[1].url" alt="">
              </div>
              <p class="large-imgname">{{item[1].imgname}}</p>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <h2 v-if="true" class="pro-title">变更后</h2>
    <div v-if="true" class="product-detail-body change-before">
      <div class="detaile-left">
        <!-- <iscroll-view class="scroll-view-cus" ref="iscroll" :options="iscrollOptions"> -->
        <div :class="'scroll-view-cus detail-box-pro rightVsible' + detailRightVisible">
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">商户编号:</span>
              <span class="line-label-last">{{newData.bussinessNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">预留手机号:</span>
              <span class="line-label-last">{{newData.reservedPhoneNo}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">身份证有效期:</span>
            <span class="line-label-last">{{newData.idNoEffectiveBegin}} 至 {{newData.idNoEffectiveEnd}}</span>
          </div>
          <!-- <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">更新时间:</span>
              <span class="line-label-last">{{newData.lastUpdateTime}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">开通状态:</span>
              <span class="line-label-last">{{newData.status | statusFilter('handleProductOpenStatus')}}</span>
            </div>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">微信费率:</span>
              <span class="line-label-last">{{utils.accMul(newData.wechatRate,100)+'%' ||""}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">支付宝费率:</span>
              <span class="line-label-last">{{utils.accMul(newData.alipayRate,100)+'%'||""}}</span>
            </div>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">开通秒到:</span>
              <span class="line-label-last">{{newData.settleMode | statusFilter('settleMode')}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">D0手续费:</span>
              <span class="line-label-last">{{newData.t0CashCostFixed||"0"}}</span>
            </div>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box">
            <span class="lable-title gray-back">企业名称:</span>
            <span class="line-label-last">{{newData.enterpriseName}}</span>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">企业税号:</span>
              <span class="line-label-last">{{newData.taxNo}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">行业类型:</span>
              <span class="line-label-last">{{newData.category?utils.findBussinessType(newData.category).name:""}}</span>
            </div>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">身份证号:</span>
              <span class="line-label-last">{{newData.idCard}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">法人:</span>
              <span class="line-label-last">{{newData.legalPerson}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <div class="line-cell">
              <span class="lable-title gray-back">所在地区:</span>
              <span class="line-label-last">{{newData.orgCode?utils.findCity(newData.orgCode).resultAddr:""}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">详细地址:</span>
            <span class="line-label-last">{{newData.bussinessAddress}}</span>
          </div>
          <div class="split－padding"></div>
          <div class="line-label-box">
            <span class="lable-title gray-back">账户名称:</span>
            <span class="line-label-last">{{newData.accountName||""}}</span>
          </div>
          <div class="line-label-box split">
            <div class="line-cell">
              <span class="lable-title gray-back">账号:</span>
              <span class="line-label-last">{{newData.accountNo||""}}</span>
            </div>
            <div class="line-cell">
              <span class="lable-title gray-back">账户类型:</span>
              <span class="line-label-last">{{newData.accountType | statusFilter('accountType')}}</span>
            </div>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">开户银行:</span>
            <span class="line-label-last">{{newData.bankName||""}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">开户支行:</span>
            <span class="line-label-last">{{newData.branchName||""}}</span>
          </div>
          <div class="line-label-box">
            <span class="lable-title gray-back">营业期限:</span>
            <span class="line-label-last">{{newData.bussinessLicenseEffectiveBegin}} - {{newData.bussinessLicenseEffectiveEnd}}</span>
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
              <div class="img-box" v-for="(item,index) in newImgsRow" :key="index">
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
            <el-carousel-item v-for="(item,index) in newImgsRow" :key="index" :label="item[1].name">
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
      <largeimg-view :payStatusDetails="payStatusDetails" ref="largeImg" :imgsArr="oldImgsRow" :largeImg="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" @rotateInit="rotateInit" :fadeViewVisible="fadeViewVisible">
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
import "@src/assets/scss-pc/payDetail.scss";
// @import "../../../../src/assets/scss-pc/payDetail.scss";
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
    },
    oldData: {
      type: Object
    },
    newData: {
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
      oldImgsRow: [],
      newImgsRow: [],
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
    this.detailsForm = Object.assign(this.detailsForm, this.oldData);
  },
  beforeDestroy() {
    console.log('我要销毁了！');
  },
  methods: {
    dataInit() {
      console.log(this.oldImgsRow);
      this.getCustomerEcho(this.oldData, 'oldImgsRow');
      this.getCustomerEcho(this.newData, 'newImgsRow');
    },
    leaveData() {
      this.oldImgsRow = {};
      this.newImgsRow = {};
    },
    changeUrl(url) {
      let before = "";
      switch (process.env.NODE_ENV) {
        case "development" || "productionTest":
          before = "http://tf.yeepiao.com";
          break;
        case "productionTest":
          before = "http://tf.yeepiao.com";
          break;
        case "production":
          before = "https://f.yeepiao.com";
          break;
      }
      if (url) {
        console.log(url);
        return url.replace("/nfs/test", before)
      }
    },
    // 聚合支付回显
    getCustomerEcho(imgsArr, initName) {
      // let dialogLoading = this.$loading({
      //   target: document
      //     .querySelector("#dialogLoding")
      //     .querySelector(".el-dialog")
      // });
      let oldImgsRow = {
        bussinessLicenseImg: {
          id: imgsArr.bussinessLicenseImgId,
          imgname: "营业执照",
          url: this.changeUrl(imgsArr.bussinessLicenseImg)
        },
        identityFrontImg: {
          id: imgsArr.identityFrontImgId,
          imgname: "法人身份证人像面",
          url: this.changeUrl(imgsArr.identityFrontImg)
        },
        identityBackImg: {
          id: imgsArr.identityBackImgId,
          imgname: "法人身份证国徽面",
          url: this.changeUrl(imgsArr.identityBackImg)
        },
        identityBackImg: {
          id: imgsArr.identityBackImgId,
          imgname: "门头照片",
          url: this.changeUrl(imgsArr.identityBackImg)
        },
        cashSpaceImg: {
          id: imgsArr.cashSpaceImgId,
          imgname: "收银台照片",
          url: this.changeUrl(imgsArr.cashSpaceImg)
        },
        cashSpaceImg: {
          id: imgsArr.storeImgId,
          imgname: "店内照片",
          url: this.changeUrl(imgsArr.storeImg)
        }
      };
      if (imgsArr.accountType == "0") {
        // 对公  有开户许可证 没有授权证
        oldImgsRow.accountLicenseImg = {
          id: imgsArr.accountLicenseImgId,
          imgname: "开户许可证",
          url: this.changeUrl(imgsArr.accountLicenseImg)
        }
      } else if (imgsArr.accountType == "1") {
        if (imgsArr.accountName == imgsArr.legalPerson) {
          //对私法人
          oldImgsRow.settleCardImg = {
            id: imgsArr.settleCardImgId,
            imgname: "结算卡正面",
            url: this.changeUrl(imgsArr.settleCardImg)
          }
          oldImgsRow.identityHolderImg = {
            id: imgsArr.identityHolderImgId,
            imgname: "法人手持身份证",
            url: this.changeUrl(imgsArr.identityHolderImg)
          }
        } else {
          //非法人
          oldImgsRow.settleCardImg = {
            id: imgsArr.settleCardImgId,
            imgname: "结算卡正面",
            url: this.changeUrl(imgsArr.settleCardImg)
          }
          oldImgsRow.certificateImg = {
            id: imgsArr.certificateImgId,
            imgname: "授权书照片",
            url: this.changeUrl(imgsArr.certificateImg)
          }
          oldImgsRow.cardHolderFrontImg = {
            id: imgsArr.cardHolderFrontImgId,
            imgname: "结算人人面像",
            url: this.changeUrl(imgsArr.cardHolderFrontImg)
          }
          oldImgsRow.cardHolderBackImg = {
            id: imgsArr.cardHolderBackImgId,
            imgname: "结算人人国徽面",
            url: this.changeUrl(imgsArr.cardHolderBackImg)
          }
          oldImgsRow.holdCertificateImg = {
            id: imgsArr.holdCertificateImgId,
            imgname: "法人手持身份证与授权书",
            url: this.changeUrl(imgsArr.holdCertificateImg)
          }
          oldImgsRow.cardHolderIdImg = {
            id: imgsArr.cardHolderIdImgId,
            imgname: "结算人手持身份证合影",
            url: this.changeUrl(imgsArr.cardHolderIdImg)
          }
        }
      } else {
        oldImgsRow.accountLicenseImg = {
          id: imgsArr.accountLicenseImgId,
          imgname: "开户许可证",
          url: this.changeUrl(imgsArr.accountLicenseImg)
        }
      }
      oldImgsRow = Object.entries(oldImgsRow);
      // Object.entries(imgsRow)
      // 开始
      // for (var i = 0; i < oldImgsRow.length; i++) {
      //   let item = oldImgsRow[i][1];
      //   let index = oldImgsRow[i][0];

      //   if (item) {
      //     let imgname = item.imgname;
      //     if (item.url) {
      //       if (this.largeImgUrl == "") {
      //         // 默认显示的图片
      //         this.largeImg = { imgname: index, url: item.url, name: item.imgname };
      //         this.largeImgUrl = item.url
      //       }
      //     }
      //     ((i) => {
      //       let item = imgsArr[i][1];
      //       let index = imgsArr[i][0];
      //       var newImg = new Image();
      //       newImg.src = item.url;
      //       newImg.onerror = () => {
      //         imgsArr[i][1].url = ""
      //       }
      //       newImg.onload = () => {
      //         if (this.largeImgUrl == "") {
      //           // 默认显示的图片
      //           this.largeImg = { imgname: index, url: item.url };
      //           this.largeImgUrl = item.url
      //         }
      //       }
      //     })(i)
      //   }
      // }
      // 结束
      if (initName == 'newImgsRow') {
        this.newImgsRow = oldImgsRow;
      }
      if (initName == 'oldImgsRow') {
        this.oldImgsRow = oldImgsRow;
      }
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
  },
  watch: {
  }
};
</script>

