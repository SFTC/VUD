<template>
  <div id="app">
    <div class="example-area">
      <div class="example__info">基础用法</div>
      <multi-select placeholder="请选择内容" v-model="value1">
        <multi-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></multi-option>
      </multi-select>
      <collapse-panel :markdownContent="lsa.default"></collapse-panel>
    </div>
    <div class="example-area">
      <div class="example__info">禁用状态</div>
      <multi-select placeholder="请选择内容" v-model="value2" disabled>
        <multi-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></multi-option>
      </multi-select>
      <collapse-panel :markdownContent="lsaDis.default"></collapse-panel>
    </div>
    <div class="example-area">
      <div class="example__info">全选</div>
      <multi-select placeholder="请选择内容" v-model="value3">
        <multi-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></multi-option>
      </multi-select>
      <collapse-panel :markdownContent="lsaAll.default"></collapse-panel>
    </div>
    <api-content :tableDataList="config"></api-content>
  </div>
</template>

<script>
import CollapsePanel from '../components/CollapsePanel'
import ApiContent from '../components/api'
import { config } from '../static/multiselect'
const lsa = require('../components/markdownfiles/MultiSelect/MultiSelect.md')
const lsaAll = require('../components/markdownfiles/MultiSelect/MultiSelectAll.md')
const lsaDis = require('../components/markdownfiles/MultiSelect/MultiSelectDisabled.md')
export default {
  name: 'multi',
  data () {
    return {
      config,
      lsa,
      lsaAll,
      lsaDis,
      value1: [],
      value2: ['选项1'],
      value3: ['选项1', '选项2', '选项3', '选项4', '选项5'],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  components: {
    CollapsePanel,
    ApiContent
  }
}
</script>
<style scoped lang="less">
#app{
  height: 100%;
}
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

