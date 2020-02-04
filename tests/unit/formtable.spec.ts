import { createLocalVue, shallowMount } from '@vue/test-utils';
import element from 'element-ui';
import FormTable from '../../packages/form-table/src/main.vue';
// import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios';
const localVue = createLocalVue();
localVue.use(element);
// localVue.axios = axios;

describe('formTable.vue', () => {
  const searchKnight = () => new Promise((resolve, reject) => {
    resolve({
      errno: 0,
      data: {
        total: 0,
        list: [{}],
      },
    });
  });
  const defaultProps = {
    queryFilter: {
      work_type: '',
      account_status: '',
    },      // 列表接口参数
    domFilter: [
      {
        name: 'work_type',               // 下拉框sugMap参数Array转换为 [{key: 'key', value: 'value'}]  Object转换为 {key: value}
        label: '骑士类型',
        type: 'select',
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
        name: 'account_status',
        label: '骑士状态',
        type: 'select',
        sugMap: [
          { label: '在职', value: 1 },
          { label: '离职', value: 2 },
        ],
      },
      {
        label: '电话号码',
        type: 'input',
        name: 'phone',
      },
    ],
    tableLabel: [
      {
        minWidth: 160,
        label: '骑士ID',
        prop: 'rider_id',
      }, {
        minWidth: 160,
        label: '同城ID',
        prop: 'ucode',
      }, {
        minWidth: 160,
        label: '姓名',
        prop: 'chinesename',
      }, {
        minWidth: 160,
        label: '电话',
        prop: 'bind_phone',
      },
    ],
    tableData: [{}],
    total: 0,
    pageSize: 10,
    tableOperation: {
      minWidth: 200,
      con: [
        {
          type: 'primary',
          label: '查看',
          func: () => void 0,
        },
        {
          type: 'primary',
          label: '审核',
          func: () => void 0,
        },
      ],
    },
    queryFunc: searchKnight,
  };
  let wrapper: any = null;
  beforeAll(() => {
    wrapper = shallowMount(FormTable, {
      localVue,
      propsData: defaultProps ,
    });
  });
  // let wrapper = shallowMount(FormTable, {
  //   localVue,
  //   propsData: defaultProps,
  // });
  it('renders props.tableData when passed', () => {
    expect(wrapper.props().tableData).toEqual([{}]);
  });
  it('renders props.queryFilter when passed', () => {
    expect(wrapper.props().queryFilter.work_type).toBe('');
  });
  it('renders props.tableLabel when passed', () => {
    expect(wrapper.props().tableLabel[0].prop).toBe('rider_id');
  });
  it('pageFilter change', (done) => {
    wrapper.vm.$nextTick(() => {
    wrapper.setData({pageFilter: {
      account_status: '2',
      bind_phone: 1,
      currentPage: 1,
      prepage: 10,
      work_type: '110',
    }});
    expect(wrapper.vm.pageFilter.work_type).toBe('110');
    done();
    });
  });
  it('api error', (done) => {
    wrapper.vm.$nextTick(() => {
        const errorKnight = () => new Promise((resolve, reject) => {
          resolve({
            errno: 1,
            data: {
              total: 1,
              list: [],
            },
          });
        });
        wrapper = shallowMount(FormTable, {
        localVue,
        propsData: {...defaultProps, queryFunc: errorKnight},
      });
        done();
        expect(wrapper.vm.tableData).toEqual([{}]);
    });
  });
});