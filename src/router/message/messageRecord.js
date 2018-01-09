// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 统计模块
 */
export default {
  // 统计管理
  name: 'message-list',
  path: '/message-list',
  meta: {
    title: '埋点管理',
    keepAlive: true,
    parent: "message_manage",
    parentname: "消息管理",
    role: ['root', 'admin']
  },
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/message/messageRecord")) }, "message-record")
  }
}