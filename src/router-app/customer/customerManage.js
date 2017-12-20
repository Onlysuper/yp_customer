
import loading from "../loading"
import App from "@src/App";
/**
 * 登录模块
 */
export default {
  name: "customerlist",
  path: "/",
  redirect: "/customerlist",
  component: App,
  children: [{
    //商户管理
    name: "customerlist",
    path: 'customerlist',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views-app/customer/customerManage")) }, "customerlist-app")
    },
    meta: {
      pageTitle: "商户管理"
    }
  }]
}