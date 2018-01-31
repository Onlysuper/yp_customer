<template>
  <picker ref="Picker" v-model="value" :slotsActions="taxActions" @confirm="confirm"></picker>
</template>

<script>
import Picker from "../Picker";
export default {
  components: { Picker },
  data() {
    return {
      value: { name: "11%", code: "0.11" },
      taxActions: [
        { name: "0%", code: "0" },
        { name: "1.5%", code: "0.015" },
        { name: "3%", code: "0.03" },
        { name: "4%", code: "0.04" },
        { name: "5%", code: "0.05" },
        { name: "6%", code: "0.06" },
        { name: "11%", code: "0.11" },
        { name: "13%", code: "0.13" },
        { name: "17%", code: "0.17" }
      ]
    };
  },

  methods: {
    confirm(val) {
      this.$emit("change", {
        name: val.name,
        value: val.code
      });
    },
    open(value) {
      this.$refs.Picker.open();
    }
  }
};
</script>

<style>

</style>
