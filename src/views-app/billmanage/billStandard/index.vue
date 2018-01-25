<template>
  <!-- 达标详情 -->
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'billStandardSearch'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button> -->
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">

      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
            <!-- <myp-tr title="企业名称">{{item.enterpriseName}}</myp-tr> -->
            <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
            <myp-tr title="RCS">{{item.realFlag}}</myp-tr>
            <myp-tr title="推送次数">{{item.billSuccess}}</myp-tr>
            <myp-tr title="在线时长(天)">{{item.online}}</myp-tr>
            <myp-tr title="达标情况">{{item.standard}}</myp-tr>
            <myp-tr title="达标时间">{{item.standardTime}}</myp-tr>
          </table>
          <!-- 更多操作 -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getBillcountcustomers } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getBillcountcustomers,
      actions: []
    };
  },
  created() {
    this.$store.commit("BILLSTANDARD_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.billStandard.list,
      searchQuery: state => state.billStandard.searchQuery,
      isSearch: state => state.billStandard.isSearch,
      isAdd: state => state.billStandard.isAdd
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
    this.$refs.MypLoadmoreApi.load();
  },
  methods: {
    // ...mapActions(["cancelDefaultGood"]),
    watchDataList(watchDataList) {
      this.$store.commit("BILLSTANDARD_SEARCH_LIST", watchDataList);
      this.$store.commit("BILLSTANDARD_SEARCH", false);
      this.$store.commit("BILLSTANDARD_ADD", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
