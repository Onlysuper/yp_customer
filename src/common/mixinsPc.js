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
      // this.$store.commit("initSearchVisibleFn");
    }
  },
  computed: {
    oaIp() {
      // nginx配置的路由
      return this.$store.state.Base.oaIp;
    }
  }
}
export {
  mixinsPc
}