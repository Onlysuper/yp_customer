// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'changeBill',
  path: '/changeBill',
  meta: {
    title: '支付变更单',
    requiresAuth: true,
    keepAlive: true,
    parent: "bill-mg",
    parentname: "支付变更单",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/changeBill/index")) }, "change-bill")
  }
}