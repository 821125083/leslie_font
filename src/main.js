import Vue from 'vue';
import App from './App';
import router from './router';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import baseUrl from '@/assets/constan';

Vue.prototype.url = baseUrl;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(element);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
