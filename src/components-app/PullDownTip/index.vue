<template>
  <div class="pull-down-tip">
    <div class="line border-1px"></div>
    <span>没有更多了</span>
    <div class="line border-1px"></div>
  </div>
</template>

<style lang="scss">
.pull-down-tip {
  line-height: 10rem;
  position: relative;
  overflow: hidden;
  padding: 0 5rem;
  display: flex;
  .line {
    height: 5rem;
    flex: 1;
  }
  span {
    // flex: 1;
    display: inline-block;
    //  position: absolute;
    //  top:50%;
    //  left:50%;
    //  transform: translate(-50%,-50%);
    //  background-color:red;
    padding: 0 3rem;
  }
}
</style>

<script>
export default {};
</script>
