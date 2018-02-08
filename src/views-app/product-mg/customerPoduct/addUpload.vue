<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>

    <div class="add-playinfo">
      <view-radius class="uploads">
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_POSITIVE'" @result="resultMediaId" :dataKey="'identityFrontImg'" ref="identityFrontImg" :label="'身份证正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'LEGAL_PERSON_ID_BACK'" @result="resultMediaId" :dataKey="'identityBackImg'" ref="identityBackImg" :label="'身份证反面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'BUSINESS_LICENSE'" @result="resultMediaId" :dataKey="'bussinessLicenseImg'" ref="bussinessLicenseImg" :label="'营业执照'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'STORE_IMG'" @result="resultMediaId" :dataKey="'storeImg'" ref="storeImg" :label="'店内照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'CASH_SPACE_IMG'" @result="resultMediaId" :dataKey="'cashSpaceImg'" ref="cashSpaceImg" :label="'收银台照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'ACCOUNT_OPENING_LICENSE'" @result="resultMediaId" :dataKey="'accountLicenseImg'" ref="accountLicenseImg" :label="'开户许可证'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'SETTLE_CARD_IMG'" @result="resultMediaId" :dataKey="'settleCardImg'" ref="settleCardImg" :label="'结算卡正面'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'PLACE_IMG'" @result="resultMediaId" :dataKey="'placeImg'" ref="placeImg" :label="'门头照片'"></upload-view>
        <upload-view class="item" :customerNo="customerNo" :upType="'APPLICANT_WITH_ID'" @result="resultMediaId" :dataKey="'identityHolderImg'" ref="identityHolderImg" :label="'手持身份证照'"></upload-view>
      </view-radius>
      <mt-radio v-model="value" v-targetTo style="text-align: center;" @click.native="visible = true" :options="['同意《支付开通协议》']"></mt-radio>
    </div>
    <mt-button class="btn" size="large" :disabled="value?false:true" type="primary" @click="submit">开通</mt-button>
    <myp-popup v-model="visible">
      <full-page class="agree">
        <div slot="header" class="border-bottom-1px clear">
          <span class="mint-datetime-action mint-datetime-cancel" @click="isAgree(false)">不同意</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="isAgree(true)">同意</span>
        </div>
        <div class="agree-text">
          二、风险说明 <br/>
          <p> 鉴于目前网络支付技术及国内、国际电子商务环境均尚未成熟，其电子商务立法以及信用体制还不完善，在这种情况下乙方作为商户在开展电子商务业务时存在一定的风险性。包括但不限于犯罪侵权导致的坏帐、债务人拒付等。乙方明确认知该风险的存在并愿意承担此种风险可能带来的损失。 </p>
          三、保密条款 <br/>
          <p> 双方在合作期内获得的信息及本合同和附件内容均为保密信息，保密信息包括但不限于交易手续费和服务年费的金额及支付方式、结算方式、接口技术、安全协议及证书等，任何一方均应当对保密信息严格保密，且仅为本合作之目的使用，未经对方事先书面同意，不得向任何第三方透露保密信息，否则视为违约；守约方除有权主张违约金及损失外还有权终止合同。本条不因本合同的终止而终止。 </p>
          四、特别约定 <br/>
          <p>
            1、乙方承诺在合作期内使用甲方支付平台的方式为：_________ 唯一 推荐 优先 <br/> 2、本合同期满或终止后，甲方保留因银行或电信等部门对合同期内交易进行调查或债务人对合同期内交易拒付而向乙方追偿该金额的权利。
          </p>
          五、退款处理 <br/>
          <p> 对于交易过程中出现的、由于乙方原因包括但不限于缺货、无法运货、质量问题等等，造成退款处理的情况，按以下规定处理。 1、乙方按本协议约定并遵守甲方《网上退款规定》，通过商户后台向甲方提出退款申请。 2、乙方向甲方提出退款请求时，乙方在甲方帐户中应有足够退款的账存资金，或者乙方须按要求退款的金额将款项转帐至甲方帐户，甲方收到该款项后向用户做出退款处理。否则造成的一切后果均由乙方承担。 3、退款时甲方不再另收取手续费，但若银行或电信等相关方面需要另行收取相关费用，则此费用由乙方承担。</p>
          二、风险说明 <br/>
          <p> 鉴于目前网络支付技术及国内、国际电子商务环境均尚未成熟，其电子商务立法以及信用体制还不完善，在这种情况下乙方作为商户在开展电子商务业务时存在一定的风险性。包括但不限于犯罪侵权导致的坏帐、债务人拒付等。乙方明确认知该风险的存在并愿意承担此种风险可能带来的损失。 </p>
          三、保密条款 <br/>
          <p> 双方在合作期内获得的信息及本合同和附件内容均为保密信息，保密信息包括但不限于交易手续费和服务年费的金额及支付方式、结算方式、接口技术、安全协议及证书等，任何一方均应当对保密信息严格保密，且仅为本合作之目的使用，未经对方事先书面同意，不得向任何第三方透露保密信息，否则视为违约；守约方除有权主张违约金及损失外还有权终止合同。本条不因本合同的终止而终止。 </p>
          四、特别约定 <br/>
          <p>
            1、乙方承诺在合作期内使用甲方支付平台的方式为：_________ 唯一 推荐 优先 <br/> 2、本合同期满或终止后，甲方保留因银行或电信等部门对合同期内交易进行调查或债务人对合同期内交易拒付而向乙方追偿该金额的权利。
          </p>
          五、退款处理 <br/>
          <p> 对于交易过程中出现的、由于乙方原因包括但不限于缺货、无法运货、质量问题等等，造成退款处理的情况，按以下规定处理。 1、乙方按本协议约定并遵守甲方《网上退款规定》，通过商户后台向甲方提出退款申请。 2、乙方向甲方提出退款请求时，乙方在甲方帐户中应有足够退款的账存资金，或者乙方须按要求退款的金额将款项转帐至甲方帐户，甲方收到该款项后向用户做出退款处理。否则造成的一切后果均由乙方承担。 3、退款时甲方不再另收取手续费，但若银行或电信等相关方面需要另行收取相关费用，则此费用由乙方承担。</p>

        </div>
      </full-page>
    </myp-popup>
  </full-page>
