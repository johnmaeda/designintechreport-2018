const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const common = require('./webpack.config.common.js')

module.exports = merge(common('production'), {
  optimization: {
    // Enable minimization via UglifyJS.
    minimize: true,
  },
  plugins: [
    // When in production build, we can determine it by looking up
    // process.env.NODE_ENV === 'production'.
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    // Minimize CSS outputs.
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
})
