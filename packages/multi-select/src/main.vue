<template>
  <div class="multi-select" v-clickoutside="handleOut">
      <div class="el-input el-input--suffix" :class="disabled ? 'is-disabled' : ''" @click="handleClick">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-input__icon el-icon-caret el-icon-arrow-down" :class="isFocus ? 'is-reverse' : ''"></i>
          </span>
        </span>
        <input autocomplete="off" readonly rows="2" type="text" class="el-input__inner" ref="input"
            :class="isFocus ? 'focus' : ''"
            :placeholder="placeholder"
            v-model="selectWord"
            :disabled="disabled"
            >
      </div>
      <transition name="el-zoom-in-top">
      <div class="el-select-dropdown common" v-show="this.isFocus">
        <div class="el-scrollbar">
        <div class="el-scrollbar__wrap el-select-dropdown__wrap">
          <div class="el-input multi-search-bar">
              <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                  <i class="el-input__icon el-icon-caret el-icon-search"></i>
                </span>
              </span>
              <input autocomplete="off" rows="2" type="text" class="el-input__inner" ref="input"
                placeholder="搜索"
                @input="handleSearch"
                :value="searchVal"
                >
          </div>
          <ul class="el-select-dropdown__list">
            <li class="el-select-dropdown__item all" @click="selectAll" :class="isAll ? 'multi-select__is-selected' : ''" v-show="optionsLength > 0">
              <span>全选</span>
              <i :class="['el-icon-check', { 'multi-select__selected-icon': isAll, 'multi-select__hidden': !isAll }]"></i>
            </li>
            <slot></slot>
          </ul>
          <p class="el-select-dropdown__empty" v-show="isEmpty || optionsLength === 0">无匹配数据</p>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">

// import Emitter from '../../utils/emitter';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Clickoutside from 'element-ui/lib/utils/clickoutside';
// import Emitter from 'element-ui/lib/mixins/emitter';

