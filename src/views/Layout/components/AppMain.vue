<template>
  <div class="reset-main">
    <transition>
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
body {
  margin: 0;
}
.reset-main {
  position: relative;
  height: 100%;
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
    console.log(this.cachedViews);
  }
};
</script>
