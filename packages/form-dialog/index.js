import FormDialog from './src/main'
/* istanbul ignore next */
FormDialog.install = function (Vue) {
  Vue.component(FormDialog.name, FormDialog)
}

export default FormDialog
