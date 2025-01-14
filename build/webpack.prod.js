const path = require('path')
const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')

const prodConfig = {
  mode: 'production', // 生产环境
  output: {
    filename: 'bundle.[chunkhash].js',  // 输出文件名，一般要加上hash
    path: path.join(__dirname, 'dist'),  // 输出目录
    clean: true, // 每次打包会清除之前的代码 
  }
}

module.exports = merge(commonConfig, prodConfig)