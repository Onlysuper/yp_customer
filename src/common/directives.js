import u from "./utils";
import store from "@src/vuex";
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

    /**
     * 按钮权限控制显示-排除法
     * 要排除的角色
     * v-display-exclude="['root','admin']"
     */
    Vue.directive('display-exclude', {
        //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        bind: function () { },
        //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
        inserted: function (el, binding, vnode, oldVnode) {
            let storeUsername = store.state.moduleLayour.userMessage.username;
            let valueList = binding.value || [];
            valueList.forEach(username => {
                if (username == storeUsername) {
                    el.parentNode.removeChild(el);
                }
            });
        },
        //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
        update: function () { },
        //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        componentUpdated: function () { },
        //只调用一次，指令与元素解绑时调用。
        unbind: function () { },
    })

    Vue.directive('required', {
        //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
        bind: function () { },
        //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
        inserted: function (el, binding, vnode, oldVnode) {
            let titleDom = el.querySelector(".mint-cell-title");
            titleDom.className = titleDom.className + "";
        },
        //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
        update: function () { },
        //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        componentUpdated: function () { },
        //只调用一次，指令与元素解绑时调用。
        unbind: function () { },
    })
    // 3. 添加实例方法
    //Vue.prototype.$myMethod = ...
}
export default mypDirective;