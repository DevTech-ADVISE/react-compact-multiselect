/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './index.js',
  devtool: 'source-maps',
  output: {
    path: path.join(__dirname),
    filename: 'react-compact-multiselect.js',
    libraryTarget: 'umd',
    library: 'ReactCompactMultiselect'
  },

  // externals: {
  //  'react': 'var React'
  // },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /\.jsx?$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  }
};
