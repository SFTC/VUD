import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiOption.vue', () => {
  let wrapper: any;
  const value = '选项1';
  const label = '黄金糕';
  beforeEach(() => {
    wrapper = shallowMount(multiOption, {
      propsData: { value, label }
    });
  });
  it('测试props', () => {
    expect(wrapper.text()).toContain(label);
    wrapper.destroy();
  });
  it('测试data', () => {
    expect(wrapper.vm.$data.selected).toEqual(false);
    expect(wrapper.vm.$data.selected).toEqual(false);
    expect(wrapper.vm.$data.selected).toEqual(false);
    wrapper.destroy();
  });
  it('测试方法', async () => {
    const handleInitSelect = await (wrapper.vm as any).handleInitSelect();
    expect(handleInitSelect).toBe(undefined);
    wrapper.destroy();
  });
  it('测试事件', () => {
    const stub = jest.fn(); // 伪造一个jest的mock funciton
    wrapper.setMethods({ handleClick: stub }); // setMethods将handleClick这个方法覆写
    wrapper.find('li').trigger('click'); // 对li触发一个click事件
    expect(stub).toBeCalled(); // 查看handleClick是否被调用
    wrapper.destroy();
  });
});
