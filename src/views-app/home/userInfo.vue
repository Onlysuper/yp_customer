<template>
  <full-page class="page">
    <mt-header slot="header" :title="$route.meta.pageTitle">
      <mt-button slot="left" :disabled="false" type="danger" @click="$router.back()">返回</mt-button>
    </mt-header>
    <input-wrapper>
      <mt-cell class="_av" title="名称">
        {{$store.state.userInfoAndMenu.userMessage.realname}}
      </mt-cell>
      <mt-cell class="_av" title="登录帐号">
        {{$store.state.userInfoAndMenu.userMessage.username}}
      </mt-cell>
      <mt-cell class="_av" title="我的编号">
        {{$store.state.userInfoAndMenu.userMessage.bussinessNo}}
      </mt-cell>
    </input-wrapper>
  </full-page>
</template>

<script>
import { PasswordUpdate } from "@src/apis";
export default {};
</script>

<style>

</style>
