<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <!-- <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'profitBillingSearch'})">搜索</mt-button> -->
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button> -->
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <div class="tip">敬请期待</div>
    </full-page>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior } from "@src/common/mixins";
import { getBillprofits, getBillprofitSum } from "@src/apis";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getBillprofits
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
    // this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  methods: {
    ...mapActions(["getBillprofitSum"]),
    watchDataList(watchDataList) {
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
.tip {
  margin-top: 100px;
  text-align: center;
}
</style>
