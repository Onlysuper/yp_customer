// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 订单查询
 */
export default {
  // 统计管理
  name: 'orderQuery',
  path: 'orderQuery',
  meta: {
    title: '订单查询',
    keepAlive: true,
    requiresAuth: true,
    parent: "message",
    parentname: "订单查询",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/order/orderQuery")) }, "order-query")
  }
}