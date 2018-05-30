<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
        <mt-button v-if="adminFilter('billprofit_sum')" slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="$store.state.userInfoAndMenu.isOperate?item.agentName:''">
          <div v-if="adminFilter('admin_settle_updateSettle') && item.status == 'TRUE'" slot="btn" @click="settlement(item,'settle')">结算</div>
          <div v-if="adminFilter('agent_settle_updateSettle') && item.status == 'FALSE'" slot="btn" @click="settlement(item,'sure')">确认</div>
          <!-- <mt-badge slot="badge" class="g-min-badge" size="small" type="primary" :color="filterColor(item.status,'settleStatus')">{{item.status | statusSettle}}</mt-badge> -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary" :color="filterColor(item.status,'settleStatus')">{{item.status | statusFilter('settleStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="结算单号">{{item.settleNo}}</myp-tr>
              <myp-tr v-if="!$store.state.userInfoAndMenu.isOperate" title="商户数量">{{item.customerNumber}}</myp-tr>
              <myp-tr v-if="$store.state.userInfoAndMenu.isOperate" title="代理商编号">{{item.agentNo}}</myp-tr>
              <!-- <myp-tr v-if="!isAdmin" title="代理商名称">{{item.agentName}}</myp-tr> -->
              <myp-tr title="时间">{{item.dataTime}}</myp-tr>
              <myp-tr title="结算金额(元)">{{item.settlePrice}}</myp-tr>
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
    <sum ref="sum"></sum>
  </div>
</template>

<script>
import MypPopupActions from "@src/components-app/MypPopupActions";
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getSettles } from "@src/apis";
import { mapState, mapActions } from "vuex";
import sum from "./sum";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions, sum },
  data() {
    return {
      popupActionsVisible: false,
      popupActions: [
        {
          name: "修改升级商户",
          icon: "icon-admin",
          method: () => {
            this.toUrl("ADD");
          }
        }
      ],
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getSettles,
      count: 0
    };
  },
  created() {
    this.$store.commit("SETTLE_SEARCH_INIT");

  },
  computed: {
    ...mapState({
      list: state => state.settle.list,
      isSearch: state => state.settle.isSearch,
      searchQuery: state => state.settle.searchQuery,
      sumData: state => state.settle.sumData
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
    ...mapActions(["getConvergePayCommSum", "getAgentSettleSumAc"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("SETTLE_SEARCH_LIST", watchDataList);
      this.$store.commit("SETTLE_SEARCH", false);
    },
    toUrl(type, itemId, rowdata) {
      if (type == "ADD") {
        this.$router.push({
          path: "./add",
          query: { type: type }
        });
      } else if (type == "SETTLEMENT" || type == "SETTLESURE") {
        this.$router.push({
          path: "./settlement/" + itemId,
          query: { type: type }
        });
      } else if (type == "DETAIL") {
        this.$router.push({
          path: "./detail/" + itemId,
          query: { type: type }
        });
      }
    },
    // 结算或者确认
    settlement(rowdata, type) {
      if (type == 'settle') {
        // 结算
        this.toUrl("SETTLEMENT", rowdata.settleNo, rowdata);
      } else if (type == "sure") {
        // 确认
        this.toUrl("SETTLESURE", rowdata.settleNo, rowdata);
      }
    },
    // 查看详情
    detail(rowdata) {
      this.toUrl("DETAIL", rowdata.settleNo, rowdata);
    },
    sum() {
      this.getAgentSettleSumAc().then(isSuccess => {
        isSuccess && this.$refs.sum.open(this.sumData);
      });
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
