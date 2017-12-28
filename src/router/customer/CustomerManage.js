import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  name: "customer",
  path: "/customer",
  component: layout,
  children: [{
    //商户管理
    path: '/customerlist',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerManage")) }, "customer-manage")
    }
  },
  {
    // 产品配置
    path: '/agent-customer-product',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerProductConfigure")) }, "customer-product-configure")
    },
  },
  {
    // 商品管理
    path: '/customerGoods',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerGoods")) }, "customer-goods")
    },
  },
  {
    // 商户产品
    path: '/customerProduct',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerProduct")) }, "customer-product")
    },
  },
  {
    // 开票配置
    path: '/customerInvoiceConfig',
    component: r => {
      loading(true);
      return require.ensure([], () => { loading(false); return r(require("@src/views/customer/customerInvoiceConfig")) }, "customer-invoiceConfig")
    },
  }],
  meta: {
    pageTitle: "商户管理"
  }
}