<template>
  <div id="app" >
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect" 
      background-color="#545c64"  
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item >GCVS</el-menu-item>
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="cn">国内疫情数据</el-menu-item>
      <el-menu-item index="aboard" >国外疫情数据</el-menu-item>
      <el-menu-item index="news">疫情实时新闻</el-menu-item>
      <el-menu-item index="gdut">广东工业大学</el-menu-item>
      <el-menu-item index="callme">联系我们</el-menu-item>
      <el-menu-item index="diary">我的日记</el-menu-item>

    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        activeIndex: '/cn',
        activeIndex2: '1',
        
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push('/'+keyPath)
      }
    },
    mounted(){
      console.log('App init');
      console.log(this.$store.state.loginUser)
      if (this.$store.state.loginUser) {
        console.log('please login')
        // document.location.href = 'http://localhost:8080/login';
      }
    }
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
