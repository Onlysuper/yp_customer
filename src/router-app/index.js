import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';

import login from "./login";
import home from "./home/home";
import customer from "./customer";
import profit from "./profit";
import billmanage from "./billmanage";



import agent from "./agent";
import error from "./error";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        login,
        error
    ]
});


const asyncRoutes = [
    customer,
    billmanage,
    profit,

    agent
]


/**
 * 过滤每个菜单下的子路由的权限 重写当前模块子路由
 * @param {模块权限} child 
 * @param {当前模块} moduler 
 */
function filterModuler(child, moduler) {
    let children = [];
    child.forEach((item, index) => {
        let menuCode = item.menuCode;
        moduler.children.forEach((item, index) => {
            if (menuCode == item.name) children.push(item);
        })
    });

    moduler.children = children;
    return moduler;
}

/**
 * 过滤有权限路由并返回新的路由表
 * @param {权限列表} resmenuList 
 * @param {待添加路由} asyncRoutes 
 */
function filterRouter(resmenuList, asyncRoutes) {
    resmenuList = resmenuList || [];
    let asyncNewRoutes = [];
    resmenuList.forEach((item, index) => {
        let menuCode = item.menuCode;

        //查找这个菜单的路由模块
        let moduler = asyncRoutes.find(item => item.name == menuCode);

        if (moduler instanceof Object) {
            //用当前权限列表 和 路由模块进行过滤,得到一个新的路由模块
            let newModule = filterModuler(item.child, moduler);

            //将路由模块保存起来
            asyncNewRoutes.push(newModule);
        }
    });
    return asyncNewRoutes;
}

router.beforeEach((to, from, next) => {
    let menuList = store.state.moduleLayour.menuList;
    if (localStorage.getItem("isLogin") == "100") {
        if (to.path == "/login") {
            next('/home')
        } else if (!menuList.some((r) => r)) {
            store.dispatch('UserGetFetch');
            store.dispatch('UserMenulistFetch').then(resmenuList => {
                if (resmenuList.menuList) {
                    let asyncNewRoutes = filterRouter(resmenuList.menuList, asyncRoutes);
                    console.log(asyncNewRoutes);
                    asyncNewRoutes.push(home);
                    asyncNewRoutes.push({
                        path: "*",
                        redirect: "/error",
                    });
                    router.addRoutes(asyncNewRoutes)
                    next({ ...to, replace: true })
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
