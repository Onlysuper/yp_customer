// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 统计模块
 */
export default {
  // 开票图表
  name: 'billrecord_chart',
  path: '/billrecord_chart',
  meta: {
    title: '开票图表',
    keepAlive: true,
    requiresAuth: true,
    parent: "statistical_manage",
    parentname: "统计管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/statistical/buriedBillChart")) }, "buried-bill-chart")
  }
}