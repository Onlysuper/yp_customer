<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">上一步</mt-button>
    </mt-header>
    <div class="add-user-info" id="scroll-wrapper">
      <!-- 个人信息 -->
      <div class="input-group">
        <view-radius class="input-right">
          <input-wrapper>
            <template v-if="store.sendMode.customerType == 'SMART_POS'">
              <mt-field label="借记卡:" v-model="store.sendData.debitTransCostRate" type="text" :readonly="false" placeholder="">%</mt-field>
              <mt-field label="借记卡封顶值:" v-model="store.sendData.debitTransCostCapped" type="text" :readonly="false" placeholder="">元</mt-field>
              <mt-field label="贷记卡费率:" v-model="store.sendData.creditTransCostRate" type="text" :readonly="false" placeholder="">%</mt-field>
            </template>
            <mt-field label="微信费率:" v-model="store.sendData.wechatRate" type="text" :readonly="false" placeholder="">%</mt-field>
            <mt-field label="支付宝费率:" v-model="store.sendData.alipayRate" type="text" :readonly="false" placeholder="">%</mt-field>
            <mt-cell :title="'开通即刷即到'">
              <mt-switch v-model="switchValue"></mt-switch>
            </mt-cell>
            <mt-field v-if="switchValue" label="D0手续费:" v-model="store.sendData.d0CashCostFixed" type="text" :readonly="false" placeholder="">元</mt-field>
          </input-wrapper>
        </view-radius>
        <br/>
      </div>
      <div class="btn">
        <mt-button size="large" :disabled="btnDisibled" type="primary" @click="nextBtn">下一步</mt-button>
      </div>
    </div>
  </full-page>
</template>

<script>
import InputWrapper from "@src/containers/InputWrapper";
import ViewRadius from "@src/containers/ViewRadius";
import { Toast } from "mint-ui";
import { submitCustomerRegisterInfo, getPiecesRateTemplate } from "@src/apis";
import validator from "@src/common/validator";
import { mapState, mapMutations } from "vuex";
import utils from "@src/common/utils";

export default {
  components: {
    InputWrapper,
    ViewRadius
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ store: state => state.addCustomer }),
    switchValue: {
      get() {
        return this.store.sendData.settleType == "D0" ? true : false;
      },
      set(val) {
        this.store.sendData.settleType = val ? "D0" : "T1";
      }
    },
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
    } else {
      this.getRateTemplate();
    }
  },
  methods: {
    getRateTemplate() {
      getPiecesRateTemplate()({
        channelType: this.store.sendMode.customerFrom,
        productCategory: this.store.sendMode.customerType,
        templateType: "CUSTOMER"
      }).then(data => {
        if (data.resultCode == "0") {
          let rate = utils.accMulProductResponseBean(data.data, 100);
          this.echoForm(rate);
        } else {
          Toast(data.resultMsg);
        }
      });
    },
    setEchoData() {
      let rate = utils.accMulProductResponseBean(this.store.sendData, 100);
      this.echoForm(rate);
    },
    echoForm(rate) {
      this.store.sendData.debitTransCostRate = rate.debitTransCostRate;
      this.store.sendData.debitTransCostCapped = rate.debitTransCostCapped;
      this.store.sendData.creditTransCostRate = rate.creditTransCostRate;
      this.store.sendData.wechatRate = rate.wechatRate;
      this.store.sendData.alipayRate = rate.alipayRate;
      this.store.sendData.settleType = rate.settleType;
      this.store.sendData.d0CashCostFixed = rate.d0CashCostFixed;
    },
    //下一步
    nextBtn() {
      if (this.store.sendData.customerNo === "") {
        Toast("缺少商编");
        return;
      }
      //将sendData中的费率信息转换
      let rate = utils.accMulProductResponseBean(this.store.sendData, 0.01);

      submitCustomerRegisterInfo()({
        ...this.store.sendMode,
        ...this.store.sendData,
        ...rate
      }).then(data => {
        if (data.resultCode === "0") {
          this.$router.push({ path: "./addUpload", query: this.$route.query });
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
  }
  .input-right {
    input {
      text-align: right;
      padding-right: 20/@rem;
    }
  }
}
</style>