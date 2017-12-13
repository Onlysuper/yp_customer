import Layout from '../../views/layout/Layout'

var Loading = require(isMobile ? "@src/router/LoadingApp" : "@src/router/Loading").default;
/**
 * 登录模块
 */
export default {
  name: "customerlist",
  path: "/customerlist",
  component: Layout,
  children: [{
    path: '/customerlist',
    component: r => {
      Loading(true);
      return require.ensure([], () => { Loading(false); return r(require("@src/views/Customer/CustomerManage" + isMobile)) }, "CustomerManage")
    }
  }],
  meta: {
    pageTitle: "商户管理"
  }
}