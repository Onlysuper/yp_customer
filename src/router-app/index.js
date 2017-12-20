import Vue from 'vue';
import Router from 'vue-router';

import customer from "./customer/customerManage";
import home from "./home/home";


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        customer,
        home
    ]
});

router.beforeEach((to, from, next) => {
    next();
})
export default router;
