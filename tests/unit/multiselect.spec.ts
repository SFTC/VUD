import { shallowMount, mount } from '@vue/test-utils';
import multiSelect from '../../packages/multi-select/src/main.vue';
import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiSelect.vue', () => {
  it('renders props.multiSelect when passed', () => {
    const placeholder = '请选择内容';
    const vModel: never[] = [];
    const wrapper = mount(multiSelect, {
      propsData: { placeholder, vModel },
    });
    const vm = wrapper.vm;
    const input: any = vm.$el.querySelector('input');
    // tslint:disable-next-line: no-console
    console.log('input.value', input.placeholder);
    expect(input.placeholder).toBe(placeholder);
  });
});
