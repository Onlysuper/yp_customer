
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";

/**
 * 我的合伙人
 */

export default {
  name: "agent-mg",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //合伙人管理
    {
      name: "agent",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "agent",
      redirect: "agent/index",
      component: App,
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
            pageTitle: "合伙人搜索",
          }
        },

        //我的合伙人--编辑
        {
          path: 'edit/:agentNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agent/edit")) }, "agent-mg-app")
          },
          meta: {
            pageTitle: "编辑合伙人",
          }
        },

        //我的合伙人--新增

        {
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agent/add")) }, "agent-mg-app")
          },
          meta: {
            pageTitle: "新增合伙人",
          }
        },
      ]
    },
    //合伙人转移
    {
      name: "agent_transfer",
      path: 'agentTransfer',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/agent-mg/agentTransfer")) }, "agent-mg-app")
      },
      meta: {
        pageTitle: "合伙人转移",
        menuCode: "agent_transfer",
        keepAlive: true
      }
    },
  ]
}