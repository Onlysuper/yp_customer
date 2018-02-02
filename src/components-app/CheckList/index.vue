<template>
  <div>
    <mt-cell :title="title" class="border-1px"></mt-cell>
    <mt-checklist class="myp-chek-list border-1px" title="" v-model="listModle" :options="actions">
    </mt-checklist>
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
  name: "CheckList",
  // props: ["title", "listModle", "actions"],
  props: {
    title: {
      type: String,
      default: ""
    },
    // listModle: {
    //   type: Array,
    //   default: []
    // },
    actions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      listModle: []
    };
  },
  watch: {
    listModle(value) {
      this.$emit("result", value);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
