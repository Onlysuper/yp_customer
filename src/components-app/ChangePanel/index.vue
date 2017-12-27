<template>
  <div class="change-panel">
    <div class="public panel-header border-1px">
      <i></i>
      <span>{{title}}</span>
    </div>
    <div class="public panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/scss/base.scss';
.change-panel {
  .public {
    padding: 15*$rem 40*$rem;
    box-sizing: border-box;
    background-color: #fff;
  }
  .panel-header {
    font-size: 30*$rem;
    position: relative;
    box-sizing: border-box;
    display: flex;
    i {
      background: red;
      width: 3px;
      margin-right: 10*$rem;
    }
    span {
      flex: 1;
    }
  }
  .panel-body {
    font-size: 26*$rem;
    .panel-body-row {
      line-height: 50*$rem;
    }
  }
}
</style>
