<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-cell value="" title="商户编号">
          <span>{{dataList.customerNo}}</span>
        </mt-cell>
        <mt-cell value="" title="通道">
          <span>{{dataList.channelNo | statusFilter('channelWay')}}</span>
        </mt-cell>
        <mt-cell value="" title="状态">
          <span>{{dataList.status | statusFilter('bankCustomerStatus')}}</span>
        </mt-cell>
        <mt-cell title="银行商户编号">
          <span>{{dataList.bankCustomerNo}}</span>
        </mt-cell>
        <mt-cell title="备注">
          <span>{{dataList.remark}}</span>
        </mt-cell>
        <mt-cell title="审核结果">
          <span>{{dataList.checkReason}}</span>
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
    ...mapActions(["getBankCustomer"]),
    init() {
      if (this.pageType == "DETAIL") {
        this.surePage = false;
        this.getBankCustomer(this.customerNo).then(datalist => {
          this.dataList = { ...datalist }
        });
      }
    }
  }
};
</script>

<style>

</style>
