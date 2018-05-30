<template>
  <full-page-popup v-model="visible" position="bottom" title="分润详情">
    <input-wrapper>
      <mt-cell title="商户" :value="sumData.customerSum+'个'"></mt-cell>
      <mt-cell title="返利" :value="sumData.subsidySum+'元'"></mt-cell>
      <mt-cell v-if="this.$store.state.userInfoAndMenu.branchOffice" title="中间人" :value="sumData.rebateSum+'元'"></mt-cell>
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
  computed: {
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
