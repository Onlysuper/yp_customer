
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

export default {
  name: "enterprise",
  path: "/",
  component: App,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    {
      name: "enterprise_supply",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "enterprise_supply",
      redirect: "enterprise_supply/index",
      component: keepAlive,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/enterprise/enterprise_supply")) }, "enterprise-app")
          },
          meta: {
            pageTitle: "快速开票分润",
            keepAlive: true,
            menuCode: "enterprise_supply",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/enterprise/enterprise_supply/add")) }, "enterprise-app")
          },
          meta: {
            pageTitle: "新增资质",
            // keepAlive: true
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/enterprise/enterprise_supply/search")) }, "enterprise-app")
          },
          meta: {
            pageTitle: "搜索",
            // keepAlive: true
          }
        },
      ]
    }
  ]
}