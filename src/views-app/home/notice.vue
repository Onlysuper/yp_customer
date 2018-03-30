<template>
  <!--  通知信息 -->
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-cell v-for="(item,index) in noticeList" :key="index" :title="item.content" :label="item.time"></mt-cell>
    </input-wrapper>
  </full-page>
</template>

<script>
import { PasswordUpdate } from "@src/apis";
export default {
  data() {
    return {
      noticeList: []
    }
  },
  created() {
    this.noticeFn();
  },
  computed: {
    noticeCount() {
      return this.$store.state.acceptMessage.noticeCount;
    },
    noticeData() {
      return this.$store.state.acceptMessage.noticeData;
    }
  },
  methods: {
    noticeFn() {
      let arr = [];
      this.noticeData.forEach(item => {
        let obj = JSON.parse(item.data);
        arr.push({
          content: JSON.parse(obj.content).data,
          time: obj.triggerTime,
          receiveBusinessNo: obj.receiveBusinessNo
        })
        this.noticeList = arr
      });
    }
  },
  watch: {
    noticeCount(value) {
      // alert('有新通知！');
      this.$nextTick(() => {
      })
    },
    // 新通知内容
    noticeData(val) {
      this.noticeFn();
    }
  }
};
</script>

<style>

</style>
