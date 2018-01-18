
/**
 * 错误页面
 */
export default {
  name: "error",
  path: "/error",
  component: r => require.ensure([], () => { return r(require("@src/views/error/error")) }, "error"),
  redirect: "/error/404",
  children: [
    {
      name: "404",
      path: "404",
      meta: {
        pageTitle: "404"
      },
      component: r => require.ensure([], () => { return r(require("@src/views/error/404")) }, "error")
    },
    {
      name: "test",
      path: "test",
      meta: {
        pageTitle: "测试"
      },
      component: r => require.ensure([], () => { return r(require("@src/views/error/test")) }, "error")
    }
  ]
}

