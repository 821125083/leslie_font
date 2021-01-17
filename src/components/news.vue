<template>
    <div>
        <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column prop="title" label="标题" >
                <template slot-scope="row">
                    <span v-html="titleRow(row.row)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者名称"></el-table-column>
            <el-table-column prop="publishTime" label="发布日期"></el-table-column>
            <!-- <el-table-column prop="articleAbstract" label="详情"></el-table-column> -->

        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url : this.url.testUrl,
            tableData:[]
        }
    },
    mounted(){
        this.$axios(this.url+'news/queryAllNews').then(res=>{
            this.tableData = res.data.data.newsList;
        })
    },
    computed:{
        // titleRow(title){
        //     return "<a>leslie</a>";
        // }
    },
    methods:{
        titleRow(row){
            return "<a href="+row.url+" target='_blank'>"+row.title+"</a>";
        }
    }
    
}
</script>

<style scoped>

</style>