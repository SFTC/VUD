<template>
  <div>
    <multi-select
      :placeholder="placeholder"
      :value="value"
      @input="onselect"
      :onSearch="onSearch"
      :total="optionList && optionList.length"
      :findLabel="findLabel"
      @selectAll="selectAll"
      :disabled="disabled"
    >
      <multi-option
        v-for="item in showList"
        :key="`item-${item[optionKeyOfKey]}`"
        :label="item[optionLabelOfKey]"
        :value="item[optionValueOfKey]"
      />
    </multi-select>
    <el-tooltip :style="tooltipContainerStyle" effect="dark" :content="toolTipCtx" placement="top-start" v-if="isLimit">
      <i class="label-icon" :class="tooltipIcon" />
    </el-tooltip>
  </div>
</template>

<script>
import MultiSelect from '../components/MultiSelect.vue';
import MultiOption from '../components/MultiOption.vue';

export default {
  name: 'MultiSelectLessNode',
  componentName: 'MultiSelectLessNode',
  data () {
    return {
      showList: this.isLimit ? this.optionList.slice(0, this.limitShowCount) : this.optionList
    };
  },
  components: {
    MultiSelect,
    MultiOption
  },
  props: {
    // 需要渲染的下拉option数量
    limitShowCount: {
      type: Number,
      default: 30
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // selsect禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否全量渲染下拉的option
    isLimit: {
      type: Boolean,
      default: true
    },
    // tooltip自定义样式
    tooltipContainerStyle: {
      type: Object,
      default () {
        return {
          marginLeft: '7px'
        };
      }
    },
    // 数据源
    optionList: {
      type: Array,
      required: true
    },
    // 父级参数绑定
    value: {
      type: Array,
      required: true
    },
    // 单个option vfor的key，取自optionList的item对象某个key
    optionKeyOfKey: {
      type: String,
      required: true
    },
    // 单个option vfor的展示的文案，取自optionList的item对象某个key
    optionLabelOfKey: {
      type: String,
      required: true
    },
    // 单个option vfor绑定的value，取自optionList的item对象某个key
    optionValueOfKey: {
      type: String,
      required: true
    },
    // tooltip自定义hover图标
    tooltipIcon: {
      type: String,
      default: 'el-icon-question'
    }
  },
  computed: {
    toolTipCtx () {
      return `仅展示${this.limitShowCount}条数据，请输入关键词搜索更多`;
    }
  },
  watch: {
    optionList (cur) {
      this.showList = this.isLimit ? cur?.slice(0, this.limitShowCount) : cur;
    }
  },
  methods: {
    onSearch (key, cb) {
      // 搜索是用optionList做全量搜索
      let searchRes = this.optionList;
      if (this.isLimit) {
        searchRes = this.optionList
          .filter(el => {
            return el[this.optionLabelOfKey]?.toLowerCase().includes(key?.trim().toLowerCase())
          })
          .slice(0, this.limitShowCount);
      }
      const readyToAdd = [];
      if (this.value.length && this.value.length !== this.optionList.length) {
        for (const item of this.value) {
          if (searchRes.every((f) => f.value !== item)) {
            const targetIndex = this.optionList.findIndex((t) => t.value === item);
            if (targetIndex > -1) {
              readyToAdd.push(this.optionList[targetIndex]);
            }
          }
        }
      }
      this.showList = [...readyToAdd, ...searchRes];
      cb(this.showList.length);
    },
    findLabel (val, cb) {
      const targetIndex = this.optionList.findIndex((s) => s[this.optionValueOfKey] === val);
      cb(targetIndex > -1 ? this.optionList[targetIndex][this.optionLabelOfKey] : '');
    },
    selectAll (isAll) {
      const _value = [];
      if (isAll) {
        for (let i = 0, len = this.optionList.length; i < len; i++) {
          _value.push(this.optionList[i].value);
        }
      }
      this.$emit('input', _value);
    },
    onselect (_value) {
      this.$emit('input', _value);
    }
  }
};
</script>
