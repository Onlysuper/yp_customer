import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";
import home from "./home";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
        },
        user,

        {
            path: "/",
        },
        home
    ]
});

router.beforeEach((to, from, next) => {
    next();
})

export default router;
