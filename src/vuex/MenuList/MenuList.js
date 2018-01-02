const MenuList = {
    state: {
        menuList: [] // 菜单列表信息
    },
    getters: {
    },
    mutations: {
        storeMenuList(state, data) { // 接受后台接口数据并传给state
            state.menuList = data.data.menuList
        }
    },
    actions: {
    },
    modules: {
    }
};

export default MenuList