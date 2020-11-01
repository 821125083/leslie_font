<template>
    <div>
        <h1>LESLIE</h1>
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
        <!-- <father>
            <son slot="son"></son>
            <son2 slot="son2"></son2>
        </father> -->
        <!-- <el-button @click="test" type="danger">findAllStudents</el-button><br/> -->
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
            url:this.url.baseUrl,

        }
    },
    mounted(){
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