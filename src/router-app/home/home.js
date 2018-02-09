
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

export default {

  //商户管理
  path: '/',
  component: keepAlive,
  children: [
    {
      path: 'home',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/home")) }, "home-app")
      },
      meta: {
        pageTitle: "易票管理系统",
        keepAlive: true
      },
    },
    {
      path: "repass",
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/home/repass")) }, "home-app")
      },
      meta: {
        pageTitle: "密码修改"
      },
    },
    {
      path: "userInfo",
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/home/userInfo")) }, "home-app")
      },
      meta: {
        pageTitle: "个人信息"
      },
    }
  ]
}