import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "",
  path: "",
  component: layout,
  children: [{
    //商户管理
    path: '/customerlist',
    meta: {
      title: '商户管理',
      keepAlive: true,
      role: ['admin']
    },
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerManage")) }, "customer-manage")
    }
  }]
}