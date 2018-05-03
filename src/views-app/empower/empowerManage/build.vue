<template>
  <!-- 生成授权码 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" label="合伙人编号" placeholder="请输入合伙人编号" v-model="empowerList.agentNo"></mt-field>
        <mt-field type="text" label="数量" placeholder="请输入数量" v-model="empowerList.qrcodeCount"></mt-field>
        <div v-show="false">
          <mt-cell title="服务方式" class="border-1px"></mt-cell>
          <mt-radio class="myp-chek-list border-1px" title="" v-model="empowerList.serviceMode" :options="serviceModeOptions">
          </mt-radio>
        </div>
        <div v-show="false">
          <mt-cell title="支持类型" class="border-1px"></mt-cell>
          <mt-checklist class="myp-chek-list border-1px" title="" v-model="empowerList.supportTypes" :options="supportTypesOptions">
          </mt-checklist>
        </div>
      </input-wrapper>
    </view-radius>
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
export default {
  components: {},
  data() {
    return {
      aa: [],
      btnDisabled: false,
      pageType: this.$route.query["type"] || "BUILD",
      empowerList: {
        serviceMode: "",
        supportTypes: []
      },
      pageTitle: {
        BUILD: "生成授权码"
      },
      supportTypesOptions: [
        {
          label: "普票",
          value: "1"
        },
        {
          label: "专票",
          value: "2"
        },
        {
          label: "特殊",
          value: "4"
        }
      ],
      serviceModeOptions: [
        {
          label: "航信",
          value: "HX"
        },
        {
          label: "易票",
          value: "YP"
        },
        {
          label: "航信_易票",
          value: "HX_YP"
        }
      ]
    };
  },
  mounted() { },
  computed: {
    serviceMode() {
      return this.empowerList.serviceMode;
    },
    supportTypes() {
      return this.empowerList.supportTypes;
    }
  },
  watch: {
    serviceMode(value) { },
    supportTypes(value) {
      // 选择特殊的时候必须勾选普票
      if (new Set(value).has("4")) {
        let newCheck = Array.from(new Set(value).add("1"));
        this.empowerList.supportTypes = Object.assign(
          this.empowerList.supportTypes,
          newCheck
        );
      }
    }
  },
  methods: {
    ...mapActions(["getEmpowerManageUnit", "buildEmpowerManage"]),
    save() {
      if (!this.validator.isEmpty(this.empowerList.agentNo)) {
        this.MessageBox.alert("合伙人编号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.empowerList.qrcodeCount)) {
        this.MessageBox.alert("数量不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.empowerList.supportTypes)) {
        this.MessageBox.alert("请选择支持类型");
        return;
      }
      this.btnDisabled = true;
      if (this.pageType == "BUILD") {
        this.buildEmpowerManage(this.empowerList).then(flag => {
          this.btnDisabled = false;
          if (flag) {
            this.$router.back();
          }
        });
      }
    }
  }
};
</script>
