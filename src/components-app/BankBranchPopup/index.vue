<template>
  <full-page-popup v-model="popupVisible" class="bank-branch-page" title="选择支行">
    <div class="pading">
      <view-radius>
        <input-wrapper>
          <mt-field :value="bankName.value" label="开户银行" type="text" state="" :readonly="true" placeholder=""></mt-field>
        </input-wrapper>
        <input-wrapper>
          <div @click="openCity">
            <mt-field :value="bankAddr.resultAddr" label="开户地区" type="text" state="" :readonly="true" placeholder="">
              <i class="mintui-arrow_down"></i>
            </mt-field>
          </div>
        </input-wrapper>
        <input-wrapper>
          <mt-field v-model="keyVal" label="关键字" type="text" state="" :readonly="false" placeholder="">
          </mt-field>
        </input-wrapper>
      </view-radius>
      <div class="btn">
        <mt-button size="large" type="danger" :disabled="queryBankDisabled" @click="queryBank">查询</mt-button>
      </div>
    </div>
  </full-page-popup>
</template>
<style lang="less">
@import url(../../assets/less/base.less);
.bank-branch-page {
  width: 100%;
  height: 100%;
  .pading {
    margin-top: 20/@rem;
    padding: 0 20/@rem;
  }
}
</style>
<script>
import PubSub from "pubsub-js";
import FullPage from "@src/containers/FullPage";
import InputWrapper from "@src/containers/InputWrapper";
import ViewRadius from "@src/containers/ViewRadius";
export default {
  components: {
    FullPage,
    InputWrapper,
    ViewRadius
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bankName: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      popupVisible: false,
      bankAddr: {
        resultAddr: "",
        resultCode: ""
      },
      keyVal: "",
      query: {}
    };
  },
  computed: {
    queryBankDisabled() {
      return this.bankAddr.resultCode ? false : true;
    }
  },
  watch: {
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    if (this.value) {
      this.popupVisible = true;
    }
  },
  methods: {
    openCity() {
      PubSub.publish("OPEN_CITY", data => {
        this.bankAddr = data;
      });
    },
    queryBank() {
      this.query = {
        bankCode: this.bankName.key, //		是	银行编号
        branchName: this.keyVal, //		是	支行名称(模糊查询)
        district: this.bankAddr.resultCode //		是	区县编码
      };
      this.$emit("bankbranchresult", this.query);
    }
  }
};
</script>