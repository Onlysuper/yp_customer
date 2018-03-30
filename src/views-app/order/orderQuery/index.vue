<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerName">
          <mt-badge v-if="item.status=='CANCEL'" slot="badge" class="g-min-badge" size="small" type="warning">{{item.status | orderQueryStatus}}</mt-badge>
          <mt-badge v-else-if="item.status=='SUCCESS'" slot="badge" class="g-min-badge" size="small" type="success">{{item.status | orderQueryStatus}}</mt-badge>
          <mt-badge v-else-if="item.status=='FAIL'" slot="badge" class="g-min-badge" size="small" type="error">{{item.status | orderQueryStatus}}</mt-badge>
          <mt-badge v-else slot="badge" class="g-min-badge" size="small" type="success">{{item.status | orderQueryStatus}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="商户名称">{{item.customerName}}</myp-tr>
              <myp-tr title="交易金额">{{utils.accMul(item.amount, 0.01)}}元</myp-tr>
              <myp-tr title="状态">{{item.status | orderQueryStatus}}</myp-tr>
              <!--   <myp-tr title="手续费">{{utils.accMul(item.fee, 0.01)}}元</myp-tr>
              <myp-tr title="交易费率">{{utils.accMul(item.feeRate, 100)}}%元</myp-tr> -->
            </table>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior } from "@src/common/mixins";
import { getPayOrders } from "@src/apis";
import { mapState, mapActions } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
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
      searchQuery: state => state.orderQuery.searchQuery
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
    ...mapActions([""]),
    watchDataList(watchDataList) {
      this.$store.commit("ORDER_QUERY_SET_LIST", watchDataList);
      this.$store.commit("ORDER_QUERY_IS_SEARCH", false);
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
      console.log(rowdata);
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
