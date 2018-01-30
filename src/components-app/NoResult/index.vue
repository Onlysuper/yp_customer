<template>
    <div class="no-result">
        <div class="image">
            <img :src="require('../../assets/images/no-result.png')">
            <p>没有找到符合条件的记录</p>
        </div>
        <div class="blank"></div>
    </div>
</template>
<style lang="scss">
@import '../../assets/scss/base.scss';
.no-result {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .image {
    background: #fff;
    img {
      width: 80%;
      margin: 50*$rem 10% 50*$rem 10%;
    }
    p {
      text-align: center;
      color: #666;
      font-size: 14px;
    }
  }
  .blank {
    flex: 1;
    background: #fff;
  }
}
</style>
<script>
export default {
  props: {},
  methods: {}
};
</script>