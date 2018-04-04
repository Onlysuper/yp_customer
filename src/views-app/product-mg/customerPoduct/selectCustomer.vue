<template>
  <div class="page">
    <full-page class="" ref="FullPage">
      <mt-header slot="header" :title="$route.meta.pageTitle">
        <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
        <mt-button slot="right" :disabled="false" type="danger" @click="$router.push({path:'./searchCustomer'})">搜索</mt-button>
      </mt-header>
      <!-- 列表组件 -->
      <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
        <myp-cell-pannel class="spacing-20" v-for="(item,index) in list" :key="index" :title="item.enterpriseName">
          <myp-cell class="list-item">
            <!-- 详情 -->
            <table>
              <myp-tr title="商户编号">{{item.customerNo}}</myp-tr>
              <myp-tr title="企业税号">{{item.taxNo}}</myp-tr>
              <myp-tr title="合伙人编号">{{item.agentNo}}</myp-tr>
              <myp-tr title="入网时间">{{item.createTime}}</myp-tr>
            </table>
            <!-- 更多操作 -->
            <div slot="right" @click="operation(item)">开通</div>
          </myp-cell>
        </myp-cell-pannel>
      </myp-loadmore-api>
    </full-page>
  </div>
</template>

<script>
import { getCustomers } from "@src/apis";
import { scrollBehavior, filterColor } from "@src/common/mixins";
import utils from "@src/common/utils";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [scrollBehavior, filterColor],
  components: {},
  data() {
    return {
      api: getCustomers,
      list: []
    };
  },
  computed: {
    ...mapState({
      customerSearchQuery: state => state.customerProduct.customerSearchQuery,
      isSearch: state => state.customerProduct.isSearch
    })
  },
  watch: {
    isSearch(flag) {
      flag && this.$refs.MypLoadmoreApi.load(this.customerSearchQuery);
    }
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load(this.customerSearchQuery);
  },
  methods: {
    watchDataList(watchDataList) {
      this.list = watchDataList;
      this.$store.commit("CUSTOMER_PRODUCT_SEARCH", false);
    }
  }
};
</script>

<style>

</style>
