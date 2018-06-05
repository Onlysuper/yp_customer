<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button> -->
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'convergePayStatus')">{{item.status | statusFilter('convergePayStatus')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="时间">{{item.payTime}}</myp-tr>
              <myp-tr title="分润金额">{{item.subsidy}}</myp-tr>
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
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getpayProfits } from "@src/apis";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getpayProfits,
      count: 0
    };
  },
  created() {
    this.$store.commit("CONVERGE_PAY_COMM_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.convergePayComm.list,
      isSearch: state => state.convergePayComm.isSearch,
      searchQuery: state => state.convergePayComm.searchQuery,
      sumData: state => state.convergePayComm.sumData
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
    ...mapActions(["getConvergePayCommSum"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("CONVERGE_PAY_COMM_SET_LIST", watchDataList);
      this.$store.commit("CONVERGE_PAY_COMM_IS_SEARCH", false);
    },
    sum() {
      // this.getConvergePayCommSum().then(isSuccess => {
      //   isSuccess && this.$refs.sum.open(this.sumData);
      // });
      this.Toast("敬请期待");
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
