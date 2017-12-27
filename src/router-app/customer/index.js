
import loading from "../loading"
import App from "@src/views-app/customer";
/**
 * 我的商户
 */
export default {
  name: "myCustomer",
  path: "/customer",
  redirect: "/customer/product",
  component: App,
  meta: {

    // keepAlive: true
  },
  children: [
    {
      //产品配置
      name: "agent-customer-product",
      path: 'product',
      component: r => {
        loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views-app/customer/customerPoduct")) }, "customer-app")
      },
      meta: {
        pageTitle: "产品配置",
        keepAlive: true
      }
    },
    {
      //商品管理
      name: "customerGoods",
      path: 'goods',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods")) }, "customer-app")
      },
      meta: {
        pageTitle: "商品管理",
        keepAlive: true
      }
    },
    {
      /**
       * 商户管理
       */
      name: "customerlist",
      path: 'manage',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage")) }, "customer-app")
      },
      meta: {
        pageTitle: "商户管理",
        keepAlive: true
      },
    },
    {
      //开票配置
      name: "customerInvoiceConfig",
      path: 'invoiceConfig',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerInvoiceConfig")) }, "customer-app")
      },
      meta: {
        pageTitle: "开票配置",
        keepAlive: true
      }
    }
  ]
}