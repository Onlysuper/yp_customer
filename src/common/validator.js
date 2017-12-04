
const DEFAULT = "";
const SUCCESS = "success";
const ERROR = "error";

/**
 * 定义验证规则
 */
let rule = {
     taxReg: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{17}$|^[a-zA-Z0-9]{18}$|^[a-zA-Z0-9]{20}$/,
     mobelReg: /^1[3|4|5|8|7|9][0-9]\d{8}$/,
     emailReg: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
     moneyReg: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
     nameReg: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
     banknoReg: /^\d{16,19}$/,
     cardnoReg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
}

function isRule(regText, value) {
     const reg = new RegExp(regText);
     return value ? reg.test(value) ? SUCCESS : DEFAULT : DEFAULT;
}

/**
 * 验证方法
 */

let Validator = {
     isEmpty(val) {
          return val ? SUCCESS : DEFAULT;
     },
     isMobile(mobel) {
          return isRule(rule.mobelReg, mobel);
     },
     isEmail(email) {
          return isRule(rule.emailReg, email);
     },
     isName(name) {
          return isRule(rule.nameReg, name);
     },
     isBankNo(bankNo) {
          return isRule(rule.banknoReg, bankNo);
     },
     isTax(val) {
          return isRule(rule.taxReg, val);
     },
     isCardNo(cardNo) {
          return isRule(rule.cardnoReg, cardNo);
     }
}

export default Validator;