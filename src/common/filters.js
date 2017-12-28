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
    /**
     * 来源
     */
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

    /**
     * 状态
     */
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

    /**
     * 设备类型
     */
    Vue.filter('handleDeviceType', function (value) {
        switch (value) {
            case "HX_PAN":
                value = "金税盘";
                break;
            case "BW_PAN":
                value = "税控盘";
                break;
        }
        return value;
    })

    /**
     * 客户端类型
     */
    Vue.filter('handleClientType', function (value) {
        switch (value) {
            case "CLIENT":
                value = "桌面客户端";
                break;
            case "BROWER":
                value = "浏览器";
                break;
        }
        return value;
    })

    /**
     * 税率
     */
    Vue.filter('handleTaxRate', function (value) {
        if (!value && value != "0") return "";
        return "税率" + value * 100 + "%";
    })

    /**
     * 是否默认
     */
    Vue.filter('handleDefaultType', function (value) {
        switch (value) {
            case "TRUE":
                value = "默认";
                break;
            case "FALSE":
                value = "不默认";
                break;
        }
        return value;
    })

    /**
     * 费率类型
     */
    Vue.filter('handleEnjoyDiscount', function (value) {
        let taxTypeJson = {
            正常税率: "0",
            出口免税和其他免税优惠政策: "1",
            不征增值税: "2",
            普通零税率: "3"
        };
        for (var key in taxTypeJson) {
            if (taxTypeJson[key] == value) {
                return key;
            }
        }
    })

    /**
     * 费率类型
     */
    Vue.filter('handleDiscountType', function (value) {
        let discountJson = {
            不使用优惠政策: "10",
            不征税: "11",
            免税: "12",
            先征后退: "13",
            "100%先征后退": "14",
            "50%先征后退": "15",

            "即征即退30%": "16",
            "即征即退50%": "17",
            "即征即退70%": "18",
            "即征即退100%": "19",

            "超税负3%即征即退": "20",
            "超税负8%即征即退": "21",
            "超税负12%即征即退": "22",

            简易征收: "23",
            "按5%简易征收减按1.5%计征": "24",
            "按5%简易征收": "25",
            "按3%简易征收": "26",
            稀土产品: "27"
        };
        for (var key in discountJson) {
            if (discountJson[key] == value) {
                return key;
            }
        }
    })

    /**
     * 商品编码
     */
    Vue.filter('handleUnionNo', function (value) {
        switch (value) {
            case "3070401000000000000":
                value = "餐饮服务";
                break;
            case "3070402000000000000":
                value = "住宿服务";
                break;
        }
        return value;
    })

    // 3. 添加实例方法
    //Vue.prototype.$myMethod = ...
}
export default mypFilters;