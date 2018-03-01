<template>
  <div>

    <mt-cell :title="title" class="border-1px"></mt-cell>
    {{modleValue_}}
    <mt-checklist class="myp-chek-list border-1px" title="" v-model="modleValue_" :options="actions">
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
  props: ["modleValue", "actions", "title", "cb"],
  // props: {
  //   title: {
  //     type: String,
  //     default: ""
  //   },
  //   modleValue: {
  //     type: Array,
  //     default: function() {
  //       return [];
  //     }
  //   },
  //   actions: {
  //     type: Array,
  //     default: []
  //   }
  // },
  data() {
    return {
      modleValue_: this.modleValue
    };
  },
  computed: {
    // modleValue_() {
    //   return this.modleValue;
    // }
  },
  watch: {
    modleValue_(value) {
      console.log(11111);
      // this.modleValue_ = ["1"];
      // this.$emit("cb", value);
      this.$emit("result", value);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
