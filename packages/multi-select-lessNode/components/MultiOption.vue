<template>
  <li
    class="el-select-dropdown__item"
    :class="{ 'is-selected': selected, hidden: hide }"
    @click="handleClick($event)"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script>
import Emitter from 'element-ui/lib/mixins/emitter';

export default {
  mixins: [Emitter],
  name: 'MultiOption',
  // 必须注明组件名，不然dispatch和brocast都无效
  componentName: 'MultiOption',
  props: {
    value: [String, Number],
    label: [String, Number]
  },
  data () {
    return {
      selected: false,
      hide: false
    };
  },
  methods: {
    handleInitSelect (bool) {
      this.selected = bool;
    },
    handleClick () {
      this.selected = !this.selected;
      this.dispatch('MultiSelect', 'selectItem', this);
    },
    handleUpdate (val) {
      // eslint-disable-next-line
      (val === this.value) ? this.selected = true : undefined;
    }
  },
  created () {
    this.$on('initSelected', this.handleInitSelect);
    this.$on('updateSelected', this.handleUpdate);

    // 级联数据发生变化时，触发创建事件，此时向上派发数据变化信息
    this.dispatch('MultiSelect', 'optionsChange');
  },
  // 级联数据发生变化时，触发销毁事件，此时向上派发数据变化信息
  beforeDestroy () {
    this.dispatch('MultiSelect', 'optionsChange');
  }
};
</script>

<style>
.is-selected {
  color: #ff4949;
  font-weight: 700;
  background: #f5f7fa;
}
.is-selected:after {
  position: absolute;
  right: 20px;
  font-family: element-icons;
  content: "\e6da";
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.hidden {
  display: none !important;
  visibility: hidden !important;
}
</style>
