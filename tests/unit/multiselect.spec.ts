import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import multiSelect from '../../packages/multi-select/src/main.vue';

describe('formTable.vue', () => {
  it('renders props.multiSelect when passed', () => {
    const options: any[] = [{
      value: '选项1',
      label: '黄金糕',
    }, {
      value: '选项2',
      label: '双皮奶',
    }, {
      value: '选项3',
      label: '蚵仔煎',
    }, {
      value: '选项4',
      label: '龙须面',
    }, {
      value: '选项5',
      label: '北京烤鸭',
    }];
    const wrapper = shallowMount(multiSelect, {
      propsData: { options },
    });
    expect(wrapper.text()).to.include(options);
  });
});
