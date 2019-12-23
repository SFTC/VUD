<template>
  <li
      class="el-select-dropdown__item"
      :class="{ 'multi-select__is-selected': selected, 'multi-select__hidden': hide }"
      @click="handleClick($event)">
      <span>{{ label }}</span>
      <i :class="['el-icon-check', { 'multi-select__selected-icon': selected, 'multi-select__hidden': !selected }]"></i>
  </li>
</template>

<script>
// element自带工具函数, dispatch和brocast，向上派发和向下派发事件
import Emitter from 'element-ui/lib/mixins/emitter'

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
    }
  },
  methods: {
    handleInitSelect (bool) {
      this.selected = bool
    },
    handleClick () {
      this.selected = !this.selected
      this.dispatch('MultiSelect', 'selectItem', this)
    },
    handleUpdate (val) {
      // eslint-disable-next-line
      (val === this.value) ? this.selected = true : undefined;
    }
  },
  created () {
    this.$on('initSelected', this.handleInitSelect)
    this.$on('updateSelected', this.handleUpdate)

    // 级联数据发生变化时，触发创建事件，此时向上派发数据变化信息
    this.dispatch('MultiSelect', 'optionsChange')
  },
  // 级联数据发生变化时，触发销毁事件，此时向上派发数据变化信息
  beforeDestroy () {
    this.dispatch('MultiSelect', 'optionsChange')
  }
}
</script>

<style>
.multi-select__is-selected {
  color: #FF4949;
  font-weight: 700;
  background: #f5f7fa;
}
.multi-select__selected-icon {
  position: absolute;
  right: 20px;
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  top: 11px;
}
.multi-select__hidden {
  display: none !important;
  visibility: hidden !important;
}
</style>

