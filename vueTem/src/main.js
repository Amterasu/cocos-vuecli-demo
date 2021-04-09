import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/css/common.scss'
import './styles/css/element-variables.scss'
import './styles/fonts/css/font-awesome.min.css'
import Vuerify from 'vuerify'

import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuerify)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
