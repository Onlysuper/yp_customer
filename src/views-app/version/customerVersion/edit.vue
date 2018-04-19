<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field @click.native="$refs.statusPicker.open" type="text" label="升级状态" placeholder="请选择升级状态" :value="statusObj.name" v-readonly-ios :readonly="true" :disableClear="true">
          <i class="icon-arrow"></i>
        </mt-field>
        <mt-field :disabled="true" type="text" label="商户编号" placeholder="请输入商户编号" v-model="dataList.customerNo"></mt-field>
      </input-wrapper>
    </view-radius>
    <picker ref="statusPicker" v-model="statusObj" :slotsActions="status_options" @confirm="statusChange"></picker>
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
export default {
  components: { Picker },
  data() {
    return {
      queryNo: this.$route.params["queryNo"],
      statusObj: {},
      type: {},
      status_options: [
        {
          name: "允许升级",
          code: "TRUE"
        },
        {
          name: "不允许升级",
          code: "FALSE"
        },
        {
          name: "升级成功",
          code: "SUCCESS"
        }
      ],
      btnDisabled: false,
      pageType: this.$route.query["type"] || "EDIT",
      dataList: {},
      pageTitle: {
        EDIT: "编辑"
      },
    };
  },
  computed: {},

  watch: {
    statusObj(obj) {
      this.statusObj = obj;
      this.dataList.status = obj.code;
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getCustomerVersionUnit", "addCustomerVersionSave"]),
    init() {
      this.pageType == "EDIT" &&
        this.getCustomerVersionUnit(this.queryNo).then(empowerList => {
          this.statusObj = this.status_options.find(item => item.code == empowerList.status);
          this.dataList.customerNo = empowerList.customerNo
          this.dataList.type = empowerList.type
        });
    },
    save() {
      if (!this.validator.isEmpty(this.dataList.status)) {
        this.MessageBox.alert("请选择升级状态！");
        return;
      }
      if (!this.validator.isEmpty(this.dataList.customerNo)) {
        this.MessageBox.alert("请输入商户编号！");
        return;
      }
      this.btnDisabled = true;
      if (this.pageType == "EDIT") {
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
    // 类型
    statusChange(obj) {
      this.statusObj = obj;
      this.dataList.statusObj = obj.code;
    }
  }
};
</script>

<style>

</style>
