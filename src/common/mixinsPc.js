import { todayDate, yesterday } from "@src/common/dateSerialize";
import utils from "@src/common/utils";
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
    // 设置银行卡号,每四位添加一个空格  
    validateNum(val, dataWhere, dataKey) {
      let newval = val.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      this.$set(this.$data[dataWhere], dataKey, newval);
    },
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
    saveLoadingStop(val = false) {
      if (!val) {
        this.saveLoading = false
        this.saveLoading2 = false
      }
    },
    statusFilter(data, filterName) {
      let obj = utils.statusFilter(data, filterName)
      let color_ = "";
      if (obj.type == "#409EFF") {// blue
        color_ = "primary";
      } else if (obj.type == "#67C23A") { //green
        color_ = "success";
      } else if (obj.type == "#E6A23C") { //yellow
        color_ = "warning";
      } else if (obj.type == "#F56C6C") { // red
        color_ = "danger";
      } else if (obj.type == "#909399") { //gray
        color_ = "info";
      }
      let promise = {
        text: obj.text,
        type: color_
      }
      return promise
    }
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