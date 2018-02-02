<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">上一步</mt-button>
    </mt-header>
    <div class="add-user-info" id="scroll-wrapper">
      <view-radius class="uploads">
        <upload-view class="item" :upType="'LEGAL_PERSON_ID_POSITIVE'" @result="resultMediaId" :dataKey="'identityFrontImg'" ref="identityFrontImg" :label="'申请人身份证正面'"></upload-view>
        <upload-view class="item" :upType="'LEGAL_PERSON_ID_BACK'" @result="resultMediaId" :dataKey="'identityBackImg'" ref="identityBackImg" :label="'申请人身份证反面'"></upload-view>
        <upload-view class="item" :upType="'BUSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessImg'" ref="bussinessImg" :label="'营业执照'"></upload-view>
        <upload-view class="item" :upType="'STORE_IMG'" @result="resultMediaId" :dataKey="'storeImg'" ref="storeImg" :label="'店内照片'"></upload-view>
        <upload-view class="item" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg" :label="'收银台照片'"></upload-view>
        <upload-view class="item" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accessImg'" ref="accessImg" :label="'开户许可证'"></upload-view>
      </view-radius>
      <div class="btn">
        <mt-button size="large" :disabled="btnDisibled" type="primary" @click="nextBtn">下一步</mt-button>
      </div>
    </div>
  </full-page>
</template>

<script>
import { Toast } from "mint-ui";
import { submitCustomerRegisterInfo } from "@src/apis";
import validator from "@src/common/validator";
import UploadView from "@src/components/Upload/UploadView";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    UploadView
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ store: state => state.addCustomer }),
    btnDisibled() {
      return this.store.sendData.customerNo ? false : true;
    }
  },
  created() {
    this.store.sendMode.customerFrom = this.$route.query["channelType"];
    this.store.sendMode.customerType = this.$route.query["productCategory"];
    this.store.sendData.customerNo = this.$route.query["customerNo"];
    if (this.$route.query["isEchoForm"] && this.store.sendData.customerNo) {
      this.setEchoData();
    }
  },
  methods: {
    ...mapMutations(["storeReset"]),
    //图片上传结果
    resultMediaId(dataKey, mediaId) {
      this.store.sendData[dataKey] = mediaId;
    },
    setEchoData() {
      let frontImg = this.state.sendData.identityFrontImg;
      let backImg = this.state.sendData.identityBackImg;
      let bussiness = this.state.sendData.bussinessImg;
      let storeImg = this.state.sendData.storeImg;
      let cashSpaceImg = this.state.sendData.cashSpaceImg;
      let accessImg = this.state.sendData.accessImg;

      if (frontImg)
        this.download("identityFrontImg", frontImg.remark, frontImg.imgUrl);
      if (backImg)
        this.download("identityBackImg", backImg.remark, backImg.imgUrl);
      if (bussiness)
        this.download("bussinessImg", bussiness.remark, bussiness.imgUrl);
      if (storeImg) this.download("storeImg", storeImg.remark, storeImg.imgUrl);
      if (cashSpaceImg)
        this.download("cashSpaceImg", cashSpaceImg.remark, cashSpaceImg.imgUrl);
      if (accessImg)
        this.download("accessImg", accessImg.remark, accessImg.imgUrl);
    },
    //加载回显图片
    download(dataKey, mediaId, url) {
      this.$refs[dataKey] && this.$refs[dataKey].setImg(url);
      this.resultMediaId(dataKey, mediaId);
    },
    //下一步
    nextBtn() {
      if (this.store.sendData.customerNo === "") {
        Toast("缺少商编");
        return;
      }
      submitCustomerRegisterInfo()({
        ...this.store.sendMode,
        ...this.store.sendData
      }).then(data => {
        if (data.resultCode === "0") {
          this.storeReset();
          // this.$router.push({ path: "./addSuccess" });
          Toast("开通成功");
        } else {
          Toast(data.resultMsg);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import url(../../../assets/less/base.less);
.add-goods-container {
  .add-user-info {
    padding: 20/@rem;
    box-sizing: border-box;
    height: 100%;
    .btn {
      margin: 50/@rem auto;
    }

    .uploads {
      padding: 20/@rem;
      box-sizing: border-box;
      .item {
        float: left;
      }
    }
  }
}
</style>