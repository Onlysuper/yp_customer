<template>
  <div class="myp-slider-nav" ref="wrapper">
    <ul>
      <li v-for="(item,index) in munes" :key="index" @click="handleClick($event,item)" :class="item.menuCode == $route.meta.menuCode?'active':''">{{item.menuName}}</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "slider-nav",
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
    handleClick(elem, item) {
      this.menuCode = item.menuCode;
      // this.$emit("trigger", item);
      this.scrollItem(elem);
      this.$router.replace({ name: this.menuCode, query: this.$route.query });
    },
    scrollItem(elem) {
      this.meunScroll.scrollToElement(elem.target, 1000, -100, 0)
    },
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.wrapper, {
        // startX: '100px',
        scrollX: true,
        eventPassthrough: 'vertical'      });
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
    this.$nextTick(() => {
      this._initScroll();
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.myp-slider-nav {
  overflow: hidden;
  // overflow-x: auto;
  // overflow-y: hidden;
  // -webkit-overflow-scrolling: touch;
  // padding-bottom: 10px;
  background: #464646;
  display: flex;
  white-space: nowrap;
  ul {
    // display: flex;
    // flex-wrap: nowrap;
    display: inline-block;
  }
  li {
    min-width: 200*$rem;
    // float: left;
    line-height: 80*$rem;
    // margin: 0 20*$rem;
    // width: 180*$rem;
    flex: 1;
    text-align: center;
    border-bottom: 2px solid transparent;
    color: #b7b7b7;
    display: inline-block;
  }
  .active {
    color: $active-color;
    border-bottom: 2px solid $active-color;
  }
}
</style>
