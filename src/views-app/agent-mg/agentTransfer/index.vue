<template>
  <full-page ref="FullPage">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <slider-nav v-model="routeMenuCode" slot="header" :munes="munes"></slider-nav>
    <div>敬请期待</div>
  </full-page>
</template>

<script>
export default {
  data() {
    return {
      munes: this.$store.state.userInfoAndMenu.menuList[
        this.$route.query["menuIndex"]
      ].child,
      routeMenuCode: ""
    };
  },
  activated() {
    this.routeMenuCode = this.$route.name;
  }
};
</script>

<style>

</style>
