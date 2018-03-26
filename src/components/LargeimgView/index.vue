<template>
  <!-- 图片查看器 -->
  <div ref="fullpate" class="fullpate-img" v-if="fadeViewVisible">
    <img ref="imgLarge" :class="'img-page-large '+rotateClass" :src="largeImgUrl" :alt="largeImgArt">
    <div class="largeButgroup">
      <i title="旋转" @click="rotateFn" class="el-icon-refresh but"></i>
      <!-- <el-button @click="rotateFn" type="primary">转</el-button> -->
    </div>
    <div class="shadow-box" @click="hideImageView"></div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.fullpate-img {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  top: 0;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .shadow-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  img {
    position: relative;
    z-index: 10;
    // max-width: 100%;
    // max-height: 100%;
    // min-height: 70%;
    text-align: center;
    vertical-align: middle;
  }
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }
  .largeButgroup {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // background: red;
    z-index: 1;
    height: 50px;
    text-align: right;
    z-index: 999;
    padding-right: 50px;
    cursor: pointer;
    .but {
      font-size: 24px;
      color: #fff;
    }
  }
  .rotate90 {
    transform: rotate(90deg);
  }
  .rotate180 {
    transform: rotate(180deg);
  }
  .rotate270 {
    transform: rotate(270deg);
  }
  .rotate0 {
    transform: rotate(0deg);
  }
}
</style>
<script>
export default {
  components: {},
  props: ["fadeViewVisible", "rotateClass", "largeImgUrl", "largeImgArt"],
  data() {
    return {
      imgWidth: "",
      imgHeight: "",
    };
  },
  methods: {
    hideImageView() {
      this.$emit("hideImageView")
    },
    rotateFn() {
      this.$emit("rotateFn")
    },
    setImgMiddle(type) {
      //图片宽高
      var newImg = new Image()
      newImg.src = this.src
      newImg.onerror = () => {    // 图片加载错误时的替换图片
        newImg.src = this.largeImgUrl
      }
      newImg.onload = () => {
        let img_width = newImg.width;
        let img_height = newImg.height;
        //图片容器宽高
        let panel_width = $(".fullpate-img").width();
        let panel_height = $(".fullpate-img").height();
        let $img = $(".img-page-large");
        if (panel_width / panel_height < img_width / img_height) {
          if (type == "transfer") {

            if (panel_width < img_width) {
              console.log(1);
              $img.width(img_height + "px");
            } else {
              console.log(2);
              $img.width(panel_height + "px");
            }
            $img.height("auto")
            $img.css('margin-top', "0px");
          } else {
            if (panel_width < img_height) {
              console.log(3);
              $img.width(panel_width + "px");
            } else {
              console.log(4);
              $img.width(img_width + "px");
            }
            $img.height("auto");
          }
        } else {
          if (type == "transfer") {
            if (panel_height < img_height) {
              console.log(5);
              $img.height(panel_height + "px");
              $img.width("auto");
            } else {
              console.log(6);
              $img.width(img_height + "px");
              $img.height("auto");
            }

          } else {
            if (panel_height < img_height) {
              console.log(7);
              $img.height(panel_height);
            } else {
              console.log(6);
              $img.height(img_height);
            }
            $img.width("auto")
          }
        }
      }


    },
    imgInit() {
      console.log(this.rotateClass);
      this.$nextTick(() => {
        if (this.rotateClass == "rotate270" || this.rotateClass == "rotate90") {
          this.setImgMiddle('transfer');
        } else {
          this.setImgMiddle();
        }
      })

    }
  },
  mounted() {
    this.imgInit();
  },
  created() {
    console.log(1111);
  },
  computed: {
  },
  watch: {
    rotateClass(val) {
      if (val == "rotate270" || val == "rotate90") {
        this.setImgMiddle('transfer');
      } else {
        this.setImgMiddle();
      }
    }
  },
  fadeViewVisible() {
    console.log(1222222);
    this.imgInit();
  }
};
</script>