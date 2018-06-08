import { MenuGet, UserGet } from "@src/apis"
import { Toast } from "mint-ui";
const userInfoAndMenu = {
    state: {
        userMessage: { // 管理员信息
            all: "",
            realname: "",
            username: "",
            userBussinessNo: "",
            userType: "",
        },
        isAdmin: false,
        isOperate: false,
        isBranchOffice: false,
        menuList: [], // 菜单列表信息
        menuListApp: [], // 菜单列表信息-移动端用
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
            console.log(1111111);
            //判断是不是运营
            if (data.userType == "admin" || data.userType == "root") {
                state.isAdmin = true;
                console.log(`vuex:${state.isAdmin}`)
            } else {
                state.isAdmin = false;
                console.log(`vuex:${state.isAdmin}`)
            }
            if (data.userType == "admin" || data.userType == "root" || data.userType == "operator") {
                state.isOperate = true
            } else {
                state.isOperate = false;
            }

            if (data.userType == "admin" || data.userType == "root" || data.userType == "branchOffice") {
                state.isBranchOffice = true;
            } else {
                state.isBranchOffice = false;
            }
        },
        clearMenuList(state) { // 清空左侧菜单
            state.menuList = []
        },
        //移动端使用的路由
        asyncNewRoutes(state, asyncNewRoutes) {
            state.menuListApp = asyncNewRoutes || [];
        },
        //移动端路由对应的菜单
        setMenuList(state, menuList) {
            state.menuList = menuList;
        },
        filterMenu(state, menuCode) {
            console.log("走了");
            state.menuList = state.menuList.filter(item => {
                console.log(item);
                return item
            })
        }
    },
    actions: {
        // 根据路由过滤菜单

        UserMenulistFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            return new Promise((resolve, reject) => {
                MenuGet()({}).then(function (data) {
                    console.log(data)
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('modifyData', data);
                        resolve(data.data)
                    } else {
                        resolve({})
                    }
                })
            })

        },
        UserGetFetch(context) { // 获取用户按钮权限数据信息
            return new Promise((resolve, reject) => {
                UserGet()({}).then(function (data) {
                    console.log(data);
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('userData', data);
                    }
                    else {
                        // 登陆失效
                        // Toast(data.msg);
                    }
                })
            })
        }

    },
    modules: {
    }
};

export default userInfoAndMenu
