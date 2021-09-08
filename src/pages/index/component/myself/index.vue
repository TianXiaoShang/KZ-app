<template>
  <view class="self-wrapper">
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <nav-bar
      :title="'个人中心'"
      :backgroundColor="'transparent'"
      :titlePos="'left'"
    ></nav-bar>
    <div class="bg-wrap">
      <img src="@/static/image/个人中心背景.png" alt="" />
    </div>
    <scroll-view
      :refresher-enabled="false"
      :refresher-triggered="triggered"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      scroll-y="true"
      class="page-container"
      :style="{ height: `calc(${getScrollViewHeight()})` }"
    >
      <!-- 撑开顶部，这里不好用padding和margin -->
      <div class="temp"></div>
      <div class="self-main-wrap">
        <div class="info-card">
          <div class="cover">
            <img src="@/static/image/工具icon1-我的粉丝.png" alt="" />
          </div>
          <div class="info">
            <div class="name">王小帅</div>
            <div class="school">湖南心莱信息科技学校</div>
          </div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="common-cell-wrap">
          <van-cell-group class="common-cell-group" :border="false">
            <van-cell is-link class="common-cell" title="换绑手机" value="185****8727">
              <img src="@/static/image/shouji.png" slot="icon" alt="" class="common-img-icon">
            </van-cell>
            <van-cell is-link class="common-cell" :border="false" title="我的消息">
              <img src="@/static/image/xiaoxi.png" slot="icon" alt="" class="common-img-icon">
            </van-cell>
          </van-cell-group>
          <div class="common-divider"></div>
          <van-cell-group class="common-cell-group" :border="false">
            <van-cell is-link class="common-cell" title="意见反馈">
              <img src="@/static/image/yijian.png" slot="icon" alt="" class="common-img-icon">
            </van-cell>
            <van-cell is-link class="common-cell" :border="false" title="联系小微">
              <img src="@/static/image/lianxi.png" slot="icon" alt="" class="common-img-icon">
            </van-cell>
            <van-cell is-link class="common-cell" :border="false" title="关于微实习">
              <img src="@/static/image/guanyu.png" slot="icon" alt="" class="common-img-icon">
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </scroll-view>
  </view>
</template>
<script>
import { navBar } from "@/component/nav-bar";
export default {
  name: "Myself",
  components: { navBar },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.self-wrapper {
  position: relative;
  .bg-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 424rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .page-container {
    box-sizing: border-box;
    .temp {
      height: 240rpx;
    }
    .self-main-wrap {
      border-radius: 16px 16px 0 0;
      background: #fff;
      .info-card {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 12px 20px;
        position: relative;
        .cover {
          width: 86px;
          height: 86px;
          background: white;
          border-radius: 100%;
          overflow: hidden;
          border: 2px solid white;
          margin-top: -40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info {
          margin-left: 10px;
          .name {
            font-weight: 600;
          }
          .school {
            font-size: 12px;
            color: #999999;
            margin-top: 5px;
          }
        }
        .right {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
