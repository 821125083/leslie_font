<template>
  <div>
    <h1>{{ header }}</h1>
    <el-select
      v-model="selectDate"
      placeholder="请选择"
      @change="handleSelectChange()"
    >
      <el-option
        v-for="day in nextTwoWeek"
        :key="day.value"
        :value="day.value"
        :label="day.value"
      >
      </el-option> </el-select
    ><br />
    最高温:{{ weather.high }}
    <br />
    最低温:{{ weather.low }}
    <el-switch
      v-model="switchValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="handleSwitchChange"
    >
    </el-switch>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
        loginUser: 'getUserInfo'
      })
    },
  mounted() {
    this.initWeather();
  },
  computed: {
    keydown2() {
      return this.keydown;
    },
  },
  mounted() {
    // let arr = []
    // document.onkeydown = function (e) {
    //   this.keydown += e.key.toLowerCase();
    //   let _this = this
    //   if (this.keydown === "control/") {
    //     console.log('kd', this.keydown)
    //     console.log('header', this.header)
    //   }
    // };
    // document.onkeyup = function (e) {
    //   this.keydown = ''
    // };
  },
  watch: {
    header() {
      console("headerChange");
      this.switchValue = !this.switchValue;
    },
  },
  data() {
    return {
      header: "今日天气",
      selectDate: "",
      // url:this.url.testUrl,
      url: this.url.baseUrl,
      weathers: [],
      nextTwoWeek: [],
      weather: "",
      switchValue: false,
      keydown: "",
    };
  },
  methods: {
    //   document.onkeydown = function (e) {
    //   this.keydown += e.key.toLowerCase();
    //   let _this = this
    //   if (this.keydown === "control/") {
    //     console.log('kd', this.keydown)
    //     console.log('header', this.header)

    //   }
    // },
    handleSwitchChange() {
      console.log(this.$store.state.loginUser)
    },
    initWeather() {
      this.$axios(this.url + "weather/initWeatherData").then((res) => {
        if (res.data.code === 200) {
          this.weathers = res.data.data;
          this.selectDate = this.weathers[0].ymd;
          this.weather = this.weathers[0];
          this.weathers.forEach((weather) => {
            this.nextTwoWeek.push({ value: weather.ymd });
          });
        }
      });
    },
    handleSelectChange() {
      this.weathers.forEach((wea) => {
        if (wea.ymd === this.selectDate) {
          this.weather = wea;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
