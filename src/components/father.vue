<template>
        <div>
          <el-input v-model="message" placeholder="请输入你宝贵的意见" style="width:50%;margin-top:20px"></el-input>
          <br/>
          <el-button @click="commit()" style="margin-top:10px">提交</el-button>

          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>确定提交信息</span>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="doCommit()">取 消</el-button>
                  <el-button type="primary" @click="doCommit()">确 定</el-button>
              </span>
          </el-dialog>
        </div>
</template>
<script>
export default {
  data () {
    return {
      message:'',
      // url:this.url.baseUrl,
      url:this.url.testUrl,
      dialogVisible:false
    }
  },
  mounted(){  
  },
  methods:{
    handleClose(){
      console.log("execute handleClose")
    },
   commit(){
      this.dialogVisible = true;
   },
    doCommit(){
        this.$axios.post(this.url+'/weather/commitMessage',{message:this.message}).then(res=>{
                this.$message("好的，我知道啦");
                this.message = '';
            }) 
        this.dialogVisible = false;
    }
  }
}
</script>
