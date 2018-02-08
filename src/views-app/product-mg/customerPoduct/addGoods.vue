<template>
  <full-page class="add-goods-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <div class="add-playinfo">

      <view-radius>
        <input-wrapper>
          <mt-field label="微信费率:" type="text" v-model="form.wechatRate" :readonly="false" placeholder="">%</mt-field>
          <mt-field label="支付宝费率:" type="text" v-model="form.alipayRate" :readonly="false" placeholder="">%</mt-field>
          <mt-cell :title="'开通即刷即到'">
            <mt-switch v-model="switchValue"></mt-switch>
          </mt-cell>
          <mt-field v-if="switchValue" label="D0手续费:" v-model="form.t0CashCostFixed" type="text" :readonly="false" placeholder="">元</mt-field>
        </input-wrapper>
      </view-radius>

    </div>
    <mt-button class="btn" size="large" type="primary" @click="submit">下一步</mt-button>
  </full-page>
</template>

<script>
import { getCustomerEchoProduct, completeConvergeProduct } from "@src/apis";
import utils from "@src/common/utils";
import { install } from "vuex";
export default {
  data() {
    return {
      customerNo: this.$route.query["customerNo"],
      form: {
        wechatRate: 0,
        alipayRate: 0,
        settleMode: "T1",
        t0CashCostFixed: 0
      }
    };
  },
  computed: {
    switchValue: {
      get() {
        return this.form.settleMode == "T0" ? true : false;
      },
      set(val) {
        if (val) this.form.settleMode = "T0";
        else this.form.settleMode = "T1";
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
        this.form.wechatRate = utils.accMul(product.wechatRate, 100);
        this.form.alipayRate = utils.accMul(product.alipayRate, 100);
        this.form.settleMode = product.settleMode || "T1";
        this.form.t0CashCostFixed = product.t0CashCostFixed || 0;
      }
    },
    //提交
    submit() {
      completeConvergeProduct()({
        wechatRate: utils.accMul(this.form.wechatRate, 0.01),
        alipayRate: utils.accMul(this.form.alipayRate, 0.01),
        settleMode: this.form.settleMode,
        t0CashCostFixed: this.form.t0CashCostFixed,
        customerNo: this.customerNo
      }).then(data => {
        if (data.code == "00") {
          this.$router.push({
            path: "./addUpload",
            query: { customerNo: this.customerNo }
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
