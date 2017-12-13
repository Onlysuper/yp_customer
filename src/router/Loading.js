import { Loading } from 'element-ui';
export default (flag) => {
    let loading = Loading.service({ text: "加载中..." });
    if (flag) {
        setTimeout(() => { loading.close(); }, 30000);
    } else {
        setTimeout(() => { loading.close(); }, 50);
    }
}

