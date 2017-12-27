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
    //loading
    // Indicator.open({
    //      text: "请稍后...",
    //      spinnerType: 'fading-circle'
    // });
    //  var reg = new RegExp(config.baseURL);
    //  var apiPath = config.url.replace(reg, "");
    //  //console.log("请求地址："+apiPath)
    //  if (apiPath === "/user/login/") {
    //       //做点什么
    //  } else {
    //       config.headers.common['token'] = localStorage.getItem("token") || "";
    //  }

    return config;
}, function (error) {
    return Promise.reject(error);
})

//全局响应拦截器
axios.interceptors.response.use(function (response) {
    // Indicator.close();
    return response;
}, function (error) {
    return Promise.resolve(error.response);
})

function checkStatus(response) {
    //loading
    //如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {

        return response
        //如果不需要除了data之外的数据，可以直接 return response.data;
    }
    //如果http状态不正常，返回网络异常
    return {
        status: -404,
        msg: "网络异常,请稍后再试"
    }
}
function checkCode(res) {
    //如果code异常（这里已经包括网络错误，服务器错误，后端抛出的错误）,可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        Indicator.close();
        return {
            resultCode: res.status,
            resultMsg: res.msg
        };
    }
    //这里判断后端是否抛出了错误
    // if (res.data && (!res.data.success)) {
    //           alert(res.data.resultMsg)
    // }
    // alert(res.data.resultCode)
    //  if (res.data.resultCode === "01") {
    //       router.replace({ path: "/login", query: { redirect: "/home" } });
    //       return {
    //            resultCode: "-1",
    //            resultMsg: "请重新登录！"
    //       };
    //  }
    //直接返回data中的数据
    return res.data;
}


export default {
    post: function (baseURL, url, data) {
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                // "X-requested-With": "XMLHttpRequest",
                //使用form表单进行数据交互
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
        })
    },
    get: function (baseURL, url, params) {
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            // headers: {
            //           "X-requested-With": "XMLHttpRequest"
            // }
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
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
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
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
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
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
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
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
        }).then(function (response) {
            return checkStatus(response)
        }).then(function (response) {
            return checkCode(response)
        })
    }
}