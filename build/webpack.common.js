const path = require('path')
//vue-loader@next版本之后需要引入这个插件
const { VueLoaderPlugin } = require('vue-loader')
// 自动根据main.js创建html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')


module.exports = {
  entry: './src/main.js',	//打包的入口
  //设置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src'),
      '@/components': path.resolve(__dirname, '..', 'src/components'),

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
        options:vueLoaderConfig
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
      {//设置css的解析规则
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      { // 设置less的解析规则
        test: /\.scss$/,
        use: [
          // { loader: 'style-loader' },
          // { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/assets/scss/global.scss'),
                path.resolve(__dirname, '../src/assets/scss/deve.scss')]
            }
          },
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
        type: utils.assetsPath('fonts/'),
        dependency: { not: ['url'] },
        // options: {
        //   limit: 10000,
        //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        // }
      },
    ],
  },
  devtool: 'inline-source-map',	//错误追踪工具
  plugins: [
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',	//配置输出后的html文件名（可携带目录）
    //   template: './public/index.html'	//配置模板
    // })
  ],
  //配置webpack-dev-server将dist下的目录代理到web server
  devServer: {
    static: './dist',
    historyApiFallback: true
  }
}