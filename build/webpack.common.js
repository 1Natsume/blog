const path = require('path')
//vue-loader@next版本之后需要引入这个插件
const { VueLoaderPlugin } = require('vue-loader')
// 自动根据main.js创建html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  entry: {
    app: './src/main.js'
  },
  //设置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/assets': path.resolve(__dirname, '..', 'src/assets'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    },
  },
  // 这个配置项是我们运行打包时出现的警告，提示我们打包文件过大，，这里是我们的demo 配置练习，我们这里进行这样一个配置就不会出现警告啦。
  performance: {
    hints: 'warning', // 枚举 false关闭
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000, // 最大资源文件大小
    assetFilter: function (assetFilename) { //只给出js文件的性能提示
      return assetFilename.endsWith('.js');
    }
  },
  //添加模块
  module: {
    rules: [
      {//设置.vue文件的解析规则
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader'   // 将 CSS 转换成 CommonJS 模块
        ]
      },
      { 
        test: /\.s[ac]ss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          'postcss-loader',
          //'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       path.resolve(__dirname, '../src/assets/scss/variables.scss'),
          //       path.resolve(__dirname, '../src/assets/scss/global.scss'),
          //       path.resolve(__dirname, '../src/assets/scss/deve.scss')
          //       ]
          //   }
          // }
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // 使用 dart-sass 或 node-sass（根据你的配置）
              sassOptions: {
                includePaths: ['../src/assets/scss'] // 确保你的变量文件路径正确
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        dependency: { not: ['url'] },
        type: 'asset/resource', // 或者使用 'asset/resource' 和 'asset/inline' 根据需要选择
        generator: {
          filename: utils.assetsPath('font/[name].[hash:7].[ext]') // 输出目录和文件名格式
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new cssMinimizerPlugin()
    ],
  },
  devtool: 'inline-source-map',	//错误追踪工具
  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',	//配置输出后的html文件名（可携带目录）
    //   template: './public/index.html'	//配置模板
    // })
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css'), // 生成的文件以10位hash值为文件名
      chunkFilename: utils.assetsPath("css/[id].css"),
    })
  ]
}