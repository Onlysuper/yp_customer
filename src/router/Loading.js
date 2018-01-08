import { Loading as eleLoading } from 'element-ui';
export default (flag) => {
    let loading = eleLoading.service({ text: "加载中..." });
    if (flag) {
        setTimeout(() => { loading.close(); }, 30000);
    } else {
        setTimeout(() => { loading.close(); }, 50);
    }
}

