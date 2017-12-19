
import Loading from "../Loading";
/**
 * 登录模块
 */
export default {
  name: "layout",
  path: "/layout",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/layout/layout")) }, "layout")
  },
  meta: {
    pageTitle: "易票运营系统"
  }
}

