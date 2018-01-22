import { todayDate, yesterday } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinsPc = {
  methods: {
    showDialog(dialogName) {
      // 打开dialog框
      this[dialogName] = true;
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    mounted() {
      // 顶部搜索初始化为普通搜索
      this.$store.commit("initSearchVisibleFn");
    },
    // 按钮权限
    adminFilter(fileterName) {
      let fileter = this.$store.state.moduleLayour.userMessage.all[fileterName]
      if (fileter == "TRUE") {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    userBussinessNo() {
      return this.$store.state.moduleLayour.userMessage.userBussinessNo;
    },
    userType() {
      return this.$store.state.moduleLayour.userMessage.userType;
    }
  }
}
export {
  mixinsPc
}