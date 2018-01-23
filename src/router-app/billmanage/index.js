
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
      component: r => {
        loading(true);
        return require.ensure([], () => { loading(false); return r(require("@src/views-app/billmanage/billCount")) }, "bill-count-agent")
      },
      meta: {
        pageTitle: "产品配置",
        keepAlive: true,
        menuCode: "billcountagent"
      }
    },
  ]
}