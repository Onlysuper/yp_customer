<template>
  <div class="pull-down-tip">
       <div class="line border-1px"></div>
       <span>没有更多了</span>
       <div class="line border-1px"></div>
  </div>
</template>

<style lang="less">
     @import url(../../assets/less/base.less);
     .pull-down-tip{
          line-height: 100/@rem;
          position: relative;
          overflow: hidden;
          padding:0 50/@rem;
          display: flex;
          .line{
               height:50/@rem;
               flex: 1;
          }
          span{
                // flex: 1;
               display: inline-block;
              //  position: absolute;
              //  top:50%;
              //  left:50%;
              //  transform: translate(-50%,-50%);
              //  background-color:red;
               padding:0 30/@rem;
          }
     }
</style>

<script>
export default {
  
}
</script>
