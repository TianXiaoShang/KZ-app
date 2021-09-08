<template>
  <div class="tab-bar-wrap">
    <ul class="tabs">
      <li
        class="tab-items"
        @click="toggleTab(item, i)"
        v-for="(item, i) in tabBar"
        :key="i"
      >
        <van-icon v-show="currentTabIndex !== i" :name="item.unsicon" size="28px" alt />
        <van-icon v-show="currentTabIndex === i" :name="item.selecticon" color="#f40" size="28px" alt />
        <span :class="{ 'active-tab': currentTabIndex === i }">{{
          item.title
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import tab1 from '@/static/image/tab1.png';
import tab2 from '@/static/image/tab2.png';
import tab3 from '@/static/image/tab3.png';
import tab4Active from '@/static/image/tab4-active.png';
export default {
  name: "TabBar",
  data() {
    return {
      tabBar: [
        { unsicon: 'wap-home-o', selecticon: 'wap-home', title: '首页'},
        { unsicon: 'fire-o', selecticon:'fire', title: '通讯录'},
        { unsicon: 'fire-o', selecticon:'fire', title: '实习圈'},
        { unsicon: 'manager-o', selecticon:'manager', title: '我的'},
      ],
    };
  },
  props: {
    currentTabIndex: {
      type: Number,
    },
  },
  methods: {
    toggleTab(item, i) {
      uni.setNavigationBarTitle({
        title:item.title
      })
      this.$emit("update:currentTabIndex", i);
    },
  },
};
</script>

<style lang='scss' scoped>
.tab-bar-wrap {
  background: white;
  box-sizing: border-box;
  width: 100%;
  border-top: 1rpx solid #ddd;
  height: 100%;
  .active-tab {
    color: rgb(215, 26, 12);
  }
  .tabs {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab-items {
      width: 150rpx;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 26px;
        height: 26px;
      }
      span {
        font-size: 28rpx;
        margin-top: 8rpx;
      }
    }
  }
}
</style>
