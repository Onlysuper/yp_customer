<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.back()">新增</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.featureType | handleFeatureType">

        <!-- 常用按钮 -->
        <!-- <div slot="btn">编辑</div> -->

        <!-- 状态 -->
        <!-- <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.taxRate | handleTaxRate}}</mt-badge>
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.discountType | handleDiscountType}}</mt-badge>
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.enjoyDiscount | handleEnjoyDiscount}}</mt-badge> -->

        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <myp-tr title="产品编号">{{item.productNo}}</myp-tr>
            <myp-tr title="代理商">{{item.bussinessNo}}</myp-tr>
            <myp-tr title="费率">{{item.rate}}</myp-tr>
            <myp-tr title="单笔">{{item.fixed}}</myp-tr>
            <myp-tr title="封顶">{{item.capped}}</myp-tr>
            <myp-tr title="月开票量">{{item.elecBillnum || "--"}}</myp-tr>
            <myp-tr title="开始有效期">{{item.effectiveBegin}}</myp-tr>
            <myp-tr title="结束有效期">{{item.effectiveEnd}}</myp-tr>
          </table>
          <!-- 更多操作 -->
          <!-- <div slot="right" @click="operation(item)">更多</div> -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>
  </full-page>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior } from "@src/common/mixins";
import { mapState, mapActions } from "vuex";
import { getCustomerProducts } from "@src/apis";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomerProducts
    };
  },
  computed: {
    ...mapState({
      list: state => state.customerProduct.list,
      searchQuery: state => state.customerProduct.searchQuery,
      isSearch: state => state.customerProduct.isSearch
    })
  },
  created() {
    this.$store.commit("CUSTOMER_PRODUCT_SEARCH_INIT");
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    watchDataList(watchDataList, count, pageNum) {
      this.$store.commit("CUSTOMER_PRODUCT_SEARCH_LIST", watchDataList);
      // this.$store.commit("IS_SEARCH_GOOD", false);
      // this.$store.commit("IS_RELOAD_GOOD", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.tip {
  line-height: 200px;
  text-align: center;
}
</style>
