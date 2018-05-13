const merge = require('webpack-merge')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = merge(common('production'), {
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})
