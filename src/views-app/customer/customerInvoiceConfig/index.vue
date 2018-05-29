<template>
  <div class="page">
    <full-page class="" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="searchBoxVisible = true">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="add">新增</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">

        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.customerNo">
          <!-- 常用按钮 -->
          <div slot="btn" @click="edit(item)">编辑</div>
          <!-- 状态 -->
          
          <mt-badge slot="badge" v-if="item.deviceType" class="g-min-badge" size="small" type="primary" :color="filterColor(item.deviceType,'handleDeviceType')">{{item.deviceType | statusFilter('handleDeviceType')}}</mt-badge>
          <mt-badge slot="badge" v-if="item.clientType" class="g-min-badge" size="small" type="error" :color="filterColor(item.clientType,'handleClientType')">{{item.clientType | statusFilter('handleClientType')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <!-- <myp-tr title="商户编号">{{item.customerNo}}</myp-tr> -->
              <myp-tr title="设备编号">{{item.deviceNo}}</myp-tr>
              <myp-tr title="收款人">{{item.receiveMan}}</myp-tr>
              <myp-tr title="开票人">{{item.invoiceMan}}</myp-tr>
              <myp-tr title="复核人">{{item.checkMan}}</myp-tr>
            </table>
          </myp-cell>
        </myp-cell-pannel>

      </myp-loadmore-api>
    </full-page>
    <!-- 编辑 -->
    <edit ref="edit"></edit>
    <search-panel-popup v-model="searchBoxVisible" :config="searchConfig" @result="searchPanelResult" title="商户"></search-panel-popup>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import SearchPanelPopup from "@src/components-app/Search/SearchPanelPopup";
import edit from "./edit";
import { getCustomerConfigs } from "@src/apis";
import { scrollBehavior, filterColor } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, SearchPanelPopup, edit },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getCustomerConfigs,
      count: 0,
      list: [],
      searchBoxVisible: false,
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
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    watchDataList(watchDataList, count) {
      this.count = count;
      this.list = watchDataList;
    },
    add() {
      this.$refs.edit.open({}, "ADD");
    },
    edit(customer) {
      this.$refs.edit.open(customer, "EDIT");
    },
    searchPanelResult() {
      this.$refs.MypLoadmoreApi.load(this.searchQuery);
    },
    updata(customer) {
      this.list = this.list.map(item => {
        if (item.customerNo == customer.customerNo) return customer;
        else return item;
      });
    }
  }
};
</script>

<style>
</style>
