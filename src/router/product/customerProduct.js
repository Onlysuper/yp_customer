// import layout from '@src/views/layout/layout'
import loading from "@src/router/loading"
/**
 * 登录模块
 */
export default {
  // 商户产品
  name: 'customerProduct',
  path: '/customerProduct',
  meta: {
    title: '商户产品',
    keepAlive: true,
    requiresAuth: true,
    parent: "customer",
    parentname: "商户管理",
    role: ['root', 'admin']
  },

  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/product/customerProduct/index")) }, "customer-product")
  },
  children: [
    //聚合开通产品第一步
    {
      name: "",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "payStatusFirst",
      component: r => {
        // loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views/product/customerProduct/paystatusInfo")) }, "customer-product-paystatus-first")
      },
    },
    {
      name: "",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "payStatusSecond",
      component: r => {
        // loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views/product/customerProduct/paystatusGoods")) }, "customer-product-paystatus-second")
      },
    },
    {
      name: "",//--->对应菜单menuCode字段 路由跳转name:直接取值menuCode
      path: "payStatusUpload",
      component: r => {
        // loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views/product/customerProduct/paystatusUpload")) }, "customer-product-paystatus-third")
      },
    },
  ]
}