
import { MenuGet, UserGet } from "@src/apis"
const Layout = {
    state: {
        userMessage: { // 管理员信息
            all: "",
            realname: "",
            username: "",
            userBussinessNo: "",
            userType: ""
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
            var data = data.data;
            state.userMessage.realname = data.realname //管理员名称
            state.userMessage.username = data.username // 登录账号
            state.userMessage.bussinessNo = data.bussinessNo // 登录账号
            state.userMessage.resetPasswordStatus = data.resetPasswordStatus // 登录账号
            state.menuList = data.menuList
        },
        // 登陆用户信息
        userData(state, data) {
            var data = data.data;
            state.userMessage.all = data;
            state.userMessage.userBussinessNo = data.userBussinessNo // 登录账号
            state.userMessage.userType = data.userType // 登录账号
        }
    },
    actions: {
        UserMenulistFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            return new Promise((resolve, reject) => {
                MenuGet()({}).then(function (data) {
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('modifyData', data);
                        resolve(data.data)
                    }
                })
            })

        },
        UserGetFetch(context) {
            return new Promise((resolve, reject) => {
                UserGet()({}).then(function (data) {
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('userData', data);
                    }
                })
            })
        }

    },
    modules: {
    }
};

export default Layout
