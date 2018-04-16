
<template>
  <div v-if="searchboxVisible" class="page-search">
    <mt-search class="searchInput" autofocus v-model="myval"></mt-search>
  </div>
</template>

<script>
import {
  getsmartgoodscodeCustomerGood,
  testKeyQuery,
  entCardQueryCode
} from "@src/apis";
export default {
  props: {
    defaultVal: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      searchboxVisible: false,
      myval: "",
      visible: false,
      billType: "1",
      isNoSearchShow: false,
      queryList: []
    };
  },
  watch: {
    searchboxVisible(val) {
      if (val) {
        console.log('显示');
        this.$nextTick(() => {
          console.log($('.searchInput').find("input").val());
          // this.$refs.searchInput.focus();
        })
      }
    },
    defaultVal(val) {
      this.myval = val;
      // this.$emit("initData");
    },
    myval(val) {

      //点击×自动清空表单中回显的历史数据
      if (!val) {
        this.$emit("initData");
      }

      //模糊查询
      let key = val;
      if (!this.visible) return;
      // this.getsmartgoodscodeCustomerGood({ name: val, tax: "0" });
      this.$emit("watchDataList", []);
    }
  },
  created() {
  },
  mounted() {
    this.myval = this.value;
  },
  methods: {
    searchHandle() {
      this.getsmartgoodscodeCustomerGood({ name: this.myval, tax: "0" });
    },
    getsmartgoodscodeCustomerGood(obj) {
      getsmartgoodscodeCustomerGood()(obj).then(res => {
        if (res.code == "00") {
          this.$emit("watchDataList", res.data);
        } else {
          this.queryList = [];
          this.Toast({
            message: res.msg,
            duration: 500
          });
        }
        this.isNoSearchShow = true;
      });
    },
    select(item) {
      this.$emit("selectChange", item);
      this.close();
    },
    noSearch() {
      this._czcEvent("点我试试", "企业名称:" + this.myval);
      this.close();
      setTimeout(() => {
        this.$parent.mixinsToTycUrl(this.myval);
      }, 500);
    },
    open() {
      this.searchboxVisible = true;
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
  width: 95%;
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
