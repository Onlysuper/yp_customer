import { Loading as eleLoading } from 'element-ui';
export default (flag) => {
    if (!window.navigator.onLine) {
        let loading = eleLoading.service({ text: "努力加载中" });
        setTimeout(() => {
            if (window.navigator.onLine) {
                location.reload();
            }
            loading.close();
        }, 3000);
    }
    // let loading = eleLoading.service({ text: "加载中..." });
    // if (flag) {
    //     setTimeout(() => { loading.close(); }, 30000);
    // } else {
    //     setTimeout(() => { loading.close(); }, 50);
    // }
}

