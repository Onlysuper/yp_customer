// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 变更单
  name: 'paychangebill',
  path: '/paychangebill',
  meta: {
    title: '支付变更单',
    keepAlive: true,
    requiresAuth: true,
    parent: "modifyInfo",
    parentname: "信息变更",
    role: ['root', 'admin']
  },

  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/modifyinfo/changeBill/index")) }, "customer-product")
  }
}
