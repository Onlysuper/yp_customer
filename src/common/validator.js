
const DEFAULT = "";
const SUCCESS = "success";
const ERROR = "error";

/**
 * 定义验证规则
 */
let rule = {
  tax: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{17}$|^[a-zA-Z0-9]{18}$|^[a-zA-Z0-9]{20}$/,
  mobel: /^1[3|4|5|8|7|9][0-9]\d{8}$/,
  email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
  money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
  name: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
  bankno: /^\d{16,19}$/,
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
}

function isRule(regText, value) {
  const reg = new RegExp(regText);
  return value ? reg.test(value) ? SUCCESS : DEFAULT : DEFAULT;
}

/**
 * 验证方法
 */

let Validator = {
  //检测是否为空
  isEmpty(val) {
    if (Array.isArray(val)) {
      return val.length > 0 ? SUCCESS : DEFAULT;
    } else {
      return val ? SUCCESS : DEFAULT;
    }
  },
  //检测手机号
  isMobile(mobel) {
    return isRule(rule.mobel, mobel);
  },
  //检测邮箱
  isEmail(email) {
    return isRule(rule.email, email);
  },
  //检测是否中文名字
  isName(name) {
    return isRule(rule.name, name);
  },
  //检测结算卡号
  isBankNo(bankNo) {
    return isRule(rule.bankno, bankNo);
  },
  //检测税号
  isTax(val) {
    return isRule(rule.tax, val);
  },
  //检测身份证号
  isCardNo(cardNo) {
    return isRule(rule.cardnoReg, cardNo);
  }
}

export default Validator;