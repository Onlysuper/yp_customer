// 公用table页与search页功能
const mixinDataTable = {
    data() {
        return {
            postPage: 1,
            postLimit: 10,
        }
    },
    methods: {
        /**TABLE页交互 START ************************************************************ */
        // 重新获取数据
        reloadData(page, limit) {
            let page_ = page ? page : this.postPage;
            let limit_ = limit ? limit : this.postLimit;
            this.$refs.dataTable.postDataInit(page_, limit_, this.postSearch);
        },
        // 普通搜索 具备隐藏
        seachstartHandle() {
            // 开始搜索
            this.reloadData();
        },
        visiblesomeHandle() {
            this.searchOptions.forEach(element => {
                // searchOptions数组里面的corresattr 是索引
                if (!element.show) {
                    if (element.type == "dateGroup") {
                        // 开始时间 到结束时间组合 特殊处理
                        element.options.forEach(element => {
                            var corresattr = element.corresattr;
                            element.value = "";
                            this.searchCondition[corresattr] = "";
                        });
                    } else {
                        var corresattr = element.corresattr;
                        element.value = "";
                        this.searchCondition[corresattr] = "";
                    }
                }
            });
        },
        callbackformHandle(cb, data) {
            // 表单双向绑定 得到输入的内容并返回到本页面
            cb(data);
        },
        resetSearchHandle() {
            // 重置查询表单
            this.searchOptions.forEach(element => {
                if (element.type != "dateGroup") {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                } else {
                    element.options.forEach(element => {
                        element.value = "";
                        this.searchCondition[element.corresattr] = "";
                    });
                }
            });
        },
        pagelimitHandle(value) {
            //每页条数改变
            this.postLimit = value;
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
        }
    }
}
export {
    mixinDataTable
}