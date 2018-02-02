<template>
  <!-- layout 内容展示区域 -->
  <div class="reset-main">
    <transition>
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->

      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.reset-main {
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    }
  },
  mounted() {
    // console.log(cachedViews);
    // console.log(this.cachedViews);
  }
};
</script>
