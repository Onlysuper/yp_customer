<template>
     <mt-popup v-model="visible" position="bottom" class="upload-container" :modal="false">
          <full-page>
               <mt-header slot="header" title="拍照示例图">
                    <mt-button slot="left" :disabled="false" type="danger" @click="visible=false">关闭</mt-button>
               </mt-header>
               <div class="view-waper">
                    <div class="view-main">
                         <img class="view-demo" :src="require('@src/assets/images/no-result.png')" alt="">
                         <span class="view-info">{{label}}</span>
                    </div>
               </div>
               <div slot="tabar" class="view-btn">
                    <input type="file" accept="image/*" @change="inputChange" class="input-file">
                    <i class="mintui-camera icon"></i>
               </div>
          </full-page>
     </mt-popup>
</template>

<style lang="less">
@import url(../../assets/less/base.less);
.upload-container {
     width: 100%;
     height: 100%; // background: red;
     text-align: center;
     .view-waper {
          height: 100%;
          display: flex;
     }
     .view-main {
          padding: 40/@rem;
          margin:auto;
     }
     .view-demo {
          width: 80%;
          display: block;
          margin: 50/@rem auto;
     }
     .view-info {
          display: inline-block;
          margin-top: 50/@rem;
     }
     .view-btn {
          position: relative;
          width: 100/@rem;
          height: 100/@rem;
          margin: 20/@rem auto;
          display: flex;
          clear: both;
          font-size: 10px;
          border-radius: 50%;
          background: red;
          .input-file {
               position: absolute;
               left: 0;
               top: 0;
               width: 100%;
               height: 100%;
               opacity: 0;
          }
          .icon {
               margin:auto;
               font-size: 60/@rem;
               color: #FFF;
          }
     }
}
</style>

<script>
import lrz from "lrz";
export default {
     props: {
          value: {
               type: Boolean,
               default: false
          },
          label:{
               type:String,
               default:"拍摄的照片尽量充满相框，无反光，无水印，清晰可见"
          }
     },
     data() {
          return {
               visible: true,
          }
     },
     watch: {
          value(val) {
               this.visible = val;
          },
          visible(val) {
               this.$emit('input', val);
          }
     },
     created() {
          this.visible = this.value;
     },
     methods: {
          //选择图片
          inputChange(event) {
               event.preventDefault()
               var target = event.target
               var file = target.files[0]
               if (!/image\/\w+/.test(file.type)) {
                    alert("请选择合法的图片")
                    return false;
               }
               this.lrzImg(file, event);
               // var reader = new FileReader();
               // reader.readAsDataURL(file);
               // reader.onload = function () {
               //      var base64 = this.result;
               //      console.log(base64);
               // }
          },
          //压缩图片
          lrzImg(file, event) {
               lrz(file, { width: 480 }).then(res => {
                    let base64 = res.base64;
                    this.createImg(base64);
                    return base64;
               }).catch(function(err) {
                    // 处理失败会执行 
               }).always(function() {
                    // 不管是成功失败，都会执行
                    event.target.value = null;
               });
          },
          //显示图片
          createImg(base64) {
               this.visible = false;
               this.$emit("upresult", base64);
          }
     }
}
</script>