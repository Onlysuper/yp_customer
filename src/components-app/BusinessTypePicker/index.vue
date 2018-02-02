<template>
  <mt-popup v-model="businessTypeVisible" position="bottom" class="business-type" popup-transition="popup-fade" :modal="true" :closeOnClickModal="true">
    <mt-popup v-model="businessTypeVisible" position="bottom" class="business-type-inner" :modal="false">
      <mt-picker :slots="slots" @change="onValuesChange" valueKey="name" :showToolbar="true" :visibleItemCount="9">
        <mt-header :title="'请选择主营业务'" class="re-mint-header">
          <div slot="left">
            <mt-button @click="businessTypeVisible = false" type="danger">取消</mt-button>
          </div>
          <div slot="right">
            <mt-button @click="confirm" type="danger">确定</mt-button>
          </div>
        </mt-header>
      </mt-picker>
    </mt-popup>
  </mt-popup>
</template>
<style lang="scss">
@import "../../assets/scss/base.scss";
.business-type {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  .business-type-inner {
    width: 100%;
  }
  .picker-toolbar {
    height: 60*$rem;
  }
}
</style>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      businessTypeVisible: false,
      bussinessType: {
        name: "",
        key: ""
      },
      slots: [
        {
          flex: 1,
          defaultIndex: 2,
          values: [
            { name: "美食", key: 2015050700000000 },
            { name: "超市便利店", key: 2015091000052157 },
            { name: "休闲娱乐", key: 2015062600004525 },
            { name: "购物", key: 2015062600002758 },
            { name: "爱车", key: 2016062900190124 },
            { name: "生活服务", key: 2015063000020189 },
            { name: "教育培训", key: 2016042200000148 },
            { name: "医疗健康", key: 2016062900190296 },
            { name: "航旅", key: 2015080600000001 },
            { name: "专业销售/批发", key: 2016062900190337 },
            { name: "政府/社会组织", key: 2016062900190371 }
          ],
          className: "slot1"
        }
      ]
    };
  },
  watch: {
    value(val) {
      this.businessTypeVisible = val;
    },
    businessTypeVisible(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    if (this.value) {
      this.businessTypeVisible = true;
    }
    this.slots[0].defaultIndex = 4;
  },
  methods: {
    confirm() {
      this.$emit("businessresult", this.bussinessType);
      this.businessTypeVisible = false;
    },
    onValuesChange(v) {
      if (!v.values[0]) return;
      this.bussinessType = v.values[0];
    }
  }
};
</script>