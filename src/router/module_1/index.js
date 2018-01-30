
import Loading from "../Loading";

export default {
  name: "pc",
  path: "/pc",
  component: r => {
    Loading(true);
    return require.ensure([], () => { Loading(false); return r(require("@src/views/Pc")) }, "pc")
  },
  meta: {
    pageTitle: "PC端"

  },
  children: [
    //这里注入子路由
  ]
}