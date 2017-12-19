import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "customerlist",
  path: "/customerlist",
  component: layout,
  children: [{
    path: '/customerlist',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerManage")) }, "customer-manage")
    }
  }],
  meta: {
    pageTitle: "商户管理"
  }
}