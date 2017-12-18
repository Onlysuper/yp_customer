import Layout from '../../views/layout/Layout'

var Loading = require(isMobile ? "@src/router/LoadingApp" : "@src/router/Loading").default;
/**
 * 登录模块
 */
export default {
  path: "/",
  redirect: "/home",
  component: Layout,
  children: [{
    path: 'home',
    component: r => {
      Loading(true);

      if (isMobile) {
        return require.ensure([], () => { Loading(false); return r(require("@src/views/Home/HomeApp")) }, "homeApp")
      } else {
        return require.ensure([], () => { Loading(false); return r(require("@src/views/Home/Home")) }, "home")
      }
    }
  }],
  meta: {
    pageTitle: "易票运营系统"
  }
}