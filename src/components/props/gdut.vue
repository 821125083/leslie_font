<template>
    <div>
        <el-image :src="u2l" ></el-image>
        <el-image :src="url" ></el-image><br>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=217970688,1876687097&fm=11&gp=0.jpg',
            // 使用图片
            u2l:require('../pic/iu.png')
        }
    }
}
</script>

<style scoped>

</style>