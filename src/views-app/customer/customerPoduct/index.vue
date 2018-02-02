<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">

      <view-radius class="item" v-for="(item,index) in list" :key="index">
        <input-wrapper>
          <mt-cell title="北京速票通科技有限公司"></mt-cell>
          <mt-cell title="快速开票" is-link @click.native="toUrl()">
            <span>已开通</span>
          </mt-cell>
          <mt-cell title="聚合支付" is-link>
            <span>未开通</span>
          </mt-cell>
          <mt-cell title="电子发票" is-link>
            <span>未开通</span>
          </mt-cell>
        </input-wrapper>
      </view-radius>
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
    },
    toUrl() {
      this.$router.push({ path: "./addPayInfo" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/base.scss";
.tip {
  line-height: 200px;
  text-align: center;
}
.item {
  margin: 30*$rem 0;
}
</style>
