<template>
  <full-page-popup v-model="visible" transition="popup-fade" title="分润详情">
    <input-wrapper>
      <mt-cell title="达标商户数量" :value="sumData.customerNumber+'个'"></mt-cell>
      <mt-cell title="结算金额" :value="sumData.settlePrice+'元'"></mt-cell>
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
