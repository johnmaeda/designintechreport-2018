const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = merge(common('development'), {
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
