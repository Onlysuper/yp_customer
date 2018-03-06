<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">

          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="时间">{{item.payTime}}</myp-tr>
              <myp-tr title="分润金额">{{item.subsidy}}</myp-tr>
              <myp-tr title="状态">{{item.status}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="合伙人名称">{{item.bussinessName}}</myp-tr>
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
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>

</style>
