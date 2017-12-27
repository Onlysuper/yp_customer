<template>
  <div class="myp-popup-actions" v-show="visible" @click="visible = false">
    <ul class="actions">
      <li v-for="(item,index) in actions" :key="index" @click="item.method(item)">
        <i :class="item.icon"></i>
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    actions: {
      type: Array,
      default: []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.myp-popup-actions {
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  font-size: 35*$rem;
  .actions {
    position: absolute;
    background-color: #000;
    right: 5px;
    top: 2px;
    border-radius: 2px;
    // padding: 5*$rem 40*$rem;
    width: 300*$rem;
    text-align: left;
    padding-left: 35*$rem;
    box-sizing: border-box;
    color: #e0e0e0;
    animation: moveY 0.1s linear both;
    li {
      line-height: 100*$rem;
    }
    li:active {
      background-color: rgb(49, 49, 49);
    }
  }
}
@keyframes moveY {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
