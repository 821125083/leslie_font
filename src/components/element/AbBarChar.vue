<template>
    <div>
        <!-- <el-link>
            {{url}}    
        </el-link> -->
        <!-- <el-button @click="test">click</el-button> -->
        <el-select v-model="searchType" placeholder="请选择" @change="changeSearchType()">
            <el-option v-for="item in searchTypeList"
            :key="item.id"
            :value="item.id"
            :label="item.name">

            </el-option>
        </el-select>
        <el-link :underline="false" @click="toWorldMap()"><i class="el-icon-eleme" aria-hidden="true"></i>
            全球疫情地图
        </el-link>
        <div id="barCharts" :style="{width: '100%', height: '500px'}">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchTypeList:[{
                id:1,
                name:'确诊人数'
            },{
                id:2,
                name:'死亡人数'
            },{
                id:3,
                name:'治愈人数'
            },],
            // url:this.url.testUrl,
            url:this.url.baseUrl,
            data:[],
            countryName:[],
            searchType:1,
            title:'确诊总人数',
            color:['#ffa'],
        }
    },
    mounted(){
        this.initData();
        // this.initBarChart();
    },
    methods:{
        toWorldMap(){
            window.open('#/aboard/worldMap','_blank');
        },
        changeSearchType(){
            this.data = [];
            this.countryName = [];
            if(this.searchType === 1){
                this.title = '确诊总人数';
                this.color = ['#ffa'];
            }else if(this.searchType ===2){
                this.title = '死亡总人数';
                this.color = ['#e5323e'];

            }else{
                this.title = '治愈总人数';
                this.color = ['#3398DB'];
            }
            this.initData();
        },
        initData(){
            this.$axios(this.url+'/AbCov19/initAllAbData/20/'+this.searchType).then(res => {
                res.data.data.forEach(da =>{
                        this.countryName.push(da.name);
                        this.data.push(da.heal)
                    }
                )
                this.initBarChart();
            })
        },
        initBarChart(){
            var barCharts = this.$echarts.init(document.getElementById("barCharts"));
            var option = {
                color:this.color,
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
                        data: this.countryName,
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
                        name: this.title,
                        type: 'bar',
                        barWidth: '60%',
                        data: this.data
                    },
                ]
                }
                barCharts.setOption(option);
            },
        }
    
}
</script>

<style scoped>

</style>