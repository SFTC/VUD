// import MultiSelect from './multi-select'
// import MultiOption from './multi-option'
import FormTable from './form-table';
// import FormDialog from './form-dialog'
// 组件列表
const components = [
  // MultiSelect,
  // MultiOption,
  FormTable,
  // FormDialog,
];
const componentsName: string[] = [
  // MultiSelect,
  // MultiOption,
  'FormTable',
  // FormDialog,
];

// 如果使用 use 注册插件，则所有的组件都将被注册
const install =  (Vue: any, opts: any) => {
  components.map((component: any, i) => {
    Vue.component(componentsName[i], component);
  });
};

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default {
  install,
  // MultiOption,
  // MultiSelect,
  // FormDialog,
  FormTable,
};
