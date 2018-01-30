<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
//免税类型
let taxTypeJson = {
  正常税率: "0",
  出口免税和其他免税优惠政策: "1",
  不征增值税: "2",
  普通零税率: "3"
};
import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      visible: false,
      taxActions: Object.keys(taxTypeJson)
    };
  },
  methods: {
    taxSelectCallBack(result) {
      this.$emit("change", {
        name: result,
        value: taxTypeJson[result]
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
