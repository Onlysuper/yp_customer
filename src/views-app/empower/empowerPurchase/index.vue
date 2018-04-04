<template>
  <!-- 授权码采购 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">采购</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <!-- 导航组件 -->
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>

      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 常用按钮 -->
          <!-- <div slot="btn" @click="$router.push({path:'./edit/'+item.receiptNo})">编辑</div> -->

          <!-- 设备类型 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.receiptType | statusFilter('empowerCheckReceiptType')}}</mt-badge>
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | statusFilter('empowerCheckStatus')}}</mt-badge>
          <!-- 生产水牌 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="error" v-if="item.isPrint == 'Y'">{{item.isPrint | statusFilter('empowerCheckIsPrint')}}</mt-badge>

          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="采购单号">{{item.receiptNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="数量">{{item.qrcodeCount}}</myp-tr>
              <myp-tr title="单价">{{item.price || '--'}}</myp-tr>
            </table>
            <div slot="right" v-if="item.status == 'REJECT'" @click="$router.push({path:'./edit/'+item.receiptNo})">修改</div>
          </myp-cell>

        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>
<script>
import SliderNav from "@src/components-app/SliderNav";
import { getArantNumBuybacks } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import MypPopupActions from "@src/components-app/MypPopupActions";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumBuybacks,
      count: 0,
      popupActionsVisible: false,
      popupActions: [
        {
          name: "采购授权码",
          icon: "icon-admin",
          type: "AUTHCODE",
          method: this.add
        },
        {
          name: "采购扫码枪",
          icon: "icon-admin",
          type: "SCANCODEGUN",
          method: this.add
        }
      ]
    };
  },
  created() {
    this.$store.commit("QRCODERECIEPT_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerPurchase.list,
      searchQuery: state => state.empowerPurchase.searchQuery,
      isSearch: state => state.empowerPurchase.isSearch
    })
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
      this.$store.commit("QRCODERECIEPT_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODERECIEPT_SEARCH", false);
    },
    add(obj) {
      this.$router.push({ path: "add", query: { type: obj.type } });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
