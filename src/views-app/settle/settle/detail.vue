<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field :disabled="true" type="text" label="订单编号" placeholder="订单编号" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="对公账户名称" placeholder="对公账户名称" v-model="dataList.receiveMan"></mt-field>
        <mt-field :disabled="true" type="text" label="收款账号" placeholder="收款账号" v-model="dataList.accountNo"></mt-field>
        <mt-field :disabled="true" type="text" label="开户行" placeholder="开户行" v-model="dataList.bankName"></mt-field>
        <mt-field :disabled="true" type="text" label="实付金额" placeholder="实付金额" v-model="dataList.settlePrice"></mt-field>
        <mt-field :disabled="true" type="text" label="达标商户数量" placeholder="达标商户数量" v-model="dataList.customerNumber"></mt-field>
        <mt-field :disabled="true" type="text" label="联系电话" placeholder="联系电话" v-model="dataList.agentPhone"></mt-field>
        <mt-field :disabled="true" type="text" label="打款时间" placeholder="打款时间" v-model="dataList.remitTime"></mt-field>
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
      settleNo: this.$route.params["settleNo"],
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
    ...mapActions(["getAgentSettleUnit", "postUpdateSettlesAc"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getAgentSettleUnit(this.settleNo).then(empowerList => {

          this.dataList = { ...empowerList }
        });
      }
    }
  }
};
</script>

<style>

</style>
