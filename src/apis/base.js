import { retry } from "async";


export default {
    //  oaIp: process.env.NODE_ENV == "development" ? "http://medusa.sunce.xin" : "http://medusa.sunce.xin",
    // oaIp: process.env.NODE_ENV == "development" ? "http://192.168.8.103:8090/tm" : "http://medusa.sunce.xin",
    // oaIp: process.env.NODE_ENV == "development" ? "http://192.168.8.103:8090/tm" : "http://medusa.sunce.xin",
    oaIp: getUrl(),
}

function getUrl() {
    switch (process.env.NODE_ENV) {
        case "development":
            return "http://192.168.100.180:8090/tm";
        case "productionTest":
            return location.protocol + "//tm.yeepiao.com/";
        case "production":
            return location.protocol + "//m.yeepiao.com/";
    }
}
