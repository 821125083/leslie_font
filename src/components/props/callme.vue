<template>
    <div>
        <!-- <div>有事电联(微信同号)：13415823158</div> -->
        <el-button @click="testEs6">ES6</el-button>
        <el-button @click="testEs7">ES6</el-button>
        <div>
            <el-image :src="url"></el-image>
        </div>
    </div>
</template>

<script>

import constan from '../../assets/constan'; 

export default {
    data(){
        return {
            src:"src/components/pic/vcQRcode.jpg",
            // 使用图片
            url:require("../pic/vcQRcode.jpg"),
            
        }
    },
    methods:{
        testEs6(){
            // es6 模板字符串
            console.log(`src:${this.src},url:${this.url}`);
            var arr = [1,2,3,4,5,6,7,8,9,10];
            // 集合 map reduce 方法
            let sum = arr.reduce((a1,a2) => {
                return a1+a2;
            })
            console.log(sum);

            let ary = arr.map(a=>{
                return a+a;
            })
            console.log(ary);
        },
        testEs7(){
            console.log(constan.projectNAME);
            console.log(constan.baseUrl);
            console.log(constan.projectNAME);
            console.log(constan.add(1,2));
        }
    }
}
</script>

<style scoped>

</style>