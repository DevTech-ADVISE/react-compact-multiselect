var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets:['react']},
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
    ],
  },

  entry: './src/react-compact-multiselect.js',

  output: {
    library: 'ReactCompactMultiselect',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'react-compact-multiselect.js',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    'lazy.js': {
      root: 'Lazy',
      commonjs: 'lazy.js',
      commonjs2: 'lazy.js',
      amd: 'lazy.js',
    },
    'react-drop-button': {
      root: 'DropButton',
      commonjs: 'react-drop-button',
      commonjs2: 'react-drop-button',
      amd: 'react-drop-button',
    },
    'react-sizebox': {
      root: 'SizeBox',
      commonjs: 'react-sizebox',
      commonjs2: 'react-sizebox',
      amd: 'react-sizebox',
    },
  },

  node: {
    Buffer: false
  },

};
