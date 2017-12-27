<template>
  <div class="feedback-components border-1px">
    <div class="box">
      <i :class="state?'mintui-checkmark':'mintui-cross'"></i>
      <p class="title">{{state?"审核成功":"审核失败"}}</p>
    </div>
    <p class="timer border-1px">审核时间：{{time}}</p>
    <p class="timer">备注：{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      default: "时间"
    },
    desc: {
      type: String,
      default: "描述信息"
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/base.scss';
.feedback-components {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 40*$rem;
  .box {
    margin: 40*$rem auto;
    text-align: center;
    i {
      font-size: 130*$rem;
      color: @global-background-color;
    }
    .title {
      font-size: 40*$rem;
      font-weight: 600;
      margin: 30*$rem 0;
    }
  }
  .timer {
    font-size: 30*$rem;
    line-height: 80*$rem;
  }
}
</style>
