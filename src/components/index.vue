<template>
    <div>
            <line-chart :type = "cureCnt" id="lineChart"></line-chart>
            <bar-chart></bar-chart>
            <province></province>
    </div>
</template>

<script>

import LineChart from '@/components/element/LineChart.vue';
import Province from '@/components/element/provinces.vue';
import barChart from '@/components/element/barChart.vue';



export default {
    components:{
        LineChart,Province,barChart
        
    },
    data(){
        return {
            cureCnt:"cureCnt",
            dieCnt:"dieCnt",
            sureCnt:"sureCnt",
            doubtCnt:"doubtCnt",
            //使用全局定义的变量 url
            url:this.url.baseUrl,
            testUrl:this.url.testUrl,
            cov19Record:Object,
            aliCov19Record:Object,
            //远程查询的省份下拉框
            provinces:[],
            //选中的省份
            selectProvince:'',            
        }
    },
    //渲染之前就预先加载数据
    mounted(){
        this.queryProvince();
    },
    methods:{
        //初始化实时数据
        getRealTimeRecord(){
            // this.$axios(this.testUrl+'Cov19Cn/realTimeRecord').then(res=>{
            this.$axios(this.url+'Cov19Cn/realTimeRecord').then(res=>{
                this.cov19Record = res.data;
            }) 
        },
        //查询所有省份
        queryProvince(){
            // this.$axios(this.testUrl+'location/allProvinces').then(res=>{
            this.$axios(this.url+'location/allProvinces').then(res=>{
                this.provinces = res.data;
            }) 
        },
        //下拉框修改时显示执行的操作 
        handleChange(){

        }
        
      
    }
}
</script>

<style scoped>
    #lineChart {
        margin-top: 10px;
    }


</style>