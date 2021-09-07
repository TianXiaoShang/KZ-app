<template>
  <view class="page-content">
    <home
      ref="homePage"
      v-show="currentTabIndex == 0"
      v-if="activedTabs[0] && !showLoading"
    ></home>
    <activity
      ref="activityPage"
      v-show="currentTabIndex == 1"
      v-if="activedTabs[1] && !showLoading"
    ></activity>
    <activity
      ref="activityPage"
      v-show="currentTabIndex == 2"
      v-if="activedTabs[2] && !showLoading"
    ></activity>
    <myself
      v-show="currentTabIndex == 3"
      v-if="activedTabs[3] && !showLoading"
    ></myself>
    <tab-bar
      :tabBar="tabBar"
      class="tab-bar"
      :currentTabIndex.sync="currentTabIndex"
    ></tab-bar>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
    <van-popup :show="maintain">
      <div class="maitain-content">
        <span> 小程序维护中，客官稍候再来哦~~~ </span>
      </div>
    </van-popup>

    <van-overlay
      v-if="showLoading"
      :show="true"
      custom-style="background: rgba(0,0,0,.2)"
    >
      <view class="wrapper">
        <van-loading type="spinner" class="block" color="#1989fa" />
      </view>
    </van-overlay>
  </view>
</template>

<script>
import TabBar from "@/component/tab-bar";
import Home from "./component/home";
import Activity from "./component/activity";
import Myself from "./component/myself";
import { mapGetters } from "vuex";
export default {
  name: "Index",
  components: {
    TabBar,
    Home,
    Activity,
    Myself,
  },
  computed: {
    ...mapGetters(["maintain"]),
  },
  data() {
    return {
      currentTabIndex: 0,
      activedTabs: [false, false, false, false],
      showLoading: false,
    };
  },
  onLoad(option) {
    this.currentTabIndex = option.index || 0;
  },
  watch: {
    // // 初次进入小程序，在登陆前请求其他接口会报错。
    // ["$store.getters.loginStatus"]: {
    //   handler(val) {
    //     if (val) {
    //       this.showLoading = false;
    //     } else {
    //       this.showLoading = true;
    //     }
    //   },
    //   immediate: true,
    // },
    // 使用v-show及v-if结合模拟动态组件+keep-live的效果
    currentTabIndex: {
      handler(val) {
        this.activedTabs[val] = true;
      },
      immediate: true,
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
/deep/ .van-popup {
  border-radius: 5px;
}
.maitain-content {
  padding: 20px;
  text-align: center;
  color: #444;
  line-height: 2em;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
