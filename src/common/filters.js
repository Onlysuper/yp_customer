import accMul from "@src/common/utils";
let mypFilters = new Object();
mypFilters.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    //Vue.myGlobalMethod = ...
    // 2. 添加全局资源
    Vue.filter('accMul', function (value, param) {
        console.log(value + "-" + param)
        return accMul(value, param);
    })

    Vue.filter('channelName', function (value) {
        return value === "YEEPIAO" ? '易票' : '中付';
    })

    Vue.filter('handleFrom', function (value) {
        switch (value) {
            case "LOCAL":
                value = "后台";
                break;
            case "SCAN_CODE":
                value = "扫码";
                break;
        }
        return "来源" + value;
    })

    Vue.filter('handleStatus', function (value) {
        switch (value) {
            case "TRUE":
                value = "开启";
                break;
            case "FALSE":
                value = "关闭";
                break;
        }
        return "状态" + value;
    })
    // 3. 添加实例方法
    //Vue.prototype.$myMethod = ...
}
export default mypFilters;