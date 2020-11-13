<template>
        <div>
          <el-input v-model="province"></el-input>
          <el-button @click="test()">tijiao</el-button>
          <el-button @click="test()">quanqiu1</el-button>
        </div>
</template>
<script>

export default {
  data () {
    return {
      province:'',
    }
  },
  mounted(){
    console.log("leslie");
  },
  methods:{
   
    test(){
        this.$axios(this.url.testUrl+'Cov19Cn/CNRealTimeRecord/'+this.province).then(res=>{
                console.log(res.data);
            }) 
    }
  }
}
</script>
