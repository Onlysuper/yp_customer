
import loading from "../loading"
import App from "@src/App";

export default {

  //商户管理
  name: "home",
  path: '/home',
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views-app/home")) }, "home-app")
  },
  meta: {
    pageTitle: "易票管理系统"
  }
}