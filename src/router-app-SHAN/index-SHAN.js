import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';

import login from "./login";
import home from "./home/home";
import order from "./order";
import settle from "./settle";
// import customer from "./customer";
// import profit from "./profit";

// import billmanage from "./billmanage";
// import empower from "./empower";
// import version from "./version";


// import agent from "./agent";
// import productMg from "./product-mg";
// import modifyinfo from "./modifyinfo";

// import enterprise from "./enterprise";
// import statistical from "./statistical";


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        login
    ]
});


const asyncRoutes = [
    settle,
    order
    // customer,
    // billmanage,
    // profit,
    // empower,
    // agent,
    // productMg,
    // enterprise,
    // version,
    // statistical,
    // modifyinfo
]


/**
 * 过滤每个菜单下的子路由的权限 重写当前模块子路由
 * @param {模块权限} child 
 * @param {当前模块} moduler 
 */
function filterModuler(child, moduler) {
    let children = [];
    let newChild = [];
    child.forEach((itemd, index) => {
        let menuCode = itemd.menuCode;
        moduler.children.forEach((item, index) => {
            if (menuCode == item.name) {
                children.push(item);
                newChild.push(itemd);
            }
        })
        // console.log(123, item)
    });

    moduler.children = children;
    return { newModule: moduler, newChild: newChild };
}

/**
 * 过滤有权限路由并返回新的路由表
 * @param {权限列表} resmenuList 
 * @param {待添加路由} asyncRoutes 
 */
function filterRouter(resmenuList, asyncRoutes) {
    resmenuList = resmenuList || [];
    let asyncNewRoutes = [];
    let menuList = [];
    resmenuList.forEach((item, index) => {
        item = { ...item };
        let menuCode = item.menuCode;

        //查找这个菜单的路由模块
        let moduler = asyncRoutes.find(route => route.name == menuCode);

        if (moduler instanceof Object) {
            //用当前权限列表 和 路由模块进行过滤,得到一个新的路由模块
            let { newModule, newChild } = filterModuler(item.child, moduler);
            //将路由模块保存起来
            //只有模块下有菜单才会在首页添加该模块入口
            if (newModule.children.length) {
                item.child = newChild;
                menuList.push(item);
            }
            asyncNewRoutes.push(newModule);
        }
    });
    console.info("已开发的路由", [...asyncNewRoutes]);
    store.commit("asyncNewRoutes", [...asyncNewRoutes]);
    store.commit('setMenuList', [...menuList]);
    return asyncNewRoutes;
}

router.beforeEach((to, from, next) => {
    let menuList = store.state.userInfoAndMenu.menuList;
    if (localStorage.getItem("isLogin") == "100") {
        if (to.path == "/login") {
            next('/home')
        } else if (!menuList.some((r) => r)) {
            store.dispatch('UserGetFetch');
            store.dispatch('UserMenulistFetch').then(resmenuList => {
                if (resmenuList.menuList) {
                    let asyncNewRoutes = filterRouter(resmenuList.menuList, asyncRoutes);
                    asyncNewRoutes.push(home)
                    router.addRoutes(asyncNewRoutes)
                    next({ ...to, replace: true })
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
