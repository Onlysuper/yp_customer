<template>
  <!-- 图片查看器 -->
  <div ref="fullpate" class="fullpate-img" v-if="fadeViewVisible">
    <div @click.self="hideImageView" class="imgbox">
      <img @click="biggerFn" ref="imgLarge" :class="'img-page-large '+rotateClass+' '+biggeris" :src="imgUrlSelf" :alt="imgUrlSelf">
    </div>
    <div class="largeButgroup">
      <i v-if="retateVisible" title="旋转" @click="rotateFn" class="el-icon-refresh but"></i>
      <i @click="hideImageView" title="关闭" class="el-icon-close but"></i>
    </div>
    <i title="上一张" v-if="retateVisible" @click="preFn" class="el-icon-arrow-left changebut prebut"></i>
    <i title="下一张" v-if="retateVisible" @click="nextFn" class="el-icon-arrow-right changebut nextbut"></i>
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
  // -webkit-user-select: none;
  // -moz-user-select: none;
  // -ms-user-select: none;
  // user-select: none;
  overflow: hidden;
  .but {
    font-size: 24px;
    color: #fff;
    padding-right: 10px;
    cursor: pointer;
    z-index: 9999;
  }
  .changebut {
    font-size: 24px;
    color: #fff;
    text-align: center;
    font-weight: 900;
    background: rgba(0, 193, 255, 0.2);
    padding: 5px;
    cursor: pointer;
    z-index: 9999;
    position: absolute;
    transition: all 0.8ms;
    -webkit-transition: all 0.8ms;
    &:hover {
      background: rgba(0, 193, 255, 0.3);
    }
    &.prebut {
      left: 10px;
      top: 50%;
    }
    &.nextbut {
      right: 10px;
      top: 50%;
    }
  }
  .imgbox {
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      text-align: center;
      vertical-align: middle;
    }
  }
  .shadow-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    vertical-align: middle;
    &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
  }
  img {
    position: relative;
    z-index: 10;
    text-align: center;
    vertical-align: middle;
  }

  .smallImg {
    cursor: zoom-in;
  }
  .bigImg {
    cursor: zoom-out;
  }
  .largeButgroup {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // background: red;
    z-index: 1;
    height: 50px;
    text-align: right;
    z-index: 10001;
    padding-right: 10px;
    padding-top: 10px;
    cursor: pointer;
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
  props: ["fadeViewVisible", "rotateClass", "largeImgUrl", "largeImgArt", "imgsArr", "largeImg"],
  data() {
    return {
      retateVisible: false,
      imgWidth: "",
      imgHeight: "",
      biggeris: 'smallImg',
      nowIndex: 0,
      imgsArrSelf: [],
      imgUrlSelf: "",
    };
  },
  methods: {
    // 上一张
    preFn() {
      if (this.nowIndex > 0) {
        this.nowIndex = this.nowIndex - 1;
      } else {
        this.nowInde = parseInt(this.imgsArrSelf.length) - 1
      }
    },
    // 下一张
    nextFn() {
      if (this.nowIndex < parseInt(this.imgsArrSelf.length)) {
        this.nowIndex = parseInt(this.nowIndex) + 1;
      } else {
        this.nowInde = 0
      }
    },
    hideImageView() {
      this.$emit("hideImageView")
    },
    rotateFn() {
      this.$emit("rotateFn")
    },
    setImgMiddle(type) {
      // console.log(this.nowIndex);
      let index = this.nowIndex;
      let imgsArrSelf = this.imgsArrSelf;
      if (imgsArrSelf[index]) {
        let imgurl_ = imgsArrSelf[index][1].url || "";
        // console.log(imgurl_);
        this.imgUrlSelf = imgurl_;
        //图片宽高
        var newImg = new Image()
        // newImg.src = this.src;
        newImg.src = imgurl_;
        newImg.onerror = () => {    // 图片加载错误时的替换图片
          newImg.src = this.imgUrlSelf
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
                // console.log(1);
                $img.width(img_height + "px");
              } else {
                // console.log(2);
                $img.width(panel_height + "px");
              }
              $img.height("auto")
              $img.css('margin-top', "0px");
            } else {
              if (panel_width < img_height) {
                // console.log(3);
                $img.width(panel_width + "px");
              } else {
                // console.log(4);
                $img.width(img_width + "px");
              }
              $img.height("auto");
            }
          } else {
            if (type == "transfer") {
              if (panel_height < img_height) {
                // console.log(5);
                $img.height(panel_height + "px");
                $img.width("auto");
              } else {
                // console.log(6);
                $img.width(img_height + "px");
                $img.height("auto");
              }

            } else {
              if (panel_height < img_height) {
                // console.log(7);
                $img.height(panel_height);
              } else {
                // console.log(6);
                $img.height(img_height);
              }
              $img.width("auto")
            }
          }
        }
      }

    },
    imgInit() {
      let imgsArrSelf = "";
      let largeImg = this.largeImg;
      let arrSelf = [];
      for (let [index, elem] of this.imgsArr) {
        let obj = {};
        obj.imgname = index;
        obj.url = elem.url;
        obj.id = elem.id;
        arrSelf.push(obj)
      }
      this.imgsArrSelf = Object.entries(arrSelf) // 本页面需要的数组
      imgsArrSelf = this.imgsArrSelf;
      for (let [index, elem] of imgsArrSelf) {
        if (elem.imgname == largeImg.imgname) {
          this.nowIndex = index;
        }
      }
      this.biggeris = "smallImg";
      this.retateVisible = true;
      this.$nextTick(() => {
        if (this.rotateClass == "rotate270" || this.rotateClass == "rotate90") {
          this.setImgMiddle('transfer');
        } else {
          this.setImgMiddle();
        }
      })
    },
    biggerFn() {
      let biggeris = this.biggeris;
      let $img = $(".img-page-large");
      let $imgWidth = $img.width();
      let $imgHeight = $img.height();
      if (biggeris == "smallImg") {
        // 放大
        $img.width($imgWidth * 2);
        $img.height($imgHeight * 2);
        this.biggeris = "bigImg";
        this.retateVisible = false;
      } else if (biggeris == "bigImg") {
        // 缩小
        $img.width($imgWidth / 2);
        $img.height($imgHeight / 2);
        this.biggeris = "smallImg";
        this.retateVisible = true;
      }
    },
    initRotate() {
      let val = this.rotateClass;
      if (val == "rotate270" || val == "rotate90") {
        this.setImgMiddle('transfer');
      } else {
        this.setImgMiddle();
      }
    }
  },
  mounted() {
    this.imgInit();
  },
  created() {

  },
  computed: {

  },
  watch: {
    rotateClass(val) {
      this.initRotate();
    },
    nowIndex() {
      this.$emit("rotateInit")
      this.initRotate();
    },
    fadeViewVisible() {
      this.imgInit();
    }
  }
};
</script>