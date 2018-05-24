<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field :disabled="true" type="text" label="交易金额" placeholder="交易金额" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="手续费" placeholder="手续费" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="出款手续费" placeholder="出款手续费" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="冻结金额" placeholder="冻结金额" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="结算金额" placeholder="结算金额" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="银行名称" placeholder="银行名称" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="身份证号" placeholder="身份证号" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="交易类型" placeholder="交易类型" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="交易时间" placeholder="交易时间" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="出款状态" placeholder="出款状态" v-model="dataList.orderNo"></mt-field>
        <mt-field :disabled="true" type="text" label="备注" placeholder="备注" v-model="dataList.orderNo"></mt-field>
       
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
    let user = this.$store.state.userInfoAndMenu.userMessage.all;
    let isAdmin = (
      user.userType === "root" ||
      user.userType === "admin" ||
      user.userType === "operator"
    ); // 运营
    return {
      customerNo: this.$route.params["customerNo"],
      // customerNo
      surePage: false,
      isAdmin: isAdmin,
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
          this.dataList = { ...dataList }
        });
      }
    }
  }
};
</script>

<style>
</style>
