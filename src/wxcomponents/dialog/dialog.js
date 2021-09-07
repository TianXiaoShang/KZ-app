let queue = [];
const defaultOptions = {
  show: false,
  title: '',
  width: null,
  theme: 'default',
  message: '',
  zIndex: 100,
  overlay: true,
  selector: '#van-dialog',
  className: '',
  asyncClose: false,
  beforeClose: null,
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: '',
};
let currentOptions = Object.assign({}, defaultOptions);
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
const Dialog = (options) => {
  options = Object.assign(Object.assign({}, currentOptions), options);
  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (dialog) {
      dialog.setData(
        Object.assign(
          {
            callback: (action, instance) => {
              // 拦截getUserInfo，使之能够在promise.then中拿到userInfo
              if(action === 'getUserInfo' || action === 'getPhoneNumber' || action === 'openSetting'){
                resolve(instance);
                return;
              }else{
                // 支持微信新api-getUserProfile要在组件内直接完成授权唤起操作，不能间接唤起
                if(action === 'getUserProfile'){
                  wx.getUserProfile({
                    desc: "用于完善个人资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                    success: (res) => {
                      resolve(res);
                    },
                    fail: (err) => {
                      reject(err);
                    },
                  });
                }else{
                  action === 'confirm' ? resolve(instance) : reject(instance);
                }
              }
            },
          },
          options
        )
      );
      wx.nextTick(() => {
        dialog.setData({ show: true });
      });
      queue.push(dialog);
    } else {
      console.warn(
        '未找到 van-dialog 节点，请确认 selector 及 context 是否正确'
      );
    }
  });
};
Dialog.alert = (options) => Dialog(options);
Dialog.confirm = (options) =>
  Dialog(Object.assign({ showCancelButton: true }, options));
Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};
Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};
Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;
Dialog.setDefaultOptions = (options) => {
  currentOptions = Object.assign(Object.assign({}, currentOptions), options);
  Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions = () => {
  currentOptions = Object.assign({}, defaultOptions);
  Dialog.currentOptions = currentOptions;
};
Dialog.resetDefaultOptions();
export default Dialog;
