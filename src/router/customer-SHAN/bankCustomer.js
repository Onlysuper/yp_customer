// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'bankCustomer',
  path: '/bankCustomer',
  meta: {
    title: '银行商户',
    keepAlive: true,
    requiresAuth: true,
    parent: "customer",
    parentname: "银行商户",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/customer/bankCustomer")) }, "bank-customer")
  }
}