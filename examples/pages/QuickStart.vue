<template>
  <div class="app">
    <h2>引入 vudui</h2>
    <div class="example-area">
      <div class="example__info">npm安装</div>
      <markdown content="
          import Vue from 'vue'
          import App from './App.vue'
          import router from './router'
          import element from 'element-ui'
          import 'element-ui/lib/theme-chalk/index.css'
          import axios from 'axios'
          Vue.use(element)
          Vue.axios = axios
          import 'vudui/lib/vudui.css'
          import vudui from 'vudui'
          Vue.use(vudui)

          Vue.config.productionTip = false

          new Vue({
            router,
            render: h => h(App)
          }).$mount('#app')
        "></markdown>
      <code></code>
    </div>
  </div>
</template>
<script>
import Markdown from '../components/Markdown'
export default {
  name: 'plugin',
  data () {
    return {
    }
  },
  components: {
    Markdown
  }
}
</script>
<style lang="less" scoped>
.example-area {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 15px;
  font-size: 12px;

  .example__info {
    color: #666;
    margin: 10px;
    font-size: 14px;
  }
}
</style>