</template>

<script>
import UploadView from "@src/components-app/Upload/UploadView";
import MypPopup from "@src/components-app/MypPopup";
import { completeBussinessImg, getCustomerEchoProduct } from "@src/apis";
export default {
  components: {
    UploadView,
    MypPopup
  },
  data() {
    return {
      visible: false,
      value: "",
      customerNo: this.$route.query["customerNo"],
      imgs: {}
    };
  },
  created() {
    getCustomerEchoProduct()({
      customerNo: this.customerNo,
      featureType: "CONVERGE_PAY"
    }).then(data => {
      if (data.code == "00") {
        //回显信息
        this.echoForm(data.data);
      } else {
        this.Toast(data.msg);
      }
    });
    // let data = JSON.parse(localStorage.getItem("echo_form") || "{}");
    // this.echoForm(data);
  },
  directives: {
    targetTo: {
      // 指令的定义
      inserted: function(el) {
        // console.log(el);
      }
    }
  },
  methods: {
    echoForm(data) {
      let { imgs } = data;
      if (imgs instanceof Object) {
        for (let key in imgs) {
          if (imgs[key] instanceof Object) {
            this.$refs[key].setImg(imgs[key].url);
            this.resultMediaId(key, imgs[key].id);
          }
        }
      }
    },
    //图片上传结果
    resultMediaId(dataKey, mediaId) {
      this.imgs[dataKey] = mediaId;
    },
    isAgree(bool) {
      this.visible = false;
      if (bool) this.value = "同意《支付开通协议》";
      else this.value = "";
    },
    submit() {
      completeBussinessImg()({
        ...this.imgs,
        customerNo: this.customerNo
      }).then(data => {
        if (data.code == "00") {
          this.$router.push({ path: "./addSuccess" });
        } else {
          this.Toast(data.msg);
        }
      });
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
.agree {
  height: 400px;
}
.agree-text {
  padding: 20*$rem;
  box-sizing: border-box;
}
</style>
