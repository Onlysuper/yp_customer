<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell title="交易金额">
          <span>{{dataList.payAmount}} 元</span>
        </mt-cell>
        <mt-cell title="手续费">
          <span>{{dataList.proceduresFee}} 元</span>
        </mt-cell>
        <mt-cell title="出款手续费">
          <span>{{dataList.outMoneyFee}} 元</span>
        </mt-cell>
        <mt-cell title="冻结金额">
          <span>{{dataList.freezeAmount}} 元</span>
        </mt-cell>
        <mt-cell title="结算金额">
          <span>{{dataList.settleAmount}} 元</span>
        </mt-cell>
        <mt-cell title="银行名称">
          <span>{{dataList.bankName}}</span>
        </mt-cell>
        <mt-cell title="身份证号">
          <span>{{dataList.settleIdCard}}</span>
        </mt-cell>
        <mt-cell title="交易类型">
          <span>{{dataList.settleType}}</span>
        </mt-cell>
        <mt-cell title="交易时间">
          <span>{{dataList.payTime}}</span>
        </mt-cell>
        <mt-cell title="出款状态">
          <span>{{dataList.outMoneyStatus | statusFilter('customerSettleOutMoneyStatus')}}</span>
        </mt-cell>
         <mt-cell title="备注">
          <span>{{dataList.remark}}</span>
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
      customerNo: this.$route.params["customerNo"],
      // customerNo
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
    ...mapActions(["getCustomerSettle"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getCustomerSettle(this.customerNo).then(dataList => {
          console.log(dataList);
          this.dataList = { ...dataList }
        });
      }
    }
  }
};
</script>

<style>
</style>
