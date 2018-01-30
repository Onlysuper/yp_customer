<template>
  <div class="cityPicher-container" :value="value" v-show="visible">
    <div class="city-picher" @touchmove.prevent>
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" :showToolbar="true">请选择</mt-picker>
      <div class="okBtn" @touchmove.prevent>
        <mt-button size="large" @click="cityPicherContainer" :disabled="false">确定</mt-button>
      </div>
    </div>
    <div class="city-picher-mask" @touchmove.prevent @click="visible = false"></div>
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/base.scss";
.cityPicher-container {
  .city-picher-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .city-picher {
    // .absoluteCenter();
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 600*$rem;
    height: 270px;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    color: #fff;
    border-radius: 10*$rem;
    border: 1px solid #ccc;
    padding: 20*$rem;
    z-index: 9999;
    /*重写mint-ui标题样式*/
    .picker-toolbar {
      text-align: center;
      line-height: 40px;
      color: #343434;
      font-size: 20px;
    }
    .okBtn {
      margin: 20*$rem 0;
    }
  }
}
</style>

<script>
import json from "./org.json";

export default {
  name: "CityPicher",
  props: {
    resultCallback: {
      type: Function,
      default: function() {
        console.info("请传入回调函数");
      }
    },
    slot1DefaultIndex: {
      type: Number,
      default: 5
    },
    slot2DefaultIndex: {
      type: Number,
      default: 5
    },
    slot3DefaultIndex: {
      type: Number,
      default: 5
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      result: {},
      addressSlots: [
        {
          flex: 1,
          defaultIndex: this.slot1DefaultIndex,
          values: Object.keys(json), // 把省的集合赋给第一个
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          defaultIndex: this.slot2DefaultIndex,
          values: ["市"],
          className: "slot2",
          textAlign: "center"
        },
        {
          flex: 1,
          defaultIndex: this.slot3DefaultIndex,
          values: ["区/县"],
          className: "slot3",
          textAlign: "center"
        }
      ],
      popupVisible: false,
      sheng: "",
      shi: "",
      xian: ""
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
    var _this = this;
    this.$nextTick(function() {
      setTimeout(() => {
        // 初始化
        _this.addressSlots[0].defaultIndex = 0;
        _this.addressSlots[1].defaultIndex = 0;
        _this.addressSlots[2].defaultIndex = 0;
      }, 100);
    });

    // this.$refs.cityPicherMask.ontouchmove = e => {
    //   return false;
    // };
    if (this.value) {
      this.visible = true;
    }
  },
  methods: {
    cityPicherContainer() {
      this.visible = false;
      //最终区县代码
      this.resultCallback({
        resultAddr: `${this.sheng}-${this.shi}-${this.xian}`,
        resultCode: json[this.sheng][this.shi][this.xian]
      });
    },
    onAddressChange(picker, values) {
      this.sheng = values[0];
      this.shi = values[1];
      this.xian = values[2];

      if (this.sheng) {
        picker.setSlotValues(1, Object.keys(json[this.sheng]));
        if (this.shi) {
          json[this.sheng][this.shi] &&
            picker.setSlotValues(2, Object.keys(json[this.sheng][this.shi]));
          if (this.xian) {
          }
        }
      }
    },
    findCity(key) {
      if (!key) return this.result;
      for (var sheng in json) {
        for (var shi in json[sheng]) {
          for (var xian in json[sheng][shi]) {
            if (json[sheng][shi][xian] == key) {
              this.result.resultAddr = `${sheng}-${shi}-${xian}`;
              this.result.resultCode = key;
              return this.result;
            }
          }
        }
      }
      return this.result;
    }
  }
};
</script>
