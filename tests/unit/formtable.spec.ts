import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import FormTable from '../../packages/form-table/src/main.vue';

describe('formTable.vue', () => {
  it('renders props.tableData when passed', () => {
    const tableData: any[] = [];
    const wrapper = shallowMount(FormTable, {
      propsData: { tableData },
    });
    expect(wrapper.text()).to.include(tableData);
  });
});
