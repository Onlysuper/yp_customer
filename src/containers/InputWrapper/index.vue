<template>
     <div class="input-wrapper" :class="className">
          <slot></slot>
     </div>
</template>

<style lang="less">
@import url(../../assets/less/base.less);
.input-wrapper {
  //定义input图片样式
  .mintui-field-success {
    font-size: 40/@rem;
    &::before {
      color: @global-background-color;
    }
  }

  //强制给input添加下边框
  .mint-cell {
    min-height: @input-height;
    .border-1px();
  }
    //去掉最后一个input下边框
  &>.mint-field:last-child {
//     background-image: none;
  }
  .mint-cell-wrapper {
    font-size: @input-font-size;
    background-image: none;
    .mint-cell-title {
      width: 220/@rem;
      // margin-right: 30/@rem;
      // text-align: justify;
      // text-align-last: justify;
      // -moz-text-align-last: justify;
      // position: relative;
      // &:after {
      //      content: "";
      //      display: block;
      //      width: 100%;
      //      height: 0;
      //      overflow: hidden;
      // }
    }
    input {
      color: @input-color;
      opacity: 1;
    }
  }
}
</style>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    }
  }
};
</script>