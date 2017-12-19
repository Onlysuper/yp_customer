
import loading from "@src/router/loading"

/**
 * 登录模块
 */
export default {
  name: "login",
  path: "/login",
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/login/login")) }, "login")
  },
  meta: {
    pageTitle: "登录"
  }
}

