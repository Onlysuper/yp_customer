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
            let storeUsername = store.state.userInfoAndMenu.userMessage.username;
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
    // elementui dialog弹出框拖动功能
    Vue.directive('dialogDrag', {
        componentUpdated(el) {
            const dragDom = el.querySelector('.el-dialog');
            dragDom.style.left = ''
            dragDom.style.top = ''
        },
        bind(el, binding, vnode, oldVnode) {

            const dialogHeaderEl = el.querySelector('.el-dialog__header');
            const dragDom = el.querySelector('.el-dialog');
            dialogHeaderEl.style.cursor = 'move';

            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

            dialogHeaderEl.onmousedown = (e) => {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;

                // 获取到的值带px 正则匹配替换
                let styL, styT;

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                } else if (sty.left == 'auto') {
                    styL = 0;
                    styT = 0;
                } else {
                    styL = +sty.left.replace(/\px/g, '');
                    styT = +sty.top.replace(/\px/g, '');
                };
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离 
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;
                    // 移动当前元素  
                    console.log('t:');
                    console.log(t);
                    console.log('styT:');
                    console.log(styT);
                    dragDom.style.left = `${l + styL}px`;
                    dragDom.style.top = `${t + styT}px`;
                    console.log(`${t + styT}px`);
                    //将此时的位置传出去
                    //binding.value({x:e.pageX,y:e.pageY})
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    })

    // v-dialogDragWidth: 弹窗宽度拖大 拖小
    Vue.directive('dialogDragWidth', {
        bind(el, binding, vnode, oldVnode) {
            const dragDom = binding.value.$el.querySelector('.el-dialog');

            el.onmousedown = (e) => {

                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - el.offsetLeft;

                document.onmousemove = function (e) {
                    e.preventDefault(); // 移动时禁用默认事件

                    // 通过事件委托，计算移动的距离 
                    const l = e.clientX - disX;
                    dragDom.style.width = `${l}px`;
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        }
    })
    // v-dialogDrag: 弹窗拖拽
    Vue.directive('dialogDrag', {
        bind(el, binding, vnode, oldVnode) {
            const dialogHeaderEl = el.querySelector('.el-dialog__header');
            const dragDom = el.querySelector('.el-dialog');
            dialogHeaderEl.style.cursor = 'move';

            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = dragDom.currentStyle || dragDom.style || window.getComputedStyle(dragDom, null);

            dialogHeaderEl.onmousedown = (e) => {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;

                // 获取到的值带px 正则匹配替换
                let styL, styT;

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
                } else {
                    styL = +sty.left.replace(/\px/g, '');
                    styT = +sty.top.replace(/\px/g, '');
                };
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离 
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;

                    // 移动当前元素  
                    dragDom.style.left = `${l + styL}px`;
                    dragDom.style.top = `${t + styT}px`;

                    //将此时的位置传出去
                    //binding.value({x:e.pageX,y:e.pageY})
                };

                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }
        },
        update(el, binding, vnode, oldVnode) {
            const dialogHeaderEl = el.querySelector('.el-dialog__header');
            const dragDom = el.querySelector('.el-dialog');
            if (el.style.display == "none") {
                dragDom.style.left = "";
                dragDom.style.top = "";
            }
        }
    })
}
export default mypDirective;