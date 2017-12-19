import layout from '@src/views/layout/layout'
import loading from "@src/router/Loading"
/**
 * 登录模块
 */
export default {
  path: "/",
  redirect: "/home",
  component: layout,
  children: [{
    path: 'home',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/home/home")) }, "home")
    }
  }],
  meta: {
    pageTitle: "易票运营系统"
  }
}