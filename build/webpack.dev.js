const path = require('path')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { plugins } = require('./webpack.base.conf')
const webpack = require("webpack");
const utils = require("./utils");
const config = require("../config");
const devConfig = {
  mode: 'development', // 开发环境
  output: {
    filename: 'bundle.js',  // 输出文件名
    path: path.join(__dirname, '..', 'dist')  // 输出目录
  },
  // module: {
  //     rules: utils.styleLoaders({
  //       sourceMap: config.build.productionSourceMap,
  //       extract: true,
  //       usePostCSS: true,
  //     }),
  //   },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env"),
    }),
  ]
}
module.exports = merge(commonConfig, devConfig)