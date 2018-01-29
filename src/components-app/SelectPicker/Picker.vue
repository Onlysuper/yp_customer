<template>
  <div class="select-container" :value="value" v-show="visible">
    <div class="select-picher-mask" ref="selectPicherMask" @click="cityPicherContainer">
      <div class="select-picher">
        <mt-picker :slots="slots" valueKey="name" @change="onAddressChange" :visibleItemCount="5" :itemHeight="36" :showToolbar="true">请选择</mt-picker>
        <div class="okBtn">
          <mt-button size="large" :disabled="false" @click="okBtn">确定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import "../../assets/scss/base.scss";
.select-container {
  .picker-toolbar {
    text-align: center;
    line-height: 40px;
    color: #343434;
    font-size: 20px;
  }
}
</style>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
.select-container {
  .select-picher-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    .select-picher {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 650*$rem;
      height: 270px;
      left: 0;
      top: 0;
      background: rgba(255, 255, 255, 0.9);
      color: #fff;
      border-radius: 10*$rem;
      border: 1px solid #ccc;
      padding: 20*$rem;

      .okBtn {
        margin: 20*$rem 0;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    slotsActions: {
      type: Array,
      default: () => {
        return ["选项一", "选项二"];
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    cb: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      result: "",
      slots: [
        {
          flex: 1,
          defaultIndex: 0,
          //当值为对象数组时 [{ name: 1, age: 2 }] 需要在valueKey属性指定key用来显示
          values: this.slotsActions, // 把省的集合赋给第一个
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  },
  created() {},
  mounted() {
    this.$refs.selectPicherMask.ontouchmove = e => {
      return false;
    };
    if (this.value) {
      this.visible = true;
    }
    this.slots[0].defaultIndex = this.defaultIndex;
  },
  methods: {
    cityPicherContainer() {
      this.visible = false;
    },
    onAddressChange(picker, values) {
      this.result = values[0];
    },
    okBtn() {
      this.visible = false;
      this.cb(this.result);
    }
  }
};
</script>


