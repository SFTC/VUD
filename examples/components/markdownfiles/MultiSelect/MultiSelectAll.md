```html
<template>
  <div id="app">
    <multi-select placeholder="请选择内容" v-model="value">
      <multi-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></multi-option>
    </multi-select>
  </div>
</template>

<script>

export default {
  name: 'multi',
  data() {
    return {
      value: ['选项1', '选项2', '选项3', '选项4', '选项5'],
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
    };
  },
}
</script>
```
