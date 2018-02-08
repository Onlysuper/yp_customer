<template>
  <div class="myp-popup-container" v-if="visible">
    <!-- 主体 -->
    <mt-popup v-model="visible" position="bottom" class="myp-popup" :modal="false">
      <slot></slot>
    </mt-popup>
    <!-- 遮罩层 -->
    <div class="mask" @touchmove.prevent @click="visible = false"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.myp-popup-container {
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
  .myp-popup {
    width: 100%;
    min-height: 300px;
    // height: 300px;
    background: rgba(255, 255, 255, 1);
  }
}
</style>

<script>
export default {
  name: "myp-popup",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
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
  methods: {}
};
</script>