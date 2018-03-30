<template>
  <div class="myp-cell">
    <div class="myp-cell-icon">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="myp-cell-content" @click="$emit('click')">
      <div class="myp-cell-content-title">{{title}}</div>
      <div class="myp-cell-content-subtitle">{{subtitle}}</div>
      <div class="myp-cell-content-description">{{description}}</div>
      <slot></slot>
    </div>
    <div class="myp-cell-right">
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/base.scss";
.myp-cell {
  width: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  padding: 8*$rem 30*$rem;
  box-sizing: border-box;
  .myp-cell-icon {
    display: flex;
    .icon {
      display: block;
      margin: auto;
    }
  }
  .myp-cell-content {
    flex: 1;
    font-size: pxTorem(24px);
    > div {
      color: #666;
      color: #666;
      font-size: 12px;
      line-height: 20px;
    }
    .myp-cell-content-title {
      font-weight: 600;
      font-size: 14px;
      color: #444;
      line-height: 20px;
    }
    // .myp-cell-content-subtitle,
    // .myp-cell-content-description {

    // }
  }
  .myp-cell-right {
    // min-width: 60px;
    display: flex;
    .right {
      display: block;
      margin: auto;
    }
  }
}
</style>
<script>
export default {
  name: "myp-cell",
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  }
};
</script>
