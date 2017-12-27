import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "billprofit",
  path: "/billprofit",
  component: layout,
  children: [{
    path: '/billprofit',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/billprofit/billprofit")) }, "billprofit")
    }
  }],
  meta: {
    pageTitle: "快速开票分润"
  }
}