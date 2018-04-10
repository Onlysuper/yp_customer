<template>
  <!-- 物料入库 -->
  <full-page>
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>

    <view-radius>
      <input-wrapper>
        <div>
          <mt-cell title="开票类型" class="border-1px"></mt-cell>
          <mt-checklist @input="supportTypesChange" class="myp-chek-list border-1px" title="" v-model="dataList.invoiceTypes" :options="supportTypesOptions">
          </mt-checklist>
        </div>
        <div>
          <mt-cell title="支付类型" class="border-1px"></mt-cell>
          <mt-checklist @input="payTypesChange" class="myp-chek-list border-1px" title="" v-model="dataList.payTypes" :options="payTypesOptions">
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
import Picker from "@src/components-app/SelectPicker/Picker";
import versionTypeJson from "@src/data/versionType"
export default {
  components: { Picker },
  data() {
    return {
      queryNo: this.$route.params["productType"],
      type: {},
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
      payTypesOptions: [
        {
          label: "B扫C",
          value: "1"
        },
        {
          label: "C扫B",
          value: "2"
        },
        {
          label: "纯支付",
          value: "4"
        }
      ],
      btnDisabled: false,
      pageType: this.$route.query["type"] || "STENCIL",
      dataList: {
        bussinessNo: "",
        invoiceTypes: [],
        payTypes: []
      },
      pageTitle: {
        STENCIL: "排版"
      },
    };
  },
  computed: {
    supportTypes() {
      return this.dataList.invoiceTypes
    },
    payTypes() {
      return this.dataList.payTypes
    }
  },
  watch: {
    supportTypes(value) {
      // 选择特殊的时候必须勾选普票
      if (new Set(value).has("4")) {
        let newCheck = Array.from(new Set(value).add("1"));
        this.dataList.invoiceTypes = Object.assign(
          this.dataList.invoiceTypes,
          newCheck
        );
      }
    },
    payTypes(value) {
      let payTypes = this.dataList.payTypes;
      if (new Set(payTypes).has("4") && payTypes.length > 1) {
        let index = payTypes.findIndex(function (value, index, arr) {
          return value == 4;
        })
        let length = this.dataList.payTypes.length;
        this.dataList.payTypes = Object.assign(['4'])
        this.dataList.payTypes.splice(1);
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getCustomerProductOne", "getUserProductStatus"]),
    payTypesChange(value) {
      // console.log(value);
      // let payTypes = this.dataList.payTypes;
      // if (new Set(payTypes).has("4")) {
      //   console.log('4444');
      //   let index = payTypes.findIndex(function (value, index, arr) {
      //     return value == 4;
      //   })
      //   let length = this.dataList.payTypes.length;
      //   this.dataList.payTypes = Object.assign(['4'])
      //   this.dataList.payTypes.splice(1);
      // }
    },
    supportTypesChange(value) {
      // console.log(value);
      // let payTypes = this.dataList.payTypes;
      // if (new Set(payTypes).has("4")) {
      //   console.log('4444');
      //   let index = payTypes.findIndex(function (value, index, arr) {
      //     return value == 4;
      //   })
      //   let length = this.dataList.payTypes.length;
      //   this.dataList.payTypes = Object.assign(['4'])
      //   this.dataList.payTypes.splice(1);
      // }
    },
    init() {
      this.getCustomerProductOne(this.queryNo).then(resdata => {
        let rowdata = resdata;
        this.dataList.bussinessNo = rowdata.bussinessNo;
        switch (rowdata.payType) {
          case 0:
            this.dataList.payTypes = [];
            break
          case 1:
            this.dataList.payTypes = ["1"];
            break
          case 2:
            this.dataList.payTypes = ["2"];
            break
          case 3:
            this.dataList.payTypes = ["1", "2"];
            break
        }
        switch (rowdata.invoiceType) {
          case 0:
            this.dataList.invoiceTypes = [];
            break
          case 1:
            this.dataList.invoiceTypes = ["1"];
            break
          case 2:
            this.dataList.invoiceTypes = ["2"];
            break
          case 4:
            this.dataList.invoiceTypes = ["4"];
            break
          case 3:
            this.dataList.invoiceTypes = ["1", "2"];
            break
          case 7:
            this.dataList.invoiceTypes = ["1", "2", "4"];
            break
          case 5:
            this.dataList.invoiceTypes = ["1", "4"];
            break
          case 6:
            this.dataList.invoiceTypes = ["2", "4"];
            break
        }
      });
    },
    save() {
      if (this.dataList.invoiceTypes.length == 0) {
        this.MessageBox.alert("请选择开票类型！");
        return;
      }
      if (this.dataList.payTypes.length == 0) {
        this.MessageBox.alert("请选择支付类型！");
        return;
      }
      this.btnDisabled = true;
      if (this.pageType == "STENCIL") {
        this.getUserProductStatus({
          bussinessNo: this.dataList.bussinessNo,
          bussinessType: "customer",
          invoiceTypes: this.dataList.invoiceTypes,
          payTypes: this.dataList.payTypes
        }).then(flag => {
          this.btnDisabled = false;
          console.log(flag);
          if (flag) {
            this.$router.back();
            this.$store.commit("CUSTOMER_PRODUCT_INIT");
            this.$store.commit("CUSTOMER_PRODUCT_IS_SEARCH", true);
          }
        });
      }
    }
  },
};
</script>

<style>

</style>
