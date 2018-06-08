// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 开票配置
  name: 'customerInvoiceConfig',
  path: '/customerInvoiceConfig',
  meta: {
    title: '开票配置',
    keepAlive: true,
    requiresAuth: true,
    parent: "customer",
    parentname: "商户管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerInvoiceConfig")) }, "customer-invoiceConfig")
  },
}