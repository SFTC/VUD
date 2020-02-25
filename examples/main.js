import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(element)
Vue.axios = axios
// import SfVUEUI from '../packages/index'
import 'vudui/lib/vudui.css'
import vudui from 'vudui'
Vue.use(vudui)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
