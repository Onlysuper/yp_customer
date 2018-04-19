/**
 * 处理滚动条位置，使用请在组件注入在mixin中
 */
import utils from "@src/common/utils";
const scrollBehavior = {
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

const filterColor = {
  methods: {
    filterColor(data, filterName) {
      let obj = utils.statusFilter(data, filterName);
      let color_ = obj.type ? obj.type : "#409EFF";
      let promise = {
        text: obj.text,
        type: color_
      }
      return color_
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
const statusFilterQuery = {
  methods: {
    statusFilterQuery(type) {
      let resault = Object.entries(utils.statusFilterQuery(type));
      let queryArr = [];
      for (let [key, value] of resault) {
        queryArr.push({
          code: key,
          name: value.name
        })
      }
      return queryArr
    }
  }
}
const validateInput = {
  methods: {
    validateNum(val, dataWhere, dataKey) {
      if (val) {
        let newval = val.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        this.$set(this.$data[dataWhere], dataKey, newval);
      }
    }
  }
}
export { scrollBehavior, filterColor, validateInput, statusFilterQuery }