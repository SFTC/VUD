import MultiOption from './src/main'
/* istanbul ignore next */
MultiOption.install = function (Vue) {
  Vue.component(MultiOption.name, MultiOption)
}

export default MultiOption
