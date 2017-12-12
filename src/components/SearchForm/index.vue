<template>
    <div>
   <!-- Form 表单编写 start -->
    <el-form ref="form" :model="form" label-width="80px" v-for="(item,index) in searchForm.searchType" :key="index">
        <el-form-item :label="item.label">
            <!-- 文本框 -->
            <el-input v-if="item.type=='text'" :placeholder="item.label" v-model="form.name"></el-input>
            
            <!-- 选择框 -->
            <el-select v-else-if="item.type=='select'" v-model="form.region" :placeholder="item.label">
                <el-option v-for="(item,index) in item.options" :key="'option'+index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            
            <!-- 日期组合 -->
            <el-form-item v-else-if="item.type=='dateGroup'">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>    
        </el-form-item>
        <!-- <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item> -->
            <!-- <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>取消</el-button> -->
        </el-form-item>
        </el-form>
      <!-- {{searchForm}} -->
      <!-- Form end -->
    </div>
</template>
<style lang="less">
</style>
<script>
import Vue from "vue";
export default {
    props:['searchForm'],
    data () {
        return {
          form:{}
        }
    },
    mounted () {
       
    },
    methods : {
       
    }
}
</script>