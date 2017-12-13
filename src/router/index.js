import Vue from 'vue';
import Router from 'vue-router';
// 跟路由
import Layout from '../views/layout/Layout'
import login from "./login";
import utils from "@src/common/utils";


Vue.use(Router)

const router = new Router({
    routes: [
        login,
        // home,
        {
            path: "/",
            component: Layout,
            redirect: '/home',
            name:'home',
            children: [{
                path: '/home',
                component: r => {
                    return require.ensure([], () => {return r(require("@src/views/Home/Home")) }, "home")
                },
                name: 'home'
            }]
            
        },
        {
            path: "/customerlist",
            component: Layout,
            redirect: '/customer',
            name:'customer',
            children: [{
                path: '/customer',
                component: r => {
                    return require.ensure([], () => {return r(require("@src/views/Customer/CustomerManage")) }, "customer")
                },
                name: 'customer'
            }]
            
        },

    ]
});

router.beforeEach((to, from, next) => {
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
