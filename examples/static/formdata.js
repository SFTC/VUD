export const config = [
  {
    'name': 'FormTable Slot',
    'type': 'Slot',
    'introduce': '',
    'tableData': [
      {
        'name': 'before-button',
        'introduce': 'form选择之前的插槽'
      }, {
        'name': 'search-item',
        'introduce': 'form选择之中的插槽'
      }, {
        'name': 'after-button',
        'introduce': 'form选择之后的插槽'
      }]
  },
  {
    'name': 'FormTable Props',
    'type': 'API',
    'introduce': '',
    'tableData': [
      {
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
        'attr': 'queryFunc',
        'introduce': 'Form后端的接口',
        'type': 'Function'
      },
      {
        'attr': 'tableLabel',
        'introduce': 'Table表头',
        'type': 'ArrayObject(minWidth,label,prop)'
      },
      {
        'attr': 'tableData',
        'introduce': 'Table内容',
        'type': 'Array'
      },
      {
        'attr': 'pageSize',
        'introduce': '每页显示条目个数',
        'type': 'Number'
      },
      {
        'attr': 'total',
        'introduce': '总条目数',
        'type': 'Number'
      },
      {
        'attr': 'tableOperation',
        'introduce': 'Table内容操作',
        'type': 'Object'
      }
    ]
  },
  {
    'name': 'FormTable Events',
    'type': 'Events',
    'introduce': '',
    'tableData': [
      {
        'name': 'setQueryFilter',
        'introduce': '列表请求参数设置',
        'arguments': 'domFilter所有name的集合'
      },
      {
        'name': 'callbackDataFormat',
        'introduce': '接口回调处理',
        'arguments': '后端返回的参数data'
      }
    ]
  }
]
