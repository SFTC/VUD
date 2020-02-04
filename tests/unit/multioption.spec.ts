import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiOption.vue', () => {
  it('测试props', () => {
    const value = '选项1';
    const label = '黄金糕';
    const wrapper = shallowMount(multiOption, {
      propsData: { value, label },
    });
    expect(wrapper.text()).toContain(label);
  });
  it('测试data', () => {
    const wrapper = shallowMount(multiOption);
    // tslint:disable-next-line: no-console
    expect(wrapper.vm.$data.selected).toEqual(false);
  });
  it('测试方法', async () => {
    const wrapper = mount(multiOption);
    const handleInitSelect = await (wrapper.vm as any).handleInitSelect();
    expect(handleInitSelect).toBe(undefined);
  });
  it('测试事件', () => {
    const stub = jest.fn(); // 伪造一个jest的mock funciton
    const wrapper = mount(multiOption);
    wrapper.setMethods({ handleClick: stub }); // setMethods将handleClick这个方法覆写
    wrapper.find('li').trigger('click'); // 对li触发一个click事件
    expect(stub).toBeCalled(); // 查看handleClick是否被调用
  });
});
