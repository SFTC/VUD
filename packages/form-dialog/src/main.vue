<template>
  <el-dialog :title="dialogObj.title" :visible="dialogObj.visible" width="600px" :before-close="handleClose" class="commDia">
    <el-form>
      <el-form-item class="item" v-for="(item, i) in domFilter" :key="i" :label="item.label" v-show="!item.show">
        <el-input
          v-if="item.type == 'input'"
          v-model.trim="queryFilter[item.name]"
          size="small"
          :placeholder="`请输入${item.label}`"
          @input="handleChange(item.name,$event)"
          :disabled="item.disabled"
          clearable>
        </el-input>
        <el-select
          v-if="item.type == 'select'"
          v-model="queryFilter[item.name]"
          :disabled="item.disabled"
          size="small"
          :placeholder="`请选择${item.label}`"
          @input="handleChange(item.name,$event)"
          filterable
          clearable>
          <div v-if="Object.prototype.toString.call(item.sugMap) === '[object Array]'">
            <el-option v-for="(v, i) in item.sugMap" :key="i" :label="v.label" :value="v.value"></el-option>
          </div>
          <div v-if="Object.prototype.toString.call(item.sugMap) === '[object Object]'">
            <el-option  v-for="(v, k, i) in item.sugMap" :key="i" :label="v" :value="k"></el-option>
          </div>
        </el-select>
        <el-radio-group
          v-if="item.type == 'radio'"
          v-model="queryFilter[item.name]"
          :disabled="item.disabled"
          @input="handleChange(item.name,$event)"
          size="small">
          <el-radio v-for="(v,i) in item.sugMap" :key="i" :label="v.value">{{v.label}}</el-radio>
        </el-radio-group>
        <el-date-picker
          v-if="item.type == 'date'"
          v-model="queryFilter[item.name]"
          :disabled="item.disabled"
          @input="handleChange(item.name,$event)"
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
          v-model="queryFilter[item.name]"
          :disabled="item.disabled"
          @input="handleChange(item.name,$event)"
          size="small"
          :placeholder="`请选择${item.label}`"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :editable="false">
        </el-date-picker>
      </el-form-item>
      <div class="item">
        <!-- 查询之后的button -->
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" type="primary" @click="close">关闭</el-button>
        <slot name="after-button" />
      </div>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'FormDialog',
  componentName: 'FormDialog',
  props: {
    /**
     * @param { queryFilter } 接口查询参数
     */
    dialogObj: {
      type: Object,
      default () {
        return {
          title: '',
          visible: false
        }
      }
    },
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
    handleChange: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    // 初始化data数据
    const initData = this.init()
    return {
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
      const limit = {}
      this.domFilter.forEach(v => {
        if (v.limit) {
          limit[`${v.name}Limit`] = [null, null]
        }
      })
      return { limit }
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
        this['queryFilter'][name] = [minDate, maxDate]
      }
      this['limit'][`${name}Limit`] = [minDate, maxDate]
    },
    handleClose () {
      this.$emit('beforeClose', this.queryFilter)
    },
    submit () {
      this.$emit('beforeClose', this.queryFilter, 'submit')
    },
    close () {
      this.$emit('beforeClose', this.queryFilter, 'close')
    }
  }
}
</script>
<style lang="less" scoped>
.commDia {
  .item-title {
    font-size: 16px;
    padding: 0 0 0 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .main-desc {
    width: 90%;
    color: blue;
    margin: -20px auto 20px;
  }
  .form-filter {
    .el-input {
      width: 80%;
    }
    .el-input__inner {
      width: 80%;
    }
    .el-select {
      width: 80%;
    }
    .input-item-href {
      width: 100%;
    }
  }
  .form-short {
    .el-input {
      width: 20%;
    }
  }
  .href-item {
    width: 34.2%;
    display: inline-block;
  }
  .footer {
    text-align: right;
    margin: 20px 0px 0px 0px;
  }
}
</style>
