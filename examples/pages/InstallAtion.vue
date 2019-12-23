<template>
  <div class="app">
    <h2>安装</h2>
    <div class="example-area">
      <div class="example__info">npm安装</div>
      <markdown :content="content"></markdown>
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
      content: 'npm install sf-vue-ui --save'
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
