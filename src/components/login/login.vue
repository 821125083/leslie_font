<template>
  <div style="margin-top:50px">
    <el-row>
      <el-col :span="8" class='grid-content bg-purple'><div>
        </div></el-col>
      <el-col :span="8" class='grid-content bg-purple-ligth'>
        <div>
          <el-form ref="form" :model="loginForm" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="login()">登录</el-button>            
            <el-button @click="registe()">注册</el-button>

          </el-form>
        </div>
      </el-col>
      <el-col :span="8" class='grid-content bg-purple'><div></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
      },
    };
  },
  methods:{
      login(){

      },
      registe(){
          
      }
  }
};
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    /* background: #d3dce6; */
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>