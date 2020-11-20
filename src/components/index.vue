<template>
    <div>
            <line-chart :type = "cureCnt"></line-chart>
            <province></province>
    </div>
</template>

<script>

import LineChart from '@/components/element/LineChart.vue';
import Province from '@/components/element/Province'



export default {
    components:{
        LineChart,Province
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
            this.$axios(this.testUrl+'Cov19Cn/realTimeRecord').then(res=>{
                this.cov19Record = res.data;
            }) 
        },
        //查询所有省份
        queryProvince(){
            this.$axios(this.testUrl+'location/allProvinces').then(res=>{
                this.provinces = res.data;
            }) 
        },
        //下拉框修改时显示执行的操作 
        handleChange(){
            console.log(this.selectProvince);
        }
        
      
    }
}
</script>

<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>