
import http from "./http";
import base from "./base";

/**
 * 获取验证码
 * @param {路径手机号} phone
 * @param {验证码类型} params.type  regist | login
 */
const login = () => { return (params) => { return http.post(base.oaIp, "/user/login/", params) } }

export {

};

