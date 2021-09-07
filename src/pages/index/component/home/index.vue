<template>
  <view>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <nav-bar :title="'首页'" :titlePos="'left'"></nav-bar>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      scroll-y="true"
      class="page-container"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <div class="content">
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
        首页 <br />
      </div>
    </scroll-view>
  </view>
</template>

<script>
import { navBar } from "@/component/nav-bar";
export default {
  name: "Home",
  components: [navBar],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  background: #f5f5f5;
}
</style>