import { todayDate, yesterday } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinDataTable = {
    data() {
        return {
            postPage: 1,
            postLimit: 10,
            pageHeight: 0,// .admin-page的高度
            formHeight: 0,// 搜索框的高度
            operationHeight: 0,// 操作按钮组的高度
            paginationHeight: 0// 翻页的高度
        }
    },
    methods: {
        // 表格大小
        tableSizeHandle() {
            // this.$emit("databoxSize");
            this.$nextTick(() => {

                // console.log($(".operation-box").html());
                // let pageHeight = $(".admin-page").outerHeight(true) || 0;
                // // console.log(pageHeight);
                // let formHeight = $(".search-page").outerHeight(true) || 0;
                // let operationHeight = $(".operation-box").outerHeight(true) || 0;
                // let paginationHeight = $(".el-pagination").outerHeight(true) || 0;
                this.tableHeight =
                    this.pageHeight - this.formHeight - this.operationHeight - this.paginationHeight - 20;
                // this.tableHeight = pageHeight
                // console.log(pageHeight + "---" + formHeight + '---' + operationHeight + '--' + this.tableHeight);
            });
        },
        /**TABLE页交互 START ************************************************************ */
        showDialog(dialogName) {
            this[dialogName] = true;
        },
        // 重新获取数据
        reloadData(page, limit, search) {
            let page_ = page ? page : this.postPage;
            let limit_ = limit ? limit : this.postLimit;
            this.$refs.dataTable.postDataInit(page_, limit_, this.postSearch);
            console.log("reload");
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 普通搜索 具备隐藏
        seachstartHandle() {
            // 开始搜索
            this.reloadData();
        },
        // 重置某输入框
        visiblesomeHandle() {
            // this.searchOptions.forEach(element => {
            //     // searchOptions数组里面的corresattr 是索引
            //     if (!element.show) {
            //         if (element.type == "dateGroup") {
            //             // 开始时间 到结束时间组合 特殊处理
            //             element.options.forEach(element => {
            //                 var corresattr = element.corresattr;
            //                 element.value = "";
            //                 this.searchCondition[corresattr] = "";
            //             });
            //         } else {
            //             var corresattr = element.corresattr;
            //             element.value = "";
            //             this.searchCondition[corresattr] = "";
            //         }
            //     }
            // });
        },
        callbackformHandle(cb, data1, data2) {
            // 表单双向绑定 得到输入的内容并返回到本页面
            cb(data1, data2);
        },
        resetSearchHandle() {
            // 重置查询表单
            this.searchOptions.forEach(element => {
                if (element.type == "dateGroup") {
                    element.options[0].value = todayDate;
                    element.options[1].value = todayDate;
                    this.searchCondition[element.options[0].corresattr] = todayDate;
                    this.searchCondition[element.options[1].corresattr] = todayDate;
                } else if (element.type == "dateGroup2") {
                    element.value = [todayDate, todayDate]
                    this.searchCondition[element.option1] = todayDate;
                    this.searchCondition[element.option2] = todayDate;
                } else {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                }
            });
        },
        resetSomeInputHandle(value) {
            this.searchOptions.forEach(element => {
                if (element.type == value) {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                }
            });
        },
        pagelimitHandle(value) {
            //每页条数改变
            this.postLimit = value;
            console.log(this.postLimit);
            console.log('table')
        },
        pagecountHandle(value) {
            // 页数改变
            this.postPage = value;
        },
        operationHandle(data, cb) {
            // 操作按钮回调
            cb(data);
        }
        /**END ***********************************************/
    },

    computed: {
        oaIp() {
            // nginx配置的路由
            return this.$store.state.Base.oaIp;
        },
        adminOperationAll() {
            // 用户按钮权限
            return this.$store.state.moduleLayour.userMessage.all;
        }
    },
    activated() {
        console.log($(".operation-box").html());
        // let pageHeight = $(".admin-page").outerHeight(true) || 0;
        // // console.log(pageHeight);
        // let formHeight = $(".search-page").outerHeight(true) || 0;
        // let operationHeight = $(".operation-box").outerHeight(true) || 0;
        // let paginationHeight = $(".el-pagination").outerHeight(true) || 0;
    },
    mounted() {
        this.$store.commit("initSearchVisibleFn");
    }
}
export {
    mixinDataTable
}