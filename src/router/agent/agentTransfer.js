import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "agent_transfer",
  path: '/agent_transfer',
  meta: {
    title: '合伙人转移',
    path: '/agent_transfer',
    requiresAuth: true,
    keepAlive: true,
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/agent/agentTransfer")) }, "agent-transfer")
  }

}