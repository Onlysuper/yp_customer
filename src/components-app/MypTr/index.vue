<template>
  <tr class="border-1px">
    <td class="td-justify">{{title}}</td>
    <td>：</td>
    <td class="content">
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
@import "../../assets/scss/base.scss";
.td-justify {
  text-align: center;
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  max-width: 45%;
  flex: 1;
  // width: 120*$rem;
  // &:after {
  //      content: "";
  //      display: block;
  //      width: 100%;
  //      height: 0;
  //      overflow: hidden;
  // }
}
.content {
  // width: 200px;
}
</style>
