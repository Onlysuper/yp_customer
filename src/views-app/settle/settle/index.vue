<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
        <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="isAdmin?item.agentName:''">
          <div slot="btn" @click="edit(item)">编辑</div>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | statusSettle}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="结算单号">{{item.settleNo}}</myp-tr>
              <myp-tr v-if="!isAdmin" title="商户数量">{{item.customerNumber}}</myp-tr>
              <myp-tr v-if="isAdmin" title="代理商编号">{{item.agentNo}}</myp-tr>
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
import { scrollBehavior } from "@src/common/mixins";
import { getSettles } from "@src/apis";
import { mapState, mapActions } from "vuex";
import sum from "./sum";
export default {
  mixins: [scrollBehavior],
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
    }),
    isAdmin() {
      let user = this.$store.state.userInfoAndMenu.userMessage.all;
      let admin = (
        user.userType === "root" ||
        user.userType === "admin" ||
        user.userType === "operator"
      ); // 运营
      return admin
    }
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
      } else if (type == "EDIT") {
        this.$router.push({
          path: "./edit/" + itemId,
          query: { type: type }
        });
      }
    },
    edit(rowdata) {
      this.toUrl("EDIT", rowdata.customerNo, rowdata);
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
