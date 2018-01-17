import loading from "@src/router/loading"
/**
 * 授权码审核
 */
export default {
  // 商品管理
  name: 'qr_code_reciept_audit',
  path: '/qr_code_reciept_audit',
  meta: {
    title: '授权码审核',
    keepAlive: true,
    requiresAuth: true,
    parent: "",
    parentname: "授权码审核",
    role: ['root', 'admin']
  },
  component: r => {
    return require.ensure([], () => { return r(require("@src/views/empower/empowerCheck")) }, "empower-check")
  }
}