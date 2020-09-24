export const config = [
  {
    name: "Select Props",
    type: "API",
    introduce: "",
    tableData: [
      {
        attr: "value / v-model",
        introduce: "输入框的值",
        type: "Array/String",
      },
      {
        attr: "items",
        introduce: "数据源",
        type: "Array",
      },
      {
        attr: "item-size",
        introduce: "滚动项每个单元格的高度",
        type: "Number",
      },
      {
        attr: "filterable",
        introduce: "是否可搜索",
        type: "boolean",
        default: "false",
      },
      {
        attr: "clearable",
        introduce: "是否可以清空选项",
        type: "boolean",
      },
      {
        attr: "disabled",
        introduce: "是否禁用",
        type: "boolean",
      },
      {
        attr: "multiple",
        introduce: "是否多选",
        type: "boolean",
      },
      {
        attr: "placeholder",
        introduce: "placeholder",
        type: "String",
      },
      {
        attr: "disabled",
        introduce: "控制全部选择器是否置灰",
        type: "Boolean",
        default: "false",
      },
    ],
  },
  {
    name: "Select Events",
    type: "Events",
    introduce: "",
    tableData: [
      {
        name: "input",
        introduce: "传出输入框中的值组成的对象",
        arguments: "目前选中的值",
      },
    ],
  },
  {
    name: "Option Props",
    type: "API",
    introduce: "",
    tableData: [
      {
        attr: "value",
        introduce: "列表展示的值",
        type: "String",
      },
      {
        attr: "label",
        introduce: "列表传给后端的值",
        type: "String  Number",
      },
      {
        attr: "disabled",
        introduce: "是否禁用该选项",
        type: "boolean",
      },
    ],
  },
];
