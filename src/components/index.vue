<template>
    <div>
        <h1>国内疫情数据</h1>
        <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <span>实时{{cov19Record.updateTime}}数据</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="getRealTimeRecord()">获取实时数据</el-button>
            </div>
            <el-tag>
            确诊人数：{{cov19Record.confirmedCount}}
            </el-tag>
            <el-tag>
            较昨日新增确诊人数：{{cov19Record.confirmedAdd}}
            </el-tag>
            <br>
            <el-tag>
            今日确诊人数：{{cov19Record.currentConfirmedCount}}
            </el-tag>
            <el-tag>
            较昨日新增确诊：{{cov19Record.currentConfirmedAdd}}        
            </el-tag>
            <br>
            <el-tag type="warning">
            疑似病例：{{cov19Record.suspectedCount}}        
            </el-tag>
            <el-tag type="warning">
            较昨日新增疑似病例：{{cov19Record.suspectedAdd}}        
            </el-tag>
            <br>
            <el-tag>
            重症人数：{{cov19Record.severecasesCount}}        
            </el-tag>
            <el-tag>
            较昨日新增重症人数：{{cov19Record.severecasesAdd}}        
            </el-tag>
            <br>
            <el-tag type="success">
            痊愈人数：{{cov19Record.curedCount}}        
            </el-tag>
            <el-tag type="success">
            较昨日新增痊愈人数：{{cov19Record.curedAdd}}        
            </el-tag>
            <br>
            <el-tag type="danger">
            死亡人数：{{cov19Record.deadCount}}        
            </el-tag>
            <el-tag type="danger">
            较昨日新增死亡人数：{{cov19Record.deathAdd}}        
            </el-tag>
            <el-tag>
            消息来源：{{cov19Record.sourceDesc}}        
            </el-tag>
            <el-tag>
            消息详情：{{cov19Record.description}}        
            </el-tag>
        </el-card>

        <el-select v-model="selectProvince" placeholder="请选择查询省份">
            <el-option  v-for="province in provinces" 
                        :key="province.id" 
                        :value="province.provinceName" 
                        :label="province.provinceName">
            </el-option>
        </el-select>
        <el-table>

        </el-table>


    </div>
</template>

<script>


export default {
    components:{
    },
    data(){
        return {
            //使用全局定义的变量
            url:this.url.baseUrl,
            testUrl:this.url.testUrl,
            cov19Record:Object,
            provinces:[],
            selectProvince:''
        }
    },
    //渲染之前就预先加载数据
    mounted(){
        this.queryProvince();
    },
    methods:{
        getRealTimeRecord(){
            this.$axios(this.testUrl+'Cov19Cn/realTimeRecord').then(res=>{
                this.cov19Record = res.data;
            }) 
        },
        queryProvince(){
            this.$axios(this.testUrl+'location/allProvinces').then(res=>{
                this.provinces = res.data;
            }) 
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