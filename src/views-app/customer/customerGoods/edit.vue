<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle + pageTitle[pageType]">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
      <mt-button slot="right" :disabled="btnDisabled" type="danger" @click="save">保存</mt-button>
    </mt-header>
    <view-radius>
      <input-wrapper>
        <!-- 添加表单 -->
        <template v-if="pageType == 'ADD'">
          <div class="inputoption-box">
            <div class="inputoption_title">商品名称</div>
            <input ref="goodsName" @change="goodsNameChange($event,'ADD')" @input="goodsNameGet($event)" type="text" placeholder="商品名称" list="goodsName_list" v-model="good.goodsName">
            <datalist id="goodsName_list">
              <option v-for="item in goodsNameOptions" :key="item.code" :label="item.name" :value="item.code" />
            </datalist>
          </div>
          <mt-field type="text" :disabled="true" label="统一编码" placeholder="请输入统一编码" v-model="good.unionNo"></mt-field>
          <mt-field type="text" :disabled="true" label="标准名称" placeholder="请输入标准名称" v-model="good.goodsType"></mt-field>
          <mt-field type="text" label="税率" placeholder="请输入税率" v-model="good.taxRate"></mt-field>
          <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.customerNo"></mt-field>
          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>
          <mt-field @click.native="$refs.EnjoyPicker.open" type="text" label="享受优惠" placeholder="请选择享受优惠" :value="enjoyModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field @click.native="$refs.DiscountPicker.open" type="text" label="优惠类型" placeholder="请选择优惠类型" :value="discountModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
        </template>

        <!-- 编辑表单 -->
        <template v-if="pageType == 'EDIT'">
          <div class="inputoption-box">
            <div class="inputoption_title">商品名称</div>
            <input @change="goodsNameChange($event,'ADD')" @input="goodsNameGet" type="text" placeholder="商品名称" list="goodsName_list" v-model="good.goodsName">
            <datalist id="goodsName_list">
              <option v-for="item in goodsNameOptions" :key="item.code" :label="item.name" :value="item.code" />
            </datalist>
          </div>
          <mt-field type="text" :disabled="true" label="统一编码" placeholder="请输入统一编码" v-model="good.unionNo"></mt-field>
          <mt-field type="text" :disabled="true" label="标准名称" placeholder="请输入标准名称" v-model="good.goodsType"></mt-field>
          <mt-field type="text" label="税率" placeholder="请输入税率" v-model="good.taxRate"></mt-field>
          <mt-field type="text" label="商品编号" placeholder="请输入商品编号" v-model="good.goodsNo"></mt-field>
          <mt-field type="text" label="商户编号" placeholder="请输入商户编号" v-model="good.customerNo"></mt-field>
          <!-- <mt-field @click.native="$refs.TaxratePicker.open" type="text" label="税率" placeholder="请选择税率" :value="taxModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field> -->

          <mt-field type="text" label="单位" placeholder="请输入单位" v-model="good.unit"></mt-field>
          <mt-field type="text" label="含税单价" placeholder="请输入含税单价" v-model="good.unitPrice"></mt-field>
          <mt-field type="text" label="规格型号" placeholder="请输入规格型号" v-model="good.model"></mt-field>

          <mt-field @click.native="$refs.EnjoyPicker.open" type="text" label="享受优惠" placeholder="请选择享受优惠" :value="enjoyModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
          <mt-field @click.native="$refs.DiscountPicker.open" type="text" label="优惠类型" placeholder="请选择优惠类型" :value="discountModle.name" v-readonly-ios :readonly="true" :disableClear="true">
            <i class="icon-arrow"></i>
          </mt-field>
        </template>

      </input-wrapper>
    </view-radius>
    <mt-actionsheet :actions="goodsActions" v-model="goodsVisible" cancelText="取消"></mt-actionsheet>
    <picker ref="TaxratePicker" v-model="taxModle" :slotsActions="taxActions" @confirm="taxratePickerChange"></picker>
    <picker ref="DiscountPicker" v-model="discountModle" :slotsActions="discountActions" @confirm="discountPickerChange"></picker>
    <picker ref="EnjoyPicker" v-model="enjoyModle" :slotsActions="enjoyActions" @confirm="enjoyPickerChange"></picker>
  </full-page>
