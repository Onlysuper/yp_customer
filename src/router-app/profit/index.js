
import loading from "../loading"
import Layout from "@src/views-app/customer";
/**
 * 分润查询
 */


export default {
  name: "profit",
  path: "/profit",
  redirect: "/profit/profitBilling",
  component: Layout,
  meta: {
    // keepAlive: true
  },
  children: [
    //快速开票分润
    {
      name: "billprofit",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: 'profitBilling',
      component: r => {
        loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views-app/profit/profitBilling")) }, "profit-app")
      },
      meta: {
        pageTitle: "快速开票分润",
        keepAlive: true
      }
    },
    //快速开票分润--搜索
    {
      name: "profitBillingSearch",
      path: 'profitBilling/search',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/profit/profitBilling/search")) }, "profit-app")
      },
      meta: {
        pageTitle: "搜索",
        // keepAlive: true
      }
    },

  ]
}