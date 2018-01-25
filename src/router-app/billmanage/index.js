
import loading from "../loading"
import App from "@src/App";
import keepAlive from "@src/views-app/keepAlive";
/**
 * 我的商户
 */
export default {
  name: "bill-mg",
  path: "/bill-mg",
  redirect: "/billcountagent",
  component: keepAlive,
  meta: {
    // keepAlive: true
  },
  children: [
    //开票统计
    {
      name: "billcountagent",
      path: '/billcountagent',
      redirect: "/billcountagent/index",
      component: App,
      children: [
        //开票统计主页面
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billCount")) }, "bill-count-agent")
          },
          meta: {
            pageTitle: "开票统计",
            keepAlive: true,
            menuCode: "billcountagent"
          }
        },
        {
          name: "billCountSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/billmanage/billCount/search")) }, "bill-count-search")
          },
          meta: {
            pageTitle: "开票统计搜索"
          }
        },
      ]
    },
    //开票记录
    {
      name: "billrecord",
      path: '/billrecord',
      redirect: "/billrecord/index",
      component: App,
      children: [
        //开票记录主页面
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billRecord")) }, "bill-billrecord")
          },
          meta: {
            pageTitle: "开票记录",
            keepAlive: true,
            menuCode: "billrecord"
          }
        },
        {
          name: "billRecordSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/billmanage/billRecord/search")) }, "bill-record-search")
          },
          meta: {
            pageTitle: "开票记录搜索"
          }
        },
      ]
    },
    //日开票详情
    {
      name: "billcount_day",
      path: '/billcount_day',
      redirect: "/billcount_day/index",
      component: App,
      children: [
        //日开票详情主页面
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billDay")) }, "bill-day")
          },
          meta: {
            pageTitle: "日开票详情",
            keepAlive: true,
            menuCode: "billcount_day"
          }
        },
        {
          name: "billDaySearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/billmanage/billDay/search")) }, "bill-day-search")
          },
          meta: {
            pageTitle: "开票记录搜索"
          }
        },
      ]
    },
    //达标详情
    {
      name: "billcountcustomer",
      path: '/billcountcustomer',
      redirect: "/billcountcustomer/index",
      component: App,
      children: [
        //日开票详情主页面
        {
          path: 'index',
          component: r => {
            loading(true);
            return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billStandard")) }, "bill-standard")
          },
          meta: {
            pageTitle: "达标详情",
            keepAlive: true,
            menuCode: "billcountcustomer"
          }
        },
        {
          name: "billStandardSearch",
          path: 'search',
          component: r => {
            return require.ensure([], () => { return r(require("@src/views-app/billmanage/billStandard/search")) }, "bill-standard-search")
          },
          meta: {
            pageTitle: "达标详情搜索"
          }
        },
      ]
    }
  ]
}