<template>
  <view class="self-wrapper">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <nav-bar :title="'个人中心'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      scroll-y="true"
      class="page-container"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      大法师
    </scroll-view>
  </view>
</template>
<script>
import { navBar } from "@/component/nav-bar";
export default {
  name: "Myself",
  components: [navBar],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
