<template>
  <full-page class="" ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">

        <!-- 常用按钮 -->
        <div slot="btn" @click="$router.push({path:'./edit',query:item})">编辑</div>

        <!-- 状态 -->
        <mt-badge slot="badge" class="g-min-badge" size="small" type="primary">{{item.customerFrom | handleFrom}}</mt-badge>
        <mt-badge slot="badge" class="g-min-badge" size="small" type="error">{{item.status | handleStatus}}</mt-badge>

        <myp-cell class="list-item">
          <!-- 详情 -->
          <table>
            <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
            <myp-tr title="企业税号">{{item.taxNo}}</myp-tr>
            <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
            <myp-tr title="入网时间">{{item.createTime}}</myp-tr>
          </table>
          <!-- 更多操作 -->
          <div slot="right">更多操作</div>
        </myp-cell>

      </myp-cell-pannel>
    </myp-loadmore-api>
  </full-page>

</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import { getCustomers } from "@src/apis";
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
      api: getCustomers,
      list: []
    };
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  },
  methods: {
    watchDataList(watchDataList) {
      this.list = watchDataList;
    }
  }
};
</script>

<style>

</style>
