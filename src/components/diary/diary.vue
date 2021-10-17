<template>
  <div>
    <div class="tabs">
      <el-tabs
        tab-position="left"
        style="height: 100px"
        v-model="activeMenu"
        @tab-click="handleSelect()"
      >
        <el-tab-pane label="新建日记" name="new"></el-tab-pane>
        <el-tab-pane label="我的日记" name="my"></el-tab-pane>
      </el-tabs>
    </div>
    <newDiary v-if="activeMenu == 'new'" class="new-diary"></newDiary>
    <myDiary v-if="activeMenu == 'my'" class="my-diary"></myDiary>
    <!-- <myDiary v-if="activeMenu == 'new'" class="my-diary"></myDiary> -->
  </div>
</template>

<script>
import newDiary from "@/components/diary/newDiary.vue";
import myDiary from "@/components/diary/myDiary.vue";

export default {
  components: {
    myDiary,
    newDiary,
  },
  data() {
    return {
      activeMenu: "my",
    };
  },
  methods: {
    handleSelect(index, indexPath) {
      console.log(this.activeMenu);
    },
  },
};
</script>

<style scoped>
.tabs {
  float: left;
  display: inline-block;
}

.my-diary {
  display: inline-block;
}
.new-diary {
  display: inline-block;
}
</style>