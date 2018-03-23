
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 统计管理
 */
export default {
  name: "statistical_manage",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //埋点管理
    {
      name: "operator_log",
      path: 'operator_log',
      redirect: "operator_log/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/statistical/buriedPoint")) }, "buriedPoint-app")
          },
          meta: {
            pageTitle: "埋点管理",
            keepAlive: true,
            menuCode: "operator_log"
          }
        },
        //商品管理--搜索
        {
          // name: "operator_log",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/statistical/buriedPoint/search")) }, "statistical-search-app")
          },
          meta: {
            pageTitle: "搜索"
          }
        },
        //商品管理--编辑
        {
          // name: "customerVersion",
          path: 'edit/:queryNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/version/customerVersion/edit")) }, "customerVersion-edit-app")
          },
          meta: {
            pageTitle: "商户版本编辑"
          }
        }
      ],
    }
  ]
}