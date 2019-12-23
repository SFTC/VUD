<template>
  <div class="collapse-panel">
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <div class="btn-expand">点击查看代码</div>
        </template>
        <markdown :content="markdownContent"></markdown>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Markdown from './Markdown'

export default {
  name: 'CollapsePanel',
  components: {
    Markdown
  },
  props: {
    markdownContent: {
      type: String,
      default: '暂无'
    }
  }
}
</script>

<style lang="less">
  .el-collapse {
    border: 0;

    .btn-expand {
      width: 100%;
      user-select: none;
      text-align: center;
      border-top: 1px solid #e6ebf5;
      color: #5a5e66;
      &:hover{
        color: #409eff;
      }
    }

    .el-collapse-item__header {
      height: auto;
      border: 1px solid #ebebeb;
      border-radius: 3px;
      transition: .2s;
    }
    .el-icon-arrow-right:before{
      content: ''
    }
  }
</style>
