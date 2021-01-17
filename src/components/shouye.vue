<template>
    <div>
        <h1>今日天气</h1>
        <el-select v-model="selectDate" placeholder="请选择"  @change="handleSelectChange()">
            <el-option 
                v-for="day in nextTwoWeek"
                :key="day.value"
                :value="day.value"
                :label="day.value"
               >
            </el-option>
        </el-select><br>
        最高温:{{weather.high}} 
        <br>
        最低温:{{weather.low}}

    </div>    
</template>

<script>
export default {
    mounted(){
        this.initWeather();
    },
    data(){
        return {
            selectDate:"",
            // url:this.url.testUrl,
            url:this.url.baseUrl,
            weathers:[],
            nextTwoWeek:[],
            weather:"",
        }
    },
    methods:{
        initWeather(){
            this.$axios(this.url+"weather/initWeatherData").then(res => {
                if(res.data.code == 200){
                    this.weathers = res.data.data;
                    this.selectDate = this.weathers[0].ymd;
                    this.weather = this.weathers[0];
                    this.weathers.forEach( weather => {
                        this.nextTwoWeek.push({value:weather.ymd})
                    })
                }
            })
        },
        handleSelectChange(){
            this.weathers.forEach(wea=>{
                if(wea.ymd == this.selectDate){
                    this.weather = wea;
                }
            })
        }
    }
}
</script>

<style scoped>

</style>