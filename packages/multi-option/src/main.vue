
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
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Emitter from '../../utils/emitter';
// import Emitter from 'element-ui/lib/mixins/emitter';
import { toCamel, toCapital } from '../../../utils/index'

@Component
export default class MultiOption extends Vue {
  @Prop({
    type: [String, Number]
  })
  public readonly value: string | number | undefined;

  @Prop({
    type: [String, Number]
  })
  public readonly label: string | number | undefined;

  public ComponentName = 'MultiOption';
  public name = 'MultiOption';

  private selected = false;
  private hide = false;
  public dispatch (componentName: string, eventName: string, params?: any) {
    let parent = this.$parent || this.$root;
    let name = toCapital(toCamel((parent.$options as any)._componentTag))

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = toCapital(toCamel((parent.$options as any)._componentTag))
      }
    }
    if (parent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      parent.$emit.apply(parent, [eventName].concat(params));
    }
  }

  public handleInitSelect (bool: boolean) {
    this.selected = bool;
  }

  public handleClick () {
    this.selected = !this.selected;
    this.dispatch('MultiSelect', 'selectItem', this);
  }

  public handleUpdate (val: any) {
    if (val === this.value) {
      this.selected = true;
    }
  }

  public created () {
    this.ComponentName = 'MultiOption';
    this.$on('initSelected', this.handleInitSelect);
    this.$on('updateSelected', this.handleUpdate);
    this.dispatch('MultiSelect', 'optionsChange');
  }

  public beforeDestroy () {
    this.dispatch('MultiSelect', 'optionsChange');
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

