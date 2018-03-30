<template>
  <div class="myp-cell-pannel">
    <div class="header border-bottom-1px">
      <div class="title-body">
        <span class="title">{{title}}</span>
        <div class="btn">
          <slot name="btn"></slot>
        </div>
      </div>

      <!-- primary, error, success, warning -->
      <slot name="badge"></slot>

    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myp-cell-pannel",
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


<style lang="scss">
@import "../../assets/scss/base.scss";

.myp-cell-pannel {
  .mint-badge.is-size-small {
    border-radius: 6*$rem;
    font-size: 20*$rem;
    padding: 5*$rem 15*$rem;
    display: initial;
    margin-right: 10*$rem;
  }
}
</style>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";

.myp-cell-pannel {
  background: #fff;
  padding-top: 15*$rem;
  box-sizing: border-box;

  .header {
    line-height: 60*$rem;
    padding: 15*$rem 30*$rem;
    font-size: 34*$rem;
    color: #000;
  }
  .title-body {
    display: flex;
  }
  .title {
    font-size: pxTorem(28px);
    width: 600*$rem;
  }
  .btn {
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }
}
</style>