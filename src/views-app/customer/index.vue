<template>
  <div class="page">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.commit("INIT_GOODS_STORE");
  }
};
</script>

<style lang="scss">

</style>
