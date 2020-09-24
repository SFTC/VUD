```html
<template>
  <div id="app">
    <el-button @click="add">新建</el-button>
    <el-button @click="edit">修改</el-button>
    <el-button @click="look">查看</el-button>
    <form-dialog
      :dialogObj="dialogObj"
      :queryFilter="queryFilter"
      :domFilter="domFilter"
      :handleChange="handleChange"
      @beforeClose="beforeClose"
    >
    </form-dialog>
  </div>
</template>
```

```javascript
<script>
export default {
  name: 'formd',
  data () {
    return {
      dialogObj: {
        title: '保低佣金',
        visible: false
      },
      queryFilter: {
        work_type: '',
        business_status: '',
        datetime: '',
        effect_mode: ''
      },      // 列表接口参数
      domFilter: [
        {
          name: 'work_type',               // 下拉框sugMap参数Array转换为 [{key: 'key', value: 'value'}]  Object转换为 {key: value}
          label: '骑士类型',
          type: 'select',
          disabled: false,
          sugMap: [
            { label: '同城全日制专职骑士', value: 100 },
            { label: '同城兼职骑士', value: 200 },
            { label: '同城非全日制专职骑士', value: 101 },
            { label: '供应商骑士', value: 110 },
            { label: '社会兼职骑士', value: 201 },
            { label: '兼职供应商骑士', value: 202 }
          ]
        },
        {
          name: 'business_status',
          label: '业务类型',
          type: 'select',
          disabled: false,
          sugMap: [
            { label: '即可送', value: 1 },
            { label: '急送', value: 2 }
          ]
        },
        {
          label: '生效日期',
          type: 'date',
          name: 'datetime',
          limit: 10,
          disabled: false,
          default: []
        },
        {
          label: '生效模式',
          type: 'radio',
          name: 'effect_mode',
          disabled: false,
          sugMap: [
            { label: '店铺', value: 1 },
            { label: '商圈', value: 2 }
          ]
        },
        {
          name: 'aoi',
          label: '商圈',
          type: 'select',
          show: true,
          disabled: false,
          sugMap: [
            { label: '全北京最大商圈', value: 1 },
            { label: '占海商圈', value: 2 }
          ]
        },
        {
          name: 'shop',
          label: '店铺',
          type: 'select',
          show: true,
          disabled: false,
          sugMap: [
            { label: '全北京最大店铺', value: 1 },
            { label: '占海店铺', value: 2 }
          ]
        }
      ]
    }
  },
  components: {

  },
  methods: {
    handleChange (name, value) {
      if (name === 'effect_mode' && value === 1) {
        this.domFilter[5].show = false
        this.domFilter[4].show = true
      }
      if (name === 'effect_mode' && value === 2) {
        this.domFilter[4].show = false
        this.domFilter[5].show = true
      }
    },
    beforeClose (attr, type) {
      console.log(attr, type)
      this.dialogObj.visible = false
    },
    add () {
      this.init()
      this.dialogObj.visible = true
    },
    edit () {
      this.queryFilter = {
        work_type: 100,
        business_status: 1,
        datetime: '',
        effect_mode: 1
      }
      this.dialogObj.visible = true
    },
    look () {
      this.queryFilter = {
        work_type: 100,
        business_status: 1,
        datetime: '',
        effect_mode: 1
      }
      this.dialogObj.visible = true
    },
    submit () {
      this.dialogObj.visible = false
    },
    close () {
      this.dialogObj.visible = false
    },
    init () {
      this.queryFilter = {
        work_type: '',
        business_status: '',
        datetime: '',
        effect_mode: ''
      }
    }
  }

}
</script>
```