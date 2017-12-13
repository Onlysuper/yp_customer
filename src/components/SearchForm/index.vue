<template>
    <div>
   <!-- Form 表单编写 start -->
    <el-form class="form-box" ref="form" :model="form" label-width="100px" >
            <el-form-item class="form-item" v-for="(item,index) in searchForm.searchType" :key="index" :label="item.label" :class="index==0||index==1?'showinput allinput':'visibleinput allinput'">
                <!-- 文本框 -->
                <el-input  v-if="item.type=='text'" :placeholder="item.label" v-model="form.name"></el-input>

                <!-- 选择框 -->
                <el-select v-else-if="item.type=='select'" v-model="form.select" :placeholder="item.label">
                    <el-option v-for="(item,index) in item.options" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
                
                <!-- 日期组合 -->
                <el-form-item v-else-if="item.type=='dateGroup'">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>    
            </el-form-item>
            <div class="button-box" style="width:100%">
                <el-button @click="advancSeachfn()" type="text">高级搜索</el-button>
                <el-button type="primary">开始搜索</el-button>
            </div>
    </el-form>
    <!-- Form end -->
    </div>
</template>
<style lang="less">
.form-box{
    display: flex;
    flex-wrap:wrap;
    // justify-content: flex-start;
    .form-item{
        min-width: 300px;
    }
    .button-box{
        text-align: right;
    }
    .visibleinput{
        display: none;
    }
    .showinput{
        display: block
    }
}
</style>
<script>
import Vue from "vue";
export default {
    props:['searchForm'],
    data () {
        return {
          advancSeach: false,
          form:{
              select:[]
          }
        }
    },
    computed: {
        advancSeachfn () {
            // document.querySelectorAll(".allinput").style.display = 'block'
        }
    },
    mounted () {
       
    },
    methods: {
    //    showInput (item,index) {
    //        console.log(item)
    //    }
    }
}
</script>