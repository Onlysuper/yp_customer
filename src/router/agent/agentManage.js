import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "agent",
  path: '/agent',
  meta: {
    title: '合伙人管理',
    path: '/user',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/agent/agentManage")) }, "agent-manage")
  }

}