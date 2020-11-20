<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            provinceUrl:this.url.testUrl+"Cov19Alibaba/Provinces"
        }
    },
    mounted(){
        this.initProvinceData()
    },
    methods:{
        initProvinceData(){
            this.$axios(this.provinceUrl).then(res=>{
                console.log(res.data.data);
            })
        }
    }
}
</script>

<style scope>

</style>