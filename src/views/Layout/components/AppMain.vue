<template>
 <div class="reset-main">
   <router-view></router-view>
 </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
body{
  margin: 0;
}
.reset-main{
  position: relative;
}
</style>
<script>
export default {
  name: "AppMain",
  computed: {}
};
</script>
