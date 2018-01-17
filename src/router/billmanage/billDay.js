import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'billcount_day',
  path: '/billcount_day',
  meta: {
    title: '日开票详情',
    keepAlive: true,
    requiresAuth: true,
    parent: "bill-mg",
    parentname: "开票管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/billmanage/billDay")) }, "bill-day")
  }
}