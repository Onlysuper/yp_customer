import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
// zhushi
export default {
  path: 'home',
  path: "/home",
  meta: {
    title: '首页',
    path: '/home',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/home/home")) }, "home")
  },
  meta: {
    pageTitle: "易票运营系统"
  }
}