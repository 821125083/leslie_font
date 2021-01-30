<template>
    <div>
        <el-select v-model="selectedCity" @change="handleSelectChange()"  class="selector">
            <el-option v-for="item in provinces" :key="item.id" :label="item.provinceName" :value="item.id" >

            </el-option>
        </el-select>
        <span :style="{margin:'10px'}">{{selectedName}}</span>
        <span :style="{margin:'10px'}">总确诊人数:{{confirmedSum}}</span>
        <span :style="{margin:'10px'}">总治愈人数:{{cureSum}}</span>
        <span :style="{margin:'10px'}">总死亡人数:{{deathSum}}</span>
        <div id="barCharts" :style="{width: '100%', height: '500px'}">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            url:this.url.testUrl,    //测试环境url
            // url:this.url.baseUrl,    //线上环境url
            provinceNames:Array,     //所有省份数据数组
            totalCured:Array,        //所有治愈数据数组
            totalDeath:Array,
            totalConfirmed:Array,
            confirmedSum:0,          //所有确诊总数
            deathSum:0,
            cureSum:0,
            provinces:[],            //下拉框省份
            selectedCity:-1,         //下拉框已选择的省份
            
        }
    },
    computed:{
        selectedName(){
            // this.provinces.forEach(province=>{
            //     if(province.id ==  this.selectedCity){
            //         console.log(province.id);
            //         console.log(province.provinceName);
            //         return province.provinceName;
            //     }
            // })
        }
    },
    mounted(){
        //加载省份数据
        this.initProvinceData();
        //加载数据
        this.initBarData();
        
    },
    methods:{
        //下拉框选择时
        handleSelectChange(){
            if(this.selectedCity!=-1){
                //加载不同省份数据
                this.$axios(this.url+"Cov19Alibaba/queryProvinceBarChart/"+this.selectedCity).then(res=>{
                    if(res.data.code == 200){
                        //封装他条形图数据
                        this.setData(res.data.data,this.selectedCity);
                        //表格数据修改
                        this.initBarCharts();
                        //从新计算
                        this.countSum();
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }else{
                //加载全国数据
                this.initBarData();
            }
                
            
        },
        //加载所有城市信息
        initProvinceData(){
            this.$axios(this.url+"location/allProvinces").then(res=>{
                this.provinces = res.data.data;
            })
        },
        //加载全国数据
        initBarData(){
            this.$axios(this.url+"Cov19Alibaba/initBarData").then(res=>{
                if(res.data.code == 200){
                    this.setData(res.data.data,-1);
                    //画图
                    this.initBarCharts();
                    this.countSum();
                }else{
                    this.$message.error(res.data.message)
                }   
            })
        },
        //计算死亡、治愈、确诊人数总和
        countSum(){
            this.confirmedSum = 0;
            this.deathSum = 0;
            this.cureSum = 0
            this.totalConfirmed.forEach(confirm=>{
                this.confirmedSum += parseInt(confirm);
            });
            this.totalDeath.forEach(dea=>{
                this.deathSum+=dea
            });
            this.totalCured.forEach(cure=>{
                this.cureSum += cure
            })
        },
        /**
         * 封装数据
         */
        setData(data,provinceId){
            var provinceNames = new Array();
            var totalCured = new Array();
            var totalDeath = new Array();
            var totalConfirmed = new Array();
            data.forEach(province=>{
                if(provinceId == -1){
                    provinceNames.push(province.provinceName);
                }else{
                    provinceNames.push(province.cityName);
                }
                totalCured.push(province.totalCured);
                totalDeath.push(province.totalDeath);
                totalConfirmed.push(province.totalConfirmed);
            })
            this.provinceNames = provinceNames;
            this.totalCured = totalCured;
            this.totalDeath = totalDeath;
            this.totalConfirmed = totalConfirmed;
        },
        initBarCharts(){
            //选取绘图的元素
            var barCharts = this.$echarts.init(document.getElementById("barCharts"));
            //绘图的参数
            var option = {
                color:['#ffa','#3398DB','#e5323e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            
                        type: 'shadow'        
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                {
                        type: 'category',
                        data: this.provinceNames,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    ],
                    yAxis: [
                    {
                        type: 'value'
                    }
                    ],
                    series: [
                    {
                        name: '确诊总人数',
                        type: 'bar',
                        barWidth: '25%',
                        data: this.totalConfirmed
                    },
                    {
                        name: '治愈总人数',
                        type: 'bar',
                        barWidth: '25%',
                        data: this.totalCured
                    },
                    {
                        name: '死亡总人数',
                        type: 'bar',
                        barWidth: '25%',
                        data: this.totalDeath
                    },
                    
                ]
                }
                barCharts.setOption(option);
            },

    }
}
</script>

<style scoped>
    
    .selector {
        margin-left: 10px;
        margin-top: 20px;
        width: 150px;

    }
</style>