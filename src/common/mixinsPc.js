import { todayDate, yesterday } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinsPc = {

  methods: {
    /**TABLE页交互 START ************************************************************ */
    showDialog(dialogName) {
      this[dialogName] = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
    /**END ***********************************************/
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