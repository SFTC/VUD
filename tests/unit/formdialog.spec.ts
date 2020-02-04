import { createLocalVue, shallowMount } from '@vue/test-utils';
import element from 'element-ui';
import FormTable from '../../packages/form-dialog/src/main.vue';
// import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios';
const localVue = createLocalVue();
localVue.use(element);
// localVue.axios = axios;

describe('formTable.vue', () => {
  const initQueryFilter = {
      work_type: '',
      business_status: '',
      datetime: '',
      effect_mode: '',
    };
  const intDomFilter = [
      {
        name: 'work_type',               // 下拉框sugMap参数Array转换为 [{key: 'key', value: 'value'}]  Object转换为 {key: value}
        label: '骑士类型',
        type: 'select',
        disabled: false,
        sugMap: [
          { label: '同城全日制专职骑士', value: 100 },
          { label: '同城兼职骑士', value: 200 },
          { label: '同城非全日制专职骑士', value: 101 },
          { label: '供应商骑士', value: 110 },
          { label: '社会兼职骑士', value: 201 },
          { label: '兼职供应商骑士', value: 202 },
        ],
      },
      {
        name: 'business_status',
        label: '业务类型',
        type: 'select',
        disabled: false,
        sugMap: [
          { label: '即可送', value: 1 },
          { label: '急送', value: 2 },
        ],
      },
      {
        label: '生效日期',
        type: 'date',
        name: 'datetime',
        limit: 10,
        disabled: false,
        default: [],
      },
      {
        label: '生效模式',
        type: 'radio',
        name: 'effect_mode',
        disabled: false,
        sugMap: [
          { label: '店铺', value: 1 },
          { label: '商圈', value: 2 }
        ],
      },
      {
        name: 'aoi',
        label: '商圈',
        type: 'select',
        show: true,
        disabled: false,
        sugMap: [
          { label: '全北京最大商圈', value: 1 },
          { label: '占海商圈', value: 2 }
        ],
      },
      {
        name: 'shop',
        label: '店铺',
        type: 'select',
        show: true,
        disabled: false,
        sugMap: [
          { label: '全北京最大店铺', value: 1 },
          { label: '占海店铺', value: 2 }
        ],
      },
    ];
  let wrapper: any = null;
  beforeAll(() => {
    wrapper = shallowMount(FormTable, {
      localVue,
      propsData: {
        dialogObj: {
          title: '保低佣金',
          visible: false,
        },
        queryFilter: JSON.parse(JSON.stringify(initQueryFilter)),      // 列表接口参数
        domFilter: JSON.parse(JSON.stringify(intDomFilter)),
      } ,
    });
  });
  // let wrapper = shallowMount(FormTable, {
  //   localVue,
  //   propsData: defaultProps,
  // });
  it('renders props.dialogObj when passed', () => {
    expect(wrapper.props().dialogObj.title).toEqual('保低佣金');
  });
  // it('renders props.queryFilter when passed', () => {
  //   expect(wrapper.props().queryFilter.work_type).toBe('');
  // });
  // it('renders props.tableLabel when passed', () => {
  //   expect(wrapper.props().tableLabel[0].prop).toBe('rider_id');
  // });
  // it('pageFilter change', (done) => {
  //   wrapper.vm.$nextTick(() => {
  //   wrapper.setData({pageFilter: {
  //     account_status: '2',
  //     bind_phone: 1,
  //     currentPage: 1,
  //     prepage: 10,
  //     work_type: '110',
  //   }});
  //   expect(wrapper.vm.pageFilter.work_type).toBe('110');
  //   done();
  //   });
  // });
  // it('api error', (done) => {
  //   wrapper.vm.$nextTick(() => {
  //       const errorKnight = () => new Promise((resolve, reject) => {
  //         resolve({
  //           errno: 1,
  //           data: {
  //             total: 1,
  //             list: [],
  //           },
  //         });
  //       });
  //       wrapper = shallowMount(FormTable, {
  //       localVue,
  //       propsData: {...defaultProps, queryFunc: errorKnight},
  //     });
  //       done();
  //       expect(wrapper.vm.tableData).toEqual([{}]);
  //   });
  // });
});
