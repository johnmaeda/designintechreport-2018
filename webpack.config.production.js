const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
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
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    new BundleAnalyzerPlugin()
  ]
})
