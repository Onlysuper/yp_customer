// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  //商户管理
  name: 'customerlist',
  path: '/customerlist',
  meta: {
    title: '商户管理',
    keepAlive: true,
    requiresAuth: true,
    parent: "customer",
    parentname: "商户管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerManage")) }, "customer-manage")
  }
}