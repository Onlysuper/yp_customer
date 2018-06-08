// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 版本控制模块
 */
export default {
  // 版本管理
  name: 'versionCommand',
  path: '/versionCommand',
  meta: {
    title: '版本管理',
    keepAlive: true,
    requiresAuth: true,
    parent: "versionManager",
    parentname: "版本控制",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/version/versionManage")) }, "version-manage")
  }
}