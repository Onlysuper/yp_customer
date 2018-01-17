
import loading from "../loading"
import App from "@src/App";

export default {
  name: "home",
  path: "/",
  redirect: "/home",
  component: App,
  children: [{
    //商户管理
    name: "1",
    path: 'home',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views-app/home")) }, "home-app")
    },
    meta: {
      pageTitle: "易票运营系统"

    }
  }]
}