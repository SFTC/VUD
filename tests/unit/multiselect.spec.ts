import { shallowMount, mount } from '@vue/test-utils';
import multiSelect from '../../packages/multi-select/src/main.vue';
import multiOption from '../../packages/multi-option/src/main.vue';

describe('multiSelect.vue', () => {
  let wrapper: any;
  const placeholder = '请选择内容';
  const disabled = true;
  let vModel: any = [];
  const value = '选项1';
  const label = '黄金糕';
  let multiOptionTemplate: any;
  it('是否存在multiOption', () => {
    multiOptionTemplate = {
      render (h: any) {
        return h(multiOption, { props: { value, label } });
      }
    };
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel },
      slots: {
        default: multiOptionTemplate
      }
    });
    expect(wrapper.find(multiOption).exists()).toBe(true);
    wrapper.destroy();
  });
  it('测试props', () => {
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel, disabled }
    });
    const vm = wrapper.vm;
    const input: any = vm.$el.querySelector('input');
    expect(input.placeholder).toBe(placeholder);
    expect(input.disabled).toEqual(disabled);
    wrapper.destroy();
  });
  it('测试data', () => {
    multiOptionTemplate = {
      render (h: any) {
        return h(multiOption, { props: { value, label } });
      }
    };
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel },
      slots: {
        default: multiOptionTemplate
      }
    });
    expect(wrapper.vm.$data.isFocus).toEqual(false);
    expect(wrapper.vm.$data.isAll).toEqual(false);
    expect(wrapper.vm.$data.isEmpty).toEqual(false);
    expect(wrapper.vm.$data.isSelecting).toEqual(false);
    expect(wrapper.vm.$data.selectWord).toEqual('');
    expect(wrapper.vm.$data.searchVal).toEqual('');
    expect(wrapper.vm.$data.matchNum).toEqual(0);
    expect(wrapper.vm.$data.optionsLength).toEqual(0);
    wrapper.destroy();
  });
  it('测试方法', async () => {
    multiOptionTemplate = {
      render (h: any) {
        return h(multiOption, { props: { value, label } });
      }
    };
    vModel = ['选项1'];
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel },
      slots: {
        default: multiOptionTemplate
      }
    });
    // const checkSelectAll = await (wrapper.vm as any).checkSelectAll();
    // tslint:disable-next-line: no-console
    // console.log('checkSelectAll', checkSelectAll);
    // expect(checkSelectAll).toBe(false);
    // const getwords = await (wrapper.vm as any).getwords();
    // expect(getwords).toBe('');
    const traverseAndGetName = await (wrapper.vm as any).traverseAndGetName();
    expect(traverseAndGetName).toBe(undefined);
    // const optionsChange = await (wrapper.vm as any).optionsChange();
    // expect(optionsChange).toBe(undefined);
    wrapper.destroy();
  });
  it('测试事件', () => {
    multiOptionTemplate = {
      render (h: any) {
        return h(multiOption, { props: { value, label } });
      }
    };
    // vModel = ['选项1'];
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel },
      slots: {
        default: multiOptionTemplate
      }
    });
    const stub = jest.fn(); // 伪造一个jest的mock funciton
    wrapper.setMethods({ selectAll: stub }); // setMethods将selectAll这个方法覆写
    wrapper.find('.all').trigger('click'); // 对all触发一个click事件
    expect(stub).toBeCalledTimes(0); // 查看selectAll是否被调用
    wrapper.destroy();
  });
  it('测试watch', () => {
    multiOptionTemplate = {
      render (h: any) {
        return h(multiOption, { props: { value, label } });
      }
    };
    wrapper = shallowMount(multiSelect, {
      propsData: { placeholder, vModel },
      slots: {
        default: multiOptionTemplate
      }
    });
    // const spy = jest.spyOn(console, 'log');
    // 手动将变量的值设置为false,默认值是true
    wrapper.vm.value = '选项1';
    // 断言函数是否执行
    expect(wrapper.vm.isSelecting).toBe(false);
    // expect(spy).toHaveBeenCalledTimes(1);
    // expect(spy).toHaveBeenCalledWith('自定义');
    // 清除掉mock
    // spy.mockClear();
    wrapper.destroy();
  });
});
