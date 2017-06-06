const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var uglifyJsPlugin = process.env.PROD == 1? [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
] : [];

var uglifyCssPlugin = process.env.PROD == 1? [ new OptimizeCssAssetsWebpackPlugin() ] : []

module.exports = [
  {
    name: 'javascript',
    entry: __dirname + '/resources/assets/js/entry.js',
    output: {
      filename: 'app.js',
      path: __dirname + '/public/js'
    },
    module: {
      loaders: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2017', 'react', 'es2015'],
            plugins: ['babel-plugin-transform-object-rest-spread', 'babel-plugin-transform-class-properties']
          }
        }
      ]
    },
    plugins: uglifyJsPlugin
  },

  {
    name: 'stylesheets',
    entry: __dirname + '/resources/assets/sass/entry.sass',
    output: {
      filename: 'app.css',
      path: __dirname + '/public/css'
    },
    module: {
      loaders: [
        {
          test: /\.sass/,
          loader: ExtractTextWebpackPlugin.extract({
            use: 'css-loader!sass-loader',
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin('app.css')
    ].concat(uglifyCssPlugin)
  }
];