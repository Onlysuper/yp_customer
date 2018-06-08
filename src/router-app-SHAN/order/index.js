
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
          path: 'detail/:orderNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/orderQuery/detail")) }, "order-detail-app")
          },
          meta: {
            pageTitle: "详情",
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
    {
      name: "email",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "email",
      redirect: "email/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/email")) }, "email-app")
          },
          meta: {
            pageTitle: "邮箱配置",
            keepAlive: true,
            menuCode: "email",
          }
        },
        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/email/edit")) }, "email-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'edit',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/email/edit")) }, "email-app")
          },
          meta: {
            pageTitle: "新增",
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/order/email/search")) }, "email-app")
          },
          meta: {
            pageTitle: "搜索",
          }
        }
      ]
    }
  ]
}