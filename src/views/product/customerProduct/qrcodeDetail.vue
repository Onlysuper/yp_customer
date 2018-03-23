<template>
  <!-- 聚合支付详情 -->
  <div class="detail-body">
    <div class="detaile-left">
      <iscroll-view class="scroll-view-cus " ref="iscroll" :options="iscrollOptions">
        <div class="line-label-box">
          <span class="line-label">商户编号:</span>
          <span class="line-label-last">{{detailsForm.bussinessNo}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">商户名称:</span>
          <span class="line-label-last">{{detailsForm.customerName}}</span>
        </div>
        <div class="line-label-box">
          <span class="line-label">快速开票:</span>{{detailsForm.qrcodeStatus | handleProductOpenStatus}}
        </div>
      </iscroll-view>
    </div>
    <div class="detaile-right">
      <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
        <div class="imgs-group">
          <div class="img-box">
            <p class="img-title">营业执照:</p>
            <div class="img-back">
              <img @click="showImg(qrcodeImgs.fastBussinessImg.url||'','qrcode')" class="img-size" :src="qrcodeImgs.fastBussinessImg.url||''" alt="">
            </div>
          </div>
          <div class="img-box">
            <p class="img-title">收银台照片:</p>
            <div class="img-back">
              <img @click="showImg(qrcodeImgs.fastCashImg.url||'','qrcode')" class="img-size" :src="qrcodeImgs.fastCashImg.url||''" alt="">
            </div>
          </div>
          <div class="img-box">
            <p class="img-title">门头照片:</p>
            <div class="img-back">
              <img @click="showImg(qrcodeImgs.fastHeaderImg.url||'','qrcode')" class="img-size" :src="qrcodeImgs.fastHeaderImg.url||''" alt="">
            </div>
          </div>
        </div>
      </scroll-pane>
      <div class="large-img">
        <img @click="largeImageShow(qrcodelargeImgUrl,'qrcode')" class="img-large" :src="qrcodelargeImgUrl" alt="">
      </div>
    </div>
    <!-- <transition name="slide-fade" class="fadeView">
      <div v-if="fadeViewVisible">
        <image-view :imgArr="largeUrl" :showImageView="true" :imageIndex="0" v-on:hideImage="hideImageView"></image-view>
      </div>
    </transition> -->
    <transition name="slide-fade" class="fadeView">
      <largeimg-view :largeImgUrl="qrcodelargeImgUrl" :largeImgArt="largeImgArt" :rotateClass="rotateClass" @hideImageView="hideImageView" @rotateFn="rotateFn" :fadeViewVisible="fadeViewVisible">
      </largeimg-view>
    </transition>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' scoped>
.rotate90 {
  transform: rotate(90deg);
}
.rotate180 {
  transform: rotate(180deg);
}
.rotate270 {
  transform: rotate(270deg);
}
.rotate0 {
  transform: rotate(0deg);
}
.largeButgroup {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  // background: red;
  z-index: 1;
  height: 50px;
  text-align: right;
  .but {
  }
}
.scroll-view-cus {
  touch-action: none;
  /* -- Attention-- */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.detail-body {
  height: 550px;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;

  .detaile-left {
    margin-left: 10px;
    padding-right: 10px;
    flex: 4;
    flex-shrink: 0;
    position: relative;
  }
  .detaile-right {
    flex: 6;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ebeef5;
    .tags-view-wrapper {
      // background: red;
      flex-shrink: 0;
      border-bottom: 1px solid #ebeef5;
      flex-basis: 100px;
      .imgs-group {
        width: 100%;
        display: flex;
        flex-direction: row;
        // padding: 5px;
        .img-box {
          margin: 5px;
          width: 90px;
          height: 90px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: stretch;
          .img-title {
            width: 100%;
            flex-basis: 20px;
            line-height: 20px;
            font-size: 10px;
          }
          .img-back {
            border: 1px solid #ebeef5;
            width: 100%;
            height: 70px;
            box-sizing: border-box;
            position: relative;
            &:after {
              content: "暂无图片";
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background: #ebeef5;
              text-align: center;
              z-index: 1;
              line-height: 70px;
            }
            img {
              position: relative;
              z-index: 2;
              cursor: pointer;
              width: 100%;
              height: 100%;
              transition: all 0.3s ease-in 0s;
              &:hover {
                transform: translateY(-3px);
                -ms-transform: translateY(-3px); /* IE 9 */
                -webkit-transform: translateY(-3px); /* Safari and Chrome */
                -o-transform: translateY(-3px); /* Opera */
                -moz-transform: translateY(-3px);
              }
            }
          }
        }
      }
    }
    .large-img {
      text-align: center;
      flex: 1;
      padding: 10px;
      overflow: hidden;
      position: relative;

      &:after {
        content: " ";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
      img {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
        min-width: 300px;
        max-height: 100%;
        // height: 100%;
      }
    }
  }
}
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
      qrcodelargeImgUrl: "",
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
            qrcodeImgs = utils.pickObj(data.imgs, [
              "fastBussinessImg", "fastCashImg", "fastHeaderImg"
            ]);
          }
          // 默认显示第一张图
          this.qrcodeImgs = { ...this.qrcodeImgs, ...qrcodeImgs };
          for (var i in qrcodeImgs) {
            if (qrcodeImgs[i].url) {
              this.qrcodelargeImgUrl = qrcodeImgs[i].url
              break;
            }
          }
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
    showImg(val, type) {
      this.rotateCurrent = 0
      this.rotateClass = "";
      this.qrcodelargeImgUrl = val
    },
    hideImageView() {
      this.fadeViewVisible = false
    }
  }
};
</script>

