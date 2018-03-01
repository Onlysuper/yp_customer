<template>
  <div class="input-wrapper" :class="className">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/base.scss";
.input-wrapper {
  //定义input图片样式
  .mintui-field-success {
    font-size: 40*$rem;
    &::before {
      color: red;
    }
  }

  //强制给input添加下边框
  .mint-cell {
    min-height: 100*$rem;
    background-image: linear-gradient(
      0deg,
      #d9d9d9,
      #d9d9d9 50%,
      transparent 50%
    );
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom;
    .mint-cell-swipe-button {
      line-height: 100*$rem;
    }
  }
  .mint-cell-wrapper {
    font-size: 32*$rem;
    background-image: none;
    .mint-cell-title {
      .mint-cell-label {
        font-size: 32*$rem;
      }
      width: 220*$rem;
    }
    input {
      color: #666;
      opacity: 1;
    }
    // .mint-cell-value {
    // width: 500*$rem;
    // text-align: right;
    // }
  }
}
</style>

<script>
export default {
  name: "InputWrapper",
  props: {
    className: {
      type: String,
      default: ""
    }
  }
};
</script>