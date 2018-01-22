
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 分润查询
 */


export default {
  name: "profit",
  path: "/",
  redirect: "/profitBilling",
  component: App,
  meta: {
    // keepAlive: true
  },
  children: [
    {
      name: "billprofit",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "profitBilling",
      redirect: "profitBilling/index",
      component: keepAlive,
      children: [
        //快速开票分润
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/profit/profitBilling")) }, "profit-app")
          },
          meta: {
            pageTitle: "快速开票分润",
            keepAlive: true
          }
        },
        //快速开票分润--搜索
        {
          name: "profitBillingSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/profit/profitBilling/search")) }, "profit-app")
          },
          meta: {
            pageTitle: "搜索",
            // keepAlive: true
          }
        },
      ]
    },
  ]
}