```html
<template>
  <div id="app">
    <multi-select-less-node
      placeholder="请选择城市" 
      :value="value"
      :optionList="citys"
      @input="onInput('city_ids', $event)"
      optionKeyOfKey="city_id"
      optionLabelOfKey="city_name"
      optionValueOfKey="city_id"
      :isLimit="false"
    >
  </div>
</template>
```

```javascript
<script>

export default {
  name: 'limitMulti',
  data() {
    return {
      value: [],
      citys: [
        {
          city_id: "811000",
          city_name: "香港岛"
        },
        {
          city_id: "110101000",
          city_name: "东城区"
        },
        {
          city_id: "110105000",
          city_name: "朝阳区"
        },
        {
          city_id: "110113000",
          city_name: "顺义区"
        },
        {
          city_id: "110114000",
          city_name: "昌平区"
        },
        {
          city_id: "110228000",
          city_name: "密云区"
        },
        {
          city_id: "110229000",
          city_name: "延庆区"
        },
        {
          city_id: "111000000",
          city_name: "北京市"
        },
        {
          city_id: "121212123",
          city_name: "成都市"
        },
      ]
    };
  },
  methods: {
    onInput(key, newValue) {
      this.value = newValue
    }
  }
}
</script>
```
