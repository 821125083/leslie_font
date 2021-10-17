<template>
    <div>
        <el-table :data="tableData" @expand-change="expandChange">
            <el-table-column type="index" label="省份"/>

            <el-table-column prop="provinceName" label="省份"/>

            <el-table-column prop="totalConfirmed" label="确诊总人数"/>

            <el-table-column prop="totalCured" label="治愈总人数"/>

            <el-table-column prop="totalCuring" label="治疗中人数"/>

            <el-table-column prop="totalDoubtful" label="当前疑似病例"/>

            <el-table-column prop="totalIncrease" label="当日新增人数"/>
            
            <el-table-column prop="totalDeath" label="死亡总人数"/>

            <el-table-column prop="cureRate" label="治愈率">
                <template slot-scope="scope">
                    {{scope.row.curedRate}}
                </template>
            </el-table-column>

            <el-table-column prop="cityList" label="城市" type="expand" >
                <template slot-scope="scope">
                    <el-table :data="scope.row.cityList">
                        <el-table-column prop="cityName" label="城市名称"></el-table-column>
                        <el-table-column prop="totalConfirmed" label="总确诊人数"></el-table-column>
                        <el-table-column prop="totalCured" label="总治愈人数"></el-table-column>
                        <el-table-column prop="totalDeath" label="死亡人数"></el-table-column>
                        <el-table-column prop="cureRate" label="治愈率">
                            <template slot-scope="scope">
                                {{scope.row.curedRate}}
                            </template>
                        </el-table-column>
                    </el-table>                
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[],
            url:this.url.baseUrl,
            // url:this.url.testUrl,
        }
    },
    mounted(){
        //获得当前时间
        this.initTableData()
    },
    methods:{
        initTableData(){
            this.$axios(this.url+"Cov19Alibaba/cov19ProvinceTableData/100/1").then(res=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data;
                    this.tableData.forEach(pro=>{
                        this.$set(pro,"curedRate",(pro.totalCured/pro.totalConfirmed).toFixed(3));
                        this.$set(pro,"totalCuring",(pro.totalConfirmed - pro.totalCured));

                    })
                }else{
                    this.$message.error(res.data.message)
                
                }
            })
        },
        expandChange(row){
            this.$axios(this.url+"Cov19Alibaba/loadCitiesByProvinceName/"+row.provinceName).then(res=>{
                if(res.data.code==200){
                    this.$set(row,"cityList",res.data.data)
                    row.cityList.forEach(city=>{
                        this.$set(city,"curedRate",(city.totalCured/city.totalConfirmed).toFixed(3));
                    })
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }, 
    }
}
</script>