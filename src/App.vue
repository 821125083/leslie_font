/* eslint-disable no-tabs */
<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>GCVS</el-menu-item>
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="cn">国内疫情数据</el-menu-item>
      <el-menu-item index="aboard">国外疫情数据</el-menu-item>
      <el-menu-item index="news">疫情实时新闻</el-menu-item>
      <el-menu-item index="gdut">广东工业大学</el-menu-item>
      <el-menu-item index="callme">联系我们</el-menu-item>
      <el-menu-item index="diary">我的日记</el-menu-item>
      <div class="login-info">
        <el-button type="success" @click="toLogin()" id="login-btn" icon="el-icon-user-solid" >登陆</el-button>
        <el-button type="primary" @click="consoleLog()" id="login-btn" icon="el-icon-user-solid" >{{loginUser.username}}</el-button>
      </div>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  name: 'App',
  data () {
    return {
      activeIndex: '/cn',
      activeIndex2: '1',
      url: this.url.testUrl,
      loginUserName:''
    }
  },
  computed:{
    ...mapGetters({
      loginUser : 'getUserInfo'
    }),
  },  
  watch:{
    
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push('/' + keyPath)
    },
    toLogin () {
      this.$router.push('/login')
    }
  },
  mounted () {
    if (this.$store.state.loginUser) {
      this.$axios.get(this.url + 'user/getCurrentUser').then((res) => {
        console.log(res)
      })
    }
  }
  
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  /* position: relative; */
  /* display:flex; */
}

.el-menu-demo{
  display:flex
}

.login-info{
  align-self: center;
  float: right;
  margin-right: 20px;
  margin-left: auto;
}

#login-btn{
  /* float: right;
  margin-right: 20px; */
}
</style>
