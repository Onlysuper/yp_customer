import loading from "@src/router/loading"
/**
 * 授权码管理
 */
export default {
  // 商品管理
  name: 'qr_code_reciept',
  path: '/qr_code_reciept',
  meta: {
    title: '授权码采购',
    keepAlive: true,
    requiresAuth: true,
    parent: "",
    parentname: "授权码管理",
    role: ['root', 'admin']
  },
  component: r => {
    return require.ensure([], () => { return r(require("@src/views/empower/empowerPurchase")) }, "empower-purchase")
  }
}