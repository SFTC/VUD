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

<script>
// element自带工具指令
// 原理参见 https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js
import Clickoutside from 'element-ui/lib/utils/clickoutside'
// element自带工具函数, dispatch和brocast，向上派发和向下派发事件
import Emitter from 'element-ui/lib/mixins/emitter'

/* eslint-disable no-underscore-dangle */
export default {
  name: 'MultiSelect',
  // 必须注明组件名，不然dispatch和brocast都无效
  componentName: 'MultiSelect',
  props: {
    value: Array,
    placeholder: String,
    disabled: Boolean
  },
  directives: { Clickoutside },
  mixins: [Emitter],
  created () {
    this.$on('selectItem', this.selectItem)
    this.$on('optionsChange', this.optionsChange)
    // 初始化获取列表长度，显示的文字
    this.$nextTick(() => {
      this.optionsLength = this.$children.length
      // 如果value有初始值
      if (this.value.length && Array.isArray(this.value)) {
        this.selectWord = this.getwords()
        this.isAll = this.checkSelectAll()
        // 更新每个选项的选中状态
        this.value.forEach((val) => {
          this.broadcast('MultiOption', 'updateSelected', val)
        })
      } else {
        this.selectWord = this.isAll ? '全选' : ''
      }
    })
    // 如果默认为全选
    // 我不知道什么时候逻辑会走到这个分支？by lichun
    // 这个是当初设想如果需要默认全选的情况，就走这个分支，但是现在好像没这个需求。by maoyuyang
    if (this.isAll) {
      const value = this.value.slice()
      // push所有值，派发全选状态
      this.$nextTick(() => {
        this.$children.forEach((item) => {
          value.push(item.value)
        })
        this.$emit('input', value)
        this.broadcast('MultiOption', 'initSelected', this.isAll)
      })
    }
  },
  data () {
    return {
      isFocus: false,
      isAll: false,
      isEmpty: false,
      isSelecting: false,
      selectWord: '',
      searchVal: '',
      matchNum: 0,
      optionsLength: 0
    }
  },
  watch: {
    // 监听传进来的value，回显用
    value () {
      this.$nextTick(() => {
        const selectNum = this.value.length
        this.isAll = this.checkSelectAll()
        this.selectWord = this.getwords()
        if (selectNum === 0) {
          this.broadcast('MultiOption', 'initSelected', false)
        } else if (selectNum === this.optionsLength) {
          this.broadcast('MultiOption', 'initSelected', true)
        } else {
          // 此处代码是为了在外部value动态改变时，更新子选项的选中状态
          // 但是点选item时，也会触发，导致无用循环，多遍历了2次，所以加了一个标志位
          // eslint-disable-next-line
          if (!this.isSelecting) {
            // 重置
            this.broadcast('MultiOption', 'initSelected', false)
            // 更新每个选项的选中状态
            this.value.forEach((val) => {
              this.broadcast('MultiOption', 'updateSelected', val)
            })
          }
        }
        this.isSelecting = false
      })
    }
  },
  methods: {
    checkSelectAll () {
      if (this.$children.length !== this.optionsLength) {
        this.optionsLength = this.$children.length
      }
      const selectNum = this.value.length
      return (selectNum === this.optionsLength && selectNum !== 0)
    },
    getwords () {
      // 只显示前两个选择，多于两个折叠
      const selectNum = this.value.length
      let words

      if (selectNum === 1) {
        // 找第一个被选中的
        words = this.traverseAndGetName(this.value[0])
      } else if (selectNum === 2) {
        // 找第前两个被选中的
        const temp1 = this.traverseAndGetName(this.value[0])
        const temp2 = this.traverseAndGetName(this.value[1])
        words = `${temp1} ，${temp2}`
      } else if (selectNum === 0) {
        words = ''
      } else {
        words = `${selectNum}个选择`
      }
      return words
    },
    traverseAndGetName (val) {
      const options = this.$children
      for (let i = 0; i < options.length; i++) {
        if (val === options[i].value) {
          return options[i].label
        }
      }
      return ''
    },
    // 监听子组件的options数据，需要动态更新子选项的数目，因为级联数据随时会变
    // 缺点就是性能比较差,因为每个option都会触发一次，好处就是外部不需要传options选项来监听
    optionsChange () {
      this.$nextTick(() => {
        const length = this.$children.length
        if (length === this.optionsLength) return
        this.optionsLength = length
      })
    },
    handleClick () {
      if (this.disabled) {
        return
      }
      if (this.isFocus) {
        this.$refs.input.blur()
        this.handleOut()
        return
      }
      this.isFocus = !this.isFocus
    },
    handleOut () {
      this.isFocus = false
      this.isEmpty = false
    },
    // 搜索
    handleSearch (e) {
      const val = e.target.value
      const len = this.optionsLength
      // 正则匹配
      const regExp = new RegExp(val, '')
      this.searchVal = val
      for (let i = 0; i < len; i++) {
        const item = this.$children[i]
        const match = regExp.test(item.label)
        if (match) {
          item.hide = false
          this.matchNum++
        } else {
          item.hide = true
        }
        if (i === len - 1) {
          /* eslint-disable no-unused-expressions */
          this.matchNum === 0 ? (this.isEmpty = true) : (this.isEmpty = false)
        }
      }
      this.matchNum = 0
    },
    // 选一个时，子组件触发此事件
    selectItem (item) {
      const value = this.value.slice()
      const index = value.indexOf(item.value)
      if (index === -1) {
        value.push(item.value)
      } else {
        value.splice(index, 1)
      }
      this.isSelecting = true
      this.$emit('input', value)
    },
    // 全选按钮
    selectAll () {
      const value = []
      this.isAll = !this.isAll
      if (this.isAll) {
        this.$children.forEach((item) => {
          value.push(item.value)
        })
      }
      this.$emit('input', value)
    }
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