</template>
<style  lang='scss' scoped>
.inputoption-box {
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 1.28rem;
  .inputoption_title {
    line-height: 3;
    width: 8.8rem;
  }
  input {
    color: #666;
    opacity: 1;
    &::-webkit-input-placeholder {
      font-size: 1.28rem;
    }
  }
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import Picker from "@src/components-app/SelectPicker/Picker";
import taxJson from "@src/data/tax.json";
import discountJson from "@src/data/discount.json";
import enjoyJson from "@src/data/enjoy.json";
import goodsNoJson from "@src/data/goodsNo.json";
import { getsmartgoodscodeCustomerGood } from "@src/apis";
import utils from "@src/common/utils";
export default {
  components: {
    Picker
  },
  data() {
    return {
      goodsName: "", // 商品名称
      goodsNameOptions: [], // 商品名称 智能编码
      btnDisabled: false,
      good: {
        unionNo: "3070401000000000000",
        taxRate: "0",
        enjoyDiscount: "0",
        discountType: "10"
      },
      pageType: this.$route.query["type"] || "ADD",
      pageTitle: {
        ADD: "添加",
        EDIT: "修改"
      },
      goodsNo: this.$route.params["goodsNo"],

      goodsVisible: false,
      goodsModel: {},
      goodsActions: goodsNoJson.map(item => {
        item.method = this.goodsActionChange;
        return item;
      }),

      taxModle: {},
      taxActions: taxJson,
      discountModle: {},
      discountActions: discountJson,
      enjoyModle: {},
      enjoyActions: enjoyJson
    };
  },
  created() {
    this.pageType == "EDIT" &&
      this.getGood(this.goodsNo).then(good => {
        this.good = Object.assign(this.good, good);
        this.echoForm(this.good);
      });
  },
  methods: {
    ...mapActions(["getGood", "updataGood", "addGood"]),

    //回显信息
    echoForm(good) {
      //回显商品编码
      let unionNo = this.goodsActions.find(item => item.code == good.unionNo);
      this.goodsActionChange(unionNo || {});

      //回显费率
      let tax = this.taxActions.find(item => item.code == good.taxRate);
      this.taxratePickerChange(tax || {});

      //回显享受优惠
      let enjoyDiscount = this.enjoyActions.find(
        item => item.code == good.enjoyDiscount
      );
      this.enjoyPickerChange(enjoyDiscount || {});

      //回显优惠类型
      let discountType = this.discountActions.find(
        item => item.code == good.discountType
      );
      this.discountPickerChange(discountType || {});
    },

    //选择商品结果
    goodsActionChange(obj) {
      this.goodsModel = obj;
      this.good.unionNo = obj.code;
    },

    //设置费率
    taxratePickerChange(obj) {
      this.taxModle = obj;
      this.good.taxRate = obj.code;
    },

    //设置享受优惠
    enjoyPickerChange(obj) {
      this.enjoyModle = obj;
      this.good.enjoyDiscount = obj.code;
    },

    //设置优惠类型
    discountPickerChange(obj) {
      this.discountModle = obj;
      this.good.discountType = obj.code;
    },
    // 商品名称智能编码
    goodsNameGet(event) {
      let val = event.target.value;
      this.goodsName = val;
      getsmartgoodscodeCustomerGood()({ name: val, tax: "0" }).then(res => {
        let data = res.data;
        if (res.code == "00") {
          this.goodsNameOptions = res.data;
        }
      });
    },
    //商品名称被改变
    goodsNameChange(type) {
      console.log(this.goodsName);
      let val = event.target.value;
      let selectObj = this.goodsNameOptions.find(item => {
        return item.code == val;
      });
      this.good.unionNo = selectObj.code;
      this.good.goodsType = selectObj.name;
      this.good.taxRate = selectObj.rate;
      this.good.goodsName = this.goodsName;
    },
    save() {
      if (!this.validator.isEmpty(this.good.customerNo)) {
        this.MessageBox.alert("商户编号不能为空");
        return;
      }
      if (!this.validator.isEmpty(this.good.unionNo)) {
        this.MessageBox.alert("请选择商品");
        return;
      }
      if (!this.validator.isEmpty(this.good.goodsName)) {
        this.MessageBox.alert("商品名称不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.model)) {
        this.MessageBox.alert("规格型号不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.unit)) {
        this.MessageBox.alert("单位不能为空！");
        return;
      }
      if (!this.validator.isEmpty(this.good.unitPrice)) {
        this.MessageBox.alert("含税单价不能为空！");
        return;
      }
      if (
        !this.validator.isEmpty(this.good.taxRate) &&
        this.good.taxRate != "0"
      ) {
        this.MessageBox.alert("请选择税率！");
        return;
      }
      if (!this.validator.isEmpty(this.good.enjoyDiscount)) {
        this.MessageBox.alert("请选择享受优惠！");
        return;
      }
      if (!this.validator.isEmpty(this.good.discountType)) {
        this.MessageBox.alert("请选择优惠类型！");
        return;
      }

      this.btnDisabled = true;
      let sendata = { ...this.good };
      sendata.goodsName = this.goodsName;
      sendata.taxRate = utils.toPoint(sendata.taxRate);
      this.pageType == "EDIT"
        ? this.updataGood({ ...sendata }).then(flag => {
            this.btnDisabled = false;
            if (flag) this.$router.back({ query: { d: 11 } });
          })
        : this.addGood(...sendata).then(flag => {
            this.btnDisabled = false;
            if (flag) {
              this.$store.commit("IS_RELOAD_GOOD", true);
              this.$router.back();
            }
          });
    }
  }
};
</script>

<style>

</style>
