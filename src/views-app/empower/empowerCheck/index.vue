<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'empowerCheckSearch'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | empowerCheckStatus}}</mt-badge>
          <!-- 生产水牌 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.isPrint | empowerCheckIsPrint}}</mt-badge>
          <!-- 设备类型 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.receiptType | empowerCheckReceiptType}}</mt-badge>
          <!-- 常用按钮 -->
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="采购单号">{{item.receiptNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="数量">{{item.qrcodeCount}}</myp-tr>
              <myp-tr title="单价">{{item.price}}</myp-tr>
              <myp-tr title="单价">{{item.price}}</myp-tr>
            </table>
            <!-- 更多操作 -->
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>
<script>
import SliderNav from "@src/components-app/SliderNav";
import { getArantNumExamines } from "@src/apis";
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
      api: getArantNumExamines,
      actions: []
    };
  },
  created() {
    this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerCheck.list,
      searchQuery: state => state.empowerCheck.searchQuery,
      isSearch: state => state.empowerCheck.isSearch
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  methods: {
    watchDataList(watchDataList) {
      this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODERECIEPTAUDIT_SEARCH", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
