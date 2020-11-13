<template>
    <div>
        <h1>aboard</h1>
        <el-button @click="testcn()">cn</el-button>
        <el-button @click="testab()">aboard</el-button>

    </div>
</template>

<script>
export default {
    data(){
        return {
            testUrl:this.url.testUrl,

        }
    },
    methods:{
        testcn(){
            this.$axios(this.testUrl+'Cov19Cn/CNRealTimeRecord').then(res=>{
                console.log(res.data);
            }) 
        },
        testab(){
            this.$axios(this.testUrl+'Cov19Ab/realTimeRecord').then(res=>{
                console.log(res.data);
            })
        }
    }
}
</script>