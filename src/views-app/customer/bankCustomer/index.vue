<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'bankCustomerStatus')">{{item.status | statusFilter('bankCustomerStatus')}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.channelNo,'channelWay')">{{item.channelNo | statusFilter('channelWay')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table @click="detail(item)">
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="银行商户编号">{{item.bankCustomerNo}}</myp-tr>
              <myp-tr title="备注">{{item.remark}}</myp-tr>
              <myp-tr title="审核结果">{{item.checkReason}}</myp-tr>
            </table>
            <!-- 更多操作 -->
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>
<script>
import SliderNav from "@src/components-app/SliderNav";
import { getbankCustomers } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior, filterColor } from "@src/common/mixins";

export default {
  mixins: [scrollBehavior, filterColor],

  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getbankCustomers,
      count: 0,
      actions: []
    };
  },
  created() {
    this.$store.commit("BANKCUSTOMER_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.bankCustomer.list,
      searchQuery: state => state.bankCustomer.searchQuery,
      isSearch: state => state.bankCustomer.isSearch,
      sumData: state => state.bankCustomer.sumData
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    ...mapActions(["getBillcountSum"]),
    watchDataList(watchDataList) {
      this.$store.commit("BANKCUSTOMER_SEARCH_INIT_list", watchDataList);
      this.$store.commit("BANKCUSTOMER_SEARCH", false);
    },
    detail(rowdata) {
      this.$router.push({
        path: "./detail/" + rowdata.customerNo,
        query: { type: "DETAIL" }
      });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
