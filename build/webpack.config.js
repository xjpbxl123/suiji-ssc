const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const assist = require('./assist')
const ENV = process.env.node_env
const devPlugs = [new webpack.NamedModulesPlugin(),
new webpack.HotModuleReplacementPlugin()]
module.exports = {
  entry: ['./src/main.js'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /(\.vue)$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'vue-style-loader!css-loader!postcss-loader?sourceMap=true',
            scss: 'vue-style-loader!css-loader!postcss-loader?sourceMap=true!sass-loader?sourceMap=true',
          }
        }
      },
      {
        test: /(\.js)/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      //处理scss预加载器
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',//webpack只能通过require来加载路径包括图片,
        //这个loader可以让图片路径不用require，内部已经做了处理
        options: {
          limit: 10000,
          name: 'static/images/[name]?[hash].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'image-webpack-loader'//针对没有被url-loader转化的图片，可以压缩他们减小一点体积.
      },
    ]
  },
  devServer: {
    historyApiFallback: true,//任意404会跳到index.html,
    stats: 'minimal',//只在有错误或者新的编译时输出信息,
    noInfo: true,
    compress: true,
    hot: true
  },
  resolve: {
    alias: {
      "components": path.resolve(__dirname, '../src/components'),
      "static": path.resolve(__dirname, '../src/static')
    },
    extensions: ['.js', '.vue']
  },
  devtool: "#source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      inline: true
    })
  ]

};
if (ENV !== 'development') {
  // module.exports.devtool = 'none'
  module.exports.plugins = [...module.exports.plugins, ...assist.plugs()]
  module.exports.output = Object.assign({}, module.exports.output, {
    filename: 'static/javascript/[name].[chunkhash].js',
    chunkFilename: 'static/javascript/[name].[chunkhash].js'
  })
  let cssl = assist.setCss()
  module.exports.module.rules[2].use = cssl.css
  module.exports.module.rules[3].use = cssl.scss
  module.exports.module.rules[0].options.loaders = cssl
} else {
  console.log('ffff--===')
  module.exports.plugins = [...module.exports.plugins, ...devPlugs]

}