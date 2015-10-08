var path = require('path');
var webpack = require('webpack');
var appDir = __dirname + '/src';

module.exports = {

  // entry: appDir + '/Component.js',

  output: {
    path: __dirname + '/dist',
    filename: 'Component.js',
  },

  // Let Webpack use bower components
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },

  plugins: [
    // Let Webpack use the main field from the bower.json file from the component
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ]

};