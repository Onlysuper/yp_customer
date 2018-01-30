// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 消息模块
 */
export default {
  // 统计管理
  name: 'message-list',
  path: '/message-list',
  meta: {
    title: '消息记录',
    keepAlive: true,
    requiresAuth: true,
    parent: "message",
    parentname: "消息管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/message/messageRecord")) }, "message-record")
  }
}