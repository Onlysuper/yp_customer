
import Loading from "../Loading";
// import home from "../home";
/**
 * 登录模块
 */
export default {
  name: "admin",
  path: "/admin",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/Admin/Admin")) }, "admin")
  },
  children: [
    {
      // 进入系统首页面
      path: 'home',
      component: r => {
        Loading(true);
        return require.ensure([], () => { Loading(false); return r(require("@src/views/Home/Home")) }, "Home")
      },
    },
    {
      // 合伙人管理
      path: 'agent',
      component: r => {
        Loading(true);
        return require.ensure([], () => { Loading(false); return r(require("@src/views/Agent/AgentManage")) }, "AgentManage")
      }
    },
    {
      // 商户管理页面
      path: 'customerlist',
      component: r => {
        Loading(true);
        return require.ensure([], () => { Loading(false); return r(require("@src/views/Customer/CustomerManage")) }, "CustomerManage")
      }
    }
  ],
  meta: {
    pageTitle: "易票运营系统"
  }
}

