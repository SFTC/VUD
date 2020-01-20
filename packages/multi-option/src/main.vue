
<template>
  <li
      class="el-select-dropdown__item"
      :class="{ 'multi-select__is-selected': selected, 'multi-select__hidden': hide }"
      @click="handleClick($event)">
      <span>{{ label }}</span>
      <i :class="['el-icon-check', { 'multi-select__selected-icon': selected, 'multi-select__hidden': !selected }]"></i>
  </li>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Mixins, Prop } from 'vue-property-decorator'
import Emitter from '../../../lib/emitter'

@Component
export default class MultiOption extends Mixins(Emitter) {
  @Prop({
    type: [String, Number]
  })
  readonly value: string | number | undefined
  @Prop({
    type: [String, Number]
  })
  readonly label: string | number | undefined

  selected: boolean = false
  hide: boolean = false
  componentName: string = 'MultiOption'
  handleInitSelect(bool) {
    this.selected = bool
  }

  handleClick() {
    this.selected = !this.selected
    this.dispatch('MultiSelect', 'selectItem', this)
  }

  handleUpdate(val) {
    val === this.value ? this.selected = true : undefined
  }

  created() {
    this.componentName='MultiOption'
    this.$on('initSelected', this.handleInitSelect)
    this.$on('updateSelected', this.handleUpdate)
    this.dispatch('MultiSelect', 'optionsChange')
  }

  beforeDestroy() {
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

