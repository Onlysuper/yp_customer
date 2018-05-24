// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 订单查询
 */
export default {
  // 统计管理
  name: 'customerSettle',
  path: 'customerSettle',
  meta: {
    title: '商户结算',
    keepAlive: true,
    requiresAuth: true,
    parent: "message",
    parentname: "商户结算",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/settle/customerSettle")) }, "settle-customer")
  }
}