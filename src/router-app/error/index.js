
import loading from "../loading"
import App from "@src/App";

/**
 * 错误页面
 */

export default {
  name: "error",
  path: "/error",
  redirect: "error/404",
  component: App,
  meta: {
    // keepAlive: true
  },
  children: [
    {
      name: "404",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "404",
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/error/404")) }, "error-app")
      },
      meta: {
        pageTitle: "啊~~页面走丢了",
      }
    },
  ]
}