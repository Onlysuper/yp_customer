import Vue from 'vue';
import Router from 'vue-router';
// 跟路由
import utils from "@src/common/utils";

import login from "./login/login";
import home from "./home/home";
import customer from "./customer/customerManage";
import billprofit from "./billprofit/billprofit";
import usermanage from "./admin/userManage";
import usermenu from "./admin/userMenu";
import userrole from "./admin/userRole";



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
        usermanage,
        usermenu,
        userrole
    ]
});

router.beforeEach((to, from, next) => {
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
