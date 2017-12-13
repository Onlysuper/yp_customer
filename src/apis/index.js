
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

// const AgentManage = () => { return (params) => { return http.get(base.oaIp, "/agent/add", params) } }

//商户管理初始化数据
const CustomerManage = () => { return (params) => { return http.get(base.oaIp, "/customer/page", params) } }

export {
    AgentManage,
    Login,
    MenuGet,
    PasswordUpdate,
    orgCodeHandle,
    AgentManageAdd,
    CustomerManage
};

