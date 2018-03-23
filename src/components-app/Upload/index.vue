<template>
  <div class="upload-container" v-if="visible">
    <!-- 主体 -->
    <mt-popup v-model="visible" position="bottom" class="upload-main" :modal="false">
      <full-page>
        <mt-header slot="header" title="拍照示例图">
          <mt-button slot="left" :disabled="false" type="danger" @click="visible=false">取消</mt-button>
        </mt-header>
        <div class="view-waper">
          <div class="view-main">
            <img class="view-demo" :src="demoImg[upType]" alt="">
            <span class="view-info">{{label}}</span>
          </div>
        </div>
        <div slot="tabar" class="view-btn">
          <input type="file" accept="image/*" @change="inputChange" class="input-file">
          <i class="icon-camera icon"></i>
        </div>
      </full-page>
    </mt-popup>
    <!-- 遮罩层 -->
    <div class="mask" @touchmove.prevent @click="visible = false"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.upload-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .upload-main {
    width: 100%;
    height: 80%; // background: red;
    text-align: center;
  }
  .view-waper {
    height: 100%;
    display: flex;
  }
  .view-main {
    padding: 40*$rem;
    margin: auto;
  }
  .view-demo {
    width: 80%;
    display: block;
    margin: 50*$rem auto;
  }
  .view-info {
    display: inline-block;
    margin-top: 50*$rem;
  }
  .view-btn {
    position: relative;
    width: 100*$rem;
    height: 100*$rem;
    margin: 20*$rem auto;
    display: flex;
    clear: both;
    font-size: 10px;
    border-radius: 50%;
    background: #26a2ff;
    .input-file {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .icon {
      margin: auto;
      font-size: 60*$rem;
      color: #fff;
    }
  }
}
</style>

<script>
import lrz from "lrz";
import { Toast, Indicator } from "mint-ui";
let demoImg = {
  //身份证正面
  LEGAL_PERSON_ID_POSITIVE: require("./img/identityFrontImg.png"),
  //身份证反面
  LEGAL_PERSON_ID_BACK: require("./img/identityBackImg.png"),
  //手持正面
  APPLICANT_WITH_ID: require("./img/identityFrontImg.png"),
  //结算卡
  SETTLE_CARD_IMG: require("./img/identityFrontImg.png"),
  //营业执照
  BUSSINESS_LICENSE: require("./img/identityFrontImg.png"),
  //门头照片
  PLACE_IMG: require("./img/identityFrontImg.png"),
  //收银台
  CASH_SPACE_IMG: require("./img/identityFrontImg.png"),
  //开户许可证
  ACCOUNT_OPENING_LICENSE: require("./img/identityFrontImg.png"),
  //店内照片
  STORE_IMG: require("./img/identityFrontImg.png"),
  //授权书
  CERTIFICATE_IMG: require("./img/CERTIFICATE_IMG.png")
};
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "拍摄的照片尽量充满相框，无反光，无水印，清晰可见"
    },
    upType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: true,
      demoImg: demoImg
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.visible = this.value;
  },
  methods: {
    //选择图片
    inputChange(event) {
      event.preventDefault();
      var target = event.target;
      var file = target.files[0];
      if (!/image\/\w+/.test(file.type)) {
        alert("请选择合法的图片");
        return false;
      }
      this.lrzImg(file, event);
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = function () {
      //      var base64 = this.result;
      //      console.log(base64);
      // }
    },
    //压缩图片
    lrzImg(file, event) {
      Indicator.open({
        text: "处理中...",
        spinnerType: "fading-circle"
      });
      lrz(file, { width: 1000 })
        .then(res => {
          let base64 = res.base64;
          Indicator.close();
          this.createImg(base64);
          return base64;
        })
        .catch(function (err) {
          // 处理失败会执行
        })
        .always(function () {
          // 不管是成功失败，都会执行
          event.target.value = null;
        });
    },
    //显示图片
    createImg(base64) {
      this.visible = false;
      this.$emit("upresult", base64);
    }
  }
};
</script>