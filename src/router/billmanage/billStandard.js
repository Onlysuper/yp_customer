import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'billcountcustomer',
  path: '/billcountcustomer',
  meta: {
    title: '达标详情',
    keepAlive: true,
    requiresAuth: true,
    parent: "",
    parentname: "",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/billmanage/billStandard")) }, "bill-standard")
  }
}