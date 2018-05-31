<template>
  <!-- 聚合支付详情 -->
  <!-- <div class="scroll-view-cus detail-box">
        <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div> -->
  <div class="product-detail-body">
    <div class="detaile-left">
      <div class="scroll-view-cus detail-box-pro">
        <!-- <iscroll-view class="scroll-view-cus " ref="iscroll" :options="iscrollOptions"> -->
        <div class="line-label-box">
          <span class="lable-title gray-back">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">快速开票:</span>
          <span class="line-label-last">{{detailsForm.qrcodeStatus | statusFilter('handleProductOpenStatus')}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">更新时间:</span>
          <span class="line-label-last">{{detailsForm.lastUpdateTime}}</span>
        </div>
        <div class="line-label-box">
          <span class="lable-title gray-back">商户名称:</span>
          <span class="line-label-last">{{detailsForm.customerName}}</span>
        </div>
      </div>
      <!-- </iscroll-view> -->
    </div>
    <div class="detaile-right" v-if="detailRightVisible">
      <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
        <div class="imgs-group">
          <div class="img-box" v-for="(item,index) in imgsArr" :key="index">
            <p class="img-title">{{item[1].imgname}}:</p>
            <div class="img-back">
              <!-- <img @click="showImg(item[1].url||'',item[0],'qrcode',item[1].imgname)" class="img-size" :src="item[1].url" alt=""> -->
              <img @click="showImg(item[1].url||'',item[0],'qrcode',item[1].imgname,item[1].name,index,'carousel')" class="img-size" :src="item[1].url" alt="">
            </div>
          </div>
        </div>
      </scroll-pane>
      <div class="large-img-box">
        <el-carousel ref="carousel" :autoplay='false' :initial-index="initialIndex" :interval="5000" trigger='click' arrow="always" height="100%">
          <el-carousel-item v-for="(item,index) in imgsArr" :key="index" :label="item[1].name">
            <div class="large-img">
              <img @click="largeImageShow(item[1].url,'qrcode')" :src="item[1].url" alt="">
            </div>
            <p class="large-imgname">{{item[1].imgname}}</p>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div class="large-img">
        <img @click="largeImageShow(largeImgUrl,'qrcode')" class="img-large" :src="largeImgUrl" alt="">
      </div> -->
    </div>
    <!-- <transition name="slide-fade" class="fadeView">
      <div v-if="fadeViewVisible">
        <image-view :imgArr="largeUrl" :showImageView="true" :imageIndex="0" v-on:hideImage="hideImageView"></image-view>
      </div>
    </transition> -->
    <transition name="slide-fade" class="fadeView">
      <largeimg-view ref="largeImg" :imgsArr="imgsArr" :largeImg="largeImg" :largeImgUrl="largeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" @rotateInit="rotateInit" :fadeViewVisible="fadeViewVisible">
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
import imageView from 'vue-imageview';
import LargeimgView from '@src/components/LargeimgView';
import ScrollPane from "@src/components/ScrollPane";
import bussinessTypeJson from "@src/data/bussinessType.json";
import { mixinsPc } from "@src/common/mixinsPc";
// table页与搜索页公用功能
import { todayStr } from "@src/common/dateSerialize";
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
  name: "qrcodeDetail",
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
    var qrcodeImgs = { // 快速开票图片
      fastBussinessImg: {
        url: "",
      },
      fastCashImg: {
        url: "",
      },
      fastHeaderImg: {
        url: "",
      }
    }
    return {
      initialIndex: 0,//图片滚动滚动索引
      detailRightVisible: true,
      imgsArr: [],
      largeImg: {},
      iscrollOptions: {
        scrollbars: true,
        mouseWheel: true,
        useTransform: true, //CSS转化
        useTransition: true //CSS过渡
      },

      fadeViewVisible: false,
      largeUrl: "",
      largeImgArt: "",
      rotateClass: "",
      rotateCurrent: 0,
      detailsForm: {},
      largeImgUrl: "",
      qrcodeImgs: { ...qrcodeImgs },
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
          let qrcodeImgs = {};// 快速开票imgs
          if (data.imgs) {
            // 快速开票图片回显
            // qrcodeImgs = utils.pickObj(data.imgs, [
            //   "fastBussinessImg", "fastCashImg", "fastHeaderImg"
            // ]);
            qrcodeImgs = utils.pickObj(data.imgs, [
              "bussinessLicenseImg", "cashSpaceImg", "placeImg"
            ]);
            // bussinessLicenseImg cashSpaceImg placeImg
          }
          if (qrcodeImgs) {
            this.detailRightVisible = true;
          } else {
            this.detailRightVisible = false
          }
          // this.qrcodeImgs = { ...this.qrcodeImgs, ...qrcodeImgs };
          this.qrcodeImgs = { ...qrcodeImgs };
          let imgsArr = Object.entries(this.qrcodeImgs);
          for (var i = 0; i < imgsArr.length; i++) {
            let imgname = " ";
            let item = imgsArr[i][1];
            let index = imgsArr[i][0];
            // if (index == "fastBussinessImg") {
            //   imgname = "营业执照"
            // } else if (index == "fastCashImg") {
            //   imgname = "收银台照片"
            // } else if (index == "fastHeaderImg") {
            //   imgname = "门头照片"
            // }
            if (index == "bussinessLicenseImg") {
              imgname = "营业执照"
            } else if (index == "cashSpaceImg") {
              imgname = "收银台照片"
            } else if (index == "placeImg") {
              imgname = "门头照片"
            }
            if (item) {
              item["imgname"] = imgname;
              console.log(item);
              ((i) => {
                let item = imgsArr[i][1];
                let index = imgsArr[i][0];
                var newImg = new Image();
                newImg.src = item.url;
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
            } else {
              imgsArr[i][1] = {
                imgname: imgname,
                url: ""
              }
            }
          }
          this.imgsArr = imgsArr;
          if (this.detailsForm.qrcodeStatus == 'INIT') {
            this.detailRightVisible = false;
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
    largeImageShow(url, type) {
      this.largeUrl = [url];
      this.fadeViewVisible = true
      this.imageIndex = 0
    },
    showImg(url, item, imgname, type, name, initialIndex, refname) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.largeImgUrl = url;
      this.largeImg = { imgname: item, url: url, name: name };
      this.setActiveItem(refname, initialIndex);
    },
    setActiveItem(refname, index) {
      console.log(refname)
      this.$refs[refname].setActiveItem(index)
    },
    rotateInit() {
      this.rotateCurrent = 0
      this.rotateClass = "";
    },
    hideImageView() {
      this.fadeViewVisible = false
    }
  }
};
</script>

