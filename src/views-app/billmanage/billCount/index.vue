<template>
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'billCountSearch'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button> -->
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
        <!-- 常用按钮 -->
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
            <myp-tr title="扫码次数">{{item.scan}}</myp-tr>
            <myp-tr title="推送次数">{{item.billSuccess}}</myp-tr>
            <myp-tr title="入网商户">{{item.register}}</myp-tr>
            <myp-tr title="活跃商户">{{item.active}}</myp-tr>
          </table>
          <!-- 更多操作 -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getBillcountagents } from "@src/apis";
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
      api: getBillcountagents,
      actions: []
    };
  },
  created() {
    this.$store.commit("BILLCOUNT_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.billCount.list,
      searchQuery: state => state.billCount.searchQuery,
      isSearch: state => state.billCount.isSearch,
      isAdd: state => state.billCount.isAdd
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
    ...mapActions(["cancelDefaultGood"]),
    watchDataList(watchDataList) {
      this.$store.commit("BILLCOUNT_SEARCH_INIT_list", watchDataList);
      this.$store.commit("BILLCOUNT_SEARCH", false);
      this.$store.commit("BILLCOUNT_ADD", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
