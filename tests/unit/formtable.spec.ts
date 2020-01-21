
import { createLocalVue, shallowMount } from '@vue/test-utils';
import FormTable from '../../packages/form-table/src/main.vue';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
const localVue = createLocalVue();
localVue.use(element);
// localVue.axios = axios;

describe('formTable.vue', () => {
  it('renders props.tableData when passed', () => {
    const tableData: [] = [];
    const wrapper1 = shallowMount(FormTable, {
      propsData: { tableData },
    });
    expect(wrapper1.text()).toBe(tableData);
  });
  it('renders props.queryFilter when passed', () => {
    const queryFilter: object = {
        work_type: '111',
        account_status: '',
      };
    const wrapper2 = shallowMount(FormTable, {
      propsData: { queryFilter },
    });
    expect(wrapper2.props().queryFilter.work_type).toBe('111');
  });
});
