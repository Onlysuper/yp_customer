<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell value="" title="交易时间">
          <span>{{dataList.paySuccTime}}</span>
        </mt-cell>
        <mt-cell title="交易单号">
          <span>{{dataList.orderNo}}</span>
        </mt-cell>
        <mt-cell title="交易金额">
          <span>{{utils.accMul(dataList.amount, 0.01)}} 元</span>
        </mt-cell>
        <mt-cell v-if="dataList.settleMode=='T0'?true:false" title="手续费">
          <span>{{utils.accMul(dataList.fee, 0.01)}} 元</span>
        </mt-cell>
        <mt-cell title="交易费率">
          <span>{{utils.accMul(dataList.feeRate, 100)+'%'}}</span>
        </mt-cell>
        <mt-cell title="代理商编号">
          <span>{{dataList.agentNo}}</span>
        </mt-cell>
        <mt-cell title="收款方式">
          <span>{{dataList.payTypeDetail | statusFilter('payTypeDetail')}}</span>
        </mt-cell>
        <mt-cell title="交易来源">
          <span>{{dataList.payFrom | statusFilter('payFrom')}}</span>
        </mt-cell>
        <mt-cell title="交易类型">
          <span>{{dataList.payType | statusFilter('payType')}}</span>
        </mt-cell>
        <mt-cell v-if="dataList.status=='FAIL'?true:false" title="支付失败原因">
          <span>{{dataList.respCode}}</span>
        </mt-cell>
      </input-wrapper>
    </view-radius>
  </full-page>
</template>
<style lang="scss">
.myp-chek-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  .mint-cell {
    background-image: none;
    background-color: #fcfcfc;
    width: 33.333%;
  }
  .mint-radiolist-label,
  .mint-checklist-label {
    padding: 0;
  }
  .mint-radiolist-title,
  .mint-checklist-title {
    margin: 0;
  }
  .mint-cell-wrapper {
    padding: 5px;
  }
}
</style>
<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import utils from "@src/common/utils"
export default {
  components: { Picker },
  data() {
    return {
      orderNo: this.$route.params["orderNo"],
      surePage: false,
      statusObj: {},
      type: {},
      btnDisabled: false,
      pageType: this.$route.query["type"] || "DETAIL",
      dataList: {},
      pageTitle: {
        DETAIL: "详情",
      },
    };
  },
  computed: {},

  watch: {
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getOrderQueryUnit"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getOrderQueryUnit(this.orderNo).then(datalist => {
          console.log(datalist);
          this.dataList = { ...datalist }
        });
      }
    }
  }
};
</script>

<style>

</style>
