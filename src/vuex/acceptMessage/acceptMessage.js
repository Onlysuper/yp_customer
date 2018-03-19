import { getMessages } from "@src/apis";
import { Toast } from "mint-ui";
const acceptMessage = {
    state: {
        messageCount: 0
    },
    getters: {
    },
    mutations: {
        messageCountFn(state, count) { // 接受后台接口数据并传给state
            state.messageCount = count
        },
        messageCountAdd(state) {
            state.messageCount = state.messageCount++
        }
    },
    actions: {
        getMessagesFetch(context) { // 获取‘用户信息‘与‘菜单列表‘数据
            return new Promise((resolve, reject) => {
                getMessages()({
                    page: 1,
                    limit: 10,
                    sendBusinessNo: "",
                    receiveBusinessNo: '',
                    status: '',
                    createTimeStart: "",
                    createTimeEnd: ""
                }).then(function (data) {
                    console.log(data)
                    if (data.code === "00") {
                        // 管理员信息
                        context.commit('messageCountFn', data.count);
                        resolve(data)
                    } else {
                        resolve({})
                    }
                })
            })
        }
    },
    modules: {
    }
};

export default acceptMessage
