
import { MenuGet } from "@src/apis"
 const Layout = {
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
    },
    modules: {
    }
};

export default Layout