// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'billcountagent',
  path: '/billcountagent',
  meta: {
    title: '开票统计',
    requiresAuth: true,
    keepAlive: true,
    parent: "bill-mg",
    parentname: "开票管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/billmanage/billCount")) }, "bill-count")
  }
}