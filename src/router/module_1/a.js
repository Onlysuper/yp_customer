
import Loading from "../Loading";
/**
 * A模块
 */
export default {
  name: "list",
  path: "list",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/Customer/List")) }, "a-list")
  },
  meta: {
    pageTitle: "测试"
  }
}