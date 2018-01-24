
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 我的商户
 */
export default {
  name: "bill-mg",
  path: "/bill-mg",
  redirect: "/billcountagent",
  component: keepAlive,
  meta: {
    // keepAlive: true
  },
  children: [
    //开票统计
    {
      name: "billcountagent",
      path: '/billcountagent',
      redirect: "/billcountagent/index",
      component: App,
      children: [
        //开票统计主页面
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billCount")) }, "bill-count-agent")
          },
          meta: {
            pageTitle: "开票统计",
            keepAlive: true,
            menuCode: "billcountagent"
          }
        },
        {
          name: "billCountSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/billmanage/billCount/search")) }, "bill-count-search")
          },
          meta: {
            pageTitle: "开票统计搜索"
          }
        },
      ]
    },
  ]
}