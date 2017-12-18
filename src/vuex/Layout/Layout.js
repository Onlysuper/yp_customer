
import { MenuGet } from "@src/apis"
const Layout = {
    state: {
        userMessage: { // 管理员信息
            realname: "",
            username: ""
        },

        menuList: [], // 菜单列表信息
        isCollapse: false,//菜单收起
    },
    getters: {
    },
    mutations: {
        SidebarHandle(state) { //菜单收起展开操作
            state.isCollapse = !state.isCollapse
        },
        modifyData(state, data) { // 接受后台接口数据并传给state
            state.userMessage.realname = data.data.realname //管理员名称
            state.userMessage.username = data.data.username // 登录账号
            state.menuList = data.data.menuList
        }
    },
    actions: {
        UserMenulistFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            MenuGet()({}).then(function (data) {
                if (data.code === "00") {
                    // 管理员信息
                    context.commit('modifyData', data);

                }
            })
        }
    },
    modules: {
    }
};

export default Layout