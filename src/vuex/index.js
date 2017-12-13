import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
       isCollapse: false,//菜单收起
    },
    getters: {
    },
    mutations: {
        SidebarHandle (state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {
    },
    modules: {
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;