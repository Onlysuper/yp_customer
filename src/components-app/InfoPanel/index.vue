<template>
    <div class="info-panel">
        <div class="info-panel-header">{{title}}</div>
        <ul>
            <li v-for="(i,index) in infoList" :key="index">
                <span class="label">{{i.label}}</span>
                <span class="value" v-if="i.value !=='0.00'" v-to-num>{{i.value}}</span>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<style lang="scss">
.info-panel {
  padding-bottom: 10px;
  .info-panel-header {
    padding: 10px 0 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #333;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      font-size: 14px;
      padding: 5px 0 5px 10px;
      .label {
        color: #666;
      }
      .value {
        padding-left: 5px;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    title: "",
    infoList: {
      type: Array,
      default: [
        {
          label: "",
          value: ""
        }
      ]
    }
  }
};
</script>
