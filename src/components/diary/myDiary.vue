<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="title" label="主题" width="180"> </el-table-column>
      <el-table-column prop="context" label="正文" width="180">
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editDiary(scope.row)"> 编辑 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios({
      url: this.url + "diary/queryDiary/10/1",
      method: "get",
    }).then((res) => {
      this.tableData = res.data.data;
    });
  },
  data() {
    return {
      url: this.url.testUrl,
      tableData: [],
    };
  },
  methods: {
    editDiary(diary) {
      console.log(diary);
    },
  },
};
</script>