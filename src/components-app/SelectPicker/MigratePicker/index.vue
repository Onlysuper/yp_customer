<template>
  <picker v-model="visible" :slotsActions="taxActions" :cb="taxSelectCallBack"></picker>
</template>

<script>
//税率
let taxJson = {
  授权码序列号: "OUT_ORDER",
  授权码号段转移: "ORDER"
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
