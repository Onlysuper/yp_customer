
const topSearch = {
    state: {
        visibleinput: false // true为高级搜索 false为普通搜索
    },
    getters: {
    },
    mutations: {
        initSearchVisibleFn(state) {
            console.log('vuex search 初始化')
            state.visibleinput = false
        },
        visibleinputHandle(state) { // 高级搜索与普通搜索转变
            state.visibleinput = !state.visibleinput
        }
    },
    actions: {
    },
    modules: {
    }
};

export default topSearch