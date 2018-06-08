// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 统计模块
 */
export default {
  // 统计管理
  name: 'operator_log',
  path: '/operator_log',
  meta: {
    title: '埋点管理',
    keepAlive: true,
    requiresAuth: true,
    parent: "statistical_manage",
    parentname: "统计管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/statistical/buriedPoint")) }, "buried-point")
  }
}