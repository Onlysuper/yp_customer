<template>
  <full-page class="page">
    <mt-header slot="header" :title="title+'查询'" class="re-mint-header">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" size="small" type="danger" @click="queryResult">查询</mt-button>
    </mt-header>
    <div class="search-page" @touchmove.prevent>
      <view-radius>
        <input-wrapper>
          <component class="border-bottom-1px" ref="configDate" :is="item.type" :config="item" v-for="(item,index) in config" @openPicker="openPicker" @showDate="showDate" :key="index"></component>
        </input-wrapper>
      </view-radius>
    </div>
    <mt-datetime-picker v-model="currentDate" type="date" @confirm="setDate" ref="datePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
    <!-- <div class="myp-picker-mask page" v-show="pickerVisible" @click="pickerVisible = !pickerVisible">
      <mt-picker class="myp-picker" valueKey="name" :showToolbar="false" :slots="slots" @change="pickerValuesChange">请选择</mt-picker>
    </div> -->
  </full-page>

</template>

<script>
import Vue from "vue";
import utils from "@src/common/utils";
const MypText = Vue.extend({
  name: "myp-text",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  template: `<mt-field v-model="value"  class="" :label="config.title" :placeholder="'请输入'+config.title" ref="inputBox"></mt-field>`
});
const MypDate = Vue.extend({
  name: "myp-date",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  methods: {
    showDate($this) {
      this.$emit("showDate", this);
    }
  },
  template: `<mt-field @click.native="showDate(this)" :label="config.title" v-readonly-ios :disableClear="true" :readonly="true" :placeholder="'请输入'+config.title" v-model="value"></mt-field>`
});
const MypChekList = Vue.extend({
  name: "myp-chek-list",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: []
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  template: `<div><mt-cell :title="config.title" class="border-1px"></mt-cell><mt-checklist class="myp-chek-list border-1px" v-model="value" :options="config.options"></mt-checklist></div>`
});
const MypRadioList = Vue.extend({
  name: "myp-radio-list",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: this.config.defaultValue
    };
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  template: `<div><mt-cell v-if="config.title" :title="config.title" class="border-1px"></mt-cell><mt-radio class="myp-radio border-1px" v-model="value" :options="config.options"></mt-radio></div>`
});

import Picker from "../SelectPicker/Picker";
const MypSelect = Vue.extend({
  components: { Picker },
  name: "myp-select",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      value: "",
      defaultIndex: 0,
      pickerVisible: false
    };
  },
  created() {
    console.log(this.config.defaultValue);
    this.config.values.forEach((element, index) => {
      if (element.code == this.config.defaultValue) {
        this.value = element;
        this.defaultIndex = index;
      }
    });
  },
  mounted() {
    // this.config.cb(this.config.defaultValue);
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val.code);
    }
  },
  methods: {
    cb(value) {
      this.value = value;
    },
    openPicker() {
      this.pickerVisible = true;
    }
  },
  template: `
    <div>
    <mt-field @click.native="openPicker" :label="config.title" v-readonly-ios :disableClear="true" :readonly="true" :placeholder="'请选择'+config.title" v-model="value.name">></mt-field>
    <picker v-model="pickerVisible" :slotsActions="config.values" :defaultIndex="defaultIndex" :cb="cb"></picker>
    </div>`
});

// const MypSelect = Vue.extend({
//   name: "myp-select",
//   props: {
//     config: {
//       type: Object,
//       default: {}
//     }
//   },
//   data() {
//     return {
//       value: "",
//       defaultIndex: 0,
//       slots: [],
//       pickerVisible: false
//     };
//   },
//   created() {
//     this.config.values.find((item, index) => {
//       if (item.code == this.config.defaultValue) {
//         this.value = item;
//         this.defaultIndex = index;
//       }
//     });
//   },
//   mounted() {
//     // this.config.cb(this.config.defaultValue);
//   },
//   watch: {
//     value(val) {
//       this.config.cb && this.config.cb(val.code);
//     }
//   },
//   methods: {
//     pickerValuesChange(picker, values) {
//       if (values.length) this.value = values[0];
//     },
//     openPicker() {
//       this.pickerVisible = true;

//       this.slots = [
//         {
//           flex: 1,
//           values: this.config.values,
//           defaultIndex: this.defaultIndex,
//           className: "slot1",
//           textAlign: "center"
//         }
//       ];
//     }
//   },
//   template: `
//     <div>
//     <mt-field @click.native="openPicker" :label="config.title" v-readonly-ios :disableClear="true" :readonly="true" :placeholder="'请选择'+config.title" v-model="value.name">></mt-field>
//     <div class="myp-picker-mask page" @touchmove.prevent v-show="pickerVisible" @click="pickerVisible = !pickerVisible"></div>
//     <mt-picker class="myp-picker" valueKey="name" v-show="pickerVisible" :showToolbar="true" :slots="slots" @change="pickerValuesChange">请选择</mt-picker>
//     </div>`
// });
export default {
  components: {
    MypText,
    MypDate,
    MypChekList,
    MypRadioList,
    MypSelect
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "搜索"
    },
    config: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dateVisible: false,
      pickerVisible: false,
      keyVal: "",
      query: {},
      currentDate: new Date(),
      currentDateObject: null,
      slots: []
    };
  },
  watch: {
    title(val) {
      this.title = val;
    },
    dateVisible(val) {
      console.log("val", val);
    }
  },
  created() {},
  methods: {
    queryResult() {
      this.$emit("result", this.keyVal);
    },
    showDate($this) {
      this.currentDateObject = $this;
      if ($this.value) {
        this.currentDate = new Date($this.value);
      }
      this.$refs.datePicker.open();
    },
    setDate(date) {
      this.currentDateObject.value = utils.formatDate(date, "yyyy-MM-dd");
    },
    openPicker(slots, context) {
      this.pickerContext = context;
      this.pickerVisible = true;

      this.slots = slots;
    },
    pickerValuesChange(picker, values) {
      console.log(values[0]);
      this.pickerContext && (this.pickerContext.value = values[0]);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
.search-page {
  width: 100%;
  height: 100%;
  // margin-top: 20*$rem;
  padding: 30*$rem 20*$rem;
  box-sizing: border-box;
  background-color: #fff;
  .input-box {
    border: 1px solid #eee;
    .input-wrapper {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      i {
        padding-left: 10px;
      }
      .mint-field {
        width: 100%;
        background: none;
      }
    }
  }
  .mintui-search {
    color: #ccc;
  }
  //公共
  .item {
    margin-top: 30*$rem;
  }
  .public-title {
    line-height: 100*$rem;
  }
  .myp-radio,
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

  .myp-picker {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60%;
    background: #f4f4f4;
    right: 0;
    top: 0;
    height: 230px;
    border-radius: 5px;
    margin: auto;
    color: #fff;
    z-index: 100;
    .picker-toolbar {
      text-align: center;
      color: #000;
      font-size: 40*$rem;
      line-height: 40px;
    }
  }
  .myp-picker-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
  }
}
</style>
