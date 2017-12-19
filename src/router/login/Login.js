
import Loading from "@src/router/Loading"

/**
 * 登录模块
 */
export default {
  name: "login",
  path: "/login",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/login/login")) }, "login")
  },
  meta: {
    pageTitle: "登录"
  }
}

