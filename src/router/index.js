import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';
// 跟路由
import utils from "@src/common/utils";
import layout from '@src/views/layout/layout'
import login from "./login/login";
import error from "./error/error";
import home from "./home/home";
import empowerManage from "./empower/empowerManage";
import orderQuery from "./order/orderQuery";
import email from "./order/email";
import { MenuGet } from "@src/apis"
Vue.use(Router)
const router = new Router({
    routes: [

        { path: '/', redirect: home },
        login,
        error
    ]
})

const asyncRouter = [
    empowerManage,
    orderQuery,
    email
];
// 路由过滤


// function filterRouter(data, asyncRouter, back) {
//     const menuList = data.menuList
//     const thisrouter = []
//     if (menuList.length > 0) {
//         menuList.forEach((item, index) => {
//             // 根据路径匹配到的router对象添加到routers中即可
//             // 因permission数据格式不一定相同，所以不写详细逻辑了
//             var has = 0;
//             for (var i = 0; i < item.child.length; i++) {
//                 asyncRouter.forEach((item2, index) => {
//                     // if (item2.path.replace(/\//, "") == item.child[i].menuCode && (item2.meta.role.indexOf(data.username) != "-1" || item2.meta.role.indexOf("*") != "-1")) {
//                     if (item2.path.replace(/\//, "") == item.child[i].menuCode) {
//                         thisrouter.push(item2)
//                     }
//                 })
//             }
//             if (index == menuList.length - 1 && thisrouter.length != 0) {
//                 back(thisrouter)
//             }
//         });
//     }
// }
function filterRouter(data, asyncRouter, back) {
    let menuList = data.menuList || [];
    let newMenulist = [];
    console.log(menuList);
    let thisrouter = []
    if (menuList.length > 0) {
        menuList.forEach((item, index) => {
            // 根据路径匹配到的router对象添加到routers中即可
            // 因permission数据格式不一定相同，所以不写详细逻辑了
            let hasChild = 0;
            let childArr = [];
            for (var i = 0; i < item.child.length; i++) {
                asyncRouter.forEach((item2, index) => {
                    if (item2.path.replace(/\//, "") == item.child[i].menuCode) {
                        hasChild++;
                        thisrouter.push(item2);
                        //菜单处理
                        hasChild++;
                        childArr.push(item.child[i])
                    }
                })
            }
            if (hasChild > 0) {
                let parentMenu = { ...item };
                parentMenu.child = [...childArr];
                newMenulist.push(parentMenu)
            }
            if (index == menuList.length - 1 && thisrouter.length != 0) {
                back(thisrouter)
            }
        });
    }
    store.commit('setMenuList', [...newMenulist]);
}
/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter, back) {
    var menuList = permission;
    filterRouter(menuList, asyncRouter, (thisrouter) => {
        back(thisrouter);
    })
}
router.beforeEach((to, redirect, next) => {
    let menuList = store.state.userInfoAndMenu.menuList;
    if (localStorage.getItem("isLogin") == "100") {
        if (to.path == "/login") {
            next('/home')
        } else if (!menuList.some((r) => r)) {
            document.body.className = "document-loading";
            store.dispatch('UserGetFetch');
            store.dispatch('UserMenulistFetch').then(resmenuList => {
                if (resmenuList.menuList) {
                    routerMatch(resmenuList, asyncRouter, (thisrouter) => {
                        thisrouter.push(
                            home
                        )
                        let rou = [{
                            path: '',
                            component: layout,
                            children: thisrouter,
                            meta: {
                                title: '',
                                keepAlive: true,
                                role: ['admin', 'root']
                            },
                        }]
                        rou.push({
                            path: "*",
                            redirect: "/error"
                        })
                        document.body.className = document.body.className + " document-loading-top";
                        router.addRoutes(rou)
                        // console.log(thisrouter);
                        setTimeout(() => {
                            next({ ...to, replace: true })
                            document.body.className = "";
                        }, 500)
                        // next()
                    })
                } else {
                    // next("/login")
                }

            })
        } else {
            next()
        }
    } else {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }
})


export default router;
