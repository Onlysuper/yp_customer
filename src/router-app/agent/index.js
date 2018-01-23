
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

/**
 * 我的合伙人
 */

export default {
  name: "agent-mg",
  path: "/",
  redirect: "/agent",
  component: App,
  meta: {
    // keepAlive: true
  },
  children: [
    {
      name: "agent",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "agent",
      redirect: "agent/index",
      component: keepAlive,
      children: [

        //我的合伙人--列表
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agent/index")) }, "agent-mg-app")
          },
          meta: {
            pageTitle: "合伙人管理",
            keepAlive: true,
            menuCode: "agent"
          }
        },

        //我的合伙人--搜索
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agent/search")) }, "agent-mg-app")
          },
          meta: {
            pageTitle: "搜索",
            // keepAlive: true
          }
        },

        //我的合伙人--编辑
        {
          path: 'edit/:agentNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agent/edit")) }, "agent-mg-app")
          },
          meta: {
            pageTitle: "编辑",
            // keepAlive: true
          }
        },
      ]
    },
  ]
}