<template>
    <div>
        <h1>抗击肺炎</h1>


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


    </div>
</template>

<script>

import father from '@/components/father';
import son from '@/components/son';
import son2 from '@/components/son2';


export default {
    components:{
        father,son,son2
    },
    data(){
        return {
            password:'13',
            students:[],
            url:this.url.baseUrl,
            testUrl:this.url.testUrl,
            cov19Record:null
        }
    },
    mounted(){
        this.getRealTimeRecord();
             
    },
    methods:{
        getRealTimeRecord(){
            this.$axios(this.testUrl+'Cov19Cn/realTimeRecord').then(res=>{
                this.cov19Record = res.data;
            }) 
        },
        
      
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