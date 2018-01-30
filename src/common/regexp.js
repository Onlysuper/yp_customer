// 税号
const taxNumVerify = (rule, value, callback) => {
    var reg = /^[A-Z0-9]{15,20}$/;
    // var reg = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
    if (value != "" && !reg.test(value)) {
        return callback(new Error("税号有误！"));
    } else {
        callback();
    }
};
// 身份证号
const idCardVerify = (rule, value, callback) => {
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if (value != "" && !reg.test(value)) {
        return callback(new Error("身份证号有误!"));
    } else {
        callback();
    }
};
// 电话号码
const phoneNumVerify = (rule, value, callback) => {
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (value != "" && !reg.test(value)) {
        return callback(new Error("手机号有误!"));
    } else {
        callback();
    }
};
export {
    taxNumVerify,
    idCardVerify,
    phoneNumVerify
}