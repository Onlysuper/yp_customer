import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "agent-settle",
  path: '/agent-settle',
  meta: {
    title: '代理商结算统计',
    path: '/agent-settle',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/settle/agentSettle")) }, "agent-settle")
  }

}