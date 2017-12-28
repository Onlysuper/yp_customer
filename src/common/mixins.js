/**
 * 处理滚动条位置，使用请在组件注入在mixin中
 */
export const scrollBehavior = {
  activated() {
    this.$refs.FullPage.setScrollTop(
      this.$store.state.scrollTop[this.$route.name]
    );
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("SAVE_SCROLLTOP", {
      name: this.$route.name,
      scrollTopVal: this.$refs.FullPage.getScrollTop()
    });
    next();
  }
}