<template>
  <!-- layout 内容展示区域 -->
  <div class="reset-main">
    <!-- <transition> -->
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>
    <!-- </transition> -->
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.reset-main {
  flex: 1;
  overflow: hidden;
  position: relative;
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
  watch: {
    // cachedViews(val) {
    //   console.log(val);
    // },
    $route(val) {
      // console.log(this.cachedViews)
    }
    // cachedViews(value) {
    // console.log(value);
    // }
  },
  mounted() {
    // console.log(cachedViews);
    // console.log(this.cachedViews);
  }
};
</script>
