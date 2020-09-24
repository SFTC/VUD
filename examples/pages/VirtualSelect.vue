<template>
  <div>
    <div class="example-area">
      <div class="example__info">基础(10w条数据)</div>
      <virtual-select v-model="selected" :items="data" :buffer="32" :item-size="32" filterable style="width:300px;" clearable>
        <template #default="{ item }">
          <el-option slot="default" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </template>
      </virtual-select>
      <collapse-panel :markdownContent="lsa.default"></collapse-panel>
    </div>
    <div class="example-area">
      <div class="example__info">多选(10w条数据)</div>
      <virtual-select v-model="selected2" :items="data" :buffer="32" :item-size="32" filterable filter-key="name" style="width:300px;" clearable multiple>
        <template #default="{ item }">
          <el-option slot="default" :key="item.id" :label="item.name" :value="item.value" ></el-option>
        </template>
      </virtual-select>
      <collapse-panel :markdownContent="lsaAll.default"></collapse-panel>
    </div>
    <div class="example-area">
      <div class="example__info">禁用</div>
      <virtual-select v-model="selected3" :items="data" :buffer="32" :item-size="32"  filter-key="name" style="width:300px;"  multiple disabled>
        <template #default="{ item }">
          <el-option slot="default" :key="item.id" :label="item.name" :value="item.value" disabled></el-option>
        </template>
      </virtual-select>
      <collapse-panel :markdownContent="lsaDis.default"></collapse-panel>
    </div>
    <api-content :tableDataList="config"></api-content>
  </div>
</template>
<script>
import CollapsePanel from '../components/CollapsePanel'
import ApiContent from '../components/api'
import { config } from '../static/virtualselect'
const lsa = require('../components/markdownfiles/VirtualSelect/VirtualSelect.md')
const lsaAll = require('../components/markdownfiles/VirtualSelect/VirtualSelectMulit.md')
const lsaDis = require('../components/markdownfiles/VirtualSelect/VirtualSelectDisabled.md')

const generateData = function generateData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    const item = {
      id: i,
      name: `Label ${i + 1}`,
      value: `value ${i + 1}`
    };
    data.push(item);
  }
  return data;
};

export default {
  name: "Test",
  data() {
    return {
      testParams: {
        size: 100000
      },
      selected: "",
      selected2:[],
      selected3:[],
      //组件
      lsa,
      lsaAll,
      lsaDis,
      config
    };
  },
  components:{
    CollapsePanel,
    ApiContent
  },
  computed: {
    data() {
      const { size } = this.testParams;
      let length = parseInt(size, 10);
      length = Number.isNaN(length) ? 0 : length;
      return generateData(length);
    }
  },
};
</script>
<style scoped lang="less">
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
.section-form {
  margin-bottom: 20px;
}
</style>