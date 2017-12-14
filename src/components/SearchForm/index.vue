<template>
    <div>
   <!-- Form 表单编写 start -->
    <el-form :class="[visibleinput?'showform-box':'visibleform-box']" ref="searchform" label-width="100px" >
            <el-form-item size="small" class="form-item" v-for="(item,index) in searchOptions" :key="index" :label="item.label" v-show="item.show?showinput:visibleinput">
                <!-- 文本框 -->
                <el-input ref="myinput" v-if="item.type=='text'"  :placeholder="item.label"  @input="changeInput(item.cb,$event)" v-model="item.value"></el-input>

                <!-- 选择框 -->
                <el-select  @change="changeInput(item.cb,$event)" v-else-if="item.type=='select'" v-model="item.value" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in item.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
                <!-- 日期组合 -->
                <el-form-item size="small" class="dateGroup" v-else-if="item.type=='dateGroup'">
                    <el-col :span="11">
                        <el-date-picker v-model="item.options[0].value" @input="changeInput(item.options[0].cb,$event,'date')" type="date" placeholder="开始时间" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="item.options[1].value" @input="changeInput(item.options[1].cb,$event,'date')" type="date" placeholder="结束时间"  style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>    


            </el-form-item>
            <div class="button-box">
                <el-button size="small" @click="searchStart" type="primary">开始搜索</el-button>
                <el-button class="seach-mode" size="small" @click="advancSeachfn()" type="text">{{visibleinput?"普通搜索":"高级搜索"}}</el-button>
                
            </div>
    </el-form>
    <!-- Form end -->
    </div>
</template>
<script>
import Vue from "vue";
export default {
    props:{
        value: {
            type: Boolean,
            default: false
        },
        searchOptions: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
          advancSeach: false,
          showinput:true,
          visibleinput:false // true为普通搜索 false为高级搜索
        }
    },
    computed: {
       
    },
    mounted () {
       
    },
    methods: {
        advancSeachfn () { // 高级搜索与普通搜索转换
            this.visibleinput = !this.visibleinput
        },
        changeInput (cb,event,type) { // 表单内容双向绑定 把表单输入的内容交给父页面进行操作
            var val = '';
            if(type=="date"){
                var date = new Date(event)
                var month = date.getMonth()+1;
                    month = month*1<10?'0'+month:month;
                var day = date.getDate()*1<10?'0'+date.getDate():date.getDate();
                    date = date.getFullYear()+'-'+month+'-'+day;
                val = date;
            }else{
                val = event;
            }
            this.$emit('changeform',cb,val)
        },
        searchStart () { //点击搜索按钮 交给父页面操作
            this.$emit('seachstart')
        }
    },
    watch: {
        visibleinput: function(val){
            if(!val){ //普通搜索的时候
                 this.$emit('visiblesome')
            }
        }
    }
}
</script>
<style lang="less">
.showform-box{
    margin-top: 0 !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item{
        margin-bottom: 10px;
    }
    .el-form-item{
        width: 300px;
    }
    .dateGroup{
        width: 290px;
        text-align: center;
        input{
            padding-right:0px;
        }
    }
    .button-box{
        width:100%;
        text-align:right;
    }
}
.visibleform-box{
    display: block;
    .form-item{
        width:300px;
        float: left;
    }
    .seach-mode{
        float:right;
    }
    .button-box{
        button{
            margin: 0 10px;
        }
    }
}
</style>
