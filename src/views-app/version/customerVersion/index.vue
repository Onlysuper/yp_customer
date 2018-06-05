<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button> -->
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
          <div slot="btn" @click="edit(item)">编辑</div>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary" :color="filterColor(item.status,'versionStatus')">{{item.status | statusCustomerVersion}}</mt-badge>
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary" :color="filterColor(item.type,'typeCustomerVersion')">{{item.type | statusFilter('typeCustomerVersion')}}</mt-badge>
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="版本号">{{item.version}}</myp-tr>
              <myp-tr title="更新时间">{{item.lastUpdateTime}}</myp-tr>
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
import { getCustomerVersions } from "@src/apis";
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
      api: getCustomerVersions,
      count: 0
    };
  },
  created() {
    this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.customerVersion.list,
      isSearch: state => state.customerVersion.isSearch,
      searchQuery: state => state.customerVersion.searchQuery,
      sumData: state => state.customerVersion.sumData
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
    ...mapActions(["getConvergePayCommSum"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_LIST", watchDataList);
      this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH", false);
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
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>

</style>
