const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = mode => ({
  mode,
  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, 'src', 'js', 'main.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  resolve: {
    alias: {
      '../macros': path.resolve(__dirname, 'lib/macros.jsx'),
      'marked': path.resolve(__dirname, 'lib/marked.js'),
      'remarked': path.resolve(__dirname, 'node_modules/marked'),
    },
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2016',
                'es2017',
                'stage-3',
                'stage-2',
              ],
              plugins: [
                'transform-react-jsx',
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(__dirname, 'node_modules', 'compass-mixins', 'lib'),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build/**/*'], {
      root: path.resolve(__dirname),
    }),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname),
        from: 'data',
        to: 'data',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
})
