<template>
  <mt-popup v-model="popupVisible" position="right" class="search-panel-page" :modal="false">
    <full-page>
      <mt-header slot="header" :title="title+'查询'" class="re-mint-header">
        <mt-button slot="left" :disabled="false" type="danger" @click="popupVisible=false">返回</mt-button>
        <mt-button slot="right" size="small" type="danger" @click="queryResult">查询</mt-button>
      </mt-header>
      <div class="pading">
        <view-radius>
          <input-wrapper>
            <component class="border-bottom-1px" ref="configDate" :is="item.type" :config="item" v-for="(item,index) in config" @showDate="showDate" :key="index"></component>
          </input-wrapper>
        </view-radius>
      </div>
    </full-page>
    <mt-datetime-picker v-model="currentDate" type="date" @confirm="setDate" ref="datePicker" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>
  </mt-popup>
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
      value: ""
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
      value: utils.formatDate(this.config.defaultValue, "yyyy-MM-dd")
    };
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  mounted() {
    this.config.cb(utils.formatDate(this.config.defaultValue, "yyyy-MM-dd"));
  },
  methods: {
    showDate($this) {
      this.$emit("showDate", this);
    }
  },
  template: `<div @click="showDate(this)"><mt-field :label="config.title" :readonly=true :placeholder="'请输入'+config.title" v-model="value"></mt-field></div>`
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
    this.config.cb(this.config.defaultValue);
  },
  watch: {
    value(val) {
      this.config.cb && this.config.cb(val);
    }
  },
  template: `<div><mt-cell v-if="config.title" :title="config.title" class="border-1px"></mt-cell><mt-radio class="myp-radio border-1px" v-model="value" :options="config.options"></mt-radio></div>`
});

export default {
  components: {
    MypText,
    MypDate,
    MypChekList,
    MypRadioList
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
      popupVisible: false,
      dateVisible: false,
      keyVal: "",
      query: {},
      currentDate: new Date(),
      currentDateObject: null
    };
  },
  watch: {
    title(val) {
      this.title = val;
    },
    value(val) {
      this.popupVisible = val;
    },
    popupVisible(val) {
      if (val) {
        this.keyVal = "";
      }
      window.isPopup = val;
      this.$emit("input", val);
    },
    dateVisible(val) {
      console.log("val", val);
    }
  },
  created() {},
  mounted() {
    if (this.value) {
      this.popupVisible = true;
    }
  },
  methods: {
    queryResult() {
      this.$emit("result", this.keyVal);
      this.popupVisible = false;
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
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/base.scss";
.search-panel-page {
  width: 100%;
  height: 100%;
  .pading {
    // margin-top: 20*$rem;
    padding: 30*$rem 20*$rem;
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
  } //公共
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
}
</style>
