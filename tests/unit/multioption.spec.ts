import { shallowMount } from '@vue/test-utils';
import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiOption.vue', () => {
  it('renders props.multiOption when passed', () => {
    const value = '选项1';
    const label = '黄金糕';
    const wrapper = shallowMount(multiOption, {
      propsData: { value, label },
    });
    expect(wrapper.text()).toContain(label);
  });
});
