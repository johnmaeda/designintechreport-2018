const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = merge(common('development'), {
  devtool: 'source-map',
  devServer: {
    // Configuration for a local HTTP server hosting the build directory.
    // https://webpack.js.org/configuration/dev-server/
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    // This adds support for hot reloading.
    // https://webpack.js.org/plugins/hot-module-replacement-plugin/
    new webpack.HotModuleReplacementPlugin(),
  ],
})
