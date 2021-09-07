import { VantComponent } from "../common/component";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import { GRAY, RED } from "../common/color";
import { toPromise } from "../common/utils";
VantComponent({
  mixins: [button, openType],
  props: {
    show: {
      type: Boolean,
      observer(show) {
        !show && this.stopLoading();
      },
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: "default",
    },
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    beforeClose: null,
    overlayStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2000,
    },
    confirmButtonText: {
      type: String,
      value: "确认",
    },
    cancelButtonText: {
      type: String,
      value: "取消",
    },
    confirmButtonColor: {
      type: String,
      value: RED,
    },
    cancelButtonColor: {
      type: String,
      value: GRAY,
    },
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    overlay: {
      type: Boolean,
      value: true,
    },
    transition: {
      type: String,
      value: "scale",
    },
  },
  data: {
    loading: {
      confirm: false,
      cancel: false,
    },
    callback: () => {},
  },
  methods: {
    //拦截getUserInfo,传递到方法调用的promise中，便于直接使用方法做登录回调，而不用监听组件dom事件
    myBindGetUserInfo(e) {
      // 通过callback返回，使之执行promise回调
      const { callback } = this.data;
      if (callback) {
        callback("getUserInfo", e);
      }
      this.bindGetUserInfo(e);
    },
    // 拦截getPhoneNumber
    myBindGetPhoneNumber(e) {
      const { callback } = this.data;
      if (callback) {
        callback("getPhoneNumber", e);
      }
      this.bindGetPhoneNumber(e);
    },
    // 拦截openSetting
    myBindOpenSetting() {
      const { callback } = this.data;
      if (callback) {
        callback("openSetting", e);
      }
      this.bindOpenSetting(e);
    },
    onConfirm() {
      // 如果获取用户授权则不走confirm回调，用myBindGetUserInfo代替
      if (
        this.data.confirmButtonOpenType !== "getUserInfo" &&
        this.data.confirmButtonOpenType !== "getPhoneNumber" &&
        this.data.confirmButtonOpenType !== "openSetting"
      ) {
        // 如果是获取用户首选（新api）则要在组件内完成授权唤起操作
        if(this.data.confirmButtonOpenType === 'getUserProfile'){
          this.handleAction("getUserProfile");
        }else{
          this.handleAction("confirm");
        }
      } else {
        // 如果是getuserInfo需要手动关闭弹窗
        this.setData({ show: false });
      }
    },
    onCancel() {
      this.handleAction("cancel");
    },
    onClickOverlay() {
      this.close("overlay");
    },
    close(action) {
      this.setData({ show: false });
      wx.nextTick(() => {
        this.$emit("close", action);
        const { callback } = this.data;
        if (callback) {
          callback(action, this);
        }
      });
    },
    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false,
        },
      });
    },
    handleAction(action) {
      this.$emit(action, { dialog: this });
      const { asyncClose, beforeClose } = this.data;
      if (!asyncClose && !beforeClose) {
        this.close(action);
        return;
      }
      this.setData({
        [`loading.${action}`]: true,
      });
      if (beforeClose) {
        toPromise(beforeClose(action)).then((value) => {
          if (value) {
            this.close(action);
          } else {
            this.stopLoading();
          }
        });
      }
    },
  },
});
