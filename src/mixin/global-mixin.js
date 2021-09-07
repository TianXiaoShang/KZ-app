import { getScrollViewHeight, checkAuth } from "@/util/index.js";
import request from "@/services/request.service";
import Toast from "@/wxcomponents/toast/toast";
import Dialog from "@/wxcomponents/dialog/dialog";
import { mapGetters } from "vuex";


export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    getScrollViewHeight,
                    checkAuth,
                    request,
                    triggered: true,
                    currentPage: 1,
                    pageSize: 20,
                    loadDataLoading: false,
                    toast: Toast,
                    dialog: Dialog,
                };
            },
            computed: {
                ...mapGetters(["userInfo"]),
            },
            methods: {
                goHome(delay = 800) {
                    setTimeout(() => {
                        uni.reLaunch({ url: "/pages/index/index" });
                    }, delay);
                },
                onRestore() {
                    this.triggered = true; // 需要重置
                },
                onScrolltolower() {
                    if (this.loadDataLoading) {
                        return;
                    }
                    console.log("onScrolltolower");
                    this.loadDataLoading = true;
                    this.currentPage++;
                },
            },
        })
    }
};