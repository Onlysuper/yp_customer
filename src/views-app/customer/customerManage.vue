<template>
  <full-page class="my-customer-detail-container page">
    <mt-header slot="header" :title="$route.meta.pageTitle" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <myp-loadmore-api class="list" ref="MypLoadmoreApi" :api="api" @watchDataList="watchDataList">
      <myp-cell class="list-item" v-for="(item,index) in list" :key="index" :title="item.bussinessName" :subtitle="'商户号：'+item.customerNo" :description="'手机号：'+item.phoneNo">

      </myp-cell>
    </myp-loadmore-api>
  </full-page>
</template>

<script>
import { getCustomers } from "@src/apis";
export default {
  data() {
    return {
      api: getCustomers,
      list: []
    };
  },
  mounted() {
    this.$refs.MypLoadmoreApi.load();
  },
  methods: {
    watchDataList(watchDataList) {
      this.list = watchDataList;
      console.log(this.list);
    }
  }
};
</script>

<style>

</style>
