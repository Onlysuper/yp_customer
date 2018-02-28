<template>
  <div>
    <mt-cell :title="title" class="border-1px"></mt-cell>
    <mt-radio class="myp-chek-list border-1px" title="" v-model="checkValue" :options="actions">
    </mt-radio>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/base.scss";
.myp-chek-list {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
  .mint-cell {
    background-image: none;
    background-color: #fcfcfc;
    width: 33.333%;
  }
  .mint-radiolist-label,
  .mint-checklist-label {
    padding: 0;
  }
  .mint-radiolist-title,
  .mint-checklist-title {
    margin: 0;
  }
  .mint-cell-wrapper {
    padding: 5px;
  }
}
</style>

<script>
export default {
  name: "Radio",
  props: {
    title: {
      type: String,
      default: ""
    },
    modleValue: {
      type: String,
      default: ""
    },
    actions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      checkValue: this.modleValue
    };
  },
  computed: {},
  watch: {
    checkValue(value) {
      this.$emit("result", value);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
