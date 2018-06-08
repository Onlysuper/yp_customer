// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 商户版本模块
 */
export default {
  // 商户版本管理
  name: 'customer_versionPlugin',
  path: '/customer_versionPlugin',
  meta: {
    title: '商户升级管理',
    keepAlive: true,
    requiresAuth: true,
    parent: "versionManager",
    parentname: "版本控制",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/version/customerVersion")) }, "customer-version")
  }
}