function _broadcast (componentName: string, eventName: string, params: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  this.$children.forEach((child: any) => {
    const name = child.$options.name;
    if (name === componentName) {
      // eslint-disable-next-line prefer-spread
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

@Component({
  // 必须注明组件名，不然dispatch和brocast都无效
  directives: { Clickoutside }
})
export default class MultiSelect extends Vue {
  @Prop({
    type: Array
  })
  public readonly value!: string[];

  @Prop({
    type: String
  })
  public readonly placeholder: string | undefined;

  @Prop({
    type: Boolean
  })
  public readonly disabled: boolean | undefined;

  public ComponentName = 'MultiSelect';

  private isFocus = false;
  private isAll = false;
  private isEmpty = false;
  private isSelecting = false;
  private selectWord = '';
  private searchVal = '';
  private matchNum = 0;
  private optionsLength = 0;

  public dispatch (componentName: string, eventName: string, params: any) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      parent.$emit.apply(parent, [eventName].concat(params));
    }
  }

  public broadcast (componentName: string, eventName: string, params: any) {
    _broadcast.call(this, componentName, eventName, params);
  }

  public created () {
    this.$on('selectItem', this.selectItem);
    this.$on('optionsChange', this.optionsChange);
    this.$nextTick(() => {
      this.optionsLength = this.$children && this.$children.length;
      if (this.value && this.value.length && Array.isArray(this.value)) {
        this.selectWord = this.getwords();
        this.isAll = this.checkSelectAll();
        this.value.forEach((val) => {
          this.broadcast('MultiOption', 'updateSelected', val);
        });
      } else {
        this.selectWord = this.isAll ? '全选' : '';
      }
    });

    if (this.isAll) {
      const value = this.value.slice();
      this.$nextTick(() => {
        this.$children.forEach((item: any) => {
          value.push(item.value);
        });
        this.$emit('input', value);
        this.broadcast('MultiOption', 'initSelected', this.isAll);
      });
    }
  }


  @Watch('value')
  public onValueChanged () {
    this.$nextTick(() => {
      const selectNum = this.value.length;
      this.isAll = this.checkSelectAll();
      this.selectWord = this.getwords();
      console.log(this.isAll)
      if (selectNum === 0) {
        this.broadcast('MultiOption', 'initSelected', false);
      } else if (selectNum === this.optionsLength) {
        this.broadcast('MultiOption', 'initSelected', true);
      } else {
        if (!this.isSelecting) {
          this.broadcast('MultiOption', 'initSelected', false);
          this.value.forEach((val) => {
            this.broadcast('MultiOption', 'updateSelected', val);
          });
        }
      }

      this.isSelecting = false;
    });
  }

  public checkSelectAll () {
    if (this.$children.length !== this.optionsLength) {
      this.optionsLength = this.$children.length;
    }

    const selectNum = this.value.length;
    return selectNum === this.optionsLength && selectNum !== 0;
  }

  public getwords () {
    const selectNum = this.value.length;
    let words;

    if (selectNum === 1) {
      words = this.traverseAndGetName(this.value[0]);
    } else if (selectNum === 2) {
      const temp1 = this.traverseAndGetName(this.value[0]);
      const temp2 = this.traverseAndGetName(this.value[1]);
      words = `${temp1} ，${temp2}`;
    } else if (selectNum === 0) {
      words = '';
    } else {
      words = `${selectNum}个选择`;
    }

    return words;
  }

  public traverseAndGetName (val: string) {
    const options: any = this.$children;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < options.length; i++) {
      if (val === options[i].value) {
        return options[i].label;
      }
    }

    return '';
  }

  public optionsChange () {
    this.$nextTick(() => {
      const length = this.$children.length;
      if (length === this.optionsLength) { return; }
      this.optionsLength = length;
    });
  }

  public handleClick () {
    if (this.disabled) {
      return;
    }

    if (this.isFocus) {
      (this.$refs.input as any).blur();
      this.handleOut();
      return;
    }

    this.isFocus = !this.isFocus;
  }

  public handleOut () {
    this.isFocus = false;
    this.isEmpty = false;
  }

  public handleSearch (e: any) {
    const val = e.target.value;
    const len = this.optionsLength;
    const regExp = new RegExp(val, '');
    this.searchVal = val;

    for (let i = 0; i < len; i++) {
      const item: any = this.$children[i];
      const match = regExp.test(item.label);

      if (match) {
        item.hide = false;
        this.matchNum++;
      } else {
        item.hide = true;
      }

      if (i === len - 1) {
        this.matchNum === 0 ? this.isEmpty = true : this.isEmpty = false;
      }
    }

    this.matchNum = 0;
  }

  public selectItem (item: any) {
    const value = this.value.slice();
    const index = value.indexOf(item.value);

    if (index === -1) {
      value.push(item.value);
    } else {
      value.splice(index, 1);
    }

    this.isSelecting = true;
    this.$emit('input', value);
  }

  public selectAll () {
    const value: any[] = [];
    this.isAll = !this.isAll;

    if (this.isAll) {
      this.$children.forEach((item: any) => {
        value.push(item.value);
      });
    }

    this.$emit('input', value);
  }
}
</script>

<style lang="less" scoped>
.is-reverse {
  transform: rotate(180deg);
}
.all {
  color: #FF4949;
}
.focus {
  border: 1px solid #FF4949;
}
.common {
  max-height: 300px;
  // overflow: auto;
  min-width: 173px;
  transform-origin: center top 0px;
  z-index: 2002;
  position: absolute;
}

.multi-search-bar {
  i {
    right: 10px;
  }
  input {
    border: none;
    border-bottom: 1px solid #d8dce5;
    border-radius: 0;
    padding-top: 0;
    padding-bottom: 4px;
  }
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
.el-select-dropdown__empty {
  padding: 0 0 10px 0;
}
.el-select-dropdown__list {
  padding-top: 0;
}
.multi-select {
  display: inline-block;
  position: relative;
}
.el-input__inner {
  text-overflow: ellipsis;
}
</style>

