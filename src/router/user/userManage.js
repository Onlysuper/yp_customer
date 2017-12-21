import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "usermanage",
  path: "/user",
  component: layout,
  children: [{
    path: '/user',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/user/userManage")) }, "user-manage")
    }
  }],
  meta: {
    pageTitle: "用户管理"
  }
}