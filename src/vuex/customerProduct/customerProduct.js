// 全屏显示
const fullScreen = {
    state: {
        customerProductRowdate: "",
    },
    getters: {
    },
    mutations: {
        customerProductRowData(state, data) {
            state.customerProductRowdate = data
            console.log(data)
        },
    },
    actions: {
        customerProductRowAction({ commit }, data) {
            commit('customerProductRowData', data)
        },
    },
    modules: {
    }
};

export default fullScreen