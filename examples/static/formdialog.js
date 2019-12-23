export const config = [{
  'name': 'FormDialog Slot',
  'type': 'Slot',
  'introduce': '',
  'tableData': [{
    'name': 'after-button',
    'introduce': 'form选择之后的插槽'
  }]
},
{
  'name': 'FormTable Props',
  'type': 'API',
  'introduce': '',
  'tableData': [{
    'attr': 'queryFilter',
    'introduce': 'Form展示的对象',
    'type': 'Object'
  },
  {
    'attr': 'domFilter',
    'introduce': 'Form可选对象',
    'type': 'Object'
  },
  {
    'attr': 'handleChange',
    'introduce': 'Form后端的接口',
    'type': 'Function'
  },
  {
    'attr': 'dialogObj',
    'introduce': 'FormDialog表头',
    'type': 'Object(title,visible)'
  }
  ]
},
{
  'name': 'FormTable Events',
  'type': 'Events',
  'introduce': '',
  'tableData': [{
    'name': 'beforeClose',
    'introduce': '弹关闭前回调函数',
    'arguments': '（queryFilter,type）'
  }
  ]
}
]
