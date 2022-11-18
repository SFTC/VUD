<template>
  <div id="app">
    <div class="example-area">
      <div class="example__info">设置渲染选项的数量，限制节点过多</div>
      <multi-select-less-node 
        placeholder="请选择城市"
        :value="value1"
        :optionList="options"
        @input="onInput('value1', $event)"
        optionKeyOfKey="city_id"
        optionLabelOfKey="city_name"
        optionValueOfKey="city_id"
        :limitShowCount="limitShowCount"
      />
      <collapse-panel :markdownContent="lsaUseLimit.default"></collapse-panel>
    </div>
    <div class="example-area">
      <div class="example__info">关闭选项渲染数量限制</div>
      <multi-select-less-node 
        placeholder="请选择城市"
        :value="value2"
        :optionList="options"
        @input="onInput('value2', $event)"
        optionKeyOfKey="city_id"
        optionLabelOfKey="city_name"
        optionValueOfKey="city_id"
        :isLimit="false"
      />
      <collapse-panel :markdownContent="lsaDisLimit.default"></collapse-panel>
    </div>
    <api-content :tableDataList="config"></api-content>
  </div>
</template>

<script>
import CollapsePanel from '../components/CollapsePanel'
import ApiContent from '../components/api'
import { options, config } from '../static/MultiSelectLessNode'
const lsaUseLimit = require('../components/markdownfiles/MultiSelectLessNode/UseLimit.md')
const lsaDisLimit = require('../components/markdownfiles/MultiSelectLessNode/DisUselimit.md')
export default {
  name: 'multiLessNode',
  data () {
    return {
      config,
      options,
      lsaUseLimit,
      lsaDisLimit,
      value1: [],
      value2: [],
      limitShowCount: 3
    }
  },
  components: {
    CollapsePanel,
    ApiContent
  },
  methods: {
    onInput(key, newValue) {
      console.log(key, newValue);
      if (this[key] !== newValue) {
        this[key] = newValue
      }
    }
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

