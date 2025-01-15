const path = require('path')
const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const config = require("../config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production', // 生产环境
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].js"),
    chunkFilename: utils.assetsPath("js/[id].js"),
    clean: true, // 每次打包会清除之前的代码 
  },
  plugins: [
    new CleanWebpackPlugin(), // 自动清理 /dist 目录
    // new MiniCssExtractPlugin({
    //   filename: 'css/manifest.[contentHash:8].css'
    // }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: "auto",
    }),
  ]
}

module.exports = merge(commonConfig, prodConfig)