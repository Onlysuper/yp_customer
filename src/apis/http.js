import axios from "axios";
import qs from "qs";
import { Indicator, Toast } from 'mint-ui'
import router from '../router'


//允许跨域
// axios.defaults. ;
//默认axios不发送cookie，需要全局设置以下项，允许跨域发送cookie。
axios.defaults.withCredentials = true;
//全局请求拦截器
axios.interceptors.request.use(function (config) {
    if (window.isMobile == "App") {
        Indicator.open();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})

//全局响应拦截器
axios.interceptors.response.use(function (response) {
    if (window.isMobile == "App") {
        Indicator.close();
    }
    //如果状态吗正常直接返回data中的数据
    if (response && response.status === 200) {
        //如果登录过期了
        if (response.data && response.data.code === "01") {
            localStorage.setItem("isLogin", "0");
            setTimeout(() => {
                location.reload();
            }, 100);
            return {
                code: -103,
                msg: "用户过期，请重新登录"
            };
        }
        return response.data;
    } else {
        return {
            code: -102,
            msg: "HTTP状态码：" + response.status + "异常"
        };
    }


}, function (error) {
    if (window.isMobile == "App") {
        Indicator.close();
    }
    console.dir(error);
    //请求超时
    if (error.code == "ECONNABORTED") {
        // return Promise.reject();
        return Promise.resolve({
            code: -100,
            msg: "请求超时,请稍候再试！",
        });
    } else if (error.code == undefined) {
        return Promise.resolve({
            code: -104,
            msg: "请检查网络！",
        });
    } else {
        return Promise.resolve({
            code: -101,
            msg: "未知错误！ERROR_CODE:" + error.code,
        });
    }
})

// function checkStatus(response) {
//     //如果http状态码正常，则直接返回数据
//     if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {

//         return response
//         //如果不需要除了data之外的数据，可以直接 return response.data;
//     }
//     //如果http状态不正常，返回网络异常
//     return response;
//     // return {
//     //     status: -404,
//     //     msg: "网络异常,请稍后再试"
//     // }
// }
// function checkCode(res) {

//     if (res.status === -404) {
//         Indicator.close();
//         return {
//             resultCode: res.status,
//             msg: res.msg
//         };
//     }
//     if (res.data.code === "01") {
//         localStorage.setItem("isLogin", "0");
//         //写在这里无作用
//         // router.replace({ path: "/login" });
//         setTimeout(() => {
//             location.reload();
//         }, 2000);
//         return {
//             code: "-1",
//             msg: "用户过期，请重新登录"
//         };
//     }
//     //直接返回data中的数据
//     return res.data;
// }


export default {
    post: function (baseURL, url, data, param) {
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                "X-requested-With": "XMLHttpRequest",
                //使用form表单进行数据交互
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
    },
    get: function (baseURL, url, params) {
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            headers: {
                "X-requested-With": "XMLHttpRequest"
            }
        })
    },
    delete: function (baseURL, url, params) {
        return axios({
            method: "DELETE",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            // headers: {
            //           "X-requested-With": "XMLHttpRequest"
            // }
        })
    },
    put: function (baseURL, url, params) {
        return axios({
            method: "PUT",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            // headers: {
            //           "X-requested-With": "XMLHttpRequest"
            // }
        })
    },
    patch: function (baseURL, url, params) {
        return axios({
            method: "PATCH",
            url: url,
            baseURL: baseURL,
            // params: params,
            data: qs.stringify(params),
            timeout: 10000,
            // headers: {
            //     "Content-Type": ""
            // }
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            //使用form表单进行数据交互
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            // "Content-Type": "application/json;charset=UTF-8"
            // },
        })
    },
    delete: function (baseURL, url, params) {
        return axios({
            method: "DELETE",
            url: url + '/' + params,
            baseURL: baseURL,
            // params: params,
            timeout: 10000,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            //使用form表单进行数据交互
            // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            // "Content-Type": "application/json;charset=UTF-8"
            // },
        })
    }
}