
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 我的产品
 */
export default {
  name: "product-mg",
  path: "/",
  component: App,
  redirect: () => "/" + this.a.children[0].path,
  children: [

    //商户产品
    {
      name: "customerProduct",
      path: 'product',
      redirect: "product/index",
      component: keepAlive,
      children: [
        {
          path: "index",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/index")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "商户产品",
            keepAlive: true,
            menuCode: "customerProduct"
          },
        },
        {
          path: "detail/:productType",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/detail")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "产品详情"
          },
        },
        {
          path: "stencil/:productType",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/stencil")) }, "product-stencil-app")
          },
          meta: {
            pageTitle: "产品管理"
          },
        },
        {
          path: "search",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/search")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "搜索商户"
          },
        },
        {
          path: "addPayInfo",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addPayInfo")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "完善支付信息",
          },
        },
        {
          path: "addGoods",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addGoods")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "选择产品",
          },
        },
        {
          path: "addUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addUpload")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "上传资质",
          },
        },
        {
          path: "qrcodeUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/qrcodeUpload")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "上传资质",
          },
        },
        {
          path: "addSuccess",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addSuccess")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "提交成功",
          },
        },
        {
          path: "completeInvoice",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/completeInvoice")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "开通电子发票"
          },
        }
      ],

    }
  ]
}