import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "convergePayComm",
  path: '/convergePayComm',
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/billprofit/convergePayComm")) }, "convergePayComm")
  },
  meta: {
    title: '聚合支付分润',
    keepAlive: true,
    // componentName: billprofit,
    requiresAuth: true,
    parent: "",
    parentname: "",
    role: ['root', 'admin']
  }
}