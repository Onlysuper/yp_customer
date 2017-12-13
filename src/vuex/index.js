import Vue from "vue";
import Vuex from "vuex";
import { Layout } from "@src/vuex/Layout"
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
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;