import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
        },
        user
    ]
});

router.beforeEach((to, from, next) => {
    next();
})

export default router;
