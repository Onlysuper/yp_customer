<template>
  <!-- 图片查看器 -->
  <div class="fullpate-img" v-if="fadeViewVisible">
    <img :class="'img-large '+rotateClass" :src="largeImgUrl" :alt="largeImgArt">
    <div class="largeButgroup">
      <el-button @click="rotateFn" type="primary">转</el-button>
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
    max-width: 100%;
    max-height: 100%;
    min-height: 70%;
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
  props: ["fadeViewVisible", "rotateClass", "largeImgUrl", "largeImgArt",],
  data() {
    return {

    };
  },
  computed: {

  },

  methods: {
    hideImageView() {
      this.$emit("hideImageView")
    },
    rotateFn() {
      this.$emit("rotateFn")
    }
  },
  mounted() {
  }
};
</script>