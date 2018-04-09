<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.createTime">
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.userType | statusFilter('userType')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="授权码">{{item.userId}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="操作类型">{{item.actionDesc}}</myp-tr>
              <myp-tr title="版本号">{{item.version}}</myp-tr>
              <myp-tr title="IP地址">{{item.ipAddress}}</myp-tr>
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
import { getBurialPointManages, getNewBurialPointManages } from "@src/apis";
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
      api: getBurialPointManages,
      sumApi: "",
      count: 0
    };
  },
  created() {
    this.$store.commit("OPERATORLOG_SEARCH_INIT");
  },
  activated() {

  },
  computed: {
    ...mapState({
      list: state => state.buriedPoint.list,
      isSearch: state => state.buriedPoint.isSearch,
      searchQuery: state => state.buriedPoint.searchQuery,
      oldOrNew: state => state.buriedPoint.oldOrNew,
      sumData: state => state.buriedPoint.sumData
    })
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
      this.$store.commit("OPERATORLOG_SEARCH", false);
    },
    oldOrNew(val) {
      if (val == "new") {
        this.api = getNewBurialPointManages;
      } else {
        this.api = getBurialPointManages
      }
      this.sumUrlChange(val);
    }
  },
  methods: {
    ...mapActions(["getBuriedPointSumAc", "getNewBuriedPointSumAc"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("OPERATORLOG_SEARCH_LIST", watchDataList);
      this.$store.commit("OPERATORLOG_SEARCH", false);
      this.sumUrlChange(this.oldOrNew);
      // this.sumApi = this.getBuriedPointSumAc;
    },
    sumUrlChange(val) {
      if (val == "new") {
        this.sumApi = this.getNewBuriedPointSumAc;
      } else {
        this.sumApi = this.getBuriedPointSumAc;
      }
    },
    sum() {
      this.sumApi().then(isSuccess => {
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
