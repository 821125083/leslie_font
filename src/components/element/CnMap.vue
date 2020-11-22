<template>
    <div>
        <div id="mapChart" :style="{width: '100%', height: '600px'}">

        </div>
        <!-- <el-button ></el-button> -->
    </div>
</template>

<script>

import 'echarts/extension/bmap/bmap'

export default {
    data(){
        return {
            citys:Array,
            url : this.url.testUrl,
            geoCoordMap : {
                    '合肥':[117.27,31.86],
                    '南京':[118.78,32.04],
                    '深圳':[114.07,22.62],
                    '南昌':[115.89	,28.68],
                    '长沙':[113,28.21],
                    '成都':[104.06,30.67],
                    '南宁':[108.33,22.84],
                    '贵阳':[106.71,26.57],
                    '济南':[117,36.55],
                    '青岛':[120.33,36.05],
                    '温州':[120.63,28.05],
                    '郑州':[113.63,34.76],
                    '信阳':[114.08,32.13],
                    '乌鲁木齐':[87.68,43.77],
                    '哈尔滨':[126.63,45.75],
                    '中国台湾':[121.565,25.03],
                    '西安':[108.95,34.23],
                    '大连':[121.61,38.93],
                    '昆明':[102.95,25.23],
                    '三亚':[110.35,20.02],

                },
            
        }
    },
    mounted(){
        this.loadData();
        // console.log(this.citys);
    },
    created(){
    },
    computed:{

    },
    props:{
    },
    methods:{
        //加载数据并且画图
        loadData(){
            var citys = [];
            this.$axios.post(this.url + '/Cov19Alibaba/loadCityData',this.geoCoordMap).then(res=>{
                if(res.data.code == 200){
                    res.data.data.forEach(city=>{
                        citys.push({
                            value: city.totalConfirmed,
                            name: city.cityName
                        })
                    })
                    //加载完数据后再画图
                    this.initMap(citys,this.geoCoordMap);
                }
            })
        },
        //绘图
        initMap(citys,map){
            var mapChart = this.$echarts.init(document.getElementById("mapChart"));
            var geoCoordMap = map;
            
            // 设置数据
            var convertData =  function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            // 绘图主要配置
            var option = {
                title: {
                    text: '全国主要城市疫情数据',
                    left: 'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                bmap: {
                    // 地图中心
                    center: [104.114, 38.550],
                    // 视距
                    zoom: 5,
                    roam: true,
                },
                series : [
                    {
                        name: '累计确诊人数',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: convertData(citys),
                        //大小
                        symbolSize: function (val) {
                            return val[2] / 20;
                        },
                        encode: {
                            value: 2
                        },
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        itemStyle: {
                            color: 'purple'
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }
                ]
            };
            mapChart.setOption(option); 
        }
    }
}
</script>

<style scope>

</style>