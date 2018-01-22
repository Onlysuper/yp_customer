<template>
  <div class="myp-slider-nav">
    <ul>
      <li v-for="(item,index) in munes" :key="index" @click="handleClick(item)" :class="item.menuCode == $route.name?'active':''">{{item.menuName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    munes: {
      type: Array,
      default: []
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      menuCode: ""
    };
  },
  methods: {
    handleClick(item) {
      this.menuCode = item.menuCode;
      // this.$emit("trigger", item);

      this.$router.replace({ name: this.menuCode, query: this.$route.query });
    }
  },
  watch: {
    value(val) {
      this.menuCode = val;
    },
    menuCode(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.menuCode = this.value;
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.myp-slider-nav {
  overflow-x: auto;
  overflow-y: hidden;
  // -webkit-overflow-scrolling: touch;
  // padding-bottom: 10px;
  background: #464646;
  ul {
    display: flex;
  }
  li {
    float: left;
    line-height: 80*$rem;
    // margin: 0 20*$rem;
    // width: 180*$rem;
    flex: 1;
    text-align: center;
    border-bottom: 2px solid transparent;
    color: #b7b7b7;
  }
  .active {
    color: $active-color;
    border-bottom: 2px solid $active-color;
  }
}
</style>
