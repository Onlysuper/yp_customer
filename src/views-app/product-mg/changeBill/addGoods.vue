<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <div class="add-playinfo">
      <view-radius>
        <input-wrapper>
          <mt-field label="微信费率:" type="text" @click.native="$refs.wechatRate.open" v-model="wechatRate.name" v-readonly-ios :readonly="true" placeholder="请选择微信费率">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field label="支付宝费率:" type="text" @click.native="$refs.alipayRate.open" v-model="alipayRate.name" v-readonly-ios :readonly="true" placeholder="请选择支付宝费率">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-cell :title="'开通即刷即到'">
            <mt-switch :disabled="true" v-model="switchValue" @click.native="Toast('暂不支持开通此功能！')"></mt-switch>
          </mt-cell>
          <mt-field v-if="switchValue" label="D0手续费:" v-model="t0CashCostFixed" type="text" :readonly="false" placeholder="">元</mt-field>
        </input-wrapper>
      </view-radius>
    </div>
    <mt-button class="btn" size="large" type="primary" @click="submit">下一步</mt-button>
    <picker v-model="wechatRate" ref="wechatRate" :slotsActions="wechatRateActions" @confirm="(res)=>{wechatRate = res}"></picker>
    <picker v-model="alipayRate" ref="alipayRate" :slotsActions="alipayRateActions" @confirm="(res)=>{alipayRate = res}"></picker>
  </full-page>
</template>

<script>
import { getCustomerEchoProduct, completeConvergeProduct } from "@src/apis";
import utils from "@src/common/utils";
import { install } from "vuex";
import settleMode from "@src/data/settleMode.json";
import Picker from "@src/components-app/SelectPicker/Picker";

export default {
  components: { Picker },
  data() {
    return {
      customerNo: this.$route.query["customerNo"],
      wechatRateActions: settleMode,
      alipayRateActions: settleMode,
      wechatRate: {},
      alipayRate: {},
      settleMode: "T1",
      t0CashCostFixed: 0
    };
  },
  computed: {
    switchValue: {
      get() {
        return this.settleMode == "T0" ? true : false;
      },
      set(val) {
        if (val) this.settleMode = "T0";
        else this.settleMode = "T1";
      }
    }
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
    // let data = JSON.parse(localStorage.getItem("echo_form") || "{}");
    // this.echoForm(data);
  },
  methods: {
    echoForm(data) {
      let { product } = data;
      if (product instanceof Object) {
        this.wechatRate = utils.queryJsonVal(settleMode, product.wechatRate);
        this.alipayRate = utils.queryJsonVal(settleMode, product.alipayRate);
        this.settleMode = product.settleMode || "T1";
        this.t0CashCostFixed = product.t0CashCostFixed || 0;
      }
    },
    //提交
    submit() {
      completeConvergeProduct()({
        wechatRate: this.wechatRate.code,
        alipayRate: this.alipayRate.code,
        settleMode: this.settleMode,
        t0CashCostFixed: this.t0CashCostFixed,
        customerNo: this.customerNo
      }).then(data => {
        if (data.code == "00") {
          this.$router.push({
            path: "./addUpload",
            query: { customerNo: this.customerNo, type: 'Pay' }
          });
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
</style>
