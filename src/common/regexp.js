// pc端表单验证
import regRule from "@src/common/formRegexp.js";
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
// 电话号码 不可为空
const phoneNumVerify_r = (rule, value, callback) => {
    if (!value || !regRule['mobel'].test(value)) {
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
// 税号 不可为空
const taxNumVerify_r = (rule, value, callback) => {
    if (!value || !regRule['tax'].test(value)) {
        return callback(new Error("税号有误！"));
    } else {
        callback();
    }
};
// 注册资金 不可为空 并且必须为证书
const registMoney_r = (rule, value, callback) => {
    let val = value == 0 ? "0" : value;
    if (!val || !regRule['positiveNum'].test(value)) {
        // if (!val || val < 30000) {
        return callback(new Error("注册资金需大于30000元"));
    } else {
        callback();
    }
};
export {
    taxNumVerify,
    idCardVerify,
    phoneNumVerify,
    phoneNumVerify_r,
    idCardVerify_r,
    taxNumVerify_r,
    registMoney_r
}