<template>
  <mt-popup v-model="visible" position="right" class="full-page-popup" :modal="false">
    <full-page>
      <mt-header slot="header" :title="title" class="re-mint-header">
        <mt-button slot="left" :disabled="false" type="danger" @click="visible=false">关闭</mt-button>
      </mt-header>
      <slot></slot>
      <template slot="tabar">
        <slot name="tabar"></slot>
      </template>
    </full-page>
  </mt-popup>
</template>

<style lang="less">
.full-page-popup {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}
</style>

<script>
export default {
  name: "full-page-popup",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      window.isPopup = val; //给window植入一个标识，供返回键关闭popup
      this.$emit("input", val);
    }
  },
  created() {
    this.visible = this.value;
    //这里监听返回键 在window.isPopup为true的时候触发
    PubSub.subscribe("backbutton", () => {
      this.visible = false;
    });
  }
};
</script>