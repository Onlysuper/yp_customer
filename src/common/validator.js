
const DEFAULT = "";
const SUCCESS = "success";
const ERROR = "error";

/**
 * 定义验证规则
 */
import rule from "@src/common/formRegexp.js";
function isRule(regText, value) {
  const reg = new RegExp(regText);
  return value ? reg.test(value) ? SUCCESS : DEFAULT : DEFAULT;
}
// 可以为空 不为空就要正确系列
function isRule_r(regText, value) {
  const reg = new RegExp(regText);
  return value ? reg.test(value) ? SUCCESS : DEFAULT : SUCCESS;
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
    return isRule(rule.idCard, cardNo);
  },
  //检测身份证号 可以为空
  isCardNoNull(cardNo) {
    return isRule_r(rule.idCard, cardNo);
  }
}
export default Validator;