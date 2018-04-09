<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle+'('+count+')'">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button>
      </mt-header>
      <!-- actions操作 -->
      <myp-popup-actions slot="header" :actions="popupActions" v-model="popupActionsVisible"></myp-popup-actions>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.createTime">
          <!-- 状态 -->
          <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.status | statusFilter('empowerTransferStatus')}}</mt-badge>
          <!-- 常用按钮 -->
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="转移单号">{{item.migrateNo}}</myp-tr>
              <myp-tr title="转移状态">{{transferStatus(item) }}</myp-tr>
              <myp-tr title="操作员">{{item.operator}}</myp-tr>
              <myp-tr title="数量">{{item.qrcodeCount}}</myp-tr>
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
import { getArantNumTransfers } from "@src/apis";
import { mapState, mapActions } from "vuex";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { scrollBehavior, filterColor } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions },
  data() {
    return {
      popupActionsVisible: false,
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumTransfers,
      count: 0,
      actions: [],
      popupActions: [
        {
          name: "授权码分配",
          icon: "icon-admin",
          method: () => {
            this.toUrl("ALLOT");
          }
        },
        {
          name: "授权码上缴",
          icon: "icon-admin",
          method: () => {
            this.toUrl("PAID");
          }
        }
      ]
    };
  },

  created() {
    this.$store.commit("QRCODEMIGRATE_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerTransfer.list,
      searchQuery: state => state.empowerTransfer.searchQuery,
      isSearch: state => state.empowerTransfer.isSearch,
    })
  },
  watch: {
    isSearch(flag) {
      // alert(flag);
      flag && this.$refs.MypLoadmoreApi.load(this.searchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.searchQuery);
  },
  methods: {
    toUrl(type, itemId, rowdata) {
      if (type == "ALLOT") {
        // 授权码分配
        this.$router.push({
          path: "./allot",
          query: { type: type }
        });
      } else if (type == "PAID") {
        // 授权码上缴
        this.$router.push({
          path: "./paid",
          query: { type: type }
        });
      }
    },
    watchDataList(watchDataList, count) {
      this.count = count;
      this.$store.commit("QRCODEMIGRATE_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODEMIGRATE_SEARCH", false);
    },
    transferStatus(row) {
      let migrateMode = row.migrateMode;
      let moveType = "";
      let who = "";
      let agentNo = row.agentNo;
      if (agentNo != row.operator && row.otherAgentNo != row.operator) {
        who = " (运营操作)";
      }
      if (migrateMode == "INPUT") {
        moveType = " <" + who + " ";
        return agentNo + moveType + row.otherAgentNo;
      } else if (migrateMode == "OUTPUT") {
        moveType = " " + who + "> ";
        return agentNo + moveType + row.otherAgentNo;
      } else {
        moveType = migrateMode + who;
      }
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>
