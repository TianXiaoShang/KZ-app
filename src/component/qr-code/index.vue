<template>
  <div class="qrcode-content">
      <tki-qrcode class="tki" unit='px' :val="value" :size="size" ref="qrcode"></tki-qrcode>
      <div v-if="showNumber" class='number'>{{value}}</div>
  </div>
</template>

<script>
import tkiQrcode from "tki-qrcode"
export default {
  name: "QrCode",
  data() {
    return { };
  },
  props: {
    value:{
      default: '',
      type: String | Number
    },
    showNumber:{
      type: Boolean,
      default: true,
    },
    size:{
      type: Number,
      default: 150,
    }
  },
  components: {
      tkiQrcode
  },
  mounted(){
    console.log(this.value, 33)
    this.$refs.qrcode._makeCode();
    // 清空二维码方法。
    // this.$refs.qrcode._clearCode();
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.number{
  text-align: center;
  line-height:2em;
}
</style>
