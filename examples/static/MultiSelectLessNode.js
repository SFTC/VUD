export const config = [
  {
    'name': 'Select Props',
    'type': 'API',
    'introduce': '',
    'tableData': [
      {
        'attr': 'limitShowCount',
        'introduce': '需要渲染的option个数',
        'type': 'number',
        'default': '30'
      },
      {
        'attr': 'isLimit',
        'introduce': '是否开启节点数量渲染限制，为false时limitShowCount无效',
        'type': 'Boolean',
        'default': 'true'
      },
      {
        'attr': 'placeholder',
        'introduce': 'placeholder',
        'type': 'String'
      },
      {
        'attr': 'disabled',
        'introduce': '控制选择器是否置灰',
        'type': 'Boolean',
        'default': 'false'
      },
      {
        'attr': 'tooltipContainerStyle',
        'introduce': '设置tooltip的样式',
        'type': 'object',
      },
      {
        'attr': 'tooltipIcon',
        'introduce': '设置tooltip的icon',
        'type': 'string',
        'default': 'el-icon-question'
      },
      { 
        'attr': 'optionList',
        'introduce': '下拉选项数据源，必传',
        'type': 'Array',
      },
      {
        'attr': 'value',
        'introduce': '选中的值，必传',
        'type': 'Array',
      },
      {
        'attr': 'optionKeyOfKey',
        'introduce': '单个option vfor的key，取自optionList的item对象某个key，必传',
        'type': 'string | number',
      },
      {
        'attr': 'optionLabelOfKey',
        'introduce': '单个option vfor的展示的文案，取自optionList的item对象某个key，必传',
        'type': 'string | number',
      },
      {
        'attr': 'optionValueOfKey',
        'introduce': '单个option vfor绑定的value，取自optionList的item对象某个key，必传',
        'type': 'string | number',
      }
    ]
  },
  {
    'name': 'Select Events',
    'type': 'Events',
    'introduce': '',
    'tableData': [
      {
        'name': 'input',
        'introduce': '传出输入框中的值组成的数组',
        'arguments': '目前选中的值'
      }]
  }
]

export const options = [
  {
  "city_id": "811000",
  "city_name": "香港岛"
  },
  {
  "city_id": "110101000",
  "city_name": "东城区"
  },
  {
  "city_id": "110105000",
  "city_name": "朝阳区"
  },
  {
  "city_id": "110113000",
  "city_name": "顺义区"
  },
  {
  "city_id": "110114000",
  "city_name": "昌平区"
  },
  {
  "city_id": "110228000",
  "city_name": "密云区"
  },
  {
  "city_id": "110229000",
  "city_name": "延庆区"
  },
  {
  "city_id": "111000000",
  "city_name": "北京市"
  },
  {
    "city_id": "121212123",
    "city_name": "成都市"
  },
]