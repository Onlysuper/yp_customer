import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";
<<<<<<< HEAD
import home from "./home";
=======
import utils from "@src/common/utils";
>>>>>>> 8377b931da609007d1d82c86b81f76d5024cc5f0

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
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
