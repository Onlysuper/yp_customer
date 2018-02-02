import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "billprofit",
  path: '/billprofit',
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/billprofit/billprofit")) }, "billprofit")
  },
  meta: {
    title: '快速开票分润',
    keepAlive: true,
    // componentName: billprofit,
    requiresAuth: true,
    parent: "",
    parentname: "开票查询",
    role: ['root', 'admin']
  }
}