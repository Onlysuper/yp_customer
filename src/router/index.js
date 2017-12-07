import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";
import admin from "./admin";
// import home from "./home";
import utils from "@src/common/utils";

Vue.use(Router)

const router = new Router({
    routes: [
        // {
        //     path: "/",
        // },
        user,
        // {
        //     path: "/",
        // },
        // home,

        // {
        //     path: "/",
        // },
        admin
    ]
});

router.beforeEach((to, from, next) => {
    to.meta.pageTitle && utils.setDocumentTitle(to.meta.pageTitle);
    next();
})
export default router;
