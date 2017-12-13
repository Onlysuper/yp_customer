import Vue from "vue";
import Vuex from "vuex";
import { MenuGet } from "@src/apis"
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
       userMessage : {
          realname: "",
          username: ""
       },
       isCollapse: false,//菜单收起
    },
    getters: {
    },
    mutations: {
        SidebarHandle (state) { //菜单收起展开操作
            state.isCollapse = !state.isCollapse
        },
        modifyData (state,data) {
            state.userMessage.realname = data.data.realname //管理员名称
            state.userMessage.username = data.data.username // 登录账号
        }
    },
    actions: {
        fetchData (context) {
            MenuGet()({}).then(function(data){ 
                if(data.code==="00"){
                  // 管理员信息
                  context.commit('modifyData',data);

                }
            })
        }
        // LayoutDataInit (context) {
        //     context.commit('LayoutDataInit')
        // }
    },
    modules: {
    }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;