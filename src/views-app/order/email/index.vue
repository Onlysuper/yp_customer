<template>
  <div class="page">
    <full-page ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({path:'./search'})">搜索</mt-button>
        <!-- <mt-button slot="right" :disabled="false" type="danger" @click="popupActionsVisible = !popupActionsVisible">...</mt-button> -->
        <mt-button  slot="right" :disabled="false" type="danger" @click="operationHandle('ADD')">新增</mt-button>
      </mt-header>
      <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
      
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" title="">
          <!-- <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.bussinessType,'emailBussinessType')">{{item.bussinessType | statusFilter('emailBussinessType')}}</mt-badge> -->
          <mt-badge slot="badge" class="g-min-badge" size="small" :color="filterColor(item.status,'emailStatus')">{{item.status | statusFilter('emailStatus')}}</mt-badge>
           <div slot="btn" @click="operationHandle('EDIT',item.bussinessNo)">编辑</div>
          <myp-cell class="list-item">
            <table>
              <myp-tr title="创建时间">{{item.createTime}}</myp-tr>
              <myp-tr title="商户编号">{{item.bussinessNo}}</myp-tr>
              <myp-tr title="邮箱">{{item.contactEmail}}</myp-tr>
              <!-- <myp-tr title="层级详情">{{item.levelDetail}}</myp-tr> -->
            </table>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>

<script>
import SliderNav from "@src/components-app/SliderNav";
import MypPopupActions from "@src/components-app/MypPopupActions";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import { getEmailconfigs } from "@src/apis";
import { mapState, mapActions } from "vuex";
import utils from "@src/common/utils";
export default {
  mixins: [scrollBehavior, filterColor],
  components: { SliderNav, MypPopupActions },
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: "",
      api: getEmailconfigs
    };
  },
  created() {
    this.$store.commit("EMAIL_QUERY_INIT");
  },
  computed: {
    ...mapState({
      list: state => state.email.list,
      isSearch: state => state.email.isSearch,
      searchQuery: state => state.email.searchQuery
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
    watchDataList(watchDataList) {
      this.$store.commit("EMAIL_SET_LIST", watchDataList);
      this.$store.commit("EMAIL_IS_SEARCH", false);
      this.$store.commit("EMAIL_IS_UPDATE", false);
    },
    operationHandle(type, itemId) {
      if (type == 'ADD') {
        this.$router.push({
          path: "./add",
          query: {
            pageType: type
          }
        });
      }
      if (type == 'EDIT') {
        this.$router.push({
          path: "./edit",
          query: {
            pageType: type,
            bussinessNo: itemId
          }
        });
      }
    }
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
</style>
