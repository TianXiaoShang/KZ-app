<script>
import {quietlyLogin, checkLocation, newLogin, getSelfInfo} from '@/util/index';
import request from '@/services/request.service';
import { getToken } from '@/util/storage';
import store from "./store";

export default {
  onLaunch: function() {
    console.log("App Launch");
    // newLogin();
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./styles/common.scss";
@import "./wxcomponents/common/index.wxss";

</style>
