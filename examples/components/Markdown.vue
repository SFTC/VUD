<template>
  <div class="markdown">
    <div class="markdown markdown-body" v-html="markdownContent"></div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import 'github-markdown-css/github-markdown.css'
export default {
  name: 'markdown',
  props: {
    content: {
      type: String,
      default: '暂无'
    }
  },
  computed: {

    markdownContent () {
      const renderer = new marked.Renderer()
      marked.setOptions({
        renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        highlight: code => hljs.highlightAuto(code).value
      })
      const markdownContent = marked(this.content ? this.content : '', {
        sanitize: true
      })

      return markdownContent
    }
  }
}
</script>

<style scoped>
  .markdown {
    font-size: 12px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
</style>
