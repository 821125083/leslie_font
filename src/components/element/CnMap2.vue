<template>
    <div class="box">
        <el-select v-model="type" placeholder="请选择" @change="handleChange()" id="select">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <div id="map"></div>
    </div>
</template>

<script>

import china from 'echarts/map/js/china.js'

export default {
    data(){
        return {
            url : this.url.baseUrl,
            // url : this.url.testUrl,
            provinceData:[{name:'南海诸岛',value:0}],
            type:'1',
            types: [{
                value: '1',
                label: '治愈人数'
                },  {
                value: '3',
                label: '死亡人数'
                }, {
                value: '4',
                label: '确诊人数'
                }], 
            pieces: [      
                // 自定义每一段的范围，以及每一段的文字
                { gte: 10000, lte: 100000},
                { gte: 5000, lte: 9999},
                { gte: 1500, lte: 4999},
                { gte: 500, lte: 1499},
                { gte: 10, lte: 499},
                { gte: 0, lte: 9 }  
            ],
            formatter:'{b} - 治愈总人数:{c}',

        }
    },
    mounted(){
        this.initProvincesData();
    },
    methods:{
        // 选择下拉框
        handleChange(){
            this.$axios(this.url + '/Cov19Alibaba/initProvincesData').then(res=>{
                if(res.data.code == 200){
                    //请求成功
                    this.provinceData = new Array();
                    if(this.type == 1){  //治愈人数
                        var dataList = [{name:'南海诸岛',value:0}];
                        // 封装数据
                        res.data.data.forEach(da => {dataList.push({name:da.provinceName,value:da.totalCured})});
                        //颜色对应数据
                        this.pieces = [      
                            // 自定义每一段的范围，以及每一段的文字
                            { gte: 10000, lte: 100000},
                            { gte: 5000, lte: 9999},
                            { gte: 1500, lte: 4999},
                            { gte: 500, lte: 1499},
                            { gte: 10, lte: 499},
                            { gte: 0, lte: 9 }  
                        ],
                        this.formatter = '{b} - 治愈总人数:{c}'
                        this.drawMap(dataList);
                    } 
                    if(this.type == 3){  //死亡人数
                        var dataList = [{name:'南海诸岛',value:0}];
                        // 封装数据
                        res.data.data.forEach(da => {dataList.push({name:da.provinceName,value:da.totalDeath})});
                        this.pieces =[
                            { gte: 51, lte: 5000},
                            { gte: 41, lte: 50},
                            { gte: 21, lte: 40},
                            { gte: 11, lte: 20},
                            { gte: 1, lte: 10},
                            { gte: 0, lte: 1 } 
                        ];
                        this.formatter = '{b} - 死亡总人数:{c}'
                        this.drawMap(dataList);
                    } 
                    if(this.type == 4){  //确诊人数
                        var dataList = [{name:'南海诸岛',value:0}];
                        // 封装数据
                        res.data.data.forEach(da => {dataList.push({name:da.provinceName,value:da.totalConfirmed})});
                        this.pieces = [      
                            // 自定义每一段的范围，以及每一段的文字
                            { gte: 10000, lte: 100000},
                            { gte: 5000, lte: 9999},
                            { gte: 1500, lte: 4999},
                            { gte: 500, lte: 1499},
                            { gte: 10, lte: 499},
                            { gte: 0, lte: 9 }  
                        ],
                        this.formatter = '{b} - 确诊总人数:{c}'
                        this.drawMap(dataList);
                    }   
                }else{
                    this.$message.error(res.data.message);
                }
            })
        },
        // 远程请求数据
        initProvincesData(type){
            this.$axios(this.url + '/Cov19Alibaba/initProvincesData').then(res=>{
                if(res.data.code == 200){
                    var dataList = [];
                    res.data.data.forEach(da=>{
                        // 封装疫情数据
                            dataList.push({
                                name:da.provinceName,
                                value:da.totalConfirmed
                            });
                        // 请求数据成功，绘图
                    })
                    this.drawMap(dataList);
                }else{
                    this.$message.error('alibaba jie kou beng le');
                }
            })
        },
        //作图
        drawMap(dataList){
            // 基于准备好的dom，初始化echarts实例
            var mapChart = this.$echarts.init(document.getElementById('map'));
            mapChart.setOption({
                backgroundColor: '#fff', //背景颜色
                title: {
                    text: '全国各省疫情数据',
                    x:'center',
                },
                legend: { //图例组件。
                    orient: 'vertical',
                    y: 'bottom',
                    x:'right',
                    textStyle: {
                        color: '#fff'
                    }
                },
                //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
                visualMap: {
                    pieces: this.pieces,  // 显示区间
                    inRange: {
                        color: ['#d1d4da', '#bacae8', '#96b5ef', '#6797ef', '#3375e4', '#035cf5']  // 不同区间的颜色
                    },
                    textStyle: {
                        color: '#fff' // 文本颜色
                    },
                },
                // 提示框，鼠标移入
                tooltip:{
                    show:true, //鼠标移入是否触发数据
                    trigger: 'item', //出发方式
                    formatter:this.formatter
                },
                //配置地图的数据，并且显示
                series:[
                    {
                        name:'地图',
                        type: 'map',  //地图种类
                        map: 'china', //地图类型。
                        // data: this.provinceData,
                        data:dataList,
                        itemStyle: { //地图区域的多边形 图形样式。
                            emphasis:{ //高亮状态下的样试
                                label:{
                                    show:true,
                                }
                            }
                        },
                        zoom:1,//放大比例
                        label: {  //图形上的文本标签，可用于说明图形的一些数据信息
                            show:true,
                        },
                    },
                    {
                        type:'scatter',
                        showEffectOn: 'render',//配置什么时候显示特效
                        coordinateSystem:'geo',//该系列使用的坐标系
                        symbolSize:120,//标记的大小
                        zlevel:99999
                    },
                ]
            })
        }
    }
}
</script>

<style scoped>
.box{
    margin-top:20px;
}
#map{
    width:100%;
    height:720px;
}
</style>