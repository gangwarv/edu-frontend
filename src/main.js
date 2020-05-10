import Vue from 'vue'
import { apolloProvider } from './apollo'

import App from './App.vue'
import router from './router'
import store from '@/store'

import './plugins';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  apolloProvider,
  store
}).$mount('#app')
