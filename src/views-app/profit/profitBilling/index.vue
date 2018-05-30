<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'profitBillingSearch'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">

          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="补贴（元）">{{item.subsidy}}</myp-tr>
              <myp-tr v-if="$store.state.userInfoAndMenu.branchOffice" title="中间人（元）">{{item.rebate}}</myp-tr>
              <myp-tr title="入网时间">{{item.registerTime}}</myp-tr>
            </table>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <sum ref="sum"></sum>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getBillprofits, getBillprofitSum } from "@src/apis";
import { mapState, mapActions } from "vuex";
import sum from "./sum";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, sum },
  data() {
    var user = this.$store.state.userInfoAndMenu.userMessage.all;
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getBillprofits,
      count: 0
    };
  },
  created() {
    this.$store.commit("PROFITBILLING_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.profitBilling.list,
      isSearch: state => state.profitBilling.isSearch,
      searchQuery: state => state.profitBilling.searchQuery,
      sumData: state => state.profitBilling.sumData
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
    ...mapActions(["getBillprofitSum"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("PROFITBILLING_SET_LIST", watchDataList);
      this.$store.commit("PROFITBILLING_IS_SEARCH", false);
    },
    sum() {
      this.getBillprofitSum().then(isSuccess => {
        // this.sumShow = isSuccess;
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>

</style>
