<template>
  <div style="margin-top: 50px">
    <div>
      <el-row>
        <el-col :span="8" class="grid-content bg-purple"><div></div></el-col>
        <el-col :span="8" class="grid-content bg-purple-ligth">
          <div>
            <el-form ref="form" :model="loginForm" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="loginForm.loginName"></el-input>
              </el-form-item>
              <el-form-item label="暱稱">
                <el-input v-model="loginForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginForm.loginPassword" show-password></el-input>
              </el-form-item>
              <el-button @click="register()">注册</el-button>
            </el-form>
          </div>
        </el-col>
        <el-col :span="8" class="grid-content bg-purple"><div></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        loginName: '',
        loginPassword: '',
        userName: '',
        token: 'token'
      },
      url: this.url.testUrl
    }
  },
  methods: {
    register () {
      this.$axios.post(this.url + 'user/register', this.loginForm).then(res => {
        console.log(res.data.code)
        if (res.data.code === 500) {
          this.$message.error(res.data.message)
        } else {
          this.$message('註冊成功')
        }
      })
    }
  }
}
</script>
