<template>
    <div>
        <!-- <el-select v-model="selectedCity" @change="handleSelectChange()">
            <el-option v-for="item in provinces" :key="item.id" :label="item.provinceName" :value="item.id" >

            </el-option>
        </el-select> -->
        <h1>数据截止至:{{date}}</h1> <el-button @click="handle500">500请按</el-button>
        <el-table :data="tableData" @expand-change="expandChange">

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
    computed:{
        
    },
    data(){
        return{
            selectedCity:"",
            url:this.url.baseUrl,
            // url:this.url.testUrl,
            provinces:Array,
            tableData:[],
            date:"",
        }
    },
    
    mounted(){
        //获得当前时间
        this.date = new Date().toLocaleDateString(); 
        this.initProvinceData()
        this.initTableData()
    },
    methods:{
        //解决阿里接口报错
        handle500(){
            this.initProvinceData()
            this.initTableData()
        },
        //根据省份加载城市疫情数据
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
        //或取所有省份的名称      
        initProvinceData(){
            this.$axios(this.url+"location/allProvinces").then(res=>{
                this.provinces = res.data.data;
            })
        },
        //下拉框选择改变时
        handleSelectChange(){

        },
        //加载表格数据
        initTableData(){
            this.$axios(this.url+"Cov19Alibaba/cov19ProvinceTableData").then(res=>{
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
        }
    }
}
</script>

<style scope>

</style>