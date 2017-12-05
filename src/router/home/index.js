
import Loading from "../Loading";
/**
 * 登录模块
 */
export default {
  name: "home",
  path: "/home",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/Home/Home")) }, "home")
  },
  meta: {
    pageTitle: "易票运营系统"
  }
}

