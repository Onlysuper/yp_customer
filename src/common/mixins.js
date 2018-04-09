/**
 * 处理滚动条位置，使用请在组件注入在mixin中
 */
import utils from "@src/common/utils";
const scrollBehavior = {
  cactivated() {
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

const filterColor = {
  methods: {
    filterColor(data, filterName) {
      let obj = utils.statusFilter(data, filterName);
      let color_ = obj.type ? obj.type : "#409EFF";
      let promise = {
        text: obj.text,
        type: color_
      }
      return promise
    },
    // 按钮权限
    adminFilter(fileterName) {
      let fileter = this.$store.state.userInfoAndMenu.userMessage.all[fileterName]
      if (fileter == "TRUE") {
        return true
      } else {
        return false
      }
    }
  }
}
export { scrollBehavior, filterColor }