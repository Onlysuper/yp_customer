<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
        <mt-button v-if="adminFilter('pay_order_sum')" slot="right" :disabled="false" type="danger" @click="sumHandle()">合计</mt-button>
      </mt-header>
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'orderQueryStatus')">{{item.status | statusFilter('orderQueryStatus')}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.payType,'payType')">{{item.payType | statusFilter('payType')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="交易金额">{{utils.accMul(item.amount, 0.01)}}元</myp-tr>
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <sum ref="sum"></sum>
  </div>
</template>

<script>
import sum from "./sum";
import SliderNav from "@src/components-app/SliderNav";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getPayOrders } from "@src/apis";
import { mapState, mapActions } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    return {
      popupActionsVisible: false,
      popupActions: [
        {
          name: "合计",
          icon: "icon-admin",
          method: () => {
            this.sum();
          }
        }
      ],
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getPayOrders
    };
  },
  created() {
    this.$store.commit("ORDER_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.orderQuery.list,
      isSearch: state => state.orderQuery.isSearch,
      searchQuery: state => state.orderQuery.searchQuery,
      sumData: state => state.orderQuery.sumData
    })
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  methods: {
    ...mapActions(["getOrderQuerySum"]),

    watchDataList(watchDataList) {
      this.$store.commit("ORDER_QUERY_SET_LIST", watchDataList);
      this.$store.commit("ORDER_QUERY_IS_SEARCH", false);
    },
    sumHandle() {
      this.getOrderQuerySum().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    toUrl(type, itemId, rowdata) {
      if (type == "DETAIL") {
        this.$router.push({
          path: "./detail/" + itemId,
          query: { type: type }
        });
      }
    },
    detail(rowdata) {
      this.toUrl("DETAIL", rowdata.orderNo, rowdata);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
