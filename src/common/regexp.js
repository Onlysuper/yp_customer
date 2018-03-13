// pc端表单验证
const regRule = {
    tax: /^[a-zA-Z0-9]{15,20}$/, // 税号
    mobel: /^1[3|4|5|6|8|7|9][0-9]\d{8}$/, // 
    email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
    money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
    name: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
    bankno: /^\d{16,19}$/,
    idCard: /(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)/ // 身份证号码
}
// 税号 可以为空
const taxNumVerify = (rule, value, callback) => {
    if (!!value && !regRule['tax'].test(value)) {
        return callback(new Error("税号有误！"));
    } else {
        callback();
    }
};
// 身份证号 可以为空
const idCardVerify = (rule, value, callback) => {
    if (!!value && !regRule['idCard'].test(value)) {
        return callback(new Error("身份证号有误!"));
    } else {
        callback();
    }
};
// 电话号码 可以为空
const phoneNumVerify = (rule, value, callback) => {
    if (!!value && !regRule['mobel'].test(value)) {
        return callback(new Error("手机号有误!"));
    } else {
        callback();
    }
};
// 身份证号 不可为空
const idCardVerify_r = (rule, value, callback) => {
    if (!value || !regRule['idCard'].test(value)) {
        return callback(new Error("请填写有效身份证号码!"));
    } else {
        callback();
    }
};
export {
    taxNumVerify,
    idCardVerify,
    phoneNumVerify,
    idCardVerify_r
}