// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 产品配置
  name: "agent-customer-product",
  path: '/agent-customer-product',
  meta: {
    title: '产品配置',
    keepAlive: true,
    requiresAuth: true,
    parent: "customer",
    parentname: "商户管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerProductConfigure")) }, "customer-product-configure")
  }
}