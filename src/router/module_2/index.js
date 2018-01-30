
import Loading from "../Loading";
//引入子路由
export default {
  name: "m",
  path: "/m",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/App")) }, "m-test")
  },
  meta: {
    pageTitle: "移动端"
  },
  children: [
    //这里注入子路由
  ]
}