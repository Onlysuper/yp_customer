<template>
  <div class="loadmore-warpper">
    <mt-loadmore :style="{overflow:true?'hidden':'inherit'}" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :bottom-all-loaded="allLoaded" :auto-fill="false">
      <div :style="{ minHeight: wrapperHeight + 'px' }">
        <slot></slot>
        <pull-down-tip v-if="allLoaded"></pull-down-tip>
      </div>
    </mt-loadmore>
  </div>
</template>
<style lang="scss">
.loadmore-warpper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // .mint-loadmore{
  //     overflow: inherit;
  // }
}
</style>
<script>
import PullDownTip from "@src/containers/PullDownTip";
export default {
  components: {
    PullDownTip
  },
  props: {
    allLoaded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wrapperHeight: ""
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.wrapperHeight = document.querySelector(
          ".loadmore-warpper"
        ).clientHeight;
      }, 0);
    });
  },
  methods: {
    //下拉刷新
    loadTop() {
      this.$emit("loadTop", () => {
        this.$refs.loadmore.onTopLoaded();
      });
    },
    //上拉加载
    loadBottom() {
      this.$emit("loadBottom", () => {
        this.$refs.loadmore.onBottomLoaded();
      });
    }
  }
};
</script>
