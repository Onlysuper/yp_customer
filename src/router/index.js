import Vue from 'vue';
import Router from 'vue-router';
// 跟路由
import Layout from '../views/layout/Layout'
import login from "./login/login";
import home from "./home/home";
import customer from "./customer/customerManage";
import utils from "@src/common/utils";


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        customer,
        login,
        home
    ]
});

router.beforeEach((to, from, next) => {
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
