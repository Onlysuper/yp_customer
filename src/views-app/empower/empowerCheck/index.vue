<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({name:'empowerCheckSearch'})">搜索</mt-button>
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
            <div v-if='adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
        item.status == "AUDITING"&&(item.receiptType == "AUTHCODE"||item.receiptType == "SCANCODEGUN")' slot="right" @click="operation(item)">更多</div>
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
import { scrollBehavior } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      sheetVisible: false,
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumExamines,
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
      return this.$store.state.moduleLayour.userMessage.all;
    }
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
    },
    operation(rowdata) {
      this.sheetVisible = true;
      this.rowdata = rowdata;
      let checkBut = {};
      if (
        this.adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
        rowdata.status == "AUDITING" &&
        rowdata.receiptType == "AUTHCODE"
      ) {
        //审核授权码采购
        checkBut.name = "审核";
        checkBut.method = this.authcodeFn;
        this.actions = [checkBut];
      } else if (
        this.adminOperationAll.qr_code_reciept_audit_all == "TRUE" &&
        rowdata.status == "AUDITING" &&
        rowdata.receiptType == "SCANCODEGUN"
      ) {
        //审核扫码枪采购
        checkBut.name = "审核";
        checkBut.method = this.scanFn;
        this.actions = [checkBut];
      }
    },
    toUrl(type, itemId) {
      this.$router.push({
        path: "./check/" + itemId,
        query: { type: type }
      });
    },
    // 授权码审核
    authcodeFn() {
      this.toUrl("AUTHCHECK", this.rowdata.receiptNo);
    },
    // 扫码枪审核
    scanFn() {
      this.toUrl("SCANCHECK", this.rowdata.receiptNo);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
