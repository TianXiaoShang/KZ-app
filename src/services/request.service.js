import store from '@/store';
import { BASE_URL } from '@/services/environment.service'
import Toast from "@/wxcomponents/toast/toast";
import { newLogin, getToken, reload } from '@/util/index'

// data中带noToast: false则不会弹窗错误信息提示
const request = function(path, data, method = 'POST') {
    return new Promise((resolve, reject) => {
        let noToast;
        if (data) {
            noToast = data.noToast;
            delete data.noToast;
        }
        const token = getToken() || "";
        let url = BASE_URL + `${path}`
        uni.request({
            url,
            method,
            data,
            header: {
                'X-Litemall-Token': token
            },
            success: res => {
                if (res.statusCode === 200) {
                    if (res.data.errmsg && res.data.errno !== 0) {
                        Toast.fail(res.data.errmsg || '请求失败！')
                        reject();
                    } else {
                        resolve(res.data.data)
                    }

                } else if (res.statusCode >= 401 && res.statusCode < 500) {
                    store.commit("LOGOUT");
                    newLogin().then(res => {
                        reload();
                    }, err => {
                        Toast.fail('登陆失败!');
                    });
                } else {
                    console.log('请求失败:', res);
                    Toast.fail('请求失败!');
                    reject(res)
                }
            },
            fail: (err) => {
                if (!noToast) {
                    console.log('接口请求失败:', res);
                }
                reject(err);
            },
            complete: () => {},
        });
    })
}

export default request;