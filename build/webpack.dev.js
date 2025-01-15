const path = require('path')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { plugins } = require('./webpack.base.conf')
const webpack = require("webpack");
const utils = require("./utils");
const config = require("../config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
  mode: 'development', // 开发环境
  // module: {
  //     rules: utils.styleLoaders({
  //       sourceMap: config.build.productionSourceMap,
  //       extract: true,
  //       usePostCSS: true,
  //     }),
  //   },
  
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,
    proxy: config.dev.proxyTable,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env"),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),

  ]
}
module.exports = merge(commonConfig, devConfig)