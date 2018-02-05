
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 分润查询
 */

export default {
  name: "profit",
  path: "/",
  component: App,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //快速开票分润
    {
      name: "billprofit",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "profitBilling",
      redirect: "profitBilling/index",
      component: keepAlive,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/profit/profitBilling")) }, "profit-app")
          },
          meta: {
            pageTitle: "快速开票分润",
            keepAlive: true,
            menuCode: "billprofit",
          }
        },
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
    //聚合支付分润
    {
      name: "convergePayComm",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "convergePayComm",
      redirect: "convergePayComm/index",
      component: keepAlive,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/profit/convergePayComm")) }, "profit-app")
          },
          meta: {
            pageTitle: "聚合支付分润",
            keepAlive: true,
            menuCode: "convergePayComm",
          }
        }
      ]
    },
  ]
}