<template>
  <view>
    <nav-bar :title="'通讯录'" :titlePos="'left'"></nav-bar>
    <scroll-view
      scroll-y="true"
      class="page-container"
      :style="{ height: `calc(${getScrollViewHeight(true, 41)})` }"
    >
      页面1
    </scroll-view>
  </view>
</template>

<script>
import { navBar } from "@/component/nav-bar";
export default {
  name: "Activity",
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
