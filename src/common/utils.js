export default {
    /**
     * 乘法，解决js精度损失问题
     * @param {*} arg1 
     * @param {*} arg2 
     */
    accMul(arg1, arg2) {
        arg1 = arg1 || 0;
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) { }
        try {
            m += s2.split(".")[1].length
        } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    /**
     * 时间格式化，示例：formatDate(date, 'yyyy-MM-dd hh:mm');
     * @param {时间} date 
     * @param {格式化} fmt 
     */
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
        function padLeftZero(str) {
            return ('00' + str).substr(str.length);
        }
    },
    /**
     * 检测数据类型 isType({},"object") 返回true
     * @param {对象} Obj
     * @param {类型} type
     */
    isType: function (obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    },
    /**
     * 随机指定位数的随机串 randomString(3) 返回"Ds2"
     * @param {长度} len
     */
    randomString: function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
     * 设置标题 兼容微信 setDocumentTitle("首页")
     * @param {标题} title
     */
    setDocumentTitle: function (title) {
        document.title = title;
        var ua = navigator.userAgent;
        if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            var i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    },
    /**
     * 检测是否微信环境 isWeiXin true | false
     */
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }()
}