<template>
  <full-page-popup v-model="visible" position="right" transition="popup-fade" title="商品合计">
    <input-wrapper>
      <mt-cell title="交易金额" :value="utils.accMul(sumData.amountSum,0.01)+'元'"></mt-cell>
      <mt-cell title="交易笔数" :value="sumData.amountCount+'笔'"></mt-cell>
    </input-wrapper>
  </full-page-popup>
</template>

<script>
import utils from "@src/common/utils"
export default {
  data() {
    return {
      visible: false,
      sumData: {}
    };
  },
  methods: {
    open(sumData) {
      let data_ = {}
      data_.amountSum = sumData.amountSum ? sumData.amountSum : 0;
      data_.amountCount = sumData.amountCount ? sumData.amountCount : 0;
      this.sumData = data_;
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
