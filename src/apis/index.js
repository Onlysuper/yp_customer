
import http from "./http";
import base from "./base";
import orgCodeHandle from "./orgcode";
// console.log(orgCodeHandle);

/**
 * 获取验证码
 * @param {路径手机号} phone
 * @param {验证码类型} params.type  regist | login
 */
// 用户登录
const Login = () => { return (params) => { return http.post(base.oaIp, "/login", params) } }

// 菜单列表
const MenuGet = () => { return (params) => { return http.get(base.oaIp, "/index/data", params) } }

// 管理密码修改
const PasswordUpdate = () => { return (params) => { return http.post(base.oaIp, "/user/update/password", params) } }

// 合伙人管理初始化数据
const AgentManage = () => { return (params) => { return http.get(base.oaIp, "/agent/page", params) } }

//新增
const AgentManageAdd = () => { return (params) => { return http.post(base.oaIp, "/agent/add", params) } }

/**
**快速开票分润start
 */
const getBillprofits = () => { return (params) => { return http.get(base.oaIp, "/billprofit/page", params) } }
// end -------------------------------------------------

/**
**开票统计start
 */
const getBillcountagents = () => { return (params) => { return http.get(base.oaIp, "/billcountagent/page", params) } }
// end -------------------------------------------------

/**
**开票记录start
 */
const getBillrecords = () => { return (params) => { return http.get(base.oaIp, "/billrecord/page", params) } }
// end -------------------------------------------------

/**
**日开票详情start
 */
const getBillcountdays = () => { return (params) => { return http.get(base.oaIp, "/billcountday/page", params) } }
// end -------------------------------------------------

/**
**达标详情start
 */
const getBillcountcustomers = () => { return (params) => { return http.get(base.oaIp, "/billcountcustomer/page", params) } }
// end -------------------------------------------------

/**
**产品管理start
 */
const getProducts = () => { return (params) => { return http.get(base.oaIp, "/product/page", params) } }
// end -------------------------------------------------

/**
**合伙人管理start
 */
const getAgents = () => { return (params) => { return http.get(base.oaIp, "/agent/page", params) } }
// end -------------------------------------------------

/**
**合伙人转移start
 */
const getPartnerTransferPage = () => { return (params) => { return http.get(base.oaIp, "/user/privilege", params) } }
// end -------------------------------------------------

/**
**产品配置start
 */
const getProductConfigurePage = () => { return (params) => { return http.get(base.oaIp, "/userproduct/queryAgentTemplate", params) } }
// end -------------------------------------------------

/**
**商品管理start
 */
const getCustomerGoods = () => { return (params) => { return http.get(base.oaIp, "/customerGoods/page", params) } }
const postAddCustomerGood = () => { return (params) => { return http.post(base.oaIp, "/customerGoods/add", params) } }
const postEditCustomerGood = () => { return (params) => { return http.post(base.oaIp, "/customerGoods/update", params) } }
const postDeleteCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/delete/" + path, params) } }
const postDefaultCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/configDefault/" + path, params) } }
const postCancelDefaultCustomerGood = (path) => { return (params) => { return http.post(base.oaIp, "/customerGoods/cancelDefault/" + path, params) } }
// end -------------------------------------------------
/**
**商户产品start
*/
const getCustomerProducts = () => { return (params) => { return http.get(base.oaIp, "/userproduct/customerProductPage", params) } }
// end -------------------------------------------------
/**
**商户管理 start
 */
const getCustomers = () => { return (params) => { return http.get(base.oaIp, "/customer/page", params) } }
// 新增
const postAddCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/add", params) } }
// 编辑
const postEditCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/update", params) } }
// 转移
const transferCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/transfer", params) } }
// 完善
const perfectCustomer = () => { return (params) => { return http.post(base.oaIp, "/customer/complete", params) } }
// end -------------------------------------------------

/**
**开票配置start
 */
const getCustomerConfigs = () => { return (params) => { return http.get(base.oaIp, "/customerConfig/page", params) } }
const postAddCustomerConfigs = () => { return (params) => { return http.post(base.oaIp, "/customerConfig/add", params) } }
const postEditCustomerConfigs = () => { return (params) => { return http.post(base.oaIp, "/customerConfig/update", params) } }
// end -------------------------------------------------

/**
**授权码审核start
 */
const getArantNumExamines = () => { return (params) => { return http.get(base.oaIp, "/qrReciept/secondpage", params) } }
// end -------------------------------------------------

/**
**授权码管理start
 */
const getArantNumManages = () => { return (params) => { return http.get(base.oaIp, "/qrcode/page", params) } }
// end -------------------------------------------------

/**
**授权码转移start
 */
