<template>
    <div>
   <!-- Form 表单编写 start -->
    <el-form :class="[visibleinput?'showform-box':'visibleform-box','form-box']" ref="searchform" label-width="100px" >
            <el-form-item size="small" class="form-item" v-for="(item,index) in searchOptions" :key="index" :label="item.label" v-show="item.show?showinput:visibleinput">
                <!-- 文本框 -->
                <el-input ref="myinput" v-if="item.type=='text'"  :placeholder="item.label"  @input="changeInput(item.cb,$event)" v-model="item.value"></el-input>

                <!-- 选择框 -->
                <el-select class="form-select"  @change="changeInput(item.cb,$event)" v-else-if="item.type=='select'" v-model="item.value" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in item.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
                <!-- 日期组合 -->
                <el-form-item size="small" class="dateGroup" v-else-if="item.type=='dateGroup'">
                        <el-date-picker v-model="item.options[0].value" @input="changeInput(item.options[0].cb,$event,'date')" type="date" placeholder="开始时间" ></el-date-picker>
                        <span class="to-line">-</span>
                        <el-date-picker class="enddate-box" v-model="item.options[1].value" @input="changeInput(item.options[1].cb,$event,'date')" type="date" placeholder="结束时间"></el-date-picker>
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
          showinput:true
        //   visibleinput:false // true为高级搜索 false为普通搜索
        }
    },
    computed: {
       visibleinput () {
        return this.$store.state.dataTable.visibleinput;
       }
    },
    mounted () {
       
    },
    methods: {
        advancSeachfn () { // 高级搜索与普通搜索转换
            this.$store.commit("visibleinputHandle")
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
.form-box{
    .form-item {
        width: 340px;
        flex-shrink: 1;
    }
    .form-select{
        width: 100%;
        margin-left: 0;
    }
    .el-form-item.dateGroup{
        width: 240px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #d8dce5;
        .to-line{
            font-size: 14px;
            color: #d8dce5;
        }
        .el-form-item__content{
            width: 260px;
            display: flex;
            flex: 1;
            .enddate-box{
                .el-input__suffix{
                    right: 17px;
                }
                .el-input__prefix{
                    display: none;
                }
                input{
                    padding-left: 17px;
                }
            }
            input{
                padding-right:0px;
                border:0px;
                background: none;
            }
        }
        
    }
}
.showform-box{
    margin-top: 0 !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-form-item{
        margin-bottom: 10px;
    }
    
    .button-box{
        width:100%;
        text-align:right;
    }
}
.visibleform-box{
    display: block;
    .form-item{
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
