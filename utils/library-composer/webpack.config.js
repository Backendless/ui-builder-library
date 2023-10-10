const path = require('path');

const DIST = path.resolve(__dirname, './dist');
const SRC = path.resolve(__dirname, './src');

module.exports = {
  entry: path.resolve(SRC, 'index.js'),

  output: {
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename     : 'lib.js',
    path         : DIST,
    clean        : true,
  },

  externals: {
    react           : 'global React',
    'react-dom'     : 'global ReactDOM',
    backendless     : 'global Backendless',
    'backendless-ui': 'global BackendlessUI',
  },
};
