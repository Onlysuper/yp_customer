<template>
  <!-- 日开票详情 -->
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button> -->
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
        <!-- 状态 -->
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
            <myp-tr title="时间">{{item.dataTime}}</myp-tr>
            <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
            <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
            <myp-tr title="扫码次数">{{item.scan}}</myp-tr>
            <myp-tr title="推送次数">{{item.billSuccess}}</myp-tr>
            <myp-tr title="在线时长(时)">{{item.online}}</myp-tr>
          </table>
          <!-- 更多操作 -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getBillcountdays } from "@src/apis";
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
      api: getBillcountdays,
      count: 0,
      actions: []
    };
  },
  created() {
    this.$store.commit("BILLDAY_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.billDay.list,
      searchQuery: state => state.billDay.searchQuery,
      isSearch: state => state.billDay.isSearch,
      isAdd: state => state.billDay.isAdd
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    isAdd(flag) {
      flag && this.$refs.MypLoadmoreApi.load();
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    // ...mapActions(["cancelDefaultGood"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("BILLDAY_SEARCH_LIST", watchDataList);
      this.$store.commit("BILLDAY_SEARCH", false);
      this.$store.commit("BILLDAY_ADD", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
