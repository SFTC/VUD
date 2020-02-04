import { shallowMount, mount } from '@vue/test-utils';
import multiSelect from '../../packages/multi-select/src/main.vue';
// import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiSelect.vue', () => {
  it('测试props', () => {
    const placeholder = '请选择内容';
    const vModel: any = [];
    const wrapper = mount(multiSelect, {
      propsData: { placeholder, vModel },
    });
    const vm = wrapper.vm;
    const input: any = vm.$el.querySelector('input');
    expect(input.placeholder).toBe(placeholder);
  });
  it('测试data', () => {
    const wrapper = shallowMount(multiSelect);
    // tslint:disable-next-line: no-console
    expect(wrapper.vm.$data.isFocus).toEqual(false);
  });
  // it('测试方法', async () => {
  //   const placeholder = '请选择内容';
  //   const vModel: any = [];
  //   const wrapper = mount(multiSelect, {
  //     propsData: { placeholder, vModel },
  //   });
  //   const checkSelectAll = await (wrapper.vm as any).checkSelectAll();
  //   expect(checkSelectAll).toBe(false);
  //   const getwords = await (wrapper.vm as any).getwords();
  //   expect(getwords).toBe('');
  //   const traverseAndGetName = await (wrapper.vm as any).traverseAndGetName();
  //   expect(traverseAndGetName).toBe('');
  //   const optionsChange = await (wrapper.vm as any).optionsChange();
  //   expect(optionsChange).toBe(undefined);
  // });
  // it('测试事件', () => {
  //   const stub = jest.fn(); // 伪造一个jest的mock funciton
  //   const wrapper = mount(multiSelect);
  //   wrapper.setMethods({ handleClick: stub }); // setMethods将handleClick这个方法覆写
  //   wrapper.find('li').trigger('click'); // 对li触发一个click事件
  //   expect(stub).toBeCalled(); // 查看handleClick是否被调用
  // });
});
