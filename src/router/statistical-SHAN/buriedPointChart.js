// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 统计模块
 */
export default {
  // 埋点图表
  name: 'operator_log_chart',
  path: '/operator_log_chart',
  meta: {
    title: '埋点图表',
    keepAlive: true,
    requiresAuth: true,
    parent: "statistical_manage",
    parentname: "统计管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/statistical/buriedPointChart")) }, "buried-point-chart")
  }
}