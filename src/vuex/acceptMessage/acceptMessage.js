// 接受信息
const acceptMessage = {
    state: {
        massage: "" // 默认不是全屏显示
    },
    getters: {
    },
    mutations: {
        acceptMessage(state, data) { //菜单收起展开操作
            state.massage = data
        },
    },
    actions: {
    },
    modules: {
    }
};

export default acceptMessage