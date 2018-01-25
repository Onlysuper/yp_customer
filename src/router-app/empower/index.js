
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 授权码管理
 */
export default {
  name: "qr_code_manage",
  path: "qr_code_manage",
  redirect: "/qr_code_reciept_audit",
  component: keepAlive,
  meta: {
    // keepAlive: true
  },
  children: [
    //授权码审核
    {
      name: "qr_code_reciept_audit",
      path: '/qr_code_reciept_audit',
      redirect: "/qr_code_reciept_audit/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/empower/empowerCheck")) }, "empower-check")
          },
          meta: {
            pageTitle: "授权码审核",
            keepAlive: true,
            menuCode: "qr_code_reciept_audit"
          }
        },
        {
          name: "empowerCheckSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/empower/empowerCheck/search")) }, "empower-check-search")
          },
          meta: {
            pageTitle: "授权码审核搜索"
          }
        },
      ]
    },
    // 授权码管理
    {
      name: "qrcode",
      path: '/qrcode',
      redirect: "/qrcode/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/empower/empowerManage")) }, "empower-manage")
          },
          meta: {
            pageTitle: "授权码管理",
            keepAlive: true,
            menuCode: "qrcode"
          }
        },
        {
          name: "empowerManageSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/empower/empowerManage/search")) }, "empower-manage-search")
          },
          meta: {
            pageTitle: "授权码管理"
          }
        },
      ]
    },
    // 授权码转移
    {
      name: "qr_code_migrate",
      path: '/qr_code_migrate',
      redirect: "/qr_code_migrate/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/empower/empowerTransfer")) }, "empower-transfer")
          },
          meta: {
            pageTitle: "授权码转移",
            keepAlive: true,
            menuCode: "qr_code_migrate"
          }
        },
        {
          name: "empowerManageSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/empower/empowerTransfer/search")) }, "empower-transfer-search")
          },
          meta: {
            pageTitle: "授权码转移"
          }
        },
      ]
    },
    // 授权码采购
    {
      name: "qr_code_reciept",
      path: '/qr_code_reciept',
      redirect: "/qr_code_reciept/index",
      component: App,
      children: [
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/empower/empowerPurchase")) }, "empower-purchase")
          },
          meta: {
            pageTitle: "授权码采购",
            keepAlive: true,
            menuCode: "qr_code_reciept"
          }
        },
        {
          name: "empowerManageSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/empower/empowerPurchase/search")) }, "empower-purchase-search")
          },
          meta: {
            pageTitle: "授权码采购查询"
          }
        },
      ]
    }
  ]
}