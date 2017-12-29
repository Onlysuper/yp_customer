
const Layout = {
    state: {
        visibleinput: false, // true为高级搜索 false为普通搜索
        pageCount: 1, // 每页显示条数
        currentPage: 10 //当前页数
    },
    getters: {
    },
    mutations: {
        visibleinputHandle(state) { // 高级搜索与普通搜索转变
            state.visibleinput = !state.visibleinput
        },
        currentPage(state, currentPage) {
            state.currentPage = currentPage
        },
        pageCount(state, pageCount) {
            state.pageCount = pageCount
        }
    },
    actions: {
    },
    modules: {
    }
};

export default Layout