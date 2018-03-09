
<template>
  <div>
    <div class="_search-mask" @touchmove.prevent v-show="visible"></div>
    <div class="my-search" :class="{show:visible,hide:!visible}">
      <input-wrapper class="input-bg">
        <mt-field ref="mtField" class="input-field title-bold" v-model="myval" type="text" placeholder="请输入企业名称 / 关键字">
          <button class="input-return _av" @click="close">完成</button>
        </mt-field>
      </input-wrapper>
      <div class="query-list">
        <ul>
          <li class="border-bottom-1px _av" @click="select(item)" v-for="(item,index) in queryList" :key="index">
            {{item.name}}
          </li>
          <li class="no-search" v-show="isNoSearchShow" @click="noSearch">
            <span>查不到？点我试试</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getsmartgoodscodeCustomerGood,
  testKeyQuery,
  entCardQueryCode
} from "@src/apis";
export default {
  // props: ["defaultVal"],
  props: {
    defaultVal: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      myval: "",
      visible: false,
      billType: "1",
      isNoSearchShow: false,
      queryList: []
    };
  },
  watch: {
    defaultVal(val) {
      this.myval = val;
    },
    myval(val) {
      //点击×自动清空表单中回显的历史数据
      if (!val) {
        this.$emit("initData");
      }

      //处理BUG
      if (val) {
        this.$refs.mtField.$el.querySelector(
          ".mint-field-clear"
        ).style.display =
          "block";
      } else {
        this.$refs.mtField.$el.querySelector(
          ".mint-field-clear"
        ).style.display =
          "none";
      }
      //模糊查询
      let key = val;
      if (!this.visible) return;
      this.getsmartgoodscodeCustomerGood({ name: val, tax: "0" });
      this.$emit("goodsNameInput", val);
    }
  },
  created() {
  },
  mounted() {
    this.myval = this.value;
  },
  methods: {
    getsmartgoodscodeCustomerGood(obj) {
      getsmartgoodscodeCustomerGood()(obj).then(res => {
        if (res.code == "00") {
          this.queryList = res.data;
        } else {
          this.queryList = [];
          this.Toast({
            message: res.msg,
            // position: "top",
            duration: 500
          });
        }
        this.isNoSearchShow = true;
      });
    },
    select(item) {
      this.close();
      this.$emit("goodsNameChange", item);
    },
    noSearch() {
      this._czcEvent("点我试试", "企业名称:" + this.myval);
      this.close();
      setTimeout(() => {
        this.$parent.mixinsToTycUrl(this.myval);
      }, 500);
    },
    open() {
      this.visible = true;
      document
        .querySelector(".input-field")
        .querySelector("input")
        .focus();

      //处理BUG
      if (this.myval) {
        //由于input是自动获取焦点，所以不会显示删除input的内容的icon
        this.$refs.mtField.$el.querySelector(
          ".mint-field-clear"
        ).style.display =
          "block";
      }
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/base.scss";
._search-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
}
.my-search {
  height: auto;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;

  margin: auto;
  border-radius: 10px;

  // box-shadow: 0 0 5px #bfbfbf;
  width: 95%;
  // height: 90%;

  background-color: rgba(255, 255, 255, 1);
  transition: opacity 0.5s;
}

.input-bg {
  background: #ff5959;
  box-shadow: 0 0 5px #000;
  padding: 20*$rem;
}
.input-field {
  border-radius: 3px;
  .mint-cell-wrapper {
  }
}
.query-list {
  position: relative;
  padding: 50*$rem 30*$rem;
  overflow-x: hidden;
  overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  height: 800*$rem;
  li {
    line-height: 100*$rem;
  }
}

.show {
  top: 50px;
  // bottom: 0%;
  opacity: 1;
}
.hide {
  top: -100%;
  opacity: 0;
}

.no-search {
  text-align: center;
  // padding: 10px;
  span {
    text-decoration: underline;
    color: red;
  }
}

.input-return {
  // padding: 20*$rem 30*$rem;
  margin-left: 30*$rem;
  // background: #ef4f4f;
  // color: #fff;
  border-radius: 5px;
}
</style>
