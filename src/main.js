import Vue from 'vue'
import { apolloProvider } from './apollo'

import "./global.scss";
import App from './App.vue'
import router from './router'
import store from '@/store'
import filters from './filters'
import controls from "@/components/controls";
import sharedComponents from "@/components/shared";
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import { extend } from 'vee-validate'

Vue.config.productionTip = false
extend('secret', {
  validate: value => value === 'example',
  message: 'This is not the magic word'
});

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

sharedComponents.forEach(cmp =>
  Vue.component(cmp.name, cmp)
)

filters.forEach(filter =>
  Vue.filter(filter.name, filter)
)

controls.forEach(element => {
  Vue.component(element.name, element)
});

new Vue({
  render: h => h(App),
  router,
  apolloProvider,
  store
}).$mount('#app')
