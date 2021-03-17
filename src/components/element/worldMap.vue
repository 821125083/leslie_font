<template>
    <div class="box">
        <el-select v-model="type" placeholder="请选择" @change="handleChange()" id="select">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select> <span>{{text}}:{{count}}</span>
        <div id="map"></div>
    </div>
</template>

<script>

import china from 'echarts/map/js/china.js'
import world from 'echarts/map/js/world.js'

export default {
    data(){
        return {
            global:Object,
            text:"全球确诊总人数",
            count:0,
            country :{
                '阿富汗':'Afghanistan',
                '新加坡':'Singapore',
                '安哥拉':'Angola',
                '阿尔巴尼亚':'Albania',
                '阿联酋':'United Arab Emirates',
                '阿根廷':'Argentina',
                '亚美尼亚':'Armenia',
                '法属南半球和南极领地':'Fr. S. Antarctic Lands',
                '澳大利亚':'Australia',
                '奥地利':'Austria',
                '阿塞拜疆':'Azerbaijan',
                '布隆迪':'Burundi',
                '比利时':'Belgium',
                '贝宁':'Benin',
                '布基纳法索':'Burkina Faso',
                '孟加拉':'Bangladesh',
                '保加利亚':'Bulgaria',
                '巴哈马':'Bahamas',
                '波斯尼亚和黑塞哥维那':'Bosnia and Herz.',
                '白俄罗斯':'Belarus',
                '伯利兹':'Belize',
                '百慕大':'Bermuda',
                '玻利维亚':'Bolivia',
                '巴西':'Brazil',
                '文莱':'Brunei',
                '不丹':'Bhutan',
                '博茨瓦纳':'Botswana',
                '中非共和国':'Central African Rep.',
                '加拿大':'Canada',
                '瑞士':'Switzerland',
                '智利':'Chile',
                '中国':'China',
                '象牙海岸':'Ivory Coast',
                '喀麦隆':'Cameroon',
                '刚果（金）':'Dem. Rep. Congo',
                '刚果（布）':'Congo',
                '哥伦比亚':'Colombia',
                '哥斯达黎加':'Costa Rica',
                '古巴':'Cuba',
                '北塞浦路斯':'Northern Cyprus',
                '塞浦路斯':'Cyprus',
                '捷克':'Czech Rep.',
                '德国':'Germany',
                '吉布提':'Djibouti',
                '丹麦':'Denmark',
                '多明尼加共和国':'Dominican Republic',
                '阿尔及利亚':'Algeria',
                '厄瓜多尔':'Ecuador',
                '埃及':'Egypt',
                '厄立特里亚':'Eritrea',
                '西班牙':'Spain',
                '爱沙尼亚':'Estonia',
                '埃塞俄比亚':'Ethiopia',
                '芬兰':'Finland',
                '斐济':'Fiji',
                '福克兰群岛':'Falkland Islands',
                '法国':'France',
                '加蓬':'Gabon',
                '英国':'United Kingdom',
                '格鲁吉亚':'Georgia',
                '加纳':'Ghana',
                '几内亚':'Guinea',
                '冈比亚':'Gambia',
                '几内亚比绍':'Guinea-Bissau',
                '赤道几内亚':'Equatorial Guinea',
                '希腊':'Greece',
                '格陵兰':'Greenland',
                '危地马拉':'Guatemala',
                '法属圭亚那':'French Guiana',
                '圭亚那':'Guyana',
                '洪都拉斯':'Honduras',
                '克罗地亚':'Croatia',
                '多米尼加':'Dominican Rep.',
                '海地':'Haiti',
                '匈牙利':'Hungary',
                '印度尼西亚':'Indonesia',
                '印度':'India',
                '爱尔兰':'Ireland',
                '伊朗':'Iran',
                '伊拉克':'Iraq',
                '冰岛':'Iceland',
                '以色列':'Israel',
                '意大利':'Italy',
                '牙买加':'Jamaica',
                '约旦':'Jordan',
                '日本本土':'Japan',
                '哈萨克斯坦':'Kazakhstan',
                '肯尼亚':'Kenya',
                '吉尔吉斯斯坦':'Kyrgyzstan',
                '柬埔寨':'Cambodia',
                '韩国':'Korea',
                '科特迪瓦':"Côte d'Ivoire",
                '科索沃':'Kosovo',
                '科威特':'Kuwait',
                '老挝':'Lao PDR',
                '黎巴嫩':'Lebanon',
                '利比里亚':'Liberia',
                '利比亚':'Libya',
                '斯里兰卡':'Sri Lanka',
                '莱索托':'Lesotho',
                '立陶宛':'Lithuania',
                '卢森堡':'Luxembourg',
                '拉脱维亚':'Latvia',
                '摩洛哥':'Morocco',
                '摩尔多瓦':'Moldova',
                '马达加斯加':'Madagascar',
                '墨西哥':'Mexico',
                '北马其顿':'Macedonia',
                '马里':'Mali',
                '缅甸':'Myanmar',
                '黑山':'Montenegro',
                '蒙古':'Mongolia',
                '莫桑比克':'Mozambique',
                '毛里塔尼亚':'Mauritania',
                '马拉维':'Malawi',
                '马来西亚':'Malaysia',
                '纳米比亚':'Namibia',
                '新喀里多尼亚':'New Caledonia',
                '尼日尔':'Niger',
                '尼日利亚':'Nigeria',
                '尼加拉瓜':'Nicaragua',
                '荷兰':'Netherlands',
                '挪威':'Norway',
                '尼泊尔':'Nepal',
                '新西兰':'New Zealand',
                '阿曼':'Oman',
                '巴基斯坦':'Pakistan',
                '巴拿马':'Panama',
                '秘鲁':'Peru',
                '菲律宾':'Philippines',
                '巴布亚新几内亚':'Papua New Guinea',
                '波兰':'Poland',
                '波多黎各':'Puerto Rico',
                '北朝鲜':'Dep. Rep. Korea',
                '葡萄牙':'Portugal',
                '巴拉圭':'Paraguay',
                '卡塔尔':'Qatar',
                '罗马尼亚':'Romania',
                '俄罗斯':'Russia',
                '卢旺达':'Rwanda',
                '西撒哈拉':'W.Sahara',
                '沙特阿拉伯':'Saudi Arabia',
                '苏丹':'Sudan',
                '南苏丹':'S. Sudan',
                '塞内加尔':'Senegal',
                '所罗门群岛':'Solomon Is.',
                '塞拉利昂':'Sierra Leone',
                '萨尔瓦多':'El Salvador',
                '索马里兰':'Somaliland',
                '索马里':'Somalia',
                '塞尔维亚':'Serbia',
                '苏里南':'Suriname',
                '斯洛伐克':'Slovakia',
                '斯洛文尼亚':'Slovenia',
                '瑞典':'Sweden',
                '斯威士兰':'Swaziland',
                '叙利亚':'Syria',
                '乍得':'Chad',
                '多哥共和国':'Togo',
                '泰国':'Thailand',
                '塔吉克斯坦':'Tajikistan',
                '土库曼斯坦':'Turkmenistan',
                '东帝汶':'East Timor',
                '特里尼达和多巴哥':'Trinidad and Tobago',
                '突尼斯':'Tunisia',
                '巴勒斯坦':'Palestine',
                '土耳其':'Turkey',
                '坦桑尼亚':'Tanzania',
                '乌干达':'Uganda',
                '乌克兰':'Ukraine',
                '乌拉圭':'Uruguay',
                '美国':'United States',
                '乌兹别克斯坦':'Uzbekistan',
                '委内瑞拉':'Venezuela',
                '越南':'Vietnam',
                '瓦努阿图':'Vanuatu',
                '西岸':'West Bank',
                '也门':'Yemen',
                '南非':'South Africa',
                '赞比亚':'Zambia',
                '津巴布韦':'Zimbabwe',
                '法属波利尼西亚':'Fr. Polynesia',
           },
            url : this.url.baseUrl,
            // url : this.url.testUrl,
            type:'4',
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
                { gte: 1000000, lte: 100000000},
                { gte: 500000, lte: 999999},
                { gte: 150000, lte: 499999},
                { gte: 50000, lte: 149999},
                { gte: 1000, lte: 49999},
                { gte: 0, lte: 999 }  
            ],
            formatter:'{b} - 确诊总人数:{c}',

        }
    },
    mounted(){
        this.initProvincesData();
        this.loadCount();
    },
    watch:{
        type(){
            this.loadCount();
            
        }
    },
    methods:{
        // 全球确诊、治愈、死亡总人数
        loadCount(){
            this.$axios(this.url + '/AbCov19/selectTheWorldCount').then(res => {
                this.global = res.data.data;
                if(this.type == 1){
                    this.text = '全球治愈总人数';
                    this.count  = this.global.heal;
                }else if (this.type == 3){
                    this.text = '全球死亡总人数';
                    this.count  = this.global.dead;
                }else{
                    this.text = '全球确诊总人数';
                    this.count  = this.global.confirm;

                }
            })
        },
        // 选择下拉框
        handleChange(){
            this.$axios(this.url + '/AbCov19/initAllCountryData').then(res=>{
                if(res.data.code == 200){
                    //请求成功
                    if(this.type == 1){  //治愈人数
                        var dataList = [];
                        // 封装数据
                        res.data.data.forEach(da => {
                            if(this.country[da.name]){
                                    dataList.push({name:this.country[da.name],value:da.heal})
                                }
                            });
                        //颜色对应数据
                        this.pieces = [      
                            // 自定义每一段的范围，以及每一段的文字
                            { gte: 10000000, lte: 100000000},
                            { gte: 500000, lte: 9999999},
                            { gte: 150000, lte: 499999},
                            { gte: 50000, lte: 149999},
                            { gte: 1000, lte: 49999},
                            { gte: 0, lte: 999 }  
                        ],
                        this.formatter = '{b} - 治愈总人数:{c}'
                        this.drawMap(dataList);
                    } 
                    if(this.type == 3){  //死亡人数
                        var dataList = [];
                        // 封装数据
                        res.data.data.forEach(da => {
                                if(this.country[da.name]){
                                    dataList.push({name:this.country[da.name],value:da.dead})
                                }
                            });
                        this.pieces =[
                            { gte: 5001, lte: 500000},
                            { gte: 4001, lte: 5000},
                            { gte: 2001, lte: 4000},
                            { gte: 1001, lte: 2000},
                            { gte: 101, lte: 1000},
                            { gte: 0, lte: 100 } 
                        ];
                        this.formatter = '{b} - 死亡总人数:{c}'
                        this.drawMap(dataList);
                    } 
                    
                    if(this.type == 4){  //确诊人数
                        var dataList = [];
                        // 封装数据
                        res.data.data.forEach(da => {
                                if(this.country[da.name]){
                                    dataList.push({name:this.country[da.name],value:da.confirm})

                                }
                            });
                        this.pieces = [      
                            // 自定义每一段的范围，以及每一段的文字
                            { gte: 1000000, lte: 100000000},
                            { gte: 500000, lte: 999999},
                            { gte: 150000, lte: 499999},
                            { gte: 50000, lte: 149999},
                            { gte: 1000, lte: 49999},
                            { gte: 0, lte: 999 }   
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
            this.$axios(this.url + '/AbCov19/initAllCountryData').then(res=>{
                if(res.data.code == 200){
                    var dataList = [];
                    res.data.data.forEach(da=>{
                            // 封装疫情数据
                            if(this.country[da.name]){
                                    dataList.push({
                                    name:this.country[da.name],
                                    value:da.confirm
                                });
                            }
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
                    text: '全球疫情数据',
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
                visualMap: {
                    pieces: this.pieces,
                    inRange: {
                        color: ['#d1d4da', '#bacae8', '#96b5ef', '#6797ef', '#3375e4', '#035cf5']
                    },
                    textStyle: {
                        color: '#fff'
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
                        map: 'world', //地图类型。
                        data:dataList,
                        itemStyle: { //地图区域的多边形 图形样式。
                            emphasis:{ //高亮状态下的样试
                                label:{
                                    show:true,
                                }
                            }
                        },
                        zoom:1.3,//放大比例
                        label: {  //图形上的文本标签，可用于说明图形的一些数据信息
                            show:true,
                        },
                    },
                    {
                        type:'scatter',
                        showEffectOn: 'render',//配置什么时候显示特效
                        coordinateSystem:'geo',//该系列使用的坐标系
                        symbolSize:12,//标记的大小
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