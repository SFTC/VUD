```html
<template>
  <div id="app">
    <form-table
      ref="form-table"
      :queryFilter="queryFilter"
      :domFilter="domFilter"
      :queryFunc="queryFunc"
      :tableLabel="tableLabel"
      :tableData="tableData"
      :pageSize="pageSize"
      :total="total"
      :tableOperation="tableOperation"
      @setQueryFilter="setQueryFilter"
      @callbackDataFormat="callbackDataFormat">
      <div slot="before-button">
        <el-button size="small" type="primary" @click="addRole">创建账号</el-button>
      </div>
      <div slot="search-item" class="item">
        <span class="label">供应商：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span slot="after-button" style="margin-left:10px;">
        <el-button size="small" type="primary" @click="downLoad">下载</el-button>
        <el-button size="small" type="primary" @click="downLoadAll">下载全部</el-button>
      </span>
    </form-table>
  </div>
</template>

<script>
import { searchKnight } from '../api'
export default {
  name: 'formt',
  components: {
    // LogisticsSupplierStationCascade
  },
  data() {
   const accountStatus = {
      1: '在职',
      2: '离职',
    }
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      queryFilter: {
        work_type:'',
        account_status:'',
      },      // 列表接口参数
      domFilter: [
        { 
          name:'work_type',               // 下拉框sugMap参数Array转换为 [{key: 'key', value: 'value'}]  Object转换为 {key: value}
          label: '骑士类型',
          type: 'select',
          sugMap: [
            {label: "同城全日制专职骑士", value: 100},
            {label: "同城兼职骑士", value: 200},
            {label: "同城非全日制专职骑士", value: 101},
            {label: "供应商骑士", value: 110},
            {label: "社会兼职骑士", value: 201},
            {label: "兼职供应商骑士", value: 202}
          ],
        },
        {
          name: 'account_status',
          label: '骑士状态',
          type: 'select',
          sugMap: [
            {label: "在职", value: 1},
            {label: "离职", value: 2}
          ]
        },
        {
          label: '电话号码',
          type: 'input',
          name: 'phone',  
        }, 
        // {
        //   label: '下拉',
        //   type: 'select',
        //   sugMap: {
        //     'key': 'value'
        //   },
        // }, 
        // {
        //   label: '日期',
        //   type: 'date',
        //   name: 'b',
        //   limit: 10,        // 期末范围控制
        //   default: []       // 默认时间
        // },
      ],
      queryFunc: searchKnight,  // 列表查询方法
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
        }, {
          minWidth: 160,
          label: '骑士状态',
          prop: 'account_status',
          extends:accountStatus
        }
      ],
      tableData: [{}],
      total:0,
      pageSize:10,
      tableOperation: {
        minWidth: 200,
        con: [
          {
            type: 'primary',
            label: '查看',
            func:(t)=>{
              alert(t);
            }
          },
          {
            type: 'primary',
            label: '审核',
            func:(t)=>{
              alert(t);
            }
          }
        ]
      },
    }
  },
  methods: {
    // 列表接口请求参数设置
    setQueryFilter(filter) {
      this.queryFilter = Object.assign({}, {
        work_type: filter.work_type,
        account_status: filter.account_status,
        bind_phone: filter.bind_phone,
        currentPage: filter.currentPage || 1,
      })
    },

    // 接口回调处理
    callbackDataFormat(data) {
      if(data){
        this.tableData = data.list;
        this.total = data.total
      }
    },
    addRole(){

    },
    downLoad(){

    },
    downLoadAll(){

    }
  }
}
</script>

<style>

</style>

```