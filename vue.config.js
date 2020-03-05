const path = require('path')
const buildConfig = require('./build/config.build')

module.exports = process.env.VUE_APP_CURRENTMODE === 'part' ? buildConfig : {
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模版来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  publicPath: process.env.NODE_ENV === 'development' ? './' : '/VUD',
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(path.resolve(__dirname, 'packages'))
      .end()

      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
