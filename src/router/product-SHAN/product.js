import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商品管理
  name: 'product',
  path: '/product',
  meta: {
    title: '产品模版',
    keepAlive: true,
    requiresAuth: true,
    parent: "product",
    parentname: "我的产品",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/product/product")) }, "customer-product")
  }
}