const getArantNumTransfers = () => { return (params) => { return http.get(base.oaIp, "/qrcodemigrate/page", params) } }
// end -------------------------------------------------

/**
**授权码回购start
 */
const getArantNumBuybacks = () => { return (params) => { return http.get(base.oaIp, "/qrReciept/page", params) } }
// end -------------------------------------------------

/**
**用户管理start
 */
const getUserManages = () => { return (params) => { return http.get(base.oaIp, "/user/page", params) } }
const postAddUser = () => { return (params) => { return http.post(base.oaIp, "/user", params) } }
const patchEditUser = () => { return (params) => { return http.patch(base.oaIp, "/user", params) } }
const getRolesTree = () => { return (params) => { return http.get(base.oaIp, "/user/role/tree", params) } }
const patchConfigRole = () => { return (params) => { return http.patch(base.oaIp, "/user/role", params) } }
const deleteUserManage = () => { return (params) => { return http.delete(base.oaIp, "/user/delete", params) } }
// end -------------------------------------------------

/**
**菜单管理start
 */
const getMenuTrees = () => { return (params) => { return http.get(base.oaIp, "/menu/tree", params) } }
const getMenuTreePage = () => { return (params) => { return http.get(base.oaIp, "/menu/function/page", params) } }
const patchAddMenuTree = () => { return (params) => { return http.post(base.oaIp, "/menu", params) } }
const patchEditMenuTree = () => { return (params) => { return http.patch(base.oaIp, "/menu", params) } }
const deleteMenuTree = () => { return (params) => { return http.delete(base.oaIp, "/menu/delete", params) } }
const postAddMenuFunction = () => { return (params) => { return http.post(base.oaIp, "/menu/function", params) } }
const patchEditMenuFunction = () => { return (params) => { return http.patch(base.oaIp, "/menu/function", params) } }
const deleteMenuFunction = () => { return (params) => { return http.delete(base.oaIp, "/menu/function/delete", params) } }

// end -------------------------------------------------

/**
**角色管理start
 */
const getRoleManages = () => { return (params) => { return http.get(base.oaIp, "/role/page", params) } }
const postAddRole = () => { return (params) => { return http.post(base.oaIp, "/role", params) } }
const patchEditRole = () => { return (params) => { return http.patch(base.oaIp, "/role", params) } }
const deleteRole = () => { return (params) => { return http.delete(base.oaIp, "/role/delete", params) } }
const getRolesTreeConfig = () => { return (params) => { return http.get(base.oaIp, "/role/privilege/tree", params) } }
const patchRolesTreeSave = () => { return (params) => { return http.patch(base.oaIp, "/role/privilege", params) } }
// end -------------------------------------------------

/**
**版本控制Start
 */
const getVersionControls = () => { return (params) => { return http.get(base.oaIp, "/versionCommand/page", params) } }
// end -------------------------------------------------

/**
**埋点图标Start
 */
const getBurialPointCharts = () => { return (params) => { return http.get(base.oaIp, "/operatorlog/chart", params) } }
// end -------------------------------------------------

/**
**埋点管理Start
 */
const getBurialPointManages = () => { return (params) => { return http.get(base.oaIp, "/operatorlog/chart", params) } }
// end -------------------------------------------------

/**
**开票图表Start
 */
const getBillrecordCharts = () => { return (params) => { return http.get(base.oaIp, "/billrecord/chart", params) } }
// end -------------------------------------------------

export {
    AgentManage,
    Login,
    MenuGet,
    PasswordUpdate,
    orgCodeHandle,
    AgentManageAdd,
    //商品管理
    getCustomerGoods,
    postAddCustomerGood,
    postEditCustomerGood,
    postDeleteCustomerGood,
    postDefaultCustomerGood,
    postCancelDefaultCustomerGood,
    // 商户产品
    getCustomerProducts,
    //商户管理
    getCustomers,
    postAddCustomer,
    postEditCustomer,
    postUploadFile,
    transferCustomer,
    perfectCustomer,
    //开票配置
    getCustomerConfigs,
    postAddCustomerConfigs,
    postEditCustomerConfigs,

    //用户管理
    getUserManages,
    postAddUser,
    patchEditUser,
    getRolesTree,
    patchConfigRole,
    deleteUserManage,
    // 菜单管理
    getMenuTrees,
    getMenuTreePage,
    patchEditMenuTree,
    postAddMenuFunction,
    patchEditMenuFunction,
    deleteMenuFunction,
    // 角色管理
    getRoleManages,
    postAddRole,
    patchEditRole,
    deleteRole,
    getRolesTreeConfig,
    patchRolesTreeSave,
    patchAddMenuTree,
    deleteMenuTree
};

