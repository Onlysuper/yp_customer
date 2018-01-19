import loading from "../loading";
/**
 * 登录模块
 */
export default {
  name: "layout",
  path: "/layout",
  component: r => {
    loading(true);
    return require.ensure([], () => { loading(false); return r(require("@src/views/layout/layout")) }, "layout")
  },
  meta: {
    pageTitle: "易票运营系统"
  }
}

