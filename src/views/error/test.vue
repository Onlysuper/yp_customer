<template>
  <div class="container">
    <form action="http://192.168.100.250:8090/tm/login" method="post">
      <input type="text">
      <input type="password">
    </form>
    <button type="submit">登录</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.banner {
  width: 100%;
  text-align: center;
  padding-top: 50px;
}
.banner_img {
  max-width: 400px;
  width: 80%;
  padding-bottom: 20px;
}
.title {
  font-size: 42px;
  font-family: "微软雅黑";
  color: red;
}
.sub-title {
  padding-top: 10px;
  font-size: 16px;
}
.sub-text {
  padding-top: 10px;
  font-size: 14px;
}
.sub-text a {
  font-size: 16px;
}
.sub-text1 {
  padding-top: 40px;
  font-size: 16px;
}
</style>
