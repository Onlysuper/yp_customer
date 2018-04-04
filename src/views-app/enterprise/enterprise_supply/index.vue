<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./add'})">新增</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.name">
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | statusFilter('enterprisesupplyStatus')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="税号">{{item.tax}}</myp-tr>
              <myp-tr title="地址">{{item.address}}</myp-tr>
              <myp-tr title="电话">{{item.tel}}</myp-tr>
              <myp-tr title="银行">{{item.bank}}</myp-tr>
              <myp-tr title="帐号">{{item.account}}</myp-tr>
              <myp-tr title="操作员">{{item.operator}}</myp-tr>
            </table>
            <!-- 更多操作 -->
            <!-- <div slot="right" @click="operation(item)">更多</div> -->
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { postEnterpriseSupplys } from "@src/apis";
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
      api: postEnterpriseSupplys,
      count: 0
    };
  },
  created() {
    this.$store.commit("ENTERPRISE_SUPPLY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.enterpriseSupply.list,
      isSearch: state => state.enterpriseSupply.isSearch,
      searchQuery: state => state.enterpriseSupply.searchQuery
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
    ...mapActions([]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("ENTERPRISE_SUPPLY_SET_LIST", watchDataList);
      this.$store.commit("ENTERPRISE_SUPPLY_IS_SEARCH", false);
    },
    sum() { }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>

</style>
