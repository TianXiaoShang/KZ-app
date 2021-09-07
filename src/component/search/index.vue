<template>
  <view class="uni-form-item uni-column">
    <!-- <input
      class="uni-input"
      confirm-type="search"
      :placeholder="placeholder"
      v-model="value"
      @confirm="confirm"
    />-->
    <van-search
      :value="value"
      @search="confirm"
      @clear="clear"
      :placeholder="placeholder"
    />
  </view>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  data() {
    return {
      value: ""
    };
  },

  methods: {
    confirm(e) {
      this.value = e.detail;
      if (
        this.value !== undefined &&
        this.value !== null
      ) {
        console.log(41)
        this.$emit("search", this.value);
      }
    },
    clear(){
      console.log(4747);
      this.value = '';
      this.$emit("search", this.value);
    }
  }
};
</script>

<style lang='scss' scoped>
.uni-form-item {
  width: 100%;
  box-sizing: border-box;
  .uni-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 14px;
    width: 100%;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(248, 248, 248);
  }
}
// .search-box {
//   & /deep/ .van-search {
//     padding: 0 !important;
//   }
//   & /deep/ .data-v-622843ea {
//     padding: 0 !important;
//   }
// }
</style>
