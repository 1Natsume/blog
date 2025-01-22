const path = require('path')
const commonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const config = require("../config");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpack = require("webpack");

const prodConfig = {
  mode: 'production', // 生产环境
  output: {
    path: config.build.assetsRoot,
    filename: "js/[name].js",
    chunkFilename: "js/[id].js",
    clean: true, // 每次打包会清除之前的代码 
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/prod.env"),
    }),
    new CleanWebpackPlugin(), // 自动清理 /dist 目录
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 生成的文件以10位hash值为文件名
      chunkFilename: "css/[id].css",
    }),
    // css压缩
    //new CssMinimizerPlugin(),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        minimize: true,//是否打包为最小值
        removeAttrbuteQuotes: true,//去除引号
        removeComments: true,//去掉注释
        collapseWhitespace: true,//去掉空格
        minifyCss: true,//压缩css
        removeEmptyElements: false,//清理内容为空的元素
      },
      chunksSortMode: "auto",
    }),

  ],
  optimization: {
    // 压缩的操作
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    // minimize: true,
    //代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devtool: "source-map",
}

module.exports = merge(commonConfig, prodConfig)