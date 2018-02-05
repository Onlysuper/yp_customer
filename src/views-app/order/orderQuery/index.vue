<template>
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <!-- <mt-button slot="right" style="float:left;" :disabled="false" type="danger" @click="$router.push({name:'profitBillingSearch'})">搜索</mt-button> -->
      <!-- <mt-button slot="right" :disabled="false" type="danger" @click="sum">合计</mt-button> -->
    </mt-header>
    <div class="tip">敬请期待</div>
  </full-page>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tip {
  margin-top: 100px;
  text-align: center;
}
</style>
