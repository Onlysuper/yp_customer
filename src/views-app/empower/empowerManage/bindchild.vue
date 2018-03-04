<template>
  <!-- 绑定子码 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <mt-field type="text" :disabled="true" label="序列号" placeholder="请输入序列号" v-model="empowerList.qrcode"></mt-field>
        <mt-field type="text" label="子码编号" placeholder="请输入子码编号" v-model="empowerList.childQrcodes"></mt-field>
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
      btnDisabled: false,
      pageType: this.$route.query["type"] || "BINDCHILD",
      authCode: this.$route.params["authCode"],
      empowerList: {
        qrcode: "",
        childQrcodes: ""
      },
      pageTitle: {
        BINDCHILD: "绑定子码"
      }
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions(["getEmpowerManageUnit", "bindChildEmpowerManage"]),
    init() {
      this.pageType == "BINDCHILD" &&
        this.getEmpowerManageUnit(this.authCode).then(empowerList => {
          console.log(empowerList);
          this.empowerList = Object.assign(this.empowerList, empowerList);
        });
    },
    save() {
      if (!this.validator.isEmpty(this.empowerList.childQrcodes)) {
        this.MessageBox.alert("子码编号不能为空");
        return;
      }
      this.btnDisabled = true;
      if (this.pageType == "BINDCHILD") {
        this.bindChildEmpowerManage(this.empowerList).then(flag => {
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

<style>

</style>
