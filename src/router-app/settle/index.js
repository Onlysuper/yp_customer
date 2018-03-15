
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

        //商品管理--搜索
        {
          name: "settleSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/settle/settle/search")) }, "settle-search-app")
          },
          meta: {
            pageTitle: "结算管理搜索"
          }
        }
      ],
    }
  ]
}