
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 我的产品
 */
export default {
  name: "modifyInfo",
  path: "/",
  component: App,
  redirect: () => "/" + this.a.children[0].path,
  children: [

    //商户产品
    {
      name: "paychangebill",
      path: 'paychangebill',
      redirect: "paychangebill/index",
      component: keepAlive,
      children: [
        {
          path: "index",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/index")) }, "change-bill")
          },
          meta: {
            pageTitle: "商户产品",
            keepAlive: true,
            menuCode: "paychangebill"
          },
        },
        {
          path: "search",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/search")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "搜索商户"
          },
        },
        {
          path: "detail",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/detail")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单详情"
          },
        },
        {
          path: "edit",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/edit")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addGoods",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/addGoods")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/addUpload")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addSuccess",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/modifyinfo/changeBill/addSuccess")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        }
      ],

    }
  ]
}