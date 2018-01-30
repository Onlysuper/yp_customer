let dateSerialize = nowDate => {
    var nowDate = new Date(nowDate);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    month = month * 1 < 10 ? "0" + month : month;
    var day = nowDate.getDate();
    var todayDate = year + "-" + month + "-" + day;
    return todayDate;
};
let todayDate = dateSerialize(new Date()); // 初始化默认开始查询日期
let yesterday = dateSerialize(new Date() - 24 * 60 * 60 * 1000); // 初始化默认结束查询日期
let eightday = dateSerialize(new Date() - 7 * (24 * 60 * 60 * 1000)); // 8天前
// let yesterday = dateSerialize(new Date()); // 初始化默认结束查询日期
export {
    dateSerialize,
    todayDate,
    yesterday,
    eightday
}