
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 开票管理
 */
export default {
  name: "customer",
  path: "/",
  component: keepAlive,
  redirect: () => "/" + this.a.children[0].path,
  children: [
    //产品配置
    {
      name: "agent-customer-product",
      path: 'productConfig',
      redirect: "productConfig/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/customer/customerPoductConfig")) }, "customer-app")
          },
          meta: {
            pageTitle: "产品配置",
            keepAlive: true,
            menuCode: "agent-customer-product"
          }
        }
      ],
    },
    //商品管理
    {
      name: "customerGoods",
      path: 'goods',
      redirect: "goods/index",
      component: App,
      children: [
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
        //商品管理--新增
        {
          name: "goodsAdd",
          path: 'add',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods/add")) }, "customer-app-add")
          },
          meta: {
            pageTitle: "商品"
          }
        },
        //商品管理--编辑
        {
          name: "goodsEdit",
          path: 'edit/:goodsNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods/edit")) }, "customer-app")
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
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerGoods/search")) }, "customer-app")
          },
          meta: {
            pageTitle: "商品搜索"
          }
        },
      ]
    },
    //商户管理
    {
      name: "customerlist",
      path: 'manage',
      redirect: "manage/index",
      component: App,
      children: [
        {
          path: "index",
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage/index")) }, "customer-app")
          },
          meta: {
            pageTitle: "商户管理",
            keepAlive: true,
            menuCode: "customerlist"
          }
        },
        {
          path: 'edit/:customerNo',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage/edit")) }, "customer-app")
          },
          meta: {
            pageTitle: "商户"
          }
        },
        {
          path: 'transfer',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage/transfer")) }, "customer-app")
          },
          meta: {
            pageTitle: "商户转移"
          }
        },
        {
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/customer/customerManage/search")) }, "customer-app")
          },
          meta: {
            pageTitle: "商户搜索"
          }
        }
      ],
    },
    //开票配置
    {
      name: "customerInvoiceConfig",
      path: 'invoiceConfig',
      redirect: "invoiceConfig/index",
      component: App,
      children: [
        {
          path: "index",
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
  ]
}