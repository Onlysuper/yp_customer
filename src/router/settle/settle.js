import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "settle",
  path: '/settle',
  meta: {
    title: '结算统计',
    path: '/settle',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/settle/settle")) }, "settle")
  }

}