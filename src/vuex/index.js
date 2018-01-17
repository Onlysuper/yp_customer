import Vue from "vue";
import Vuex from "vuex";
import moduleLayour from "@src/vuex/Layout/Layout"
import topSearch from "@src/vuex/topSearch/topSearch"
// import InputValidation from "@src/vuex/InputValidation/InputValidation"
import Base from "@src/vuex/Base/Base"
import tagsView from "@src/vuex/TagsView/tagsView"

import { customerGoods, profitBilling } from "./modules";
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
        topSearch: topSearch,
        // InputValidation: InputValidation,
        Base: Base,
        tagsView: tagsView,
        customerGoods,
        profitBilling
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;
