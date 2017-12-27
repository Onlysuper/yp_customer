import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "userrole",
  path: "/role",
  component: layout,
  children: [{
    path: '/role',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/admin/userRole")) }, "user-role")
    }
  }],
  meta: {
    pageTitle: "角色管理"
  }
}