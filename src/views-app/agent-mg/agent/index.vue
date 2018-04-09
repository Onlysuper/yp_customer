<template>
  <full-page ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
      <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./add'})">新增</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.agentName">
        <!-- 常用按钮 -->
        <div slot="btn" @click="$router.push({path:`./edit/${item.agentNo}`})">编辑</div>

        <!-- 状态 -->
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | statusFilter('handleStatus')}}</mt-badge>

        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
            <myp-tr title="手机号">{{item.phoneNo}}</myp-tr>
            <myp-tr title="层级详情">{{item.levelDetail}}</myp-tr>
          </table>
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>
  </full-page>
</template>

<script>
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getAgentManages } from "@src/apis";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior, filterColor],
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getAgentManages,
      count: 0
    };
  },
  created() {
    this.$store.commit("AGENT_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.agent.list,
      isSearch: state => state.agent.isSearch,
      searchQuery: state => state.agent.searchQuery
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
    ...mapActions(["getBillprofitSum"]),
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("AGENT_SET_LIST", watchDataList);
      this.$store.commit("AGENT_IS_SEARCH", false);
    },
    toUrl(path, agentNo) {
      agentNo = agentNo || "";
      this.$router.push({
        path: `./${path}/${agentNo}`
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
