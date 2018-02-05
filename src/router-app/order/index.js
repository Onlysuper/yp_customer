
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

export default {
  name: "order",
  path: "/",
  component: App,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //聚合支付分润
    {
      name: "orderQuery",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "orderQuery",
      redirect: "orderQuery/index",
      component: keepAlive,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/orderQuery")) }, "order-app")
          },
          meta: {
            pageTitle: "聚合支付分润",
            keepAlive: true,
            menuCode: "orderQuery",
          }
        }
      ]
    },
  ]
}