import loading from "@src/router/loading"
/**
 * 授权码审核
 */
export default {
  // 资质补充
  name: 'enterprise_supply',
  path: '/enterprise_supply',
  meta: {
    title: '资质补充',
    keepAlive: true,
    requiresAuth: true,
    parent: "",
    parentname: "资质补充",
    role: ['root', 'admin']
  },
  component: r => {
    return require.ensure([], () => { return r(require("@src/views/enterprise/enterpriseSupply")) }, "enterprise-supply")
  }
}