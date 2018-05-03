<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field @click.native="$refs.typePicker.open" type="text" label="版本类型" placeholder="请选择版本类型" :value="type.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field @click.native="$refs.statusPicker.open" type="text" label="升级状态" placeholder="请选择升级状态" :value="status.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="dataList.customerNo"></mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="typePicker" v-model="type" :slotsActions="versionTypeOptions" @confirm="typePickerChange"></picker>
    <picker ref="statusPicker" v-model="status" :slotsActions="status_options" @confirm="statusChange"></picker>
  </full-page>
</template>
<style lang="scss">
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
</style>
<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import { statusFilterQuery } from "@src/common/mixins";
export default {
  components: { Picker },
  mixins: [statusFilterQuery],
  data() {
    return {
      versionTypeOptions: [],
      status: {},
      type: {},
      status_options: [
        {
          name: "允许升级",
          code: "TRUE"
        },
        {
          name: "不允许升级",
          code: "FALSE"
        }
      ],
      btnDisabled: false,
      pageType: this.$route.query["type"] || "ADDMATERIEL",
      dataList: {},
      pageTitle: {
        ADD: "修改商户信息"
      },
    };
  },

  methods: {
    ...mapActions(["addCustomerVersionSave"]),
    save() {
      if (!this.validator.isEmpty(this.dataList.type)) {
        this.MessageBox.alert("请选择版本类型！");
        return;
      }
      if (!this.validator.isEmpty(this.dataList.status)) {
        this.MessageBox.alert("请选择升级状态！");
        return;
      }
      if (!this.validator.isEmpty(this.dataList.customerNo)) {
        this.MessageBox.alert("请输入商户编号！");
        return;
      }
      this.btnDisabled = true;
      if (this.pageType == "ADD") {
        this.addCustomerVersionSave(this.dataList).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
            this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH_INIT");
            this.$store.commit("CUSTOMERVERSIONPLUGIN_SEARCH", true);
          }
        });
      }
    },
    // 状态
    typePickerChange(obj) {
      this.type = obj;
      this.dataList.type = obj.code;
    },
    // 类型
    statusChange(obj) {
      this.status = obj;
      this.dataList.status = obj.code;
    }
  },
  created() {
    this.versionTypeOptions = this.statusFilterQuery('typeCustomerVersion').filter(item => { return item['code'] != 'RELEASE' })
  },
  computed: {},
  watch: {}
};
</script>

<style>

</style>
