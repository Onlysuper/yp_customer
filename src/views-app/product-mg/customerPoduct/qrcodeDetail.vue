<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="goIndex">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="qrcodeEdit">编辑</mt-button>
    </mt-header>
    <!-- 快速开票详情 -->
    <template>
      <view-radius>
        <input-wrapper>
          <mt-cell title="商户编号">{{customerNo}}</mt-cell>
          <mt-cell title="快速开票">{{qrcodeStatus | statusFilter('handleProductOpenStatus')}}</mt-cell>
          <mt-cell title="更新时间">{{customer.lastUpdateTime}}</mt-cell>
          <mt-cell title="商户名称">{{customerName}}</mt-cell>
        </input-wrapper>
      </view-radius>
      <view-radius class="uploads imagesParent" id="WeixinJSBridge">
        <show-img-view class="item" :disabled="true" ref="bussinessLicenseImg" :label="'营业执照'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="placeImg" :label="'门头照片'"></show-img-view>
        <show-img-view class="item" :disabled="true" ref="cashSpaceImg" :label="'收银台照片'"></show-img-view>
      </view-radius>
      <!-- <mt-button class="btn" size="large" type="primary" @click="submit">确定并返回</mt-button> -->
    </template>
    <!-- 快速开票详情 -->
  </full-page>
</template>

<script>
import { getCustomerEchoProduct, getQueryCustomerElectronic } from "@src/apis";
import bussinessTypeJson from "@src/data/bussinessType.json";
// import UploadView from "@src/components-app/Upload/UploadView";
import ShowImgView from "@src/components-app/Upload/ShowImgView";
import utils from "@src/common/utils";
export default {
  components: { ShowImgView },
  data() {
    return {
      customerNo: this.$route.query["customerNo"],
      pageType: this.$route.query["type"],
      qrcodeStatus: this.$route.query["qrcodeStatus"],
      customerName: this.$route.query["customerName"],
      customer: {
        lastUpdateTime: ""
      }
    };
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        this.echoForm(data.data);
      } else {
        this.Toast(data.msg);
      }
    });
  },
  methods: {
    goIndex() {
      this.$router.push({
        path: "./"
        // query: { customerNo: this.customerNo, type: 'Pay' }
      });
    },
    qrcodeEdit() {
      this.$router.push({
        path: "./qrcodeUpload",
        query: { customerNo: this.customerNo, type: 'Qrcode', qrcodeStatus: this.qrcodeStatus, customerName: this.customerName }
      });
    },
    echoForm(data) {
      let { customer, settleCard, product, imgs } = data;
      if (customer instanceof Object) {
        this.customer.lastUpdateTime = customer.lastUpdateTime;
      }
      // 图片预览
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            if (key == "cashSpaceImg" || key == "placeImg" || key == "bussinessLicenseImg") {
              this.$refs[key].setImg(imgs[key].url);
            }
          }
        }
      }
      this.$nextTick(() => {
        this.initWeixinJSBridge($("#WeixinJSBridge"));
      })
    },
    initWeixinJSBridge(imgParent) {
      let img = imgParent.find("img");
      let imgArr = [];
      for (var i = 0; i < img.length; i++) {
        let item = img.eq(i);
        let imgUrl = item.attr('src');
        imgArr.push(imgUrl);
      }
      img.click(function () {
        let thisSrc = $(this).attr('src');
        WeixinJSBridge.invoke("imagePreview", {
          "current": thisSrc,
          urls: imgArr
        });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.uploads {
  padding: 20*$rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  .item {
    // float: left;
    width: 33%;
    // flex: 1;
  }
}
.text-r {
  width: 500*$rem;
  text-align: right;
}
</style>
