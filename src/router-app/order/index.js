
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

export default {
  name: "order",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    {
      name: "orderQuery",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "orderQuery",
      redirect: "orderQuery/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/orderQuery")) }, "order-app")
          },
          meta: {
            pageTitle: "订单查询",
            keepAlive: true,
            menuCode: "orderQuery",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/orderQuery/search")) }, "order-app")
          },
          meta: {
            pageTitle: "搜索",
          }
        }
      ]
    },
  ]
}