<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" title="">
          <div slot="btn" v-if="item.outMoneyStatus !='OUT_SUCCESS'?true:false" @click="dataUpdate(item)">状态更新</div>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary" :color="filterColor(item.outMoneyStatus,'customerSettleOutMoneyStatus')">{{item.outMoneyStatus | statusFilter('customerSettleOutMoneyStatus')}}</mt-badge>
          <myp-cell class="list-item" @click="detail(item)">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="商户名称">{{item.customerName}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="出款状态">{{item.outMoneyStatus}}</myp-tr>
              <myp-tr title="结算名称">{{item.settleName}}</myp-tr>
              <myp-tr title="结算账号">{{item.settleNo}}</myp-tr>
              <!-- <myp-tr title="交易金额">{{item.payAmount}}</myp-tr>
              <myp-tr title="手续费">{{item.proceduresFee}}</myp-tr>
              <myp-tr title="冻结金额">{{item.freezeAmount}}</myp-tr>
              <myp-tr title="结算金额">{{item.settleAmount}}</myp-tr> -->
              <!-- <myp-tr title="交易类型">{{item.settleType}}</myp-tr> -->
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>

<script>
import MypPopupActions from "@src/components-app/MypPopupActions";
import SliderNav from "@src/components-app/SliderNav";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getCustomerSettles } from "@src/apis";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions },
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
      api: getCustomerSettles,
      count: 0
    };
  },
  created() {
    this.$store.commit("CUSTOMERSETTLE_SEARCH_INIT");

  },
  computed: {
    ...mapState({
      list: state => state.customerSettle.list,
      isSearch: state => state.customerSettle.isSearch,
      searchQuery: state => state.customerSettle.searchQuery,
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
    ...mapActions(['updateCustomerSettle']),
    //状态更新
    dataUpdate(item) {
      let data_ = item;
      this.updateCustomerSettle(data_).then(isSuccess => {
        // isSuccess && this.$refs.sum.open(this.sumData);
      });
    },
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("CUSTOMERSETTLE_SEARCH_LIST", watchDataList);
      this.$store.commit("CUSTOMERSETTLE_SEARCH", false);
    },
    toUrl(type, itemId, rowdata) {
      if (type == "ADD") {
        this.$router.push({
          path: "./add",
          query: { type: type }
        });
      } else if (type == "DETAIL") {
        this.$router.push({
          path: "./detail/" + itemId,
          query: { type: type }
        });
      }
    },
    // 查看详情
    detail(rowdata) {
      this.toUrl("DETAIL", rowdata.customerNo, rowdata);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
