<template>
    <div>
        <el-input v-model="searchText" @change="searchTextChange()" placeholder="请输入标题" style=""></el-input>
        <el-button @click="writeExcel()" title="数据将保存到E:\Java学习资料"><i class="el-icon-download"></i>导出数据到Excel表格</el-button>
        <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
            <el-table-column type="index" label="序号">

            </el-table-column>
            <el-table-column prop="title" label="标题" >
                <template slot-scope="row">
                    <span v-html="titleRow(row.row)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者名称"></el-table-column>
            <el-table-column prop="publishTime" label="发布日期">
                <template slot-scope="row">
                    <span>
                        {{formatDate(row)}}
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="currentPageChange"
            @size-change="pageSizeChange"
            :current-page="pageNum"
            :page-sizes="[10,20,50]"
            background
            layout="prev, pager, next,sizes,total"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchText:"",
            url : this.url.testUrl,
            // url : this.url.baseUrl,
            tableData:[],
            total:100,
            pageSize:10,
            pageNum:1
        }
    },
    mounted(){
        this.searchTextChange();  
    },
    computed:{

    },
    methods:{
        // 写出为Excel
        writeExcel(){
            console.log('tets')
            let downloadUrl = this.url+'news/writeNewsToExcel';
            // this.$axios({
            //     url:this.url+'news/writeNewsToExcel',
            //     method:'get',
            //     responseType:'blob'
            //     }).then(res => {
            // })
            document.location.href = this.url+'news/writeNewsToExcel'
        },
        searchTextChange(){
            this.$axios(
            {
                url:this.url+'news/queryNewsByPage',
                data:
                {
                    searchText:this.searchText ,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                },
                method:'post'
            }).then(res=>{
                this.tableData = res.data.data.page.records;
                this.total = res.data.data.page.total
            })
        },
        titleRow(row){
            return "<a href="+row.url+" target='_blank'>"+row.title+"</a>";
        },
        currentPageChange(val){
            this.pageNum = val;
            this.searchTextChange()
        },
        pageSizeChange(val){  
            this.pageSize = val;  
            this.searchTextChange()
        },
        formatDate(row){
            // console.log(row.row.publishTime);
            let date  = new Date(row.row.publishTime).toLocaleDateString();
            // console.log(date);
            return date;
        }
    }
    
}
</script>

<style scoped>

</style>