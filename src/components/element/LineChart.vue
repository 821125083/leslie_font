<template>
    <div id="lineChart"> 
        <el-select v-model="type" placeholder="请选择" @change="handleChange()" id="select">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>     
        <el-link @click="showMap(true)" class="link" :underline="false"><i class="el-icon-s-data"></i>查看全国主要城市疫情地图</el-link>
        <el-link @click="showMap(false)" class="link" :underline="false"><i class="el-icon-position"></i>查看全国各省疫情地图</el-link>

        <div>
            <span id="title">疫情趋势图</span>
            <div id="mycharts" :style="{width: '100%', height: '500px'}">
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    mounted(){
        this.initChartData();
    },
    created(){
       
    },
    computed:{
        
    },
    data(){
        return{
            selectType:"leslie",
            type:"all",
            types: [
                {
                    value: 'all',
                    label: '所有'
                },
                {
                value: 'cureCnt',
                label: '治愈人数'
                }, {
                value: 'doubtCnt',
                label: '疑似病例'
                }, {
                value: 'dieCnt',
                label: '死亡人数'
                }, {
                value: 'sureCnt',
                label: '确诊人数'
                }], 
            //用于前端展示折线图的数据
            EveryDayData:[],
            //时间横轴
            days:Array,
            cureCntAry:Array,
            dieCntAry:Array,
            sureCntAry:Array,
            doubtCntAry:Array,
            checkedTypes:[1],
            // url:this.url.testUrl+'Cov19Alibaba/Cov19TrendLineChart'
            url:this.url.baseUrl+'Cov19Alibaba/Cov19TrendLineChart'
        }
    },
    methods:{
        showMap(flag){
            if(flag){
                //页面跳转
                window.open('#/cn/cnMap','_blank');
            }else{
                window.open("#/cn/cnMap2",'_blank')
            }
        },
        // 选择折线图展示类型
        handleChange(){
            this.initChartData();
        },
        initChartData(){ // 发起请求渲染折线图
            this.$axios(this.url).then(res=>{
                if(res.data.code = 200){
                    let days = new Array();
                    var cureCntAry = new Array();
                    var dieCntAry = new Array();
                    var sureCntAry = new Array();
                    var doubtCntAry = new Array();
                    res.data.data.forEach(trend=>{
                        days.push(trend.day);
                        if(this.type == "cureCnt"){
                            cureCntAry.push(trend.cureCnt);
                        }else if(this.type == "dieCnt"){
                            dieCntAry.push(trend.dieCnt);
                        }else if(this.type == "sureCnt"){
                            sureCntAry.push(trend.sureCnt);
                        }else if(this.type == "doubtCnt"){
                            doubtCntAry.push(trend.doubtCnt);
                        }else {
                            cureCntAry.push(trend.cureCnt);
                            dieCntAry.push(trend.dieCnt);
                            sureCntAry.push(trend.sureCnt);
                            doubtCntAry.push(trend.doubtCnt);
                        }
                    })
                    this.days = days;
                    this.cureCntAry = cureCntAry;
                    this.dieCntAry = dieCntAry;
                    this.sureCntAry = sureCntAry;
                    this.doubtCntAry = doubtCntAry;
                    this.drawLineChart(days,cureCntAry);
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        drawLineChart(days,cureCntAry,dieCntAry){
            var chart = this.$echarts.init(document.getElementById("mycharts"));
            var option = {
                 tooltip: {
                    trigger: 'axis'
                },
                xAxis:{
                    type: 'category',
                    data:this.days,
                },
                yAxis:{
                    type:'value'
                },
                series:[{
                        name:"治愈人数",
                        data:this.cureCntAry,
                        type: 'line'
                    },
                    {
                        name:"死亡人数",
                        data:this.dieCntAry,
                        type: 'line'
                    },
                    {
                        name:"确诊人数",
                        data:this.sureCntAry,
                        type: 'line'
                    },
                    {
                        name:"疑似病例",
                        data:this.doubtCntAry,
                        type: 'line'
                    },
                ]
            };
            chart.setOption(option);
        }
    },
    
}
</script>

<style scoped>
    .select {
        margin-top : 20px
    }

    .link {
        margin-left: 30px;
    }

    .lineChart {
        margin: 15px;
    }
</style>
