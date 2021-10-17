<template>
  <div class="add-table">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="主题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <el-input type="textarea" v-model="form.context" :rows="20" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitDiary">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmitDiary()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      url: this.url.testUrl,
    };
  },
  methods: {
    submitDiary() {
      this.dialogVisible = !this.dialogVisible;
    },
    doSubmitDiary() {
      console.log(this.form);
      this.$axios({
        url: this.url + "diary/submitDiary",
        method :'post',
        data:this.form
      }).then(data => {
          this.$message('好的，我知道了')
          this.form = {};
      });
      this.dialogVisible = !this.dialogVisible;
    },
  },
};
</script>

<style scoped>
.add-table{
    margin-left: 20px;
}
</style>