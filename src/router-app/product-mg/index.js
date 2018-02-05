
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
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/index")) }, "customer-app")
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
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/search")) }, "customer-app")
          },
          meta: {
            pageTitle: "搜索商户"
          },
        },
        {
          path: "addPayInfo",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/addPayInfo")) }, "customer-app")
          },
          meta: {
            pageTitle: "完善支付信息"
          },
        },
        {
          path: "addGoods",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/addGoods")) }, "customer-app")
          },
          meta: {
            pageTitle: "选择产品"
          },
        },
        {
          path: "addUpload",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/addUpload")) }, "customer-app")
          },
          meta: {
            pageTitle: "上传资质"
          },
        },
        {
          path: "addSuccess",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct/addSuccess")) }, "customer-app")
          },
          meta: {
            pageTitle: "提交成功"
          },
        }
      ],

    }
  ]
}