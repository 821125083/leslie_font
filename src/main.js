import Vue from 'vue';
import App from './App';
import router from './router';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
//导入全局定义的常量
import baseUrl from '@/assets/constan';
import testUrl from '@/assets/constan';
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'

//定义全局常量
Vue.prototype.url = baseUrl;
Vue.prototype.$echarts = echarts
Vue.prototype.testurl = testUrl;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(element);
Vue.use(BaiduMap,{
  ak:'LO009mD9VTnj3tAWee3KwxkXMMHXOIqL'
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
