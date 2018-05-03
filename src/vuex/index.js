import Vue from "vue";
import Vuex from "vuex";
import userInfoAndMenu from "@src/vuex/userInfoAndMenu/userInfoAndMenu"
// import topSearch from "@src/vuex/topSearch/topSearch"
import Base from "@src/vuex/base/base"
import tagsView from "@src/vuex/tagsView/tagsView"
import fullScreen from "@src/vuex/fullScreen/fullScreen"
import acceptMessage from "@src/vuex/acceptMessage/acceptMessage"

// 以下为手机端的vuex
import {
    customerGoods, customerManage, profitBilling, convergePayComm, agent, billCount, billRecord, billDay, billStandard,
    empowerCheck, empowerManage, empowerPurchase, empowerTransfer, customerProduct, enterpriseSupply, orderQuery, customerVersion,
    settle, buriedPoint, bankCustomer
} from "./modules";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        scrollTop: {

        }
    },
    getters: {
    },
    mutations: {
        ["SAVE_SCROLLTOP"](state, page) {
            state.scrollTop[page.name] = page.scrollTopVal;
        },
    },
    actions: {
        delete() {
            // alert(1)
        }
    },
    modules: {
        userInfoAndMenu: userInfoAndMenu,
        // topSearch: topSearch,
        // InputValidation: InputValidation,
        Base: Base,
        tagsView: tagsView,
        customerGoods,
        customerManage,
        profitBilling,
        convergePayComm,
        fullScreen,
        agent,
        billCount,
        billRecord,
        billDay,
        billStandard,
        empowerCheck,
        empowerManage,
        empowerPurchase,
        empowerTransfer,

        customerProduct,
        enterpriseSupply,
        orderQuery,
        customerVersion,
        settle,
        buriedPoint,
        acceptMessage,
        bankCustomer
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;
