import Vue from "vue";
import Vuex from "vuex";
import moduleLayour from "@src/vuex/Layout/Layout"
import DataTable from "@src/vuex/DataTable/DataTable"
import InputValidation from "@src/vuex/InputValidation/InputValidation"
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        moduleLayour: moduleLayour,
        dataTable: DataTable,
        InputValidation: InputValidation
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;