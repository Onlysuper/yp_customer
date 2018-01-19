var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

/* 合并 webpack.base.conf.js */
var webpackConfig = merge(baseWebpackConfig, {
  /* 使用的 loader */
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  /* 是否使用 #source-map 开发工具，更多信息可以查看 DDFE 往期文章 */
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  /* 编译输出目录 */
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash:6].js'),
    chunkFilename: utils.assetsPath('js/[name].[hash:6].js')
  },
  /* 使用的插件 */
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    //definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'elementUI'], /*, 'elementUI', 'mintUI'*/
    }),
    /* 压缩 js (同样可以压缩 css) */
    new webpack.optimize.UglifyJsPlugin({
      // comments: false,//去掉注释
      compress: {
        warnings: false ////忽略警告,要不然会有一大堆的黄色字体出现……
      },
      sourceMap: true
    }),
    /* 将 css 文件分离出来 */
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash:6].css'),
      allChunks: true //將所有的chunks也提取到文件中 (包括路由和各种組件中的样式)
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /* 输入输出的 .html 文件 */
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './src/index.html',
      inject: true,
      favicon: './favicon.ico',
      // 压缩的方式
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    /* 没有指定输出文件名的文件输出的静态文件名 */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /* 没有指定输出文件名的文件输出的静态文件名 */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['common']
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'jWeixin': 'weixin-js-sdk',
      'pubsub': 'pubsub-js'
    }),
  ]
})

/* 开启 gzip 的情况下使用下方的配置 */
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
