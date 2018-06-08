import Vue from "vue";
import Vuex from "vuex";
import userInfoAndMenu from "@src/vuex/userInfoAndMenu/userInfoAndMenu"
import Base from "@src/vuex/base/base"
import tagsView from "@src/vuex/tagsView/tagsView"
import fullScreen from "@src/vuex/fullScreen/fullScreen"
import acceptMessage from "@src/vuex/acceptMessage/acceptMessage"

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
        Base: Base,
        tagsView: tagsView,
        acceptMessage,
        fullScreen
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;
