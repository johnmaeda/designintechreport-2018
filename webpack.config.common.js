const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = mode => ({
  mode,
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, 'src', 'js', 'main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'marked': path.resolve(__dirname, 'lib/marked.js'),
      'remarked': path.resolve(__dirname, 'node_modules/marked')
    }
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!remark)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2016',
                'es2017',
                'stage-3',
                'stage-2'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: mode === 'production',
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules', 'compass-mixins', 'lib')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/remark\/src\/remark\/macros.js/,
      path.resolve(__dirname, 'lib/macros.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/remark\/src\/remark\/highlighter.js/,
      path.resolve(__dirname, 'lib/highlighter.js')
    ),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname)
    }),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname),
        from: 'markdown',
        to: 'markdown'
      },
      {
        context: path.resolve(__dirname),
        from: 'data',
        to: 'data'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
})
