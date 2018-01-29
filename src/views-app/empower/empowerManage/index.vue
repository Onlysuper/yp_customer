<template>
  <!-- 开票统计 -->
  <div class="page">
    <full-page class="page" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'empowerManageSearch'})">搜索</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.dataTime">
          <!-- 常用按钮 -->
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <!-- <myp-tr title="日期">{{item.dataTime}}</myp-tr> -->
              <myp-tr title="批次号">{{item.batchNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="序列号">{{item.qrcode}}</myp-tr>
              <myp-tr title="授权码">{{item.authCode}}</myp-tr>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="设备类型">{{item.deviceType}}</myp-tr>
              <myp-tr title="状态">{{item.status}}</myp-tr>
              <myp-tr title="是否有物料">{{item.materiel}}</myp-tr>
              <myp-tr title="上级授权码">{{item.parentCode}}</myp-tr>
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
import { getArantNumManages } from "@src/apis";
import { mapState, mapActions } from "vuex";
import { scrollBehavior } from "@src/common/mixins";
export default {
  mixins: [scrollBehavior],
  components: { SliderNav },
  data() {
    return {
      munes: this.$store.state.moduleLayour.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getArantNumManages,
      actions: []
    };
  },
  created() {
    this.$store.commit("QRCODE_SEARCH_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.empowerManage.list,
      searchQuery: state => state.empowerManage.searchQuery,
      isSearch: state => state.empowerManage.isSearch
    })
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
      this.$store.commit("QRCODE_SEARCH_LIST", watchDataList);
      this.$store.commit("QRCODE_SEARCH", false);
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
