<template>
  <full-page-popup v-model="visible" transition="popup-fade" title="埋点管理合计">
    <input-wrapper>
      <template v-if="sumData.ptNum > 0">
        <mt-cell :title="'普通商户共操作'+sumData.ptNum+'次,明细如下'"></mt-cell>
        <mt-cell v-for="(pt,index) in sumData.pt" :key="index" :title="pt.actionDesc" :value="pt.amount+'次'"></mt-cell>
      </template>
      <template v-if="sumData.jmNum > 0">
        <mt-cell :title="'静默商户共操作'+sumData.ptNum+'次,明细如下'"></mt-cell>
        <mt-cell v-for="(pt,index) in sumData.jm" :key="index" :title="pt.actionDesc" :value="pt.amount+'次'"></mt-cell>
      </template>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      sumData: {
        ptNum: 0,
        jmNum: 0,
        jm: [],
        pt: []
      }
    };
  },
  methods: {
    open(sumData) {
      console.log(sumData);
      this.sumData = sumData;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
