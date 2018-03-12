
import bussinessTypeJson from "@src/data/bussinessType.json";
import org from "@src/data/org.json";
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
    //百分数转小数
    toPoint(percent) {
        var str = percent.replace("%", "");
        str = str / 100;
        return str;
    },
    // 小数转百分数
    /**
    *这里需要先用Number进行数据类型转换，toFixed去指定截取转换后的小数点后几位(按照四舍五入)，这里是截取一位，0.1266转换后会变成12.7%
    */
    toPercent(point) {
        // var str = Number(point * 100).toFixed(1);
        var str = Number(point * 100);
        str += "%";
        return str;
    },
    // 得到对象里面的部分属性组成心得对象
    pickObj(obj = {}, arr) {
        if (obj) {
            return arr.reduce(
                (iter, val) => (val in obj && (iter[val] = obj[val]), iter),
                {}
            );
        } else {
            return {}
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
    }(),
    /**
     * 根据code查找行业类别
     */
    findBussinessType: function (code) {
        let bussinessType = bussinessTypeJson.find(item => item.code == code);
        return bussinessType || {};
    },

    /**
     * 根据地区编号获取地区完整省市县名称
     */
    findCity(key) {
        var result = {};
        if (!key) return result;
        for (var [shengIndex, sheng] of Object.keys(org).entries()) {
            //这里需要知道索引
            for (var [shiIndex, shi] of Object.keys(org[sheng]).entries()) {
                //这里需要知道索引
                for (var [xianIndex, xian] of Object.keys(org[sheng][shi]).entries()) {
                    //这里需要知道索引
                    if (org[sheng][shi][xian] == key) {
                        result.resultAddr = `${sheng}-${shi}-${xian}`;
                        result.resultCode = key;
                        //拿到上面的索引后设置城市联动默认选中状态
                        return result;
                    }
                }
            }
        }
        return result;
    },
    /**
 * 图片压缩，默认同比例压缩
 * @param {Object} path 
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
    dealImage(path, obj, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.7;  // 默认图片质量为0.7
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
        }
    }
}