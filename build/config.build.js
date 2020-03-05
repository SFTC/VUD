const {
  resolve,
  getComponentEntries
} = require('./utils')
const pub = require('./config.pub')

module.exports = {
  outputDir: resolve('lib'),
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages')
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'vudui',
      globalObject: 'this'
    },
    resolve: pub.resolve,
    externals: {
      vue: 'vue',
      'element-ui': 'element-ui'
    }
  },
  css: {
    sourceMap: true,
    extract: {
      filename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
  }
}
