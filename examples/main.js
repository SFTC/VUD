import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SfVUEUI from '../packages/index'
import axios from 'axios'
Vue.use(element)
Vue.axios = axios
// import '../lib/sf-vue-ui.css'
// import SfVUEUI from 'sf-vue-ui'
Vue.use(SfVUEUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
