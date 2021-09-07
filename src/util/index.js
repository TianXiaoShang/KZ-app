import { tabBarHeight } from "@/setting";
import Dialog from "@/wxcomponents/dialog/dialog";
import store from "../store";
import request from "@/services/request.service";
import Toast from "@/wxcomponents/toast/toast";
import moment from 'moment';

// 获取状态栏尺寸，用于自定义顶部导航栏
const getStatusBarInfo = (function() {
    let info;
    let statusBarHeight;
    let menuButtonInfo;
    let navBarHeight;
    let contentWidth;

    return function() {
        // 实现函数缓存
        if (!info) {
            // 获取手机系统信息
            info = uni.getSystemInfoSync();
            // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
            statusBarHeight = info.statusBarHeight;
            menuButtonInfo = uni.getMenuButtonBoundingClientRect();
            // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
            navBarHeight =
                menuButtonInfo.bottom -
                info.statusBarHeight +
                (menuButtonInfo.top - info.statusBarHeight);
            contentWidth = menuButtonInfo.left;
        }
        return {
            statusBarHeight,
            navBarHeight,
            contentWidth,
        };
    };
})();

// 计算除去顶部跟底部后的中间滚动区域高度
// 从下到上是否拥有：tab栏，导航栏，状态栏
// extra可定义额外计算要减去的高度，可为正负数
const getScrollViewHeight = function(
    haveTab = true,
    haveNav = true,
    haveStatusBar = true,
    extra = 0
) {
    const { statusBarHeight, navBarHeight } = getStatusBarInfo();
    const statusHeight = haveStatusBar ? statusBarHeight : 0;
    const navHeight = haveNav ? navBarHeight : 0;
    const tabHeight = haveTab ? tabBarHeight : 0;
    return `100vh - ${statusHeight + navHeight + tabHeight + extra}px`;
};

// 登陆流程
const newLogin = function() {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: "weixin",
            success: function(loginRes) {
                requestLogin({
                    code: loginRes.code,
                }).then(data => {
                    store.commit("LOGIN", { status: false, token: data.token });
                    getSelfInfo().then(ele => {
                        store.commit("LOGIN", { status: true, token: data.token });
                        resolve();
                    }, () => {
                        // 信息获取失败，登陆依旧成功。只是没有个人信息。
                        store.commit("LOGIN", { status: true, token: data.token });
                        resolve();
                    })
                })
            },
        });
    })
}

// 唤起用户授权并更新数据
const callGetUserInfo = function() {
    return new Promise((resolve, reject) => {
        Dialog.confirm({
            title: "提示",
            message: "请确认授权",
            confirmButtonText: "确认授权",
            confirmButtonOpenType: 'getUserProfile' // 该属性可以在内部按钮直接唤起授权api，官方不支持间接唤起
        }).then(
            (infoRes) => {
                updateSelfInfo({
                    avatar: infoRes.userInfo.avatarUrl,
                    nickname: infoRes.userInfo.nickName,
                    gender: infoRes.userInfo.gender,
                }).then(res => {
                    getSelfInfo().then(res => {
                        resolve();
                    })
                }, err => {
                    Toast.fail("更新个人信息失败");
                    reject();
                })
            },
            (err) => {
                Toast.fail("用户取消授权");
                reject();
            }
        )
    })

}



// 强制检查用户登陆
// 未授权其一则阻塞下单等敏感操作
function checkAuth() {
    return new Promise((resolve, reject) => {
        if (store.getters.userInfo.nickname && store.getters.userInfo.mobile) {
            resolve();
        } else {
            if (!store.getters.userInfo.nickname) {
                callGetUserInfo().then(res => {
                    getMobile().then(res => {
                        resolve();
                    }, () => reject())
                }, err => {
                    reject();
                })
            } else if (!store.getters.userInfo.mobile) {
                getMobile().then(res => {
                    resolve();
                }, () => reject())
            }
        }
    });
}



// 唤起手机号授权，在每次登陆时检查手机号，授权一次以后不再唤起
function getMobile() {
    return new Promise((resolve, reject) => {
        Dialog.confirm({
            title: "提示",
            message: "请授权手机号",
            confirmButtonText: "授权",
            confirmButtonOpenType: "getPhoneNumber",
        }).then(
            (res) => {
                updateMobile({ encryptedData: res.detail.encryptedData, iv: res.detail.iv }).then(res => {
                    getSelfInfo().then(() => {
                        resolve();
                    }, err => reject(err))
                }, err => {
                    reject(err);
                })
            },
            (err) => {
                console.log(148)
                Toast.fail("用户拒绝授权");
                reject(err);
            }
        );
    });
}

// 获取个人信息接口
const getSelfInfo = function() {
        return new Promise((resolve, reject) => {
            request("/wechat/auth/getUserInfo", {}, 'GET').then(
                (res) => {
                    console.log(res, 166);
                    store.commit('UPDATE_USERINFO', res.user)
                    store.commit('UPDATE_PC_USERINFO', res.pcUser)
                    resolve(res)
                },
                (err) => reject(err)
            );
        })
    }
    // 登陆请求接口
const requestLogin = function(data) {
        return new Promise((resolve, reject) => {
            request("/wechat/auth/getOpenidByCode", data, 'GET').then(
                (res) => {
                    resolve(res)
                },
                (err) => reject(err)
            );
        })
    }
    // 更新个人信息
const updateSelfInfo = function(data) {
        return new Promise((resolve, reject) => {
            request("/wechat/auth/upDateUserInfo", data).then(
                (res) => {
                    resolve(res)
                },
                (err) => reject(err)
            );
        })
    }
    // 获取token
const getToken = function() {
    return store.getters.token
}

const updateMobile = function(data) {
    return new Promise((resolve, reject) => {
        request("/wechat/auth/bindPhone", data).then(
            (res) => {
                resolve(res)
            },
            (err) => reject(err)
        );
    })
}
const reload = function() {
    let routes = getCurrentPages();
    let curpath = routes[routes.length - 1].$page.fullPath;
    uni.redirectTo({ url: curpath });
}

const compareDate = function(endDate) {
    const a = moment().isBefore(moment(endDate));
    return a;
}

export {
    getStatusBarInfo,
    getScrollViewHeight,
    checkAuth,
    newLogin,
    getMobile,
    getToken,
    callGetUserInfo,
    getSelfInfo,
    reload,
    compareDate
};