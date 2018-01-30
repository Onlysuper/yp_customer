import u from "./utils";
let mypDirective = new Object();
mypDirective.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    //Vue.myGlobalMethod = ...
    // 2. 添加全局资源
    Vue.directive('to-focus', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el, fn, fn1) {
            // 聚焦元素
            let input = el.querySelector("input");
            input.focus();
        }
    })

    Vue.directive('readonly-ios', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el, fn, fn1) {
            // 聚焦元素
            let input = el.querySelector("input");
            input.onfocus = function () {
                this.blur();
            }
        }
    })
    Vue.directive('to-click', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el, fn, fn1) {
            el.addEventListener("click", fn.value);
        }
    })

    Vue.directive('to-num', {
        inserted: function (el) {
            let num = el.innerHTML;
            let type = false;
            // num = "2323.01";
            num = num.split(".");
            num[1] = num[1] ? (num[1].length < 2 ? num[1] + '0' : num[1]) : "";
            let n = 0, s = 0, m = 0, speed = 0;
            let timer = () => {
                if (n == 100) return;
                n++;
                s = parseInt(n * num[0] / 100);
                m = num[1] ? parseInt(n * num[1] / 100) : "";
                el.innerHTML = s + (m ? '.' + (m < 10 ? "0" + m : m) : (type ? ".00" : ""));
                setTimeout(timer, speed)
            }
            timer();
        }
    })
    // 3. 添加实例方法
    //Vue.prototype.$myMethod = ...
}
export default mypDirective;