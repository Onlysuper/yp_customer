<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
//税率
let taxJson = {
  "0%": "0",
  "1.5%": "0.015",
  "3%": "0.03",
  "4%": "0.04",
  "5%": "0.05",
  "6%": "0.06",
  "11%": "0.11",
  "13%": "0.13",
  "17%": "0.17"
};
import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      visible: false,
      taxActions: Object.keys(taxJson)
    };
  },
  methods: {
    taxSelectCallBack(result) {
      this.$emit("change", {
        name: result,
        value: taxJson[result]
      });
    },
    open() {
      this.visible = true;
    }
  }
};
</script>

<style>

</style>
