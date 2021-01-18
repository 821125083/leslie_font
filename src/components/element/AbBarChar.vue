<template>
    <div>
        {{url}}
        <div id="barCharts" :style="{width: '100%', height: '500px'}">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url:this.url.testUrl,
        }
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            this.$axios(this.url+'/AbCov19/initAllAbData/50').then(res => {
                console.log(res.data.data);
            })
        }
    },
}
</script>

<style scoped>

</style>