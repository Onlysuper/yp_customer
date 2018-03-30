import { getMessages } from "@src/apis";
import { Toast } from "mint-ui";
const acceptMessage = {
    state: {
        // 消息数量
        messageCount: 0,
        // 通知数量
        noticeCount: 0,
        noticeData: []
    },
    getters: {
    },
    mutations: {
        messageCountFn(state, count) { // 接受后台接口数据并传给state
            state.messageCount = count
        },
        messageCountAdd(state) {
            state.messageCount = state.messageCount++
        },
        // 添加新通知
        noticeCountAdd(state) {
            state.noticeCount += 1;
            console.log(state.noticeCount);
        },
        noticeDataAdd(state, data) {
            state.noticeData.push(data);
        },
        noticeClear(state) {
            state.noticeCount = 0;
            state.noticeData = []
        }
    },
    actions: {
        noticeCountAddFetch(context) {
            context.commit('noticeCountAdd')
        },
        noticeDataAddFetch(context, data) {
            context.commit('noticeDataAdd', data)
        },
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
