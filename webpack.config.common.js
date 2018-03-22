const CleanWebpackPlugin = require('clean-webpack-plugin')
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
    filename: 'js/[name].js',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      // For markdown sources, use raw-loader to retrieve it as a string.
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
      // Transpile JavaScript sources via Babel up from Stage 2 Candidate of
      // ECMAScript down to ES2016.
      {
        test: /\.js$/,
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
            },
          },
        ],
      },
      // Just use css-loader for CSS. This includes files in node_modules.
      {
        test: /\.css$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
      // SASS transpilation pipe. Loaders are piped from the last to the first
      // loader. Sass-loader first transpiles SASS sources and then pipe it
      // to postcss-loader. Postcss-loader manipulates the piped CSS according
      // to postcss.config.js.
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
    // Clean the build directory first.
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['build/**/*'], {
      root: path.resolve(__dirname),
    }),
    // This plugin collects all of the CSS sources imported by the entry point,
    // and merges them into a single CSS file.
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    // Provides just for observing changes in HTML.
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: false,
    }),
  ],
})
