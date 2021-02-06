<template>
    <div>
        <ab-bar-char></ab-bar-char>
         <template>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="name"
                    label="国家"
                    >
                </el-table-column>
                <el-table-column
                    prop="confirm"
                    label="确诊总数"
                    >
                </el-table-column>
                <el-table-column
                    prop="heal"
                    label="治愈总数">
                </el-table-column>
                <!-- <el-table-column
                    prop="severe"
                    label="重症病例">
                </el-table-column>
                <el-table-column
                    prop="suspect"
                    label="疑似病例">
                </el-table-column> -->
                <el-table-column
                    prop="dead"
                    label="死亡总数">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
// import AbBarChar from 'element/AbBarChar.vue';
import AbBarChar from './element/AbBarChar.vue';

export default {
  components: { AbBarChar },
    data(){
        return {
            // url:this.url.testUrl,
            url:this.url.baseUrl,
            tableData:[],
            countryList:[],
            center: {lng: 110, lat: 28},
            zoom:5

        }
    },
    mounted(){
        this.loadCountryList();
        this.loadTableData();
    },
    methods:{
        loadCountryList(){
            this.$axios(this.url+'/location/allCountry').then(res=>{
                if(res.data.code == 200){
                    this.countryList = res.data.data
                }
            })
        },
        loadTableData(){
            this.$axios(this.url+'/AbCov19/initAllAbData').then(res=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data
                }
            })
        }
    }
}
</script>