<template>
  <!-- 开票记录 -->
  <full-page class="page" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'billRecordSearch'})">搜索</mt-button>
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="toUrl('ADD')">新增</mt-button> -->
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">

      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
        <!-- 常用按钮 -->
        <div slot="btn" @click="toUrl('EDIT',item.billRecordNo)">编辑</div>
        <!-- 状态 -->
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | billStatus}}</mt-badge>
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.billType | billType}}</mt-badge>
        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
            <myp-tr title="开票时间">{{item.createTime}}</myp-tr>
            <myp-tr title="商户号">{{item.customerNo}}</myp-tr>
            <myp-tr title="经营名称">{{item.bussinessName}}</myp-tr>
            <!-- <myp-tr title="企业名称">{{item.enterpriseName}}</myp-tr> -->
          </table>
          <!-- 更多操作 -->
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>

  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getBillrecords } from "@src/apis";
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
      api: getBillrecords,
      actions: []
    };
  },
  created() {
    this.$store.commit("BILLRECORD_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.billRecord.list,
      searchQuery: state => state.billRecord.searchQuery,
      isSearch: state => state.billRecord.isSearch
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
    toUrl(type, billRecordNo) {
      this.$router.push({
        path: "./edit/" + billRecordNo,
        query: { type: type }
      });
    },
    watchDataList(watchDataList) {
      this.$store.commit("BILLRECORD_SEARCH_LIST", watchDataList);
      this.$store.commit("BILLRECORD_SEARCH", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
