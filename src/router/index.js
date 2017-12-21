import Vue from 'vue';
import Router from 'vue-router';
// 跟路由
import utils from "@src/common/utils";

import login from "./login/login";
import home from "./home/home";
import customer from "./customer/customerManage";
import billprofit from "./billprofit/billprofit";
import user from "./user/userManage";



Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        login,
        home,
        customer,
        billprofit,
        user
    ]
});

router.beforeEach((to, from, next) => {
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
