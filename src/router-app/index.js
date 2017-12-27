import Vue from 'vue';
import Router from 'vue-router';

import login from "./login";
import home from "./home/home";
import customer from "./customer";


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        login,
        home,
        customer,
    ]
});

router.beforeEach((to, from, next) => {
    next();
})
export default router;
