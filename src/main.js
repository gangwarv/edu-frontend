import Vue from 'vue'

import "./global.scss";
import App from './App.vue'
import router from './router'
import store from '@/store'
import { date, isodate } from './filters'

Vue.config.productionTip = false

Vue.filter('date', date);
Vue.filter('isodate', isodate);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
