import Vue from 'vue'
export const searchKnight = params =>
  Vue.axios.get('https://easy-mock.com/mock/5ab7333f2f46280e4ecd4814/mocksf/user/account/getriderlist', { params }).then(res => res.data)

