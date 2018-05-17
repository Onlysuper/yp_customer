// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 订单查询
 */
export default {
  // 统计管理
  name: 'email',
  path: 'email',
  meta: {
    title: '邮箱配置',
    keepAlive: true,
    requiresAuth: true,
    parent: "message",
    parentname: "邮箱",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/order/email")) }, "order-query")
  }
}