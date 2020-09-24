```html
<virtual-select v-model="selected" :items="data" :buffer="32" :item-size="32" filterable filter-key="name" style="width:300px;" clearable>
  <template #default="{ item }">
    <el-option slot="default" :key="item.id" :label="item.name" :value="item.value"></el-option>
  </template>
</virtual-select>
```

```javascript
<script>

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
      selected3:[]
    };
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
```