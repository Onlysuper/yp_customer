
import http from "./http";
import base from "./base";
// import orgCodeHandle from "./orgcode";
// console.log(orgCodeHandle);

/**
 * 获取验证码
 * @param {路径手机号} phone
 * @param {验证码类型} params.type  regist | login
 */
// 用户登录
const Login = () => { return (params) => { return http.post(base.oaIp, "/login", params) } }
const Logout = () => { return (params) => { return http.get(base.oaIp, "/logout", params) } }

// 菜单列表
const MenuGet = () => { return (params) => { return http.get(base.oaIp, "/index/data", params) } }

// 用户信息
const UserGet = () => { return (params) => { return http.get(base.oaIp, "/user/privilege", params) } }
const changeBillOpenCheck = () => { return (params) => { return http.get(base.oaIp, "/changeBill/productEdit", params) } }
// 管理密码修改
const PasswordUpdate = () => { return (params) => { return http.patch(base.oaIp, "/user/update/password", params) } }




/**
**商户产品start
*/
const getCustomerProducts = () => { return (params) => { return http.get(base.oaIp, "/userproduct/customerProductPage", params) } }
const getCheckCustomerProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/query/checkCustomerProduct", params) } }
const getQueryCustomerProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomer", params) } }
const postHandleCustomerProduct = () => { return (params) => { return http.post(base.oaIp, "/userproduct/update/userProductSingle", params) } }
const getQueryCustomerElectronic = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomerElectronic", params) } }
const getUserProductStatus = () => { return (params) => { return http.post(base.oaIp, "/userProductStatus/update", params) } }
// end -------------------------------------------------


/**
 **消息记录Start
 */
const getMessages = () => { return (params) => { return http.get(base.oaIp, "/message/page", params) } }
// end -------------------------------------------------


/**
**结算管理Start
 */
const getSettles = () => { return (params) => { return http.get(base.oaIp, "/agentSettle/agentPage", params) } }
const postUpdateSettles = () => { return (params) => { return http.post(base.oaIp, "/agentSettle/updateSettle", params) } }
const getAgentSettleSum = () => { return (params) => { return http.get(base.oaIp, "/agentSettle/sum", params) } }
// end -------------------------------------------------


/**
**我的产品Start
 */
const getCustomerOpenProducts = () => { return (params) => { return http.get(base.oaIp, "/userProductStatus/page", params) } }
const postCustomerOpenProductSearch = () => { return (params) => { return http.post(base.oaIp, "/userproduct/query/cost", params) } }
const getCustomerEchoProduct = () => { return (params) => { return http.get(base.oaIp, "/customer/queryCustomerConverge", params) } }
const completeSettleInfo = () => { return (params) => { return http.post(base.oaIp, "/customer/completeSettleInfo", params) } }
const completeConvergeProduct = () => { return (params) => { return http.post(base.oaIp, "/customer/completeConvergeProduct", params) } }
const completeBussinessImg = () => { return (params) => { return http.post(base.oaIp, "/customer/completeBussinessImg", params) } }
const upload = () => { return (params) => { return http.post(base.oaIp, "/bussinessImg/upload", params) } }
const checkCustomerProduct = () => { return (params) => { return http.post(base.oaIp, "/customer/query/checkCustomerProduct", params) } }
// end -------------------------------------------------

// bankCustomer
const getbankCustomers = () => { return (params) => { return http.get(base.oaIp, "/bankCustomer/page", params) } }

/**
**交易管理-订单查询
 */

// const getPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/operator/page", params) } }
const getPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/page?", params) } }
const getSumPayOrders = () => { return (params) => { return http.get(base.oaIp, "/payOrder/sum", params) } }
/**
 **商户版本管理Start
 */
const getChangeBills = () => { return (params) => { return http.get(base.oaIp, "/changeBill/page", params) } }
const postUpdateBill = () => { return (params) => { return http.post(base.oaIp, "/changeBill/update", params) } }
const getOneChangeBill = () => { return (params) => { return http.get(base.oaIp, "/changeBill/queryConvergeNowData", params) } }
// end -------------------------------------------------


//支付商户结算
const getCustomerSettles = () => { return (params) => { return http.get(base.oaIp, "/customerSettle/page", params) } }
const postStatusCustomerSettle = () => { return (params) => { return http.post(base.oaIp, "/customerSettle/queryCustomerNo", params) } }

// 邮箱配置end
export {
    Login,
    Logout,
    MenuGet,
    UserGet,
    PasswordUpdate,
    // orgCodeHandle,
    // 合伙人管理
    getAgentManages,
    postAddAgentManage,
    postEditAgentManage,
    getBankList,
    postDeleteAgent,
    postEditChange,
    // 快速开票分润
    getBillprofits,
    getBillprofitSum,
    //聚合支付分润
    getpayProfits,
    //开票统计
    getBillcountagents,
    getBillcountSum,
    // 开票记录
    getBillrecords,
    postEditBillrecord,
    // 日开票详情
    getBillcountdays,
    getExportBillcountdays,
    //达标详情
    getBillcountcustomers,
    // 产品管理
    getProducts,
    postAddProduct,
    postEditProduct,
    postToggleProduct,
    getUserProductStatus,
    // 商品管理
    getCustomerGoods,
    postAddCustomerGood,
    postEditCustomerGood,
    postDeleteCustomerGood,
    postDefaultCustomerGood,
    postCancelDefaultCustomerGood,
    getsmartgoodscodeCustomerGood,
    getSumPayOrders,
    // 商户产品
    getCustomerProducts,
    getCheckCustomerProduct,
    getQueryCustomerProduct,
    perfectCustomer,
    postHandleCustomerProduct,
    getQueryCustomerElectronic,

    // 消息管理
    getMessages,

    // 结算统计
    getSettles,
    postUpdateSettles,

    //我的产品
    getCustomerOpenProducts,
    postCustomerOpenProductSearch,
    getCustomerEchoProduct,
    completeSettleInfo,
    completeConvergeProduct,
    completeBussinessImg,
    checkCustomerProduct,
    upload,
    //交易订单查询
    getPayOrders,
    getbankCustomers,
    changeBillOpenCheck,
    getChangeBills,
    postUpdateBill,
    getOneChangeBill,
    getCustomerSettles,
    postStatusCustomerSettle,
    getAgentSettleSum
};

