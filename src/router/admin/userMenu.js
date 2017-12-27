import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "usermenu",
  path: "/menu",
  component: layout,
  children: [{
    path: '/menu',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/admin/userMenu")) }, "user-menu")
    }
  }],
  meta: {
    pageTitle: "菜单管理"
  }
}