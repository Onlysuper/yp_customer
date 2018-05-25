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
        var todayStr = year + "-" + month + "-" + day;
        return todayStr;
    }
};
let todayStr = dateSerialize(new Date(), "day"); // 初始化默认开始查询日期
let yesterdayStr = dateSerialize(new Date() - 24 * 60 * 60 * 1000, "day"); // 初始化默认结束查询日期
let eightdayStr = dateSerialize(new Date() - 7 * (24 * 60 * 60 * 1000), "day"); // 8天前
let thisMonthStr = dateSerialize(new Date(), "month"); // 初始化默认开始查询日期
let lastMonthStr = dateSerialize(new Date() - 30 * (24 * 60 * 60 * 1000), "month"); // 初始化默认开始查询日期

let today_ = new Date();
let yesterday_ = new Date(new Date() - 24 * 60 * 60 * 1000);
let eightday_ = new Date(new Date() - 7 * (24 * 60 * 60 * 1000));
let thisMonth_ = new Date(thisMonthStr);
let lastMonth_ = new Date(lastMonthStr);
export {
    dateSerialize,
    todayStr,
    yesterdayStr,
    eightdayStr,
    thisMonthStr,
    lastMonthStr,
    today_,
    yesterday_,
    eightday_,
    thisMonth_,
    lastMonth_,
}