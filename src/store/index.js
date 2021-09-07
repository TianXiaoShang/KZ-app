import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/services/request.service';
import { setToken, clearToken } from '@/util/storage';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loginStatus: false, // 获取登陆状态
        token: null,
        userInfo: {}, // 储存来自weixin授权的用户信息（头像信息等）
        maintain: false, // 是否维护中
    },
    getters: {
        loginStatus: state => state.loginStatus,
        userInfo: state => state.userInfo,
        token: state => state.token,
        maintain: state => state.maintain,
    },
    mutations: {
        // 登陆，更新状态
        LOGIN(state, value) {
            state.loginStatus = value.status;
            state.token = value.token;
            setToken(value.token);
        },
        // 登出
        LOGOUT(state) {
            state.loginStatus = false;
            state.token = null;
            clearToken();
        },
        // 刷新token
        REFRESH_TOKEN(state, value) {
            state.token = value.token;
            setToken(value.token);
        },
        UPDATE_USERINFO(state, value) {
            state.userInfo = value;
        },
    },
    actions: {
        saveOrUpdateUserInfo({ commit }, data) {
            // // 保存 或 更新 数据库的用户头像跟昵称
            // const { avatarUrl, nickName } = data;
            // request('member.update', { avatarUrl, nickName })
            //     // 无论接口成功与否都储存至store中供前端展示
            // commit('SAVE_USERINFO', data)
        },
    }
})

export default store;