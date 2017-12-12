
import Loading from "../Loading";
/**
 * 登录模块
 */
export default {
  name: "login",
  path: "/login",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/Login/Login")) }, "login")
  },
  meta: {
    pageTitle: "登录"
  }
}

