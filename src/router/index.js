import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex';
// 跟路由
import utils from "@src/common/utils";
import layout from '@src/views/layout/layout'
import login from "./login/login";
import home from "./home/home";
import customerManage from "./customer/customerManage";
import customerGoods from "./customer/customerGoods";
import customerInvoiceConfig from "./customer/customerInvoiceConfig";
import customerProduct from "./customer/customerProduct";
import customerProductConfigure from "./customer/customerProductConfigure";
import billCount from "./billmanage/billCount";
import billRecord from "./billmanage/billRecord";
import billDay from "./billmanage/billDay";
import billStandard from "./billmanage/billStandard";
import billprofit from "./billprofit/billprofit";
import product from "./product/product";
import agentManage from "./agent/agentManage";
import agentTransfer from "./agent/agentTransfer";
import empowerManage from "./empower/empowerManage";
import empowerCheck from "./empower/empowerCheck";
import empowerTransfer from "./empower/empowerTransfer";
import empowerPurchase from "./empower/empowerPurchase";
import usermanage from "./admin/userManage";
import usermenu from "./admin/userMenu";
import userrole from "./admin/userRole";
import buriedPoint from "./statistical/buriedPoint";
import buriedBillChart from "./statistical/buriedBillChart";
import buriedPointChart from "./statistical/buriedPointChart";
import messageRecord from "./message/messageRecord";
import customerVersion from "./version/customerVersion";
import versionManage from "./version/versionManage";
import { MenuGet } from "@src/apis"
Vue.use(Router)
const router = new Router({
    routes: [

        { path: '/', redirect: home },
        login
    ]
})

const asyncRouter = [
    customerManage,
    customerGoods,
    customerInvoiceConfig,
    customerProduct,
    customerProductConfigure,
    billprofit,// 开票查询
    billCount,// 开票统计
    billRecord,// 开票记录
    billDay,// 日开票详情
    billStandard,//达标详情
    usermanage,// 用户管理
    usermenu,// 菜单管理
    userrole,//角色管理
    product,// 产品管理
    agentManage, //合伙人管理
    agentTransfer, // 合伙人转移
    empowerManage,// 授权码管理
    buriedPoint, //埋点管理
    buriedBillChart, //埋点管理
    buriedPointChart, //埋点管理
    messageRecord, //消息记录
    empowerCheck, // 授权码审核
    empowerTransfer, // 授权码转移
    empowerPurchase, // 授权码采购
    customerVersion, // 商户版本
    versionManage //版本管理
];
// 路由过滤


function filterRouter(data, asyncRouter, back) {
    const menuList = data.menuList
    const thisrouter = []
    menuList.forEach((item, index) => {
        // 根据路径匹配到的router对象添加到routers中即可
        // 因permission数据格式不一定相同，所以不写详细逻辑了
        var has = 0;
        for (var i = 0; i < item.child.length; i++) {
            asyncRouter.forEach((item2, index) => {
                if (item2.path.replace(/\//, "") == item.child[i].menuCode && (item2.meta.role.indexOf(data.username) != "-1" || item2.meta.role.indexOf("*") != "-1")) {
                    thisrouter.push(item2)
                }
            })
        }
        if (index == menuList.length - 1 && thisrouter.length != 0) {
            back(thisrouter)
        }
    });
}
/**
 * 根据异步路由表中的path字段进行匹配，生成需要添加的路由对象
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter, back) {
    var menuList = permission;
    filterRouter(menuList, asyncRouter, (thisrouter) => {
        back(thisrouter);
    })
}
router.beforeEach((to, redirect, next) => {
    // console.log(to)
    console.log(to.matched)
    let menuList = store.state.moduleLayour.menuList;
    console.log(to.matched.some(record => record.meta.requiresAuth))
    console.log(menuList);
    if (to.path == "/login") {
        next()
    }
    // else if (to.matched.length == 0 || !to.matched.some(record => record.meta.requiresAuth)) {
    else if (menuList.length == '0') {
        store.dispatch('UserMenulistFetch').then(resmenuList => {
            routerMatch(resmenuList, asyncRouter, (thisrouter) => {
                thisrouter.push(
                    home
                )
                let rou = [{
                    path: '',
                    component: layout,
                    children: thisrouter,
                    meta: {
                        title: '',
                        keepAlive: true,
                        role: ['admin', 'root']
                    },
                }]
                router.addRoutes(rou)
                console.log(thisrouter);
                next({ ...to, replace: true })
                // next()
            })
        })
    } else {
        next()
    }
})
export default router;
