<template>
  <div class="page">
    <full-page class="" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="searchVisible = true">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">

        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName || '商户名称'">
          <!-- 常用按钮 -->
          <div slot="btn" @click="edit(item)">编辑</div>
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.deviceType | handleDeviceType}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="error">{{item.clientType | handleClientType}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="设备编号">{{item.deviceNo}}</myp-tr>
              <myp-tr title="收款人">{{item.receiveMan}}</myp-tr>
              <myp-tr title="开票人">{{item.invoiceMan}}</myp-tr>
              <myp-tr title="复核人">{{item.checkMan}}</myp-tr>
            </table>
          </myp-cell>
        </myp-cell-pannel>

      </myp-loadmore-api>
    </full-page>
    <search-panel-popup v-model="searchVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-panel-popup>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getCustomerConfigs } from "@src/apis";
import SearchPanelPopup from "@src/components-app/Search/SearchPanelPopup";
export default {
  components: { SliderNav, SearchPanelPopup },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomerConfigs,
      list: [],
      searchVisible: false,
      searchQuery: {},
      searchConfig: [
        {
          title: "商户编号",
          type: "myp-text",
          cb: value => {
            this.searchQuery.customerNo = value;
          }
        }
      ]
    };
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  activated() {
    this.$refs.FullPage.setScrollTop(
      this.$store.state.scrollTop[this.$route.name]
    );
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    watchDataList(watchDataList) {
      this.list = watchDataList;
    },
    edit() {},
    searchPanelResult() {
      this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("SAVE_SCROLLTOP", {
      name: this.$route.name,
      scrollTopVal: this.$refs.FullPage.getScrollTop()
    });
    next();
  }
};
</script>

<style>

</style>
