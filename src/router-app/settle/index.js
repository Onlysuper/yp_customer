
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 结算管理
 */
export default {
  name: "AgentSettle",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //商户版本
    {
      name: "settle",
      path: 'settle',
      redirect: "settle/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/settle/settle")) }, "settle-app")
          },
          meta: {
            pageTitle: "结算管理",
            keepAlive: true,
            menuCode: "settle"
          }
        },
        // 结算
        {
          name: "settlement",
          path: 'settlement/:settleNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/settle/settlement")) }, "settle-settlement-app")
          },
          meta: {
            pageTitle: "结算"
          }
        },
        // 详情
        {
          name: "settleDetail",
          path: 'detail/:settleNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/settle/detail")) }, "settle-detail-app")
          },
          meta: {
            pageTitle: "详情"
          }
        },
        //商品管理--搜索
        {
          name: "settleSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/settle/search")) }, "settle-search-app")
          },
          meta: {
            pageTitle: "搜索"
          }
        }
      ],
    },
    {
      name: "customerSettle",
      path: 'customerSettle',
      redirect: "customerSettle/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/settle/customerSettle")) }, "customer-settle-app")
          },
          meta: {
            pageTitle: "结算管理",
            keepAlive: true,
            menuCode: "customerSettle"
          }
        },
        {
          name: "customerSettleSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/customerSettle/search")) }, "customer-settle-app")
          },
          meta: {
            pageTitle: "搜索"
          }
        },
        {
          name: "customerSettleDetail",
          path: 'detail/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/customerSettle/detail")) }, "customer-settle-app")
          },
          meta: {
            pageTitle: "详情"
          }
        },
      ],
    }
  ]
}