<template>
  <div wrapper>
    <section class="filter" v-if="domFilter.length">
      <slot name="before-button">
        <!-- 筛选条件之前的button -->
      </slot>
      <slot name="search-item"></slot>
      <div class="item" v-for="(item, i) in domFilter" :key="i">
        <span class="label" v-if="item.type !== 'button'">{{item.label}}：</span>
        <el-input
          v-if="item.type == 'input'"
          v-model.trim="pageFilter[item.name]"
          size="small"
          :placeholder="`请输入${item.label}`"
          clearable>
        </el-input>
        <el-select
          v-if="item.type == 'select'"
          v-model="pageFilter[item.name]"
          size="small"
          :placeholder="`请选择${item.label}`"
          filterable
          clearable>
          <div v-if="Object.prototype.toString.call(item.sugMap) === '[object Array]'">
            <el-option v-for="(v, i) in item.sugMap" :key="i" :label="v.label" :value="String(v.value)"></el-option>
          </div>
          <div v-if="Object.prototype.toString.call(item.sugMap) === '[object Object]'">
            <el-option  v-for="(v, k, i) in item.sugMap" :key="i" :label="v" :value="k"></el-option>
          </div>
        </el-select>
        <el-date-picker
          v-if="item.type == 'date'"
          v-model="pageFilter[item.name]"
          size="small"
          :placeholder="`请选择${item.label}`"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :pickerOptions="item.limit ? {
            onPick: pickDate => handlePick(pickDate, item.name),
            disabledDate: date => item.limit ? disabledDate(date, item.name, item.limit) : false
          } : ''"
        :editable="false">
        </el-date-picker>
        <el-date-picker
          v-if="item.type == 'datetime'"
          v-model="pageFilter[item.name]"
          size="small"
          :placeholder="`请选择${item.label}`"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :editable="false">
        </el-date-picker>
        <el-button v-if="item.type == 'button'" size="small" type="primary" @click="item.func">{{ item.label }}</el-button>
      </div>
      <div class="item">
        <el-button size="small" type="primary" @click="queryList">查询</el-button>
        <!-- 查询之后的button -->
        <slot name="after-button" />
      </div>
    </section>
    <section class="table">
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column
          v-for="(v, i) in tableLabel"
          :key="i"
          :label="v.label"
          :min-width="v.minWidth">
          <template slot-scope="scope">
            <span>{{ v.extends ? v.extends[scope.row[v.prop]]: scope.row[v.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" v-if="Object.keys(tableOperation).length" :min-width="tableOperation.minWidth">
          <template slot-scope="scope">
            <span v-for="(item, index) in tableOperation.con" :key="index" class="operation">
              <el-button
                size="small"
                :type="item.type"
                @click="item.func(scope.row)"
                :disabled="item.disabled ? item.disabled(scope.row) : false">
                {{ item.label }}
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section page v-if="total">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="total, prev, pager, next"
				:total="total">
			</el-pagination>
		</section>
    </div>
</template>
<script>
export default {
  name: 'FormTable',
  componentName: 'FormTable',
  props: {
    /**
     * @param { queryFilter } 接口查询参数
     */
    queryFilter: {
      type: Object,
      default () {
        return {}
      }
    },

    /**
     * @param { domFilter } {UI层表单参数}
     * childrenParam
     * @param { label }     {名称}
     * @param { type }      {类型}
     * @param { name }      {绑定字段名}
     * @param { limit }     {type为date时所需参数 起末范围}
     * @param { sugMap }    {type为date时所需参数 下拉字典}
     */
    domFilter: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * @param { tableLabel }  {表格头信息}
     * childrenParam
     * @param { minWidth }    {宽度}
     * @param { label }       {名称}
     * @param { prop }        {所取字段名}
     */
    tableLabel: {
      type: Array,
      default () {
        return []
      }
    },

    /**
     * @param { tableData }   {表格数据}
     */
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    /**
     * @param { tableOperation }   {表格操作栏信息}
     */
    tableOperation: {
      type: Object,
      default () {
        return {}
      }
    },
    queryFunc: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  data () {
    // 初始化data数据
    const initData = this.init()
    return {
      pageFilter: initData.pageFilter,
      limit: initData.limit,
      loading: false,
      currentPage: 1
    }
  },
  methods: {
    /**
     * 参数初始化
     */
    init () {
      const pageFilter = {}
      const limit = {}
      this.domFilter.forEach(v => {
        pageFilter[v.name] = v.default || null
        if (v.limit) {
          limit[`${v.name}Limit`] = [null, null]
        }
      })
      return { pageFilter, limit }
    },

    /**
     * 日期范围限制
     */
    disabledDate (date, name, limit) {
      const today = new Date().getTime()
      const originTime = date.getTime()
      if (this['limit'][`${name}Limit`][0] && !this['limit'][`${name}Limit`][1]) {
        const startTime = new Date(this['limit'][`${name}Limit`][0]).getTime()
        return originTime > Math.min(today, (startTime + (limit * 24 * 3600 * 1000))) || originTime < startTime - (limit * 24 * 3600 * 1000)
      }
      return originTime > today
    },
    handlePick ({ maxDate, minDate }, name) {
      if (maxDate && minDate) {
        this['pageFilter'][name] = [minDate, maxDate]
      }
      this['limit'][`${name}Limit`] = [minDate, maxDate]
    },

    /**
     * 列表查询
     */
    queryList () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$emit('setQueryFilter', { ...this.pageFilter, currentPage: this.currentPage })
        this.$nextTick(() => {
          const params = Object.assign(this.queryFilter, {
            prepage: this.pageSize
          })
          this.queryFunc(params)
          .then(res => {
            this.loading = false
            if (res.errno === 0) {
              const result = res.data
              this.$emit('callbackDataFormat', result)
              resolve()
            } else {
              reject()
            }
          })
        })
      })
    },
    /**
     * 翻页
     */
    handleCurrentChange (current) {
      this.currentPage = current
      this.queryList(this.currentPage)
    }
  },

  watch: {
    // 筛选项深度监听自动查询列表 第一次赋值data时查询列表(页面进来自动查询一次列表)
    pageFilter: {
      handler () {
        this.$emit('setQueryFilter', { ...this.pageFilter, currentPage: this.currentPage })
      },
      deep: true
    }
  },
  mounted () {
    this.handleCurrentChange()
  }
}
</script>
<style lang="less" scoped>
    [wrapper] {
        padding: 20px;
        .filter{
            margin-bottom: 10px;
            font-size: 0;
            .item{
                display: inline-block;
                margin-right: 20px;
                margin-bottom: 10px;
                .label{
                    display: inline-block;
                    min-width: 86px;
                    text-align: right;
                    font-size: 14px;
                }
                .el-input, .el-select{
                    width: 160px;
                }
            }
        }
        .operation{
            .el-button{
                margin-right: 10px;
            }
        }
    }
</style>
