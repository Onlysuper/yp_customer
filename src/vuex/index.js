import Vue from "vue";
import Vuex from "vuex";
import moduleLayour from "@src/vuex/layout/layout"
// import topSearch from "@src/vuex/topSearch/topSearch"
import Base from "@src/vuex/base/base"
import tagsView from "@src/vuex/tagsView/tagsView"
import fullScreen from "@src/vuex/fullScreen/fullScreen"

import {
    customerGoods, customerManage, profitBilling, convergePayComm, agent, billCount, billRecord, billDay, billStandard,
    empowerCheck, empowerManage, empowerPurchase, empowerTransfer, customerProduct, enterpriseSupply, orderQuery
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
        moduleLayour: moduleLayour,
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
        orderQuery
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;
