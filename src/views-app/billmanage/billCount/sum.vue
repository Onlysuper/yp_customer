<template>
  <full-page-popup v-model="visible" transition="popup-fade" title="分润详情">
    <input-wrapper>
      <mt-cell title="扫码次数" :value="sumData.scan+'次'"></mt-cell>
      <mt-cell title="推送次数" :value="sumData.billSuccess+'次'"></mt-cell>
      <mt-cell title="入网商户" :value="sumData.register+'个'"></mt-cell>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      sumData: {}
    };
  },
  methods: {
    open(sumData) {
      this.sumData = sumData;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
