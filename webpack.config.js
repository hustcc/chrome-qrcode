var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: './res/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      {
        test: /\.js[x]?$/,
        // exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=512'}
    ],
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false,
      }
    })
  ]
}