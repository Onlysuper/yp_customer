
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 版本控制
 */
export default {
  name: "versionManager",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //商户版本
    {
      name: "customer_versionPlugin",
      path: 'customerVersion',
      redirect: "customerVersion/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/version/customerVersion")) }, "customerVersion-app")
          },
          meta: {
            pageTitle: "商户版本",
            keepAlive: true,
            menuCode: "customer_versionPlugin"
          }
        },
        //商品管理--新增
        {
          name: "customerVersion",
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/version/customerVersion/add")) }, "customerVersion-add-app")
          },
          meta: {
            pageTitle: "商户版本新增"
          }
        },
        //商品管理--编辑
        {
          name: "customerVersion",
          path: 'edit/:queryNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/version/customerVersion/edit")) }, "customerVersion-edit-app")
          },
          meta: {
            pageTitle: "商户版本编辑"
          }
        },
        //商品管理--搜索
        {
          name: "customerVersion",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/version/customerVersion/search")) }, "customerVersion-search-app")
          },
          meta: {
            pageTitle: "商户版本搜索"
          }
        }
      ],
    }
  ]
}