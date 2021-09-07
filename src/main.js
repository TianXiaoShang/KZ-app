import Vue from 'vue'
import App from './App'
import store from './store'
import NavBar from "@/component/nav-bar";
import globalMixin from "@/mixin/global-mixin";

Vue.config.productionTip = false;
Vue.prototype.$store = store;
App.mpType = 'app';
Vue.use(globalMixin);

// 全局组件，navbar
Vue.component('NavBar', NavBar)
Vue.prototype.$bus = new Vue()


Vue.filter('date', function(value) {
    if (!value || value == '0') return ''
    value = value.toString()

    function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
    return timestampToTime(value);
})

const app = new Vue({
    store,
    ...App
})
app.$mount()