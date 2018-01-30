
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 开票管理
 */
export default {
  name: "customer",
  path: "/",
  redirect: "/productConfig",
  component: keepAlive,
  meta: {
    // keepAlive: true
  },
  children: [
    //产品配置
    {
      name: "agent-customer-product",
      path: 'productConfig',
      component: r => {
        loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views-app/customer/customerPoductConfig")) }, "customer-app")
      },
      meta: {
        pageTitle: "产品配置",
        keepAlive: true,
        menuCode: "agent-customer-product"
      }
    },

    {
      name: "customerGoods",
      path: 'goods',
      redirect: "goods/index",
      component: App,
      children: [

        //商品管理
        {
          path: 'index',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods")) }, "customer-app")
          },
          meta: {
            pageTitle: "商品管理",
            keepAlive: true,
            menuCode: "customerGoods"
          }
        },
        //商品管理--编辑
        {
          name: "goodsEdit",
          path: 'edit/:goodsNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods/edit")) }, "customer-edit-app")
          },
          meta: {
            pageTitle: "商品"
          }
        },
        //商品管理--搜索
        {
          name: "goodsSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods/search")) }, "customer-edit-app")
          },
          meta: {
            pageTitle: "商品搜索"
          }
        },
      ]
    },

    //商户产品
    {
      name: "customerProduct",
      path: 'product',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerPoduct")) }, "customer-app")
      },
      meta: {
        pageTitle: "商户产品",
        keepAlive: true,
        menuCode: "customerProduct"
      },
    },
    //商户管理
    {
      name: "customerlist",
      path: 'manage',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage")) }, "customer-app")
      },
      meta: {
        pageTitle: "商户管理",
        keepAlive: true,
        menuCode: "customerlist"
      },
    },
    //开票配置
    {
      name: "customerInvoiceConfig",
      path: 'invoiceConfig',
      component: r => {
        return require.ensure([], () => { return r(require("@src/views-app/customer/customerInvoiceConfig")) }, "customer-app")
      },
      meta: {
        pageTitle: "开票配置",
        keepAlive: true,
        menuCode: "customerInvoiceConfig"
      }
    }
  ]
}