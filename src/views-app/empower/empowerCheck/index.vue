<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 设备类型 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.receiptType | statusFilter('empowerCheckReceiptType')}}</mt-badge>
          <!-- 生产水牌 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="error" v-if="item.isPrint == 'Y'">{{item.isPrint | statusFilter('empowerCheckIsPrint')}}</mt-badge>
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="success">{{item.status | statusFilter('empowerCheckStatus')}}</mt-badge>
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
            </table>
            <!-- 更多操作 -->
            <div v-if='item.status == "AUDITING"' slot="right" @click="toUrl(item)">审核</div>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <!-- 更多操作 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText="取消"></mt-actionsheet>
  </div>
</template>
<script>
import SliderNav from "@src/components-app/SliderNav";
import { getArantNumExamines } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior, filterColor } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav },
  data() {
    return {
      sheetVisible: false,
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumExamines,
      count: 0,
      allData: "",
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
    }),
    adminOperationAll() {
      // 用户按钮权限
      return this.$store.state.userInfoAndMenu.userMessage.all;
    }
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("QRCODERECIEPTAUDIT_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODERECIEPTAUDIT_SEARCH", false);
    },
    toUrl(item) {
      this.$router.push({
        path: "./check/" + item.receiptNo,
        query: { type: item.receiptType }
      });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
