<template>
    <div>
        <h1>aboard</h1>
        <el-button @click="testcn()">cn</el-button>
        <el-button @click="testab()">aboard</el-button>
        <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:1080px" @click="getClickInfo" :scroll-wheel-zoom='true'>
        </baidu-map>
    </div>
</template>

<script>
export default {
    data(){
        return {
            testUrl:this.url.testUrl,
            center: {lng: 110, lat: 28},
            zoom:5

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