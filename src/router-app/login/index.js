
export default {
  name: "login",
  path: "/login",
  component: r => {
    return require.ensure([], () => { return r(require("@src/views-app/login")) }, "login-app")
  },
  meta: {
    pageTitle: "登录"
  }
}