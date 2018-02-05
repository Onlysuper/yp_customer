
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 我的产品
 */
export default {
  name: "product-mg",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [

    //商户产品
    {
      name: "customerProduct",
      path: 'product',
      redirect: "product/index",
      component: App,
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
            pageTitle: "完善支付信息"
          },
        },
        {
          path: "addGoods",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addGoods")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "选择产品"
          },
        },
        {
          path: "addUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addUpload")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "上传资质"
          },
        },
        {
          path: "addSuccess",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/product-mg/customerPoduct/addSuccess")) }, "product-mg-app")
          },
          meta: {
            pageTitle: "提交成功"
          },
        }
      ],

    }
  ]
}