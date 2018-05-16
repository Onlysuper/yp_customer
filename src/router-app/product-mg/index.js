
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
            pageTitle: "快速开票图片修改",
          },
        },
        {
          path: "qrcodeDetail",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/qrcodeDetail")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "快速开票详情",
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

    },
    {
      name: "changeBill",
      path: 'changeBill',
      redirect: "changeBill/index",
      component: keepAlive,
      children: [
        {
          path: "index",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/index")) }, "change-bill")
          },
          meta: {
            pageTitle: "商户产品",
            keepAlive: true,
            menuCode: "changeBill"
          },
        },
        {
          path: "search",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/search")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "搜索商户"
          },
        },
        {
          path: "detail",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/detail")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单详情"
          },
        },
        {
          path: "edit",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/edit")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addGoods",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/addGoods")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/addUpload")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        },
        {
          path: "addSuccess",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/changeBill/addSuccess")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "变更单编辑"
          },
        }
      ],

    }
  ]
}