<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>

    <div class="add-playinfo">
      <view-radius class="uploads">
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_POSITIVE'" @result="resultMediaId" :dataKey="'identityFrontImg'" ref="identityFrontImg" :label="'身份证正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_BACK'" @result="resultMediaId" :dataKey="'identityBackImg'" ref="identityBackImg" :label="'身份证反面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'BUSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessImg'" ref="bussinessImg" :label="'营业执照'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'STORE_IMG'" @result="resultMediaId" :dataKey="'storeImg'" ref="storeImg" :label="'店内照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg" :label="'收银台照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accessImg'" ref="accessImg" :label="'开户许可证'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accessImg'" ref="accessImg" :label="'结算卡正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accessImg'" ref="accessImg" :label="'门头照片'"></upload-view>
      </view-radius>
      <mt-radio v-model="value" v-targetTo style="text-align: center;" :options="['同意《支付开通协议》']"></mt-radio>
    </div>
    <mt-button class="btn" size="large" type="primary" @click="submit">开通</mt-button>
  </full-page>
</template>

<script>
import UploadView from "@src/components-app/Upload/UploadView";
export default {
  components: {
    UploadView
  },
  data() {
    return {
      value: "",
      customerNo: this.$route.query["customerNo"]
    };
  },
  directives: {
    targetTo: {
      // 指令的定义
      inserted: function(el) {
        console.log(el);
      }
    }
  },
  methods: {
    //图片上传结果
    resultMediaId(dataKey, mediaId) {
      // this.store.sendData[dataKey] = mediaId;
    },
    submit() {
      this.$router.push({ path: "./addSuccess" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.add-playinfo {
  padding: 20*$rem;
  box-sizing: border-box;
}
.btn {
  margin: 30*$rem auto;
  width: 95%;
}
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
</style>
