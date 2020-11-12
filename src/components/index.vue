<template>
    <div>
        <h1>LESLIE DEMO</h1>
        <el-table :data="students">
            <el-table-column prop = "id" label='编号'>
            </el-table-column>
            <el-table-column prop = "name" label='姓名'>
            </el-table-column>
            <el-table-column prop = "age" label='年龄'>
            </el-table-column>
            <el-table-column prop = "gender" label='性别'>
            </el-table-column>
            <el-table-column prop = "classes" label='班级'>
            </el-table-column>
        </el-table>
        <el-button @click="toFather" type="primary">toFather</el-button>
        {{url.baseUrl}}
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
            //使用全局定义的变量
            url:this.url.baseUrl,

        }
    },
    //渲染之前就预先加载数据
    mounted(){
        console.log(this.localUrl);
        this.$axios(this.url+'leslie/students/findAllStudents').then(res=>{
                this.students = res.data;
            })  
    },
    methods:{
        
        toFather(){
            //路由转发
            this.$router.push('father');
        },
        test(){
            //发送后台请求
            // this.$axios(this.url+'leslie/students/findAllStudents').then(res=>{
            //     this.students = res.data;
            // })  
        }
    }
}
</script>