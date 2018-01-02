import Vue from 'vue';
import Router from 'vue-router';
// 跟路由
import utils from "@src/common/utils";
import layout from '@src/views/layout/layout'
import login from "./login/login";
import home from "./home/home";
import customerManage from "./customer/customerManage";
import customerGoods from "./customer/customerGoods";
import customerInvoiceConfig from "./customer/customerInvoiceConfig";
import customerProduct from "./customer/customerProduct";
import customerProductConfigure from "./customer/customerProductConfigure";
import billprofit from "./billprofit/billprofit";
import usermanage from "./admin/userManage";
import usermenu from "./admin/userMenu";
import userrole from "./admin/userRole";
import { MenuGet } from "@src/apis"


Vue.use(Router)
console.log(home);
const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        login]
})

const asyncRouter = [
    {
        path: '',
        component: layout,
        children: []
    },
    home,
    customerManage,
    customerGoods,
    customerInvoiceConfig,
    customerProduct,
    customerProductConfigure,
    billprofit,
    usermanage,
    usermenu,
    userrole
]
// const router = new Router({
//     routes: [
//         {
//             path: "/",
//             redirect: "/home"
//         },
//         login,
// home,
// customerManage,
// billprofit,
// usermanage,
// usermenu,
// userrole
//     ]
// });


/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter) {
    return new Promise((resolve) => {
        // 这里需要获取完整的已经编译好的router对象，不可为空数组，也不能用类router的对象。因为当程序运行到这里时，vue-router已经解析完毕
        const routers = asyncRouter[0]
        // 创建路由
        function createRouter(permission) {
            console.log(permission)
            asyncRouter.forEach(item => {
                console.log(item)
            })
            // 根据路径匹配到的router对象添加到routers中即可
            // 因permission数据格式不一定相同，所以不写详细逻辑了
        }
        createRouter(permission)
        resolve([routers])
    })
}

router.beforeEach((to, from, next) => {
    console.log(from);
    MenuGet()({}).then(function (res) {
        if (res.code === "00") {
            routerMatch(res, asyncRouter).then(res => {

            })
        }
    })
    // to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
