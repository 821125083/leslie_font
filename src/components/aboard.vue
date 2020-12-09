<template>
    <div>
        
        <h1>aboard</h1>

        
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
    mounted(){
        this.$axios(this.testUrl+'/Cov19Alibaba/initAllData').then(res=>{
            if(res.data.code == 200){
                console.log(res.data.data);
            }
        })
    },
    methods:{
        
    }
}
</script>