let dateSerialize = (nowDate, type) => {
    var nowDate = new Date(nowDate);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    month = month * 1 < 10 ? "0" + month : month;
    var day = nowDate.getDate();
    if (type == "month") {
        var thismonth = year + "-" + month;
        return thismonth;
    } else if (type == "day") {
        var todayDate = year + "-" + month + "-" + day;
        return todayDate;
    }
};
let todayDate = dateSerialize(new Date(), "day"); // 初始化默认开始查询日期
let yesterday = dateSerialize(new Date() - 24 * 60 * 60 * 1000, "day"); // 初始化默认结束查询日期
let eightday = dateSerialize(new Date() - 7 * (24 * 60 * 60 * 1000), "day"); // 8天前
let thisMonth = dateSerialize(new Date(), "month"); // 初始化默认开始查询日期
let lastMonth = dateSerialize(new Date() - 30 * (24 * 60 * 60 * 1000), "month"); // 初始化默认开始查询日期

let today_ = new Date();
let yesterday_ = new Date(yesterday);
let eightday_ = new Date(eightday);
let thisMonth_ = new Date(thisMonth);
let lastMonth_ = new Date(lastMonth);
export {
    dateSerialize,
    todayDate,
    yesterday,
    eightday,
    thisMonth,
    lastMonth,
    today_,
    yesterday_,
    eightday_,
    thisMonth_,
    lastMonth_,
}