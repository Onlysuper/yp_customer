<template>
  <tr>
    <td class="td-justify">{{title}}</td>
    <td>：
      <slot></slot>
    </td>
  </tr>
</template>

<script>
export default {
  name: "myp-tr",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.td-justify {
  text-align: center;
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  // &:after {
  //      content: "";
  //      display: block;
  //      width: 100%;
  //      height: 0;
  //      overflow: hidden;
  // }
}
</style>
