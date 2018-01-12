import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "user",
  path: '/user',
  meta: {
    title: '用户管理',
    path: '/user',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/admin/userManage")) }, "user-manage")
  }

}