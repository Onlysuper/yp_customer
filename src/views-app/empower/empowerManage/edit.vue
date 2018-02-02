<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!--编辑-->
        <template v-if="pageType == 'EDIT'">
          <mt-field type="text" :disabled="true" label="序列号" placeholder="请输入序列号" v-model="unitData.qrcode"></mt-field>
          <mt-field type="text" :disabled="true" label="授权码" placeholder="请输入授权码" v-model="unitData.authCode"></mt-field>
          <mt-field type="text" :disabled="true" label="合伙人编号" placeholder="请输入合伙人编号" v-model="unitData.agentNo"></mt-field>
          <mt-field type="text" :disabled="true" label="商户编号" placeholder="请输入商户编号" v-model="unitData.customerNo"></mt-field>
          <mt-field type="text" label="分机号" placeholder="请输入分机号" v-model="unitData.extensionNum"></mt-field>
          <mt-field @click.native="$refs.serviceModePicker.open" type="text" label="服务方式" placeholder="请选择服务方式" :value="servicePickerModle.name" v-readonly-ios :readonly="true" :disableClear="true">
          </mt-field>
          <myp-check-list @result="checkListResult" title="支持类型" :listModle="unitData.supportTypes" :actions="supportTypeActions"></myp-check-list>
          <!-- <div>
            <mt-cell title="支持类型" class="border-1px"></mt-cell>
            <mt-checklist class="myp-chek-list border-1px" title="" v-model="unitData.supportTypes" :options="supportTypeActions">
            </mt-checklist>
          </div> -->
        </template>
      </input-wrapper>
    </view-radius>
    <picker ref="serviceModePicker" v-model="servicePickerModle" :slotsActions="serviceActions" @confirm="openaServicePickerChange"></picker>
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
import Picker from "@src/components-app/SelectPicker/Picker";
import MypCheckList from "@src/components-app/CheckList";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    Picker,
    MypCheckList
  },
  data() {
    return {
      supportTypeActions: [
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
      unitData: {
        serviceMode: "",
        supportTypes: []
      },
      btnDisabled: false,
      qrNumsVisible: false,
      qrcodesVisible: false,
      servicePickerModle: {
        name: "航信",
        code: "HX"
      },
      serviceActions: [
        {
          name: "航信",
          code: "HX"
        },
        {
          name: "易票",
          code: "YP"
        },
        {
          name: "航信_易票",
          code: "HX_YP"
        }
      ],
      pageType: this.$route.query["type"],
      pageTitle: {
        EDIT: "编辑"
      },
      receiptNo: this.$route.params["receiptNo"]
    };
  },
  created() {
    this.getEmpowerManageUnit(this.receiptNo).then(data => {
      //服务方式
      switch (data.serviceMode) {
        case "HX":
          this.servicePickerModle = {
            name: "航信",
            code: "HX"
          };
          break;
        case "YP":
          this.servicePickerModle = {
            name: "易票",
            code: "YP"
          };
          break;
        case "HX_YP":
          this.servicePickerModle = {
            name: "航信_易票",
            code: "HX"
          };
          break;
        default:
          this.servicePickerModle = {
            name: "航信",
            code: "HX"
          };
      }
      // 支持类型
      console.log(data);
      switch (data.supportType) {
        case 1:
          this.unitData.supportTypes = [1];
          break;
        case 2:
          this.unitData.supportTypes = [2];
          break;
        case 3:
          this.unitData.supportTypes = [1, 2];
          break;
        case 5:
          this.unitData.supportTypes = [1, 4];
          break;
        case 7:
          this.unitData.supportTypes = [1, 2, 4];
          break;
        default:
          this.unitData.supportTypes = [];
      }
      if (data) this.unitData = Object.assign(this.unitData, data);
    });
  },
  computed: {
    unSupportTypes() {
      return this.unitData.supportTypes;
    }
  },
  watch: {
    unSupportTypes(value) {
      if (value.some(r => r == "4")) {
        if (!this.unitData.supportTypes.some(r => r == "1")) {
          this.unitData.supportTypes = this.unitData.supportTypes.map(r => r);
          this.unitData.supportTypes.push(1);
        }
      }
    }
  },
  methods: {
    ...mapActions(["getEmpowerManageUnit", "editEmpowerManage"]),
    // 保存
    save() {
      if (!this.validator.isEmpty(this.unitData.extensionNum)) {
        this.MessageBox.alert("分机号不能为空");
        return;
      }
      if (!this.unitData.supportTypes.some(r => r)) {
        this.MessageBox.alert("请选择支持类型");
        return;
      }
      this.btnDisabled = true;
      this.editEmpowerManage(this.unitData).then(flag => {
        this.btnDisabled = false;
        if (flag) this.$router.back({ query: { d: 11 } });
      });
    },
    openaServicePickerChange(obj) {
      this.servicePickerModle = obj;
      this.unitData.serviceMode = obj.code;
    },
    checkListResult(value) {
      console.log("返回来了！");
      console.log(SVGFEGaussianBlurElement);
    }
  }
};
</script>

<style>

</style>
