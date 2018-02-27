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
        * 商户来源
        */
    Vue.filter('customerFrom', function (value) {
        switch (value) {
            case "OPEN_API":
                value = "第三方";
                break;
            case "PLUGIN":
                value = "插件";
                break;
            case "LOCAL":
                value = "后台";
                break;
            case "SCAN_CODE":
                value = "扫码";
                break;
            case "OFFICAL_ACCOUNT":
                value = "公众号";
                break;
            case "SLIENT":
                value = "静默";
                break;
        }
        return value;
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
     * 开票记录状态
     */
    Vue.filter('billStatus', function (value) {
        switch (value) {
            case "SUCCESS":
                value = "推送成功";
                break;
            case "BILLING_SUCCESS":
                value = "开票成功";
                break;
            case "BILLING":
                value = "开票中";
                break;
            case "ORDER":
                value = "待开票";
                break;
            case "BILLING_FAIL":
                value = "失败";
                break;
            case "QUERY_FAIL":
                value = "查询失败";
                break;
        }
        return value;
    })
    /**
    * 开票记录-开票类型
    */
    Vue.filter('billType', function (value) {
        switch (value) {
            case 1:
                value = "普票";
                break;
            case 2:
                value = "专票";
                break;
            case 3:
                value = "普票(个人)";
                break;
        }
        return value;
    })

    /**
   * 达标详情-达标状态
   */
    Vue.filter('billStandard', function (value) {
        switch (value) {
            case "TRUE":
                value = "已达标";
                break;
            case "FALSE":
                value = "未达标";
                break;
        }
        return value;
    })
    /**
  * 授权码审核-是否生产水牌
  */
    Vue.filter('empowerCheckIsPrint', function (value) {
        switch (value) {
            case "N":
                value = "否";
                break;
            case "Y":
                value = "带水牌";
                break;
            case "" || null:
                value = "未知";
                break;
        }
        return value;
    })
    Vue.filter('migrateType', function (value) {
        switch (value) {
            case "OUT_ORDER":
                value = "授权码序列号";
                break;
            case "ORDER":
                value = "授权码序列号转移";
                break;
            case "" || null:
                value = "未知";
                break;
        }
        return value;
    })

    /**
* 授权码审核-状态
*/
    Vue.filter('empowerCheckStatus', function (value) {
        switch (value) {
            case "SUCCESS":
                value = "审核通过";
                break;
            case "AUDITING":
                value = "待审核";
                break;
            case "REJECT":
                value = "拒绝";
                break;
        }
        return value;
    })
    /**
* 授权码管理-状态
*/
    Vue.filter('empowerManageStatus', function (value) {
        switch (value) {
            case "BINDED":
                value = "已绑定";
                break;
            case "TRUE":
                value = "未绑定";
                break;
            case "FALSE":
                value = "无效";
                break;
        }
        return value;
    })
    /**
* 授权码管理-是否有物料
*/
    Vue.filter('empowerManageMateriel', function (value) {
        switch (value) {
            case "TRUE":
                value = "有物料";
                break;
            case "FALSE":
                value = "无物料";
                break;
        }
        return value;
    })

    /**
* 授权码审核-设备类型
*/
    Vue.filter('empowerCheckReceiptType', function (value) {
        switch (value) {
            case "AUTHCODE":
                value = "授权码";
                break;
            case "SCANCODEGUN":
                value = "扫码枪";
                break;
            case "":
                value = "未知设备";
                break;
        }
        return value;
    })
    Vue.filter('enterprisesupplyStatus', function (value) {
        switch (value) {
            case "INIT":
                value = "未处理";
                break;
            case "SUCCESS":
                value = "已处理";
                break;
            case "FAIL":
                value = "失败";
                break;
        }
        return value;
    })
    Vue.filter('settleMode', function (value) {
        switch (value) {
            case "T0":
                value = "已开通";
                break;
            case "T1":
                value = "未开通";
                break;
        }
        return value;
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

    /**
     * 商户产品类型
     */
    Vue.filter('handleFeatureType', function (value) {
        switch (value) {
            case "T0_CASH_COST":
                value = "T0提现";
                break;
            case "T1_CASH_COST":
                value = "T1提现";
                break;
            case "ELECTRONIC":
                value = "电子发票";
                break;
            case "QRCODE_BILLING":
                value = "快速开票";
                break;
            case "WECHAT_COST":
                value = "微信支付";
                break;
            case "ALIPAY_COST":
                value = "支付宝支付";
                break;
            default:
                value = "未知";
        }
        return value;
    })

    /**
     * 商户产品类型
     */
    Vue.filter('handleProductOpenStatus', function (value) {
        switch (value) {
            case "TRUE":
                value = "已开通";
                break;
            case "INIT":
                value = "未开通";
                break;
            case "REJECT":
                value = "被拒绝";
                break;
            case "CHECKING":
                value = "待审核";
                break;
            default:
                value = "未知";
        }
        return value;
    })
    // 3. 添加实例方法
    //Vue.prototype.$myMethod = ...
}
export default mypFilters;