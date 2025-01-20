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
const webpack = require('webpack')

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
      'static': path.resolve(__dirname, '..', 'static'),
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
            presets: ['@babel/preset-env'],
            cacheDirectory: true, // 开启babel编译缓存
            cacheCompression: false, // 缓存文件不要压缩
          }
        }
      },
      {
        test: /\.css$/,
        use: utils.getStyleLoaders()
      },
      {
        test: /\.s[ac]ss$/i,
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   'postcss-loader',
        //   //'sass-loader',
        //   // {
        //   //   loader: 'sass-resources-loader',
        //   //   options: {
        //   //     resources: [
        //   //       path.resolve(__dirname, '../src/assets/scss/variables.scss'),
        //   //       path.resolve(__dirname, '../src/assets/scss/global.scss'),
        //   //       path.resolve(__dirname, '../src/assets/scss/deve.scss')
        //   //       ]
        //   //   }
        //   // }
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       implementation: require('sass'), // 使用 dart-sass 或 node-sass（根据你的配置）
        //       sassOptions: {
        //         includePaths: ['../src/assets/scss'] // 确保你的变量文件路径正确
        //       }
        //     }
        //   }
        // ]
        use: utils.getStyleLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: 'img/[name].[hash:7].[ext]',
        },
        // loader: 'url-loader',
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('img/[name].[hash:7].[ext]')
        // }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        dependency: { not: ['url'] },
        type: 'asset/resource', // 或者使用 'asset/resource' 和 'asset/inline' 根据需要选择
        generator: {
          filename: 'font/[name].[hash:7].[ext]' // 输出目录和文件名格式
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new cssMinimizerPlugin()
    ],
    // 代码分割配置
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
      // cacheGroups: {
      //   // 组，哪些模块要打包到一个组
      //   // defaultVendors: { // 组名
      //   //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //   //   priority: -10, // 权重（越大越高）
      //   //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   // },
      //   default: {
      //     // 其他没有写的配置会使用上面的默认值
      //     minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
  },
  // devtool: 'inline-source-map',	//错误追踪工具
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      process:  require.resolve('process/browser'),
    }),
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',	//配置输出后的html文件名（可携带目录）
    //   template: './public/index.html'	//配置模板
    // })
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 生成的文件以10位hash值为文件名
      chunkFilename: "css/[id].css",
    })
  ],
}