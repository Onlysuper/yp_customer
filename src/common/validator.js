
const DEFAULT = "";
const SUCCESS = "success";
const ERROR = "error";

/**
 * 定义验证规则
 */
let rule = {
  tax: /^[a-zA-Z0-9]{15,20}$/,
  mobel: /^1[3|4|5|8|7|9][0-9]\d{8}$/,
  email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
  money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
  name: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
  bankno: /^\d{16,19}$/,
  idCard: /(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)/,
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