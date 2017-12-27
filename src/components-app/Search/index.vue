<template>
    <div class="search-box border-1px">
        <div class="search-input" @click="showSearchPanel">
            <i class="icon mintui-search"></i>
            <input placeholder="请输入相关信息查找" :readonly="true" />
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<style lang="scss">
@import '../../assets/scss/base.scss';
.search-box {
  display: flex;
  padding: 5px;
  background: #fff;
  min-height: 30px;
  .search-input {
    flex: 1;
    display: flex;
    align-items: center;
    input {
      padding-left: 10px;
    }
    .icon {
      font-size: 14px;
      color: #ccc;
      margin-left: 10px;
    }
  }
  .right {
  }
}
</style>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      selected: this.$route.path
    };
  },
  watch: {
    selected(value) {
      this.toUrl(value);
    }
  },
  mounted() {},
  methods: {
    showSearchPanel() {
      this.$emit("result");
    }
  }
};
</script>