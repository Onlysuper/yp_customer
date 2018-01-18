// 全屏显示
const fullScreen = {
    state: {
        isFullscreen: false // 默认不是全屏显示
    },
    getters: {
    },
    mutations: {
        changeFullScreen(state) {
            state.isFullscreen = !state.isFullscreen
        },
    },
    actions: {
    },
    modules: {
    }
};

export default fullScreen