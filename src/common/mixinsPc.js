import { todayDate, yesterday } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinsPc = {
  data() {
    return {
      saveLoading: false, // 保存loading
      saveLoading2: false, // 保存loading
      buttonDisabled: false, // 保存loading
      buttonDisabled2: false, // 保存loading
    }
  },
  methods: {
    showDialog(dialogName) {
      // 打开dialog框
      this[dialogName] = true;
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    inputChangeValidate(formName) {
      this.$refs[formName].validate(valid => { })
    },
    mounted() {
      // 顶部搜索初始化为普通搜索
      // this.$store.commit("initSearchVisibleFn");
    },
    // 按钮权限
    adminFilter(fileterName) {
      let fileter = this.$store.state.userInfoAndMenu.userMessage.all[fileterName]
      if (fileter == "TRUE") {
        return true
      } else {
        return false
      }
    },

  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    },
    userBussinessNo() {
      return this.$store.state.userInfoAndMenu.userMessage.all.userBussinessNo;
    },
    userType() {
      return this.$store.state.userInfoAndMenu.userMessage.all.userType;
    }
  }
}
export {
  mixinsPc